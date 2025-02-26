package com.ContentAura.cms_api.utils;

import com.ContentAura.cms_service.api_request.ApiAnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Slf4j
@Component
@RequiredArgsConstructor
public class ApiRequestInterceptor implements HandlerInterceptor {
    private final ApiAnalyticsService analyticsService;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        try {
            String uri = request.getRequestURI();
            // Skip logging for non-API or analytics endpoints
            if (!uri.startsWith("/api/") || uri.startsWith("/api/analytics")) {
                return;
            }

            String[] pathParts = uri.split("/");
            if (pathParts.length < 3) {
                log.warn("Invalid API path structure: {}", uri);
                return;
            }

            try {
                Long projectId = Long.valueOf(pathParts[2]);
                Long schemaId = null;

                // Only try to parse schemaId if it exists in the path
                if (pathParts.length > 3 && !pathParts[3].isEmpty()) {
                    try {
                        schemaId = Long.valueOf(pathParts[3]);
                    } catch (NumberFormatException e) {
                        // Not a number, might be another path segment
                        log.debug("Path segment after projectId is not a schemaId: {}", pathParts[3]);
                    }
                }

                analyticsService.logApiRequestAsync(
                        projectId,
                        schemaId,
                        request.getRequestURI(),
                        response.getStatus(),
                        request.getMethod()
                );
            } catch (NumberFormatException e) {
                log.warn("Failed to parse project/schema ID from URI: {}", uri, e);
            }
        } catch (Exception e) {
            log.error("Error logging API analytics", e);
            // Don't rethrow to avoid affecting the actual API response
        }
    }
}