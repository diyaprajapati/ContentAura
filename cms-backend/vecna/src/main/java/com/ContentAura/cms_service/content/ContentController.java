package com.ContentAura.cms_service.content;

import com.ContentAura.cms_service.project.ProjectService;
import com.ContentAura.cms_service.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
@Slf4j
public class ContentController {
    private final ContentService contentService;
    private final ProjectService projectService;

    @PostMapping("/{schemaId}")
    public ResponseEntity<ContentResponse> createContent(@PathVariable Long schemaId, @RequestBody ContentRequest request) {
        Content content = contentService.createContent(request.getData(), schemaId);
        return ResponseEntity.ok(toResponse(content));
    }

    @GetMapping("/count/all")
    public ResponseEntity<?> getAllContentsCount(@AuthenticationPrincipal User user) {
        log.info("Attempting to access content count. User: {}", user != null ? user.getEmail() : "null");

        if (user == null) {
            log.warn("Access denied - user is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
        return ResponseEntity.ok(projectService.getTotalContentCount(user));
    }

    @GetMapping("/{schemaId}")
    public ResponseEntity<List<ContentResponse>> getContent(@PathVariable Long schemaId) {
        List<Content> contents = contentService.getContentBySchemaId(schemaId);
        return ResponseEntity.ok(contents.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ContentResponse> updateContent(@PathVariable Long id, @RequestBody ContentRequest request) {
        Content content = contentService.updateContent(id, request.getData());
        return ResponseEntity.ok(toResponse(content));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ContentResponse> deleteContent(@PathVariable Long id) {
        contentService.deleteContent(id);
        return ResponseEntity.noContent().build();
    }

    private ContentResponse toResponse(Content content) {
        return ContentResponse.builder()
                .id(content.getId())
                .data(content.getData())
                .build();
    }
}
