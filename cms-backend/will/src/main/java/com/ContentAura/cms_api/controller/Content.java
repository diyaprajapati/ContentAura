package com.ContentAura.cms_api.controller;

import com.ContentAura.cms_service.content.ContentService;
import com.ContentAura.cms_service.project.Project;
import com.ContentAura.cms_service.project.ProjectService;
import com.fasterxml.jackson.databind.JsonNode;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin("*")
public class Content {
    private final ContentService contentService;
    private final ProjectService projectService;

    @GetMapping("/{projectId}/{schemaId}")
    public ResponseEntity<List<JsonNode>> getAllContentBySchemaId(
            @PathVariable Long projectId,
            @PathVariable Long schemaId,
            @RequestHeader("X-API-Key") String apiKey
    ) {
        // Validate API key against project
        Project project = projectService.getProjectById(projectId);
        if (!project.getApiKey().equals(apiKey)) {
            return ResponseEntity.status(401).build();
        }

        // Get content and transform to only return data
        List<com.ContentAura.cms_service.content.Content> contents =
                contentService.getContentBySchemaId(schemaId);

        // Extract only the JSONB data field
        List<JsonNode> response = contents.stream()
                .map(content -> content.getData())
                .collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }
}