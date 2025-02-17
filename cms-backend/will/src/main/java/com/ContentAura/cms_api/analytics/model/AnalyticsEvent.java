package com.ContentAura.cms_api.analytics.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "analytics_events")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalyticsEvent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "event_type", nullable = false)
    private String eventType;

    @Column(name = "entity_type")
    private String entityType;

    @Column(name = "entity_id")
    private Long entityId;

    @Column(name = "user_id")
    private Integer userId;

    @Column(name = "project_id")
    private Long projectId;

    @Column(name = "timestamp")
    private LocalDateTime timestamp = LocalDateTime.now();

    @Column(name = "path")
    private String path; // For API calls, the endpoint path

    @Column(name = "method")
    private String method; // For API calls, GET, POST, etc.

    @Column(name = "duration_ms")
    private Long durationMs; // For measuring API call performance

    @Column(name = "status_code")
    private Integer statusCode; // For API calls

}