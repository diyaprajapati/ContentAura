package com.ContentAura.cms_api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class DemoController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }

//    @GetMapping("/projects")
//    public ResponseEntity<List<Project>> projects() {
//        List<Project> projectResponses = repository.findAll();
//        return new ResponseEntity<>(projectResponses, HttpStatus.OK);
//    }
}
