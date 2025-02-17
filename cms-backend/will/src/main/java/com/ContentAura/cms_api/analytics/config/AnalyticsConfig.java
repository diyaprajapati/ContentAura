package com.ContentAura.cms_api.analytics.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@RequiredArgsConstructor
public class AnalyticsConfig implements WebMvcConfigurer {

    private final AnalyticsInterceptor analyticsInterceptor;

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(analyticsInterceptor)
                .addPathPatterns("/api/**")
                .excludePathPatterns("/api/analytics/**"); // Avoid recursive analytics tracking
    }
}
