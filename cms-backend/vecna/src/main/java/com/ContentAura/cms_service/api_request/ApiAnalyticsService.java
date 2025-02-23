package com.ContentAura.cms_service.api_request;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.concurrent.CompletableFuture;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ApiAnalyticsService {
    private final ApiRequestRepository repository;
    private final List<ApiRequest> requestBatch = Collections.synchronizedList(new ArrayList<>());

    // Increased batch size for better performance
    private static final int BATCH_SIZE = 100;
    // Reduced flush interval to 30 seconds
    private static final long FLUSH_INTERVAL = 30000;

    @Async
    public CompletableFuture<Void> logApiRequestAsync(@NonNull  Long projectId, Long schemaId,
                                                      String endpoint, Integer statusCode, String method) {
        ApiRequest request = new ApiRequest();
        request.setProjectId(projectId);
        request.setSchemaId(schemaId);
        request.setEndpoint(endpoint);
        request.setStatusCode(statusCode);
        request.setRequestMethod(method);
        request.setTimestamp(LocalDateTime.now());

        requestBatch.add(request);

        if (requestBatch.size() >= BATCH_SIZE) {
            flushRequestBatch();
        }
        return CompletableFuture.completedFuture(null);
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

        // Group only by projectId and schemaId
        Map<String, List<ApiRequest>> grouped = batchToSave.stream()
                .collect(Collectors.groupingBy(req ->
                        req.getProjectId() + "|" + (req.getSchemaId() == null ? "" : req.getSchemaId())
                ));

        grouped.forEach((key, requests) -> {
            ApiRequest first = requests.get(0);
            int batchCount = requests.size();

            Optional<ApiRequest> existingOpt = repository.findExistingRequest(
                    first.getProjectId(), first.getSchemaId());

            if (existingOpt.isPresent()) {
                ApiRequest existing = existingOpt.get();
                existing.setRequestCount(existing.getRequestCount() + batchCount);
                // Update with latest request info
                existing.setEndpoint(first.getEndpoint());
                existing.setStatusCode(first.getStatusCode());
                existing.setRequestMethod(first.getRequestMethod());
                existing.setTimestamp(LocalDateTime.now());
                repository.save(existing);
            } else {
                first.setRequestCount(batchCount);
                repository.save(first);
            }
        });
    }
}