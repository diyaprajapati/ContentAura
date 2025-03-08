package com.ContentAura.cms_service.dto;

import lombok.Data;
import java.util.List;
import java.util.Map;

@Data
public class ProjectHierarchyDTO {
    private Long projectId;
    private String projectTitle;
    private Integer userId;
    private List<SchemaDTO> schemas;

    @Data
    public static class SchemaDTO {
        private Long schemaId;
        private String schemaName;
        private Map<String, String> fields; // Extracted from JSON content (name → type)
    }
}
