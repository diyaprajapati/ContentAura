package com.ContentAura.cms_service.project;

import com.ContentAura.cms_service.user.User;
import com.ContentAura.cms_service.user.Role;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;


import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(SpringExtension.class)
@DataJpaTest
@TestPropertySource(properties = "spring.jpa.hibernate.ddl-auto=create-drop")
public class ProjectRepositoryTest {

    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private TestEntityManager entityManager;

    private User testUser;
    private Project testProject;

    @BeforeEach
    void setUp() {
        testUser = User.builder()
                .firstname("Test")
                .lastname("User")
                .email("testuser@example.com")
                .password("password")
                .role(Role.USER)
                .build();

        testUser = entityManager.persistFlushFind(testUser);

        testProject = Project.builder()
                .title("Test Project")
                .description("Project for testing")
                .apiKey("test-api-key")
                .createdAt(LocalDateTime.now())
                .user(testUser)
                .build();

        testProject = entityManager.persistFlushFind(testProject);
    }

    @Test
    void testFindByUserId() {
        // Call the repository method with the correct user ID type
        List<Project> projects = projectRepository.findByUserId(testUser.getId());

        // Assertions
        assertThat(projects).isNotEmpty();
        assertThat(projects.get(0).getTitle()).isEqualTo("Test Project");
        assertThat(projects.get(0).getUser().getId()).isEqualTo(testUser.getId());
    }

    @Test
    void testFindUserIdByProjectId() {
        // Call the repository method
        Integer userId = projectRepository.findUserIdByProjectId(testProject.getId());

        // Assertion
        assertThat(userId).isEqualTo(testUser.getId());
    }
}