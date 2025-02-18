package com.ContentAura.cms_api.analytics;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsService analyticsService;

    @PostMapping("/projects")
    public ResponseEntity<Void> registerProject(@RequestBody Map<String, Long> data) {
        analyticsService.incrementProjectCount(Math.toIntExact(data.get("userId")), data.get("projectId"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/schemas")
    public ResponseEntity<Void> registerSchema(@RequestBody Map<String, Long> data) {
        analyticsService.incrementSchemaCount(Math.toIntExact(data.get("userId")), data.get("projectId"));
        return ResponseEntity.ok().build();
    }

    @PostMapping("/trackApi")
    public ResponseEntity<Void> trackApi(@RequestBody Map<String, String> data) {
        analyticsService.trackApiUsage(
                Integer.valueOf(data.get("userId")),
                data.get("endpoint")
        );
        return ResponseEntity.ok().build();
    }

    @GetMapping("/users/{userId}/totalProjects")
    public ResponseEntity<Long> getTotalProjects(@PathVariable Integer userId) {
        return ResponseEntity.ok(analyticsService.getTotalProjects(userId));
    }

    @GetMapping("/users/{userId}/projects/{projectId}/schemas")
    public ResponseEntity<Long> getSchemasPerProject(
            @PathVariable Integer userId, @PathVariable Long projectId) {
        return ResponseEntity.ok(analyticsService.getSchemasPerProject(userId, projectId));
    }

    @GetMapping("/users/{userId}/apiUsage")
    public ResponseEntity<Map<String, Long>> getMostUsedApis(@PathVariable Integer userId) {
        return ResponseEntity.ok(analyticsService.getMostUsedApis(userId));
    }
}
