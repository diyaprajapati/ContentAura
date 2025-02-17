package com.ContentAura.cms_api.analytics.config;

import com.ContentAura.cms_api.analytics.service.AnalyticsService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

@Component
@RequiredArgsConstructor
public class AnalyticsInterceptor implements HandlerInterceptor {

    private final AnalyticsService analyticsService;

    private ThreadLocal<Long> startTime = new ThreadLocal<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        startTime.set(System.currentTimeMillis());
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response,
                                Object handler, Exception ex) {

        Long duration = System.currentTimeMillis() - startTime.get();
        startTime.remove();

        // You would need to get these values from your authentication context
        Long projectId = getProjectIdFromRequest(request);
        Integer userId = getUserIdFromRequest(request);

        if (projectId != null) {
            analyticsService.recordApiCall(
                    request.getRequestURI(),
                    request.getMethod(),
                    projectId,
                    userId,
                    duration,
                    response.getStatus()
            );
        }
    }

    private Long getProjectIdFromRequest(HttpServletRequest request) {
        // Implementation depends on your authentication mechanism
        // This is just a placeholder
        String projectIdStr = request.getHeader("X-Project-Id");
        return projectIdStr != null ? Long.parseLong(projectIdStr) : null;
    }

    private Integer getUserIdFromRequest(HttpServletRequest request) {
        // Implementation depends on your authentication mechanism
        // This is just a placeholder
        String userIdStr = request.getHeader("X-User-Id");
        return userIdStr != null ? Integer.parseInt(userIdStr) : null;
    }
}
