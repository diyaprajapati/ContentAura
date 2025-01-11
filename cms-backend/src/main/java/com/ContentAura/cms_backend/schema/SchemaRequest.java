package com.ContentAura.cms_backend.schema;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class SchemaRequest {
    private String name;
    private JsonNode content;
    private Long projectId;
}
