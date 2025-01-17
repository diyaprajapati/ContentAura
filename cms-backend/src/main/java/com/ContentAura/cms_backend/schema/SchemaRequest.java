package com.ContentAura.cms_backend.schema;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.annotation.Nullable;
import lombok.Data;

@Data
public class SchemaRequest {
    private String name;
    @Nullable
    private JsonNode content;
//    private Long projectId;
}
