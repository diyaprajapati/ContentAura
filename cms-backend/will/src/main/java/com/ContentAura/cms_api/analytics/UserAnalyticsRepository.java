package com.ContentAura.cms_api.analytics;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserAnalyticsRepository extends JpaRepository<UserAnalytics, Long> {
    Optional<UserAnalytics> findByUserId(Integer userId);
}
