package com.ContentAura.cms_api.analytics.config;

import com.ContentAura.cms_api.analytics.service.AnalyticsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;

@Configuration
@EnableScheduling
@RequiredArgsConstructor
public class AnalyticsProcessingConfig {
    private final AnalyticsService analyticsService;

    @Scheduled(fixedRate = 2000)
    public void processAnalyticsBatch() {
        analyticsService.processBatch();
    }
}
