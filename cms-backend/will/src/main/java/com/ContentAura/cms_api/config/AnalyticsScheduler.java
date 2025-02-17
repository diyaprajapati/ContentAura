package com.ContentAura.cms_api.config;

import com.ContentAura.cms_api.analytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AnalyticsScheduler {
    private final AnalyticsService analyticsService;

    @Scheduled(fixedRate = 30000) // Process every 30 seconds
    public void processBatchedEvents() {
        analyticsService.processBatch();
    }
}
