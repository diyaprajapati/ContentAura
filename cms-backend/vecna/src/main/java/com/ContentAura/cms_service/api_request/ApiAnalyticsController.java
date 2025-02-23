package com.ContentAura.cms_service.api_request;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class ApiAnalyticsController {

    private final ApiRequestRepository repository;

    @GetMapping("/recent")
    public ResponseEntity<List<ApiRequest>> getRecentAnalytics() {
        List<ApiRequest> recentRequests = repository.findTop10ByOrderByTimestampDesc();
        return ResponseEntity.ok(recentRequests);
    }

    @GetMapping("/overview")
    public ResponseEntity<List<OverviewDataPoint>> getOverview(
            @RequestParam(defaultValue = "week") String timeframe) {

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime start;
        DateTimeFormatter formatter;

        switch (timeframe.toLowerCase()) {
            case "month":
                start = now.minusDays(30);
                formatter = DateTimeFormatter.ofPattern("MM-dd");
                break;
            case "year":
                start = now.minusYears(1);
                formatter = DateTimeFormatter.ofPattern("MMM");
                break;
            case "week":
            default:
                start = now.minusDays(7);
                formatter = DateTimeFormatter.ofPattern("EEE");
                break;
        }

        List<ApiRequest> requests = repository.findByTimestampAfter(start);

        Map<String, List<ApiRequest>> grouped = requests.stream()
                .collect(Collectors.groupingBy(
                        req -> req.getTimestamp().format(formatter)
                ));

        List<OverviewDataPoint> result = new ArrayList<>();

        grouped.forEach((timeLabel, reqs) -> {
            int totalCount = reqs.stream()
                    .mapToInt(ApiRequest::getRequestCount)
                    .sum();

            int schemaCount = reqs.stream()
                    .filter(r -> r.getSchemaId() != null)
                    .mapToInt(ApiRequest::getRequestCount)
                    .sum();

            int projectCount = totalCount - schemaCount;

            result.add(new OverviewDataPoint(timeLabel, projectCount, schemaCount));
        });

        result.sort(Comparator.comparing(OverviewDataPoint::getTime));

        return ResponseEntity.ok(result);
    }
}