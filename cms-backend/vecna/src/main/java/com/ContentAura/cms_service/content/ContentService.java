package com.ContentAura.cms_service.content;

import com.ContentAura.cms_service.schema.Schema;
import com.ContentAura.cms_service.schema.SchemaNotFoundException;
import com.ContentAura.cms_service.schema.SchemaRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final SchemaRepository schemaRepository;
    private final ObjectMapper objectMapper;

    public Content createContent(JsonNode data, Long schemaId) {
        Schema schema = schemaRepository.findById(schemaId)
                .orElseThrow(() -> new RuntimeException("Schema not found with ID: " + schemaId));

        JsonNode processedData = preprocessContent(data);

        Content content = Content.builder()
                .data(data)
                .schema(schema)
                .build();
        return contentRepository.save(content);
    }

    public List<Content> getContentBySchemaId(Long schemaId) {
        return contentRepository.findBySchemaId(schemaId);
    }

    public Content updateContent(Long id, JsonNode data) {
        Content content = contentRepository.findById(id)
                .orElseThrow(() -> new SchemaNotFoundException("Content not found with id " + id));

        JsonNode processedData = preprocessContent(data);
        content.setData(processedData);

//        content.setData(data);
        return contentRepository.save(content);
    }

    public void deleteContent(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new SchemaNotFoundException("Content not found with id " + id);
        }
        contentRepository.deleteById(id);
    }

    private JsonNode preprocessContent(JsonNode data) {
        try {
            // Convert to string while preserving newlines
            String jsonString = objectMapper.writeValueAsString(data);
            // Parse back to JsonNode with preserved formatting
            return objectMapper.readTree(jsonString);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing content data", e);
        }
    }


}
