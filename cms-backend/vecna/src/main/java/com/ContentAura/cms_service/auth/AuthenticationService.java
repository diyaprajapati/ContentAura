package com.ContentAura.cms_service.auth;

import com.ContentAura.cms_service.config.JwtService;
import com.ContentAura.cms_service.user.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authManager;

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
//        User user = userRepository.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
//
////        Verify current password
//        if(!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
//            throw new IllegalArgumentException("Current password is incorrect");
//        }
//
////        Update to new password
//        user.setPassword((passwordEncoder.encode(request.getNewPassword())));
//        userRepository.save(user);

        // Input validation
        if (request.getNewPassword() == null || request.getNewPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("New password cannot be empty");
        }

        if (request.getCurrentPassword() == null || request.getCurrentPassword().trim().isEmpty()) {
            throw new IllegalArgumentException("Current password cannot be empty");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Verify current password with constant-time comparison
        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPassword())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }

        // Validate new password against current password
        if (passwordEncoder.matches(request.getNewPassword(), user.getPassword())) {
            throw new IllegalArgumentException("New password must be different from current password");
        }

        // Validate password complexity requirements
        validatePasswordComplexity(request.getNewPassword());

        // Update to new password
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);
    }

    private void validatePasswordComplexity(String password) {
        // Example password policy - adjust according to your requirements
        if (password.length() < 6) {
            throw new IllegalArgumentException("Password must be at least 6 characters long");
        }

        if (!password.matches(".*[A-Z].*")) {
            throw new IllegalArgumentException("Password must contain at least one uppercase letter");
        }

        if (!password.matches(".*[a-z].*")) {
            throw new IllegalArgumentException("Password must contain at least one lowercase letter");
        }

        if (!password.matches(".*\\d.*")) {
            throw new IllegalArgumentException("Password must contain at least one number");
        }

//        if (!password.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>/?].*")) {
//            throw new IllegalArgumentException("Password must contain at least one special character");
//        }
    }
}
