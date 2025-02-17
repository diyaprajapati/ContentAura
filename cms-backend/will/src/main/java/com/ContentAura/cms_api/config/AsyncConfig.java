package com.ContentAura.cms_api.config;

import com.ContentAura.cms_api.analytics.model.AnalyticsEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.concurrent.BlockingDeque;
import java.util.concurrent.LinkedBlockingDeque;

@Configuration
@EnableAsync
@EnableScheduling
public class AsyncConfig {

    @Bean
    public BlockingDeque<AnalyticsEvent> eventQueue() {
        return new LinkedBlockingDeque<>(1000);
    }
}
