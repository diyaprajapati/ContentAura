package com.ContentAura.cms_service.api_request;

import com.ContentAura.cms_service.project.ProjectInterService;
import com.ContentAura.cms_service.project.ProjectService;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class ApiAnalyticsService {
    private final ApiRequestRepository repository;
    private final ProjectInterService projectInterService;

    private final List<ApiRequest> requestBatch = Collections.synchronizedList(new ArrayList<>());

    // Batch size for performance
    private static final int BATCH_SIZE = 100;
    // Flush interval of 30 seconds
    private static final long FLUSH_INTERVAL = 30000;

    @Async
    public CompletableFuture<Void> logApiRequestAsync(@NonNull Long projectId, Long schemaId,
                                                      String endpoint, Integer statusCode, String method) {
        try {
            // Get userId from projectId
            Integer userId = projectInterService.getUserIdByProjectId(projectId);

            if (userId == null) {
                log.warn("Could not find userId for project: {}", projectId);
                return CompletableFuture.completedFuture(null);
            }

            ApiRequest request = new ApiRequest();
            request.setProjectId(projectId);
            request.setSchemaId(schemaId);
            request.setUserId(userId);
            request.setEndpoint(endpoint);
            request.setStatusCode(statusCode);
            request.setRequestMethod(method);
            request.setTimestamp(LocalDateTime.now());

            requestBatch.add(request);

            if (requestBatch.size() >= BATCH_SIZE) {
                flushRequestBatch();
            }
            return CompletableFuture.completedFuture(null);
        } catch (Exception e) {
            log.error("Error logging API request: {}", e.getMessage(), e);
            return CompletableFuture.completedFuture(null);
        }
    }

    @Scheduled(fixedRate = FLUSH_INTERVAL)
    public void flushRequestBatch() {
        List<ApiRequest> batchToSave;
        synchronized (requestBatch) {
            if (requestBatch.isEmpty()) {
                return;
            }
            batchToSave = new ArrayList<>(requestBatch);
            requestBatch.clear();
        }

        // Save all requests individually
        repository.saveAll(batchToSave);
    }
}