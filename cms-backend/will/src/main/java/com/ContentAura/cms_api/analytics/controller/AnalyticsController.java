package com.ContentAura.cms_api.analytics.controller;

import com.ContentAura.cms_api.analytics.model.AnalyticsEvent;
import com.ContentAura.cms_api.analytics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    @PostMapping("/events")
    public ResponseEntity<AnalyticsEvent> recordEvent(@RequestBody AnalyticsEvent event) {
        return ResponseEntity.ok(analyticsService.recordEvent(event));
    }

    @GetMapping("/projects/{projectId}/activity")
    public ResponseEntity<List<AnalyticsEvent>> getProjectActivity(
            @PathVariable Long projectId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime start,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime end) {

        return ResponseEntity.ok(analyticsService.getProjectActivity(projectId, start, end));
    }

    @GetMapping("/projects/{projectId}/endpoints")
    public ResponseEntity<Map<String, Long>> getMostAccessedEndpoints(@PathVariable Long projectId) {
        return ResponseEntity.ok(analyticsService.getMostAccessedEndpoints(projectId));
    }

    @GetMapping("/projects/{projectId}/performance")
    public ResponseEntity<Double> getAverageResponseTime(@PathVariable Long projectId) {
        return ResponseEntity.ok(analyticsService.getAverageResponseTime(projectId));
    }
}
