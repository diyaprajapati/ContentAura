package com.ContentAura.analytics.repository;

import com.ContentAura.analytics.model.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnalyticsRepository extends JpaRepository<AnalyticsEvent, Long> {
}
