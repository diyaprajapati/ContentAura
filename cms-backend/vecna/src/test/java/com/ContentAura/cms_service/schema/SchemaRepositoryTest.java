package com.ContentAura.cms_service.schema;

import com.ContentAura.cms_service.project.Project;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class SchemaRepositoryTest {

    @Mock
    private SchemaRepository schemaRepository;

    private ObjectMapper objectMapper = new ObjectMapper();
    private Project testProject;
    private Schema testSchema;
    private Long projectId = 1L;

    @BeforeEach
    void setUp() throws Exception {
        // Create a project
        testProject = new Project();
        testProject.setId(projectId);
        testProject.setTitle("Test Project");

        // Create a schema with simple JSON content
        String jsonString = "{ \"fields\": [{ \"name\": \"title\", \"type\": \"string\" }] }";
        JsonNode jsonNode = objectMapper.readTree(jsonString);

        testSchema = new Schema();
        testSchema.setId(1L);
        testSchema.setName("Test Schema");
        testSchema.setProject(testProject);
        testSchema.setContent(jsonNode);
        testSchema.setCreatedAt(LocalDateTime.now());

        // Set up mock response
        List<Schema> schemaList = new ArrayList<>();
        schemaList.add(testSchema);

        when(schemaRepository.findByProjectId(projectId)).thenReturn(schemaList);
    }

    @Test
    void testFindByProjectId() {
        // Test the repository method with mocked data
        List<Schema> schemas = schemaRepository.findByProjectId(projectId);

        // Assertions
        assertNotNull(schemas);
        assertFalse(schemas.isEmpty());
        assertEquals(1, schemas.size());
        assertEquals("Test Schema", schemas.get(0).getName());
        assertEquals(projectId, schemas.get(0).getProject().getId());
        assertNotNull(schemas.get(0).getContent());
    }
}