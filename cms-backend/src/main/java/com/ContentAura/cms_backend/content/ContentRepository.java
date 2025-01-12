package com.ContentAura.cms_backend.content;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContentRepository extends JpaRepository<Content, Long> {
    List<Content> findBySchemaId(Long schemaId);
}