package com.ContentAuraApi.cms_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import com.contentaura.cms_backend.project.ProjectResponse;

@RestController
public class DemoController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/projects")
    public ResponseEntity<ProjectResponse> projects() {

    }
}
