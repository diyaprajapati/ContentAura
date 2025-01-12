package com.ContentAura.cms_backend.content;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/content")
@RequiredArgsConstructor
public class ContentController {
    private final ContentService contentService;

    @PostMapping("/{schemaId}")
    public ResponseEntity<ContentResponse> createContent(@PathVariable Long schemaId, @RequestBody ContentRequest request) {
        Content content = contentService.createContent(request.getData(), schemaId);
        return ResponseEntity.ok(toResponse(content));
    }

    @GetMapping("/{schemaId}")
    public ResponseEntity<List<ContentResponse>> getContent(@PathVariable Long schemaId) {
        List<Content> contents = contentService.getContentBySchemaId(schemaId);
        return ResponseEntity.ok(contents.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    private ContentResponse toResponse(Content content) {
        return ContentResponse.builder()
                .id(content.getId())
                .data(content.getData())
                .build();
    }
}
