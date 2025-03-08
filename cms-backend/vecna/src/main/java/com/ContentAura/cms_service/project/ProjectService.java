package com.ContentAura.cms_service.project;

import com.ContentAura.cms_service.dto.ProjectHierarchyDTO;
import com.ContentAura.cms_service.schema.Schema;
import com.ContentAura.cms_service.user.User;
import com.fasterxml.jackson.databind.JsonNode;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Long getProjectCount(User user) {
        return (long) user.getProjects().size();
    }

    public ProjectResponse createProject(ProjectRequest request, User user) {
        var project = Project.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .apiKey(request.isGenerateApiKey() ? UUID.randomUUID().toString() : null)
                .createdAt(LocalDateTime.now())
                .user(user)
                .build();

        var savedProject = projectRepository.save(project);

        return mapToResponse(savedProject);
    }

    public Long getTotalSchemaCount(User user) {
        List<Project> projects = user.getProjects();
        long count = 0;
        for (Project project : projects) {
            count += project.getSchemas().size();
        }
        return count;
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND,
                        "Project not found with id: " + id
                ));
    }

    public Long getTotalContentCount(User user) {
        List<Project> projects = user.getProjects();
        long count = 0;
        for (Project project : projects) {
            for (Schema schema : project.getSchemas()) {
                count += schema.getContents().size();
            }
        }
        return count;
    }

    @Transactional
    public boolean deleteProject(Long projectId) {
        if (projectRepository.existsById(projectId)) {
            projectRepository.deleteById(projectId);
            return true;
        }
        System.out.println("Project ID not found: " + projectId);
        return false;
    }

    public List<ProjectResponse> getUserProjects(Integer userId) {
        return projectRepository.findByUserId(userId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    private ProjectResponse mapToResponse(Project project) {
        return ProjectResponse.builder()
                .id(project.getId())
                .title(project.getTitle())
                .description(project.getDescription())
                .apiKey(project.getApiKey())
                .createdAt(project.getCreatedAt())
                .build();
    }

    public ProjectHierarchyDTO getProjectHierarchy(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        ProjectHierarchyDTO dto = new ProjectHierarchyDTO();
        dto.setProjectId(project.getId());
        dto.setProjectTitle(project.getTitle());
        dto.setUserId(project.getUser().getId()); // For user-based filtering

        List<ProjectHierarchyDTO.SchemaDTO> schemaDTOs = project.getSchemas().stream().map(schema -> {
            ProjectHierarchyDTO.SchemaDTO schemaDTO = new ProjectHierarchyDTO.SchemaDTO();
            schemaDTO.setSchemaId(schema.getId());
            schemaDTO.setSchemaName(schema.getName());

            // Extract fields from JSON content
            JsonNode content = schema.getContent();
            Map<String, String> fields = new HashMap<>();

            if (content != null && content.has("properties")) {
                Iterator<Map.Entry<String, JsonNode>> iterator = content.get("properties").fields();
                while (iterator.hasNext()) {
                    Map.Entry<String, JsonNode> entry = iterator.next();
                    String fieldName = entry.getKey();
                    String fieldType = entry.getValue().has("type") ? entry.getValue().get("type").asText() : "unknown";
                    fields.put(fieldName, fieldType);
                }
            }
            schemaDTO.setFields(fields);
            return schemaDTO;
        }).collect(Collectors.toList());

        dto.setSchemas(schemaDTOs);
        return dto;
    }
}
