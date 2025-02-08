package com.ContentAura.cms_service.schema;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class SchemaResponse {
    private Long id;
    private String name;
    private JsonNode content;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
//    private ProjectResponse project;

//    @Data
//    @Builder
//    public static class ProjectResponse {
//        private Long id;
//        private String title;
//        private String description;
//    }
}
