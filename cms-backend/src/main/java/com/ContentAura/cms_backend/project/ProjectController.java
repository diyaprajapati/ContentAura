package com.ContentAura.cms_backend.project;

import com.ContentAura.cms_backend.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<ProjectResponse> createProject(
            @RequestBody ProjectRequest request,
            @AuthenticationPrincipal User user
    ) {
        return ResponseEntity.ok(projectService.createProject(request, user));
    }

    @GetMapping
    public ResponseEntity<?> getUserProjects(@AuthenticationPrincipal User user) {
        return ResponseEntity.ok(projectService.getUserProjects(Long.valueOf(user.getId())));
    }
}