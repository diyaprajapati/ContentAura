package com.ContentAura.cms_service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/health")
@RestController
public class Health {
    @GetMapping
    public String checkHealth() {
        return "OK";
    }
}
