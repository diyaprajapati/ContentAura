package com.ContentAura.cms_backend.content;

import com.ContentAura.cms_backend.schema.Schema;
import com.ContentAura.cms_backend.schema.SchemaNotFoundException;
import com.ContentAura.cms_backend.schema.SchemaRepository;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ContentService {
    private final ContentRepository contentRepository;
    private final SchemaRepository schemaRepository;

    public Content createContent(JsonNode data, Long schemaId) {
        Schema schema = schemaRepository.findById(schemaId)
                .orElseThrow(() -> new RuntimeException("Schema not found with ID: " + schemaId));
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
        content.setData(data);
        return contentRepository.save(content);
    }

    public void deleteContent(Long id) {
        if (!contentRepository.existsById(id)) {
            throw new SchemaNotFoundException("Content not found with id " + id);
        }
        contentRepository.deleteById(id);
    }

}
