package com.ContentAura.cms_api.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Refill;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class RateLimitService {
    private final ConcurrentHashMap<String, Bucket> rateLimiters = new ConcurrentHashMap<>();

    private Bucket newBucket() {
        return Bucket.builder()
                .addLimit(Bandwidth.classic(20, Refill.greedy(5, Duration.ofMinutes(1)))) // 5 requests per minute
                .build();
    }

    public boolean allowRequest(String apiKey) {
        Bucket bucket = rateLimiters.computeIfAbsent(apiKey, k -> newBucket());
        return bucket.tryConsume(1);
    }
}
