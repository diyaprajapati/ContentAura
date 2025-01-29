package com.ContentAuraApi.cms_api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class DemoController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

    @GetMapping("/projects")
    public ResponseEntity<com.ContentAura.cms_backend.project.ProjectResponse> projects() {

    }
}
