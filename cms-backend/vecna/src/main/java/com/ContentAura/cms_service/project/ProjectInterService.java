package com.ContentAura.cms_service.project;

import org.springframework.stereotype.Service;

@Service
public interface ProjectInterService {
    Integer getUserIdByProjectId(Long projectId);
}