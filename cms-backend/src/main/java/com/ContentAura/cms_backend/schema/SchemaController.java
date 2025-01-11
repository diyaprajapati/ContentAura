package com.ContentAura.cms_backend.schema;

import com.ContentAura.cms_backend.project.Project;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/schema")
@RequiredArgsConstructor
public class SchemaController {
    private final SchemaService schemaService;

    @PostMapping("/{projectId}")
    public ResponseEntity<SchemaResponse> createSchema (@PathVariable Long projectId, @RequestBody SchemaRequest request) {
        Schema schema = schemaService.createSchema(request.getName(), request.getContent(), projectId);
        return ResponseEntity.ok(toResponse(schema));
    }

    @GetMapping("/{projectId}")
    public ResponseEntity<List<SchemaResponse>> getSchemaByProjectId (@PathVariable Long projectId) {
        List<Schema> schemas = schemaService.getSchemasByProjectId(projectId);
        return ResponseEntity.ok(schemas.stream().map(this::toResponse).collect(Collectors.toList()));
    }

    @PutMapping("/{id}")
    public ResponseEntity<SchemaResponse> updateSchema (@PathVariable Long id, @RequestBody SchemaRequest request) {
        Schema schema = schemaService.updateSchema(id, request.getName(), request.getContent());
        return ResponseEntity.ok(toResponse(schema));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<SchemaResponse> deleteSchema (@PathVariable Long id) {
        schemaService.deleteSchema(id);
        return ResponseEntity.noContent().build();
    }

    private SchemaResponse toResponse(Schema schema) {
        return SchemaResponse.builder()
                .id(schema.getId())
                .name(schema.getName())
                .content(schema.getContent())
//                .project(toProjectResponse(schema.getProject()))
                .build();
    }

//    private SchemaResponse.ProjectResponse toProjectResponse(Project project) {
//        return SchemaResponse.ProjectResponse.builder()
//                .id(project.getId())
//                .title(project.getTitle())
//                .description(project.getDescription())
//                .build();
//    }
}
