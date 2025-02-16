package com.ContentAura.analytics.controller;

import com.ContentAura.analytics.model.AnalyticsEvent;
import com.ContentAura.analytics.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
@RequiredArgsConstructor
public class AnalyticsController {
    private final AnalyticsRepository analyticsRepository;

    @GetMapping("/events")
//    public List<AnalyticsEvent> getAllEvents() {
//        return analyticsRepository.findAll();
//    }
    public ResponseEntity<List<AnalyticsEvent>> getEvents() {
        List<AnalyticsEvent> events = analyticsRepository.findAll();
//        log.info("Returning {} events", events.size());
        return ResponseEntity.ok(events);
    }
}
