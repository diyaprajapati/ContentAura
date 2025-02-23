//package com.ContentAura.cms_api.utils;
//
//import com.ContentAura.cms_service.api_request.ApiAnalyticsService;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Component;
//import org.springframework.web.servlet.HandlerInterceptor;
//
//@Component
//@RequiredArgsConstructor
//public class ApiRequestInterceptor implements HandlerInterceptor {
//    private final ApiAnalyticsService analyticsService;
//
//    @Override
//    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
//                                Object handler, Exception ex) {
//        try {
//            String uri = request.getRequestURI();
//            if (uri.startsWith("/api/")) {
//                String[] pathParts = uri.split("/");
//                if (pathParts.length >= 3) {
//                    Long projectId = Long.valueOf(pathParts[2]);
//                    Long schemaId = Long.valueOf(pathParts.length > 3 ? pathParts[3] : "");
//
//                    analyticsService.logApiRequestAsync(
//                            projectId,
//                            schemaId,
//                            request.getRequestURI(),
//                            response.getStatus(),
//                            request.getMethod()
//                    );
//                }
//            }
//        } catch (Exception e) {
//            System.err.println("Error logging API analytics: " + e.getMessage());
//        }
//    }
//}

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
                    schemaId = Long.valueOf(pathParts[3]);
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
        }
    }
}