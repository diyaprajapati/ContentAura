package com.ContentAura.cms_service.api_request;


import jakarta.persistence.*;
import lombok.*;
import com.ContentAura.cms_service.project.Project;

import java.time.LocalDateTime;

@Entity
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "api_requests",
        indexes = {
                @Index(name = "idx_project_id", columnList = "projectId"),
                @Index(name = "idx_schema_id", columnList = "schemaId"),
                @Index(name = "idx_timestamp", columnList = "timestamp"),
                @Index(name = "idx_composite", columnList = "projectId, schemaId, timestamp")
        })
public class ApiRequest {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = true)
    private String userId;

//    @Column(nullable = false)
//    private String apiKey;

    @Column(nullable = false)
    private String projectId;

    @Column(nullable = true)
    private String schemaId;

    @Column(nullable = false)
    private String endpoint;

    @Column
    private Integer statusCode;

    @Column(length = 10)
    private String requestMethod;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();
}