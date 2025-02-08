package com.ContentAura.cms_service.schema;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/schema")
@RequiredArgsConstructor
public class SchemaController {
    private final SchemaService schemaService;

    @PreAuthorize("hasAuthority('CREATE_SCHEMA')")
    @PostMapping("/{projectId}")
    public ResponseEntity<SchemaResponse> createSchema(@PathVariable Long projectId,
            @RequestBody SchemaRequest request) {
        Schema schema = schemaService.createSchema(request.getName(), request.getContent(), projectId);
        return ResponseEntity.ok(toResponse(schema));
    }

    @PreAuthorize("hasAuthority('VIEW_SCHEMA')")
    @GetMapping("/{projectId}")
    public ResponseEntity<List<SchemaResponse>> getSchemaByProjectId(@PathVariable Long projectId) {
        List<Schema> schemas = schemaService.getSchemasByProjectId(projectId);
        return ResponseEntity.ok(schemas.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<SchemaResponse> getSchemaById(@PathVariable Long id) {
        Schema schema = schemaService.getSchemaById(id);
        return ResponseEntity.ok(toResponse(schema));
    }

    @PreAuthorize("hasAuthority('UPDATE_SCHEMA')")
    @PutMapping("/{id}")
    public ResponseEntity<SchemaResponse> updateSchema(@PathVariable Long id, @RequestBody SchemaRequest request) {
        Schema schema = schemaService.updateSchema(id, request.getName(), request.getContent());
        return ResponseEntity.ok(toResponse(schema));
    }

    @PreAuthorize("hasAuthority('DELETE_SCHEMA')")
    @DeleteMapping("/{id}")
    public ResponseEntity<SchemaResponse> deleteSchema(@PathVariable Long id) {
        schemaService.deleteSchema(id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasAuthority('UPDATE_SCHEMA')")
    @DeleteMapping("/{id}/property/{propertyPath}")
    public ResponseEntity<SchemaResponse> deleteSchemaProperty(
            @PathVariable Long id,
            @PathVariable String propertyPath) {
        Schema schema = schemaService.deleteSchemaProperty(id, propertyPath);
        return ResponseEntity.ok(toResponse(schema));
    }

    @PreAuthorize("hasAuthority('UPDATE_SCHEMA')")
    @PutMapping("/{id}/property/rename")
    public ResponseEntity<SchemaResponse> renameProperty(
            @PathVariable Long id,
            @RequestBody PropertyRenameRequest request) {
        Schema schema = schemaService.renameProperty(id, request);
        return ResponseEntity.ok(toResponse(schema));
    }

    private SchemaResponse toResponse(Schema schema) {
        return SchemaResponse.builder()
                .id(schema.getId())
                .name(schema.getName())
                .content(schema.getContent())
                // .project(toProjectResponse(schema.getProject()))
                .build();
    }

    // private SchemaResponse.ProjectResponse toProjectResponse(Project project) {
    // return SchemaResponse.ProjectResponse.builder()
    // .id(project.getId())
    // .title(project.getTitle())
    // .description(project.getDescription())
    // .build();
    // }
}
