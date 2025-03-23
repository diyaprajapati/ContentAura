package com.ContentAura.cms_service.auth;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

@Service
public class SignupRateLimiterService {
    private final ConcurrentMap<String, Bucket> buckets = new ConcurrentHashMap<>();

    private Bucket createNewBucket() {
        Bandwidth limit = Bandwidth.classic(5, Refill.greedy(5, Duration.ofMinutes(1))); // 5 attempts per 5 minutes
        return Bucket.builder().addLimit(limit).build();
    }

    public boolean tryConsume(String key) {
        return buckets.computeIfAbsent(key, k -> createNewBucket()).tryConsume(1);
    }
}
