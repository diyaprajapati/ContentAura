package com.ContentAura.cms_service.api_request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface ApiRequestRepository extends JpaRepository<ApiRequest, Long> {

    @Query("SELECT a FROM ApiRequest a WHERE a.projectId = :projectId " +
            "AND ((:schemaId IS NULL AND a.schemaId IS NULL) OR a.schemaId = :schemaId)")
    Optional<ApiRequest> findExistingRequest(
            @Param("projectId") Long projectId,
            @Param("schemaId") Long schemaId
    );

    // New method for fetching the recent API requests (e.g., last 10)
    List<ApiRequest> findTop10ByOrderByTimestampDesc();

    // New method for fetching API requests since a given time
    List<ApiRequest> findByTimestampAfter(LocalDateTime timestamp);
}