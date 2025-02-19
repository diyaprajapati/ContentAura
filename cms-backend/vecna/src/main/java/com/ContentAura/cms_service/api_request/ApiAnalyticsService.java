package com.ContentAura.cms_service.api_request;


import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;

@Service
@RequiredArgsConstructor
public class ApiAnalyticsService {
    private final ApiRequestRepository repository;

    private final List<ApiRequest> requestBatch = Collections.synchronizedList(new ArrayList<>());

    // Log a new API request
    public void logApiRequest(String userId, String apiKey, String projectId, String schemaId,
                              String endpoint, Integer statusCode, String method) {
        ApiRequest request = new ApiRequest();
        request.setUserId(userId);
//        request.setApiKey(apiKey);
        request.setProjectId(projectId);
        request.setSchemaId(schemaId);
        request.setEndpoint(endpoint);
        request.setStatusCode(statusCode);
        request.setRequestMethod(method);

        repository.save(request);
    }
    @Async
    public CompletableFuture<Void> logApiRequestAsync(String userId, String projectId, String schemaId,
                                                      String endpoint, Integer statusCode, String method) {
        ApiRequest request = new ApiRequest();
        request.setUserId(userId);
        request.setProjectId(projectId);
        request.setSchemaId(schemaId);
        request.setEndpoint(endpoint);
        request.setStatusCode(statusCode);
        request.setRequestMethod(method);

        requestBatch.add(request);

        // If batch gets large enough, flush immediately
        if (requestBatch.size() >= 50) {
            flushRequestBatch();
        }
        return CompletableFuture.completedFuture(null);
    }
    @Scheduled(fixedRate = 60000) // Run every minute
    public void flushRequestBatch() {
        List<ApiRequest> batchToSave;

        synchronized (requestBatch) {
            if (requestBatch.isEmpty()) {
                return;
            }

            batchToSave = new ArrayList<>(requestBatch);
            requestBatch.clear();
        }

        repository.saveAll(batchToSave);
    }
}