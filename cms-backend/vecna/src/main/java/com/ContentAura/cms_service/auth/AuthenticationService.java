package com.ContentAura.cms_service.auth;

import com.ContentAura.cms_service.config.JwtService;
import com.ContentAura.cms_service.otp.OTP;
import com.ContentAura.cms_service.otp.OTPRepository;
import com.ContentAura.cms_service.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Random;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;
    private final OTPRepository otpRepository;
    private final JavaMailSender mailSender;

    public AuthenticationResponse register(RegisterRequest request) {
        User existingUser = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (existingUser != null) {
            throw new IllegalArgumentException("User already exists");
        }
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .build();
        userRepository.save(user);

        String jwtToken = jwtService.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
        var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
        String jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void updateProfile(String currentEmail, UpdateProfileRequest request) {
        User user = userRepository.findByEmail(currentEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if(request.getFirstname() != null) {
            user.setFirstname(request.getFirstname());
        }

        if(request.getLastname() != null) {
            user.setLastname(request.getLastname());
        }

        if(request.getEmail() != null && !request.getEmail().equals(currentEmail)) {
//            check if new email is already taken
            if(userRepository.findByEmail(request.getEmail()).isPresent()) {
                throw new IllegalArgumentException("User already exists");
            }
            user.setEmail(request.getEmail());
        }
        userRepository.save(user);
    }

    public void updatePassword(String email, UpdatePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

//        Verify current password
        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

//        Update to new password
        user.setPassword((passwordEncoder.encode(request.getNewPassword())));
        userRepository.save(user);
    }

    public void initiatePasswordChange(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Generate 6-digit OTP
        String otp = String.format("%06d", new Random().nextInt(999999));

        // Save OTP
        OTP otpEntity = OTP.builder()
                .email(email)
                .code(otp)
                .expiryTime(LocalDateTime.now().plusMinutes(10))
                .used(false)
                .build();
        otpRepository.save(otpEntity);

        // Send email
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Change Request");
        message.setText("Your OTP for password change is: " + otp +
                "\nThis OTP will expire in 10 minutes.");
        mailSender.send(message);
    }

    public void verifyAndUpdatePassword(String email, UpdatePasswordRequest request) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalStateException("Current password is incorrect");
        }

        // Verify OTP
        OTP otp = otpRepository
                .findByEmailAndCodeAndUsedFalseAndExpiryTimeAfter(
                        email, request.getOtp(), LocalDateTime.now())
                .orElseThrow(() -> new IllegalStateException("Invalid or expired OTP"));

        // Update password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        // Mark OTP as used
        otp.setUsed(true);
        otpRepository.save(otp);
    }
}
