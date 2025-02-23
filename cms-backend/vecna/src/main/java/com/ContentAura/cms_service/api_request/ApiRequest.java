package com.ContentAura.cms_service.api_request;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "api_requests",
        indexes = {
                @Index(name = "idx_project_schema", columnList = "projectId, schemaId"),
                @Index(name = "idx_timestamp", columnList = "timestamp")
        })
public class ApiRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false)
    private Integer requestCount = 1;

    @Column(nullable = false)
    private Long projectId;

    @Column(nullable = true)
    private Long schemaId;

    // Keep these for informational purposes in the last request
    @Column(nullable = false)
    private String endpoint;

    @Column
    private Integer statusCode;

    @Column(length = 10)
    private String requestMethod;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}