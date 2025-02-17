package com.ContentAura.cms_api.analytics.service;

import com.ContentAura.cms_api.analytics.model.AnalyticsEvent;
import com.ContentAura.cms_api.analytics.repository.AnalyticsEventRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingDeque;

@Service
@Slf4j
@RequiredArgsConstructor
public class AnalyticsService {
    private final AnalyticsEventRepository repository;
    private final BlockingDeque<AnalyticsEvent> eventQueue;

    public void trackEvent(String eventType, Integer userId, Long projectId) {
        try {
            AnalyticsEvent event = AnalyticsEvent.builder()
                    .eventType(eventType)
                    .userId(userId)
                    .projectId(projectId)
                    .timestamp(LocalDateTime.now())
                    .build();
            if(!eventQueue.offer(event)) {
                log.warn("Analytics queue is full, event {} was dropped", eventType);
            }
        }
        catch (Exception e) {
            log.error("Failed to track analytics event: {}" ,e.getMessage(), e);
        }
    }

    @Async
    @Transactional
    public void processBatch() {
        List<AnalyticsEvent> batch = new ArrayList<>(100);
        int drained = eventQueue.drainTo(batch, 100);

        if(drained > 0) {
            try {
                repository.saveAll(batch);
                log.debug("Successfully processed {} analytics events", drained);
            }
            catch (Exception e) {
                log.error("Failed to process batch", e);
            }
        }
    }

    public AnalyticsEvent recordEvent(AnalyticsEvent event) {
        return repository.save(event);
    }

    public AnalyticsEvent recordApiCall(String path, String method, Long projectId, Integer userId,
                                        Long durationMs, Integer statusCode) {
        AnalyticsEvent event = AnalyticsEvent.builder()
                .eventType("API_CALL")
                .path(path)
                .method(method)
                .projectId(projectId)
                .userId(userId)
                .durationMs(durationMs)
                .statusCode(statusCode)
                .timestamp(LocalDateTime.now())
                .build();

        return repository.save(event);
    }

    public List<AnalyticsEvent> getProjectActivity(Long projectId, LocalDateTime start, LocalDateTime end) {
        return repository.findProjectActivityInTimeRange(projectId, start, end);
    }

//    public Map<String, Long> getMostAccessedEndpoints(Long projectId) {
//        List<Object[]> results = repository.findMostAccessedEndpoints(projectId);
//        Map<String, Long> endpointCounts = new HashMap<>();
//
//        for (Object[] result : results) {
//            String path = (String) result[0];
//            Long count = ((Number) result[1]).longValue();
//            endpointCounts.put(path, count);
//        }
//
//        return endpointCounts;
//    }

    public Map<String, Long> getMostAccessedEndpoints(Long projectId) {
        List<Object[]> results = repository.findMostAccessedEndpoints(projectId);

        if (results == null || results.isEmpty()) {
            log.warn("No analytics data found for projectId: {}", projectId);
            return new HashMap<>();
        }

        Map<String, Long> endpointCounts = new HashMap<>();

        for (Object[] result : results) {
            log.info("Fetched from DB: Path = {}, Count = {}", result[0], result[1]); // Log each row

            String path = String.valueOf(result[0]);
            Long count = ((Number) result[1]).longValue();
            endpointCounts.put(path, count);
        }

        return endpointCounts;
    }



    public double getAverageResponseTime(Long projectId) {
        List<AnalyticsEvent> apiCalls = repository.findByProjectId(projectId);
        return apiCalls.stream()
                .filter(event -> event.getDurationMs() != null)
                .mapToLong(AnalyticsEvent::getDurationMs)
                .average()
                .orElse(0.0);
    }
}
