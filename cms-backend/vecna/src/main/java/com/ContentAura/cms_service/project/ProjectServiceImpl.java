package com.ContentAura.cms_service.project;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProjectServiceImpl implements ProjectInterService{
    private final ProjectRepository projectRepository;

    @Override
    public Integer getUserIdByProjectId(Long projectId) {
        return projectRepository.findUserIdByProjectId(projectId);
    }
}
