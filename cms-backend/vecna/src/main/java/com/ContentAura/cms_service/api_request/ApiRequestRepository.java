package com.ContentAura.cms_service.api_request;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ApiRequestRepository extends JpaRepository<ApiRequest, Long> {
    // Find recent API requests
    List<ApiRequest> findTop10ByUserIdOrderByTimestampDesc(Integer userId);

    long countByUserIdAndTimestampBetween(Integer userId, LocalDateTime start, LocalDateTime end);

    long countByUserId(Integer userId);

}
