package com.ContentAura.cms_backend.schema;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SchemaRepository extends JpaRepository<Schema, Long> {
    List<Schema> findByProjectId(Long projectId);
}
