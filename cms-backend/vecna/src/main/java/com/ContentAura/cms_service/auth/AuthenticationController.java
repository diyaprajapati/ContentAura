package com.ContentAura.cms_service.auth;

import com.ContentAura.cms_service.user.UpdatePasswordRequest;
import com.ContentAura.cms_service.user.UpdateProfileRequest;
import com.ContentAura.cms_service.user.User;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService service;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

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

//    @PutMapping("/update-password")
//    public ResponseEntity<?> updatePassword(@RequestBody UpdatePasswordRequest request, Principal principal) {
//        String email = principal.getName();
//        service.updatePassword(email, request);
//        return ResponseEntity.ok(Map.of("message", "password updated Successfully"));
//    }

    @PutMapping("/update-password")
    public ResponseEntity<?> updatePassword(
            @Valid @RequestBody UpdatePasswordRequest request,
            Principal principal
    ) {
        try {
            String email = principal.getName();
            service.updatePassword(email, request);

            // Log password change success (exclude sensitive data)
            logger.info("Password successfully updated for user: {}", email);

            return ResponseEntity.ok(Map.of(
                    "message", "Password updated successfully",
                    "timestamp", LocalDateTime.now()
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("error", e.getMessage()));
        }
    }
}