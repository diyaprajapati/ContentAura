package com.ContentAura.cms_backend.project;

import com.ContentAura.cms_backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

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

    public boolean deleteProject(Long projectId) {
        if (projectRepository.existsById(projectId)) {
            projectRepository.deleteById(projectId);
            return true;
        }
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
}
