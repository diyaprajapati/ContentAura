package com.ContentAura.cms_api.analytics;

import com.ContentAura.cms_service.project.ProjectEvent;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsService {
    private final UserAnalyticsRepository analyticsRepository;

    public void incrementProjectCount(Integer userId, Long projectId) {
        UserAnalytics analytics = analyticsRepository.findByUserId(userId)
                .orElse(new UserAnalytics());
        analytics.setUserId(userId);
        analytics.setTotalProjects(analytics.getTotalProjects() + 1);
        analytics.getProjectSchemaCounts().put(projectId, 0L);
        analyticsRepository.save(analytics);
    }

    public void incrementSchemaCount(Integer userId, Long projectId) {
        UserAnalytics analytics = analyticsRepository.findByUserId(userId)
                .orElse(new UserAnalytics());
        analytics.setUserId(userId);
        analytics.setTotalSchemas(analytics.getTotalSchemas() + 1);
        analytics.getProjectSchemaCounts().put(
                projectId,
                analytics.getProjectSchemaCounts().getOrDefault(projectId, 0L) + 1
        );
        analyticsRepository.save(analytics);
    }

    @EventListener
    @Transactional
    public void handleProjectEvent(ProjectEvent event) {
        log.info("Received ProjectEvent - userId: {}, isCreated: {}",
                event.getUserId(), event.isCreated());

        var analytics = analyticsRepository.findByUserId(event.getUserId())
                .orElse(new UserAnalytics(event.getUserId(), 0L, 0L,
                        new HashMap<>(), new HashMap<>()));

        if (event.isCreated()) {
            analytics.setTotalProjects(analytics.getTotalProjects() + 1);
            log.info("Incrementing project count for user {}: {}",
                    event.getUserId(), analytics.getTotalProjects());
        } else {
            analytics.setTotalProjects(Math.max(0, analytics.getTotalProjects() - 1));
            log.info("Decrementing project count for user {}: {}",
                    event.getUserId(), analytics.getTotalProjects());
        }

        analyticsRepository.save(analytics);
        log.info("Saved analytics update for user {}", event.getUserId());
    }

    public void trackApiUsage(Integer userId, String endpoint) {
        UserAnalytics analytics = analyticsRepository.findByUserId(userId)
                .orElse(new UserAnalytics());
        analytics.setUserId(userId);
        analytics.getApiUsage().put(
                endpoint,
                analytics.getApiUsage().getOrDefault(endpoint, 0L) + 1
        );
        analyticsRepository.save(analytics);
    }

    public Long getTotalProjects(Integer userId) {
        return analyticsRepository.findByUserId(userId)
                .map(UserAnalytics::getTotalProjects)
                .orElse(0L);
    }

    public Long getSchemasPerProject(Integer userId, Long projectId) {
        return analyticsRepository.findByUserId(userId)
                .map(analytics -> analytics.getProjectSchemaCounts().getOrDefault(projectId, 0L))
                .orElse(0L);
    }

    public Map<String, Long> getMostUsedApis(Integer userId) {
        return analyticsRepository.findByUserId(userId)
                .map(UserAnalytics::getApiUsage)
                .orElse(Collections.emptyMap());
    }
}
