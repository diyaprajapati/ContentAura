package com.ContentAura.cms_service.content;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Data;

@Data
public class ContentRequest {
    private JsonNode data;
}
