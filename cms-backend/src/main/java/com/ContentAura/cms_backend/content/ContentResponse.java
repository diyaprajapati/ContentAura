package com.ContentAura.cms_backend.content;

import com.fasterxml.jackson.databind.JsonNode;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContentResponse {
    private Long id;
    private JsonNode data;
}
