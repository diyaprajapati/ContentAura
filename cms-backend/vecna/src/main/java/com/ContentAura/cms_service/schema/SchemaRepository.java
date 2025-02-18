package com.ContentAura.cms_service.schema;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SchemaRepository extends JpaRepository<Schema, Long> {
    List<Schema> findByProjectId(Long projectId);
    Long countByProjectId(Long projectId);

//    @Query("SELECT COUNT(s) FROM Schema s WHERE s.project.id = :projectId")
//    Long countByProjectId(@Param("projectId") Long projectId);
}
