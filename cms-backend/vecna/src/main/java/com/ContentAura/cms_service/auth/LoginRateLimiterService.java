package com.ContentAura.cms_service.auth;

import io.github.bucket4j.*;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class LoginRateLimiterService {
    private static final int MAX_ATTEMPTS = 5; // Maximum login attempts
    private static final Duration TIME_WINDOW = Duration.ofMinutes(1); // 1 min block

    private final Map<String, Bucket> ipBuckets = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(MAX_ATTEMPTS, Refill.intervally(MAX_ATTEMPTS, TIME_WINDOW)))
                .build();
    }

    public boolean allowLogin(String ip) {
        Bucket bucket = ipBuckets.computeIfAbsent(ip, k -> createNewBucket());
        return bucket.tryConsume(1); // Tries to consume 1 token (1 login attempt)
    }
}
