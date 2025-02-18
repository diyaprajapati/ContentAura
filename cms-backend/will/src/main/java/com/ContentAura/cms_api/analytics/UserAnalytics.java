package com.ContentAura.cms_api.analytics;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Map;

@Entity
@Table(name = "user_analytics")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAnalytics {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer userId;
    private Long totalProjects;
    private Long totalSchemas;

    @ElementCollection
    @CollectionTable(name = "project_schemas", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "project_id")
    @Column(name = "schema_count")
    private Map<Long, Long> projectSchemaCounts;

    @ElementCollection
    @CollectionTable(name = "api_usage", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "endpoint")
    @Column(name = "count")
    private Map<String, Long> apiUsage;

    public UserAnalytics(Integer userId, Long totalProjects, Long totalSchemas,
                         Map<Long, Long> projectSchemaCounts, Map<String, Long> apiUsage) {
        this.userId = userId;
        this.totalProjects = totalProjects;
        this.totalSchemas = totalSchemas;
        this.projectSchemaCounts = projectSchemaCounts;
        this.apiUsage = apiUsage;
    }

}
