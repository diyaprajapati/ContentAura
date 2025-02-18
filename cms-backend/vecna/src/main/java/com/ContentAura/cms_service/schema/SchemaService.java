package com.ContentAura.cms_service.schema;

import com.ContentAura.cms_service.project.Project;
import com.ContentAura.cms_service.project.ProjectRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
// import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SchemaService {

    private final SchemaRepository schemaRepository;
    private final ProjectRepository projectRepository;
    private final ObjectMapper objectMapper;

    public Schema createSchema(String name, JsonNode content, Long projectId) {
        // validateSchemaWithNode(content);
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found with ID: " + projectId));
        Schema schema = Schema.builder()
                .name(name)
                .project(project)
                .build();
        if (content != null) {
            schema.setContent(content);
        }
        return schemaRepository.save(schema);
    }

//    public Long getSchemaCount(Long projectId) {
//        return schemaRepository.countByProjectId(projectId);
//    }

    public List<Schema> getSchemasByProjectId(Long projectId) {
        return schemaRepository.findByProjectId(projectId);
    }

    public Schema getSchemaById(Long id) {
        return schemaRepository.findById(id).orElseThrow(() -> new RuntimeException("Schema not found with ID: " + id));
    }

    public Schema updateSchema(Long id, String name, JsonNode content) {
        // validateSchemaWithNode(content);
        return schemaRepository.findById(id).map(schema -> {
            schema.setName(name);
            schema.setContent(content);
            return schemaRepository.save(schema);
        }).orElseThrow(() -> new SchemaNotFoundException("Schema not found with id " + id));
    }

    public void deleteSchema(Long id) {
        if (!schemaRepository.existsById(id)) {
            throw new SchemaNotFoundException("Schema not found with id " + id);
        }
        schemaRepository.deleteById(id);
    }

    public Schema deleteSchemaProperty(Long id, String propertyPath) {
        Schema schema = getSchemaById(id);

        try {
            // Convert JSONB content to JsonNode for manipulation
            JsonNode contentNode = objectMapper.readTree(schema.getContent().toString());

            // Create a mutable copy of the JSON structure
            ObjectNode rootNode = (ObjectNode) contentNode;

            // Split the property path (e.g., "properties.title")
            String[] pathParts = propertyPath.split("\\.");

            // Navigate to the parent node
            ObjectNode currentNode = rootNode;
            for (int i = 0; i < pathParts.length - 1; i++) {
                currentNode = (ObjectNode) currentNode.get(pathParts[i]);
                if (currentNode == null) {
                    throw new RuntimeException("Invalid property path: " + propertyPath);
                }
            }

            // Remove the specified property
            currentNode.remove(pathParts[pathParts.length - 1]);

            // Update the schema with modified content - keeping it as JsonNode
            schema.setContent(rootNode);
            return schemaRepository.save(schema);

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON content", e);
        }
    }

    public Schema renameProperty(Long id, PropertyRenameRequest request) {
        Schema schema = getSchemaById(id);

        try {
            // Convert JSONB content to JsonNode for manipulation
            JsonNode contentNode = objectMapper.readTree(schema.getContent().toString());
            ObjectNode rootNode = (ObjectNode) contentNode;

            // Get the properties object
            JsonNode propertiesNode = rootNode.get("properties");
            if (propertiesNode == null || !propertiesNode.isObject()) {
                throw new RuntimeException("Schema doesn't have a valid properties object");
            }

            // Get the property we want to rename
            JsonNode propertyNode = propertiesNode.get(request.getOldName());
            if (propertyNode == null) {
                throw new RuntimeException("Property " + request.getOldName() + " not found");
            }

            // Remove old property and add with new name
            ((ObjectNode) propertiesNode).remove(request.getOldName());
            ((ObjectNode) propertiesNode).set(request.getNewName(), propertyNode);

            // Update the schema with modified content
            schema.setContent(rootNode);
            return schemaRepository.save(schema);

        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON content", e);
        }
    }

    // private void validateSchemaWithNode(JsonNode content) {
    // try {
    // String response =
    // restTemplate.postForObject("http://localhost:3001/validate", content,
    // String.class);
    // System.out.println("Validation successful: " + response);
    // }
    // catch (Exception e) {
    // throw new RuntimeException("Validation failed: " + e.getMessage());
    // }
    // }
}
