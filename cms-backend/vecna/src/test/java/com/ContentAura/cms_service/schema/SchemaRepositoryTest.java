package com.ContentAura.cms_service.schema;

import com.ContentAura.cms_service.project.Project;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.ActiveProfiles;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@ActiveProfiles("test")
@Import(TestSchemaRepository.class)
@Transactional
public class SchemaRepositoryTest {

    @Autowired
    private TestSchemaRepository testSchemaRepository;

    @Autowired
    private TestEntityManager entityManager;

    private Project testProject;
    private TestSchema testSchema;

    @BeforeEach
    void setUp() {
        // Create and persist a project first
        testProject = new Project();
        testProject.setTitle("Test Project");
        testProject = entityManager.persistFlushFind(testProject);

        // Simple JSON string
        String jsonContent = "{ \"fields\": [{ \"name\": \"title\", \"type\": \"string\" }] }";

        // Create and persist test schema
        testSchema = TestSchema.builder()
                .name("Test Schema")
                .project(testProject)
                .contentJson(jsonContent)
                .createdAt(LocalDateTime.now())
                .build();

        testSchema = entityManager.persistFlushFind(testSchema);
    }

    @Test
    void testFindByProjectId() {
        // Clear persistence context
        entityManager.clear();

        List<TestSchema> schemas = testSchemaRepository.findByProjectId(testProject.getId());
        assertFalse(schemas.isEmpty());
        assertEquals(1, schemas.size());
        assertEquals(testProject.getId(), schemas.get(0).getProject().getId());
        assertEquals("Test Schema", schemas.get(0).getName());
        assertNotNull(schemas.get(0).getContentJson());

        // Optional: Verify JSON content
        assertTrue(schemas.get(0).getContentJson().contains("title"));
    }
}