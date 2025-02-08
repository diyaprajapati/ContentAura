package com.ContentAura.cms_api.controller;

import com.ContentAura.cms_service.content.ContentResponse;
import com.ContentAura.cms_service.content.ContentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class Content {
    private final ContentService contentService;

    @GetMapping("/{schemaId}")
    public ResponseEntity<List<ContentResponse>> getAllContentBySchemaId(@PathVariable Long schemaId) {
        List<com.ContentAura.cms_service.content.Content> contents = contentService.getContentBySchemaId(schemaId);
        return ResponseEntity.ok(contents.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    private ContentResponse toResponse(com.ContentAura.cms_service.content.Content content) {
        return ContentResponse.builder()
                .id(content.getId())
                .data(content.getData())
                .build();
    }
}
