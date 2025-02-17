package com.ContentAura.cms_api.analytics.repository;

import com.ContentAura.cms_api.analytics.model.AnalyticsEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AnalyticsEventRepository extends JpaRepository<AnalyticsEvent, Long> {
    List<AnalyticsEvent> findByEventType(String eventType);

    List<AnalyticsEvent> findByProjectId(Long projectId);

    List<AnalyticsEvent> findByUserIdAndTimestampBetween(Integer userId, LocalDateTime start, LocalDateTime end);

    @Query("SELECT ae FROM AnalyticsEvent ae WHERE ae.projectId = :projectId AND ae.timestamp BETWEEN :start AND :end")
    List<AnalyticsEvent> findProjectActivityInTimeRange(
            @Param("projectId") Long projectId,
            @Param("start") LocalDateTime start,
            @Param("end") LocalDateTime end);

    @Query("SELECT ae.path, COUNT(ae) as count FROM AnalyticsEvent ae WHERE ae.projectId = :projectId GROUP BY ae.path ORDER BY count DESC")
    List<Object[]> findMostAccessedEndpoints(@Param("projectId") Long projectId);
}
