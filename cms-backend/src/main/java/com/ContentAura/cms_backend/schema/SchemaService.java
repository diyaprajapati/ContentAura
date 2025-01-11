package com.ContentAura.cms_backend.schema;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchemaService {

    private final SchemaRepository schemaRepository;
    private final ObjectMapper objectMapper;
    private final RestTemplate restTemplate;

    @Value("${node.schema.validation.url}")
    private String nodeValidationUrl;

    public Schema createSchema(String name, JsonNode content, Long projectId) {
        validateSchemaWithNode(content);
        Schema schema = Schema.builder()
                .name(name)
                .content(content)
                .projectId(projectId)
                .build();
        return schemaRepository.save(schema);
    }

    public List<Schema> getSchemasByProjectId(Long projectId) {
        return schemaRepository.findByProjectId(projectId);
    }

    public Schema updateSchema(Long id, String name, JsonNode content) {
        validateSchemaWithNode(content);
        return schemaRepository.findById(id).map(schema -> {
            schema.setName(name);
            schema.setContent(content);
            return schemaRepository.save(schema);
        }).orElseThrow(() -> new SchemaNotFoundException("Schema not found with id " + id));
    }

    public void deleteSchema(Long id) {
        if(!schemaRepository.existsById(id)) {
            throw new SchemaNotFoundException("Schema not found with id " + id);
        }
        schemaRepository.deleteById(id);
    }

    private void validateSchemaWithNode(JsonNode content) {
        try {
            String response = restTemplate.postForObject(nodeValidationUrl, content, String.class);
            System.out.println("Validation successful: " + response);
        }
        catch (Exception e) {
            throw new RuntimeException("Validation failed: " + e.getMessage());
        }
    }
}
