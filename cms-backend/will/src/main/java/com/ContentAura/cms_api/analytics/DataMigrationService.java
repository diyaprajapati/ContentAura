package com.ContentAura.cms_api.analytics;

import com.ContentAura.cms_service.project.Project;
import com.ContentAura.cms_service.project.ProjectRepository;
import com.ContentAura.cms_service.schema.SchemaRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DataMigrationService {
    private final UserAnalyticsRepository analyticsRepository;
    private final ProjectRepository projectRepository;
    private final SchemaRepository schemaRepository;

    @Transactional
    public void populateAnalytics() {
        List<Project> allProjects = projectRepository.findAll();

        for (Project project : allProjects) {
            Integer userId = project.getUser().getId();
            Long projectId = project.getId();

            // Fetch schema count for this project
            Long schemaCount = schemaRepository.countByProjectId(projectId);

            // Fetch or create UserAnalytics entry
            UserAnalytics analytics = analyticsRepository.findByUserId(userId)
                    .orElse(new UserAnalytics(userId, 0L, 0L, new HashMap<>(), new HashMap<>()));

            // Update values
            analytics.setTotalProjects(analytics.getTotalProjects() + 1);
            analytics.setTotalSchemas(analytics.getTotalSchemas() + schemaCount);
            analytics.getProjectSchemaCounts().put(projectId, schemaCount);

            analyticsRepository.save(analytics);
        }
    }
}
