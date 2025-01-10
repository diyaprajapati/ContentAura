package com.ContentAura.cms_backend.project;

import com.ContentAura.cms_backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;
    private final ProjectRepository projectRepository;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @RequestBody ProjectRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(projectService.createProject(request, user));
    }

    @GetMapping
    public ResponseEntity<?> getUserProjects(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(projectService.getUserProjects(Integer.valueOf(user.getId())));
    }

    @PreAuthorize("hasRole('ADMIN') or @projectSecurity.isOwner(authentication, #projectId)")
    @DeleteMapping("/{projectId}")
    public ResponseEntity<?> deleteProject(@PathVariable Long projectId) {
        boolean isDeleted = projectService.deleteProject(projectId);

        if (isDeleted) {
            return ResponseEntity.ok("Project deleted successfully");
        } else {
            return ResponseEntity.status(404).body("Project not found");
        }
    }

    @PutMapping("/{projectId}")
    public ResponseEntity<Project> updateProject(
            @PathVariable Long projectId,
            @RequestBody Project updatedProject,
            @RequestHeader("Authorization") String token
    ) {
        // Verify the token here if necessary
        Optional<Project> existingProject = projectRepository.findById(projectId);
        if (existingProject.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        Project project = existingProject.get();
        project.setTitle(updatedProject.getTitle());
        project.setDescription(updatedProject.getDescription());
        projectRepository.save(project);

        return ResponseEntity.ok(project);
    }

}