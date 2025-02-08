package com.ContentAura.cms_service.auth;

import com.ContentAura.cms_service.user.UpdatePasswordRequest;
import com.ContentAura.cms_service.user.UpdateProfileRequest;
import com.ContentAura.cms_service.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
//@CrossOrigin(origins = {"http://localhost:5173", "https://content-aura.vercel.app/"})
public class AuthenticationController {
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request) {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @GetMapping("/user-details")
    public ResponseEntity<?> getUserDetails(Principal principal) {
        String email = principal.getName();
        User user = service.getUserByEmail(email);

        return ResponseEntity.ok(Map.of(
                "firstname", user.getFirstname(),
                "lastname", user.getLastname(),
                "email", user.getEmail()
        ));
    }

    @PutMapping("/update-profile")
    public ResponseEntity<?> updateProfile(@RequestBody UpdateProfileRequest request, Principal principal) {
        String email = principal.getName();
        service.updateProfile(email, request);
        return ResponseEntity.ok(Map.of("message", "profile updated Successfully"));
    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest request, Principal principal) {
        String email = principal.getName();
        service.updatePassword(email, request);
        return ResponseEntity.ok(Map.of("message", "password updated Successfully"));
    }

    @PostMapping("/request-password-change")
    public ResponseEntity<?> requestPasswordChange(Principal principal) {
        String email = principal.getName();
        service.initiatePasswordChange(email);
        return ResponseEntity.ok(Map.of("message", "OTP sent to your email"));
    }

    @PutMapping("/verify-and-update-password")
    public ResponseEntity<?> verifyAndUpdatePassword(
            @RequestBody UpdatePasswordRequest request,
            Principal principal) {
        String email = principal.getName();
        service.verifyAndUpdatePassword(email, request);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}