package com.ContentAura.cms_backend.schema;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SchemaResponse {
    private Long id;
    private String name;
    private JsonNode content;
//    private ProjectResponse project;

//    @Data
//    @Builder
//    public static class ProjectResponse {
//        private Long id;
//        private String title;
//        private String description;
//    }
}
