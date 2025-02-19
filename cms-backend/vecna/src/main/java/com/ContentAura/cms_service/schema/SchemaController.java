package com.ContentAura.cms_service.schema;

import com.ContentAura.cms_service.project.Project;
import com.ContentAura.cms_service.project.ProjectService;
import com.ContentAura.cms_service.user.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/schema")
@RequiredArgsConstructor
@Slf4j
public class SchemaController {
    private final SchemaService schemaService;
    private final ProjectService projectService;
    private final SchemaRepository schemaRepository;

    @PreAuthorize("hasAuthority('CREATE_SCHEMA')")
    @PostMapping("/{projectId}")
    public ResponseEntity<SchemaResponse> createSchema(@PathVariable Long projectId,
            @RequestBody SchemaRequest request) {
        Schema schema = schemaService.createSchema(request.getName(), request.getContent(), projectId);
        return ResponseEntity.ok(toResponse(schema));
    }

//    @GetMapping("/count/{projectId}")
//    public ResponseEntity<Integer> getAllSchemas(@PathVariable Long projectId) {
//        Project project = projectService.getProjectById(projectId);
//        return ResponseEntity.ok(project.getSchemas().size());
//    }

    @GetMapping("/count/{projectId}")
    public ResponseEntity<SchemaCountResponse> getAllSchemas(@PathVariable Long projectId) {
        Project project = projectService.getProjectById(projectId);
        SchemaCountResponse response = new SchemaCountResponse(
                project.getTitle(),
                project.getSchemas().size()
        );
        return ResponseEntity.ok(response);
    }

    @GetMapping("/count/all")
    public ResponseEntity<?> getAllSchemas(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not authenticated");
        }
        return ResponseEntity.ok(projectService.getTotalSchemaCount(user));
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
