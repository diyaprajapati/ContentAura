package com.ContentAura.cms_backend.otp;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.Optional;

@Repository
public interface OTPRepository extends JpaRepository<OTP, Long> {
    Optional<OTP> findByEmailAndCodeAndUsedFalseAndExpiryTimeAfter(String email, String code, LocalDateTime now);
}
