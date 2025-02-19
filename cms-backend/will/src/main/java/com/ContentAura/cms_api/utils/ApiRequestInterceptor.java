package com.ContentAura.cms_api.utils;

import com.ContentAura.cms_service.api_request.ApiAnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class ApiRequestInterceptor implements HandlerInterceptor {

    private final ApiAnalyticsService analyticsService;

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {
        try {
            // Extract path variables
            String uri = request.getRequestURI();
            String[] pathParts = uri.split("/");

            if (pathParts.length >= 3 && uri.startsWith("/api/")) {
//                String userId = getUserIdFromRequest(request);
                String projectId = pathParts[2];
                String schemaId = pathParts.length > 3 ? pathParts[3] : "";

                // Use the async version for better performance
                analyticsService.logApiRequestAsync(
                        null,
                        projectId,
                        schemaId,
                        request.getRequestURI(),
                        response.getStatus(),
                        request.getMethod()
                );
            }
        } catch (Exception e) {
            System.err.println("Error logging API analytics: " + e.getMessage());
        }
    }
}
