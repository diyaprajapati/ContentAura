package com.ContentAura.cms_service.api_request;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ApiRequestDTO {
    private Long id;
    private String projectName;
    private String schemaName;
    private String endpoint;
    private String requestMethod;
    private Integer statusCode;
    private LocalDateTime timestamp;
}
