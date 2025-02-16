package com.ContentAura.analytics.repository;

import com.ContentAura.analytics.entity.KafkaMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface KafkaMessageRepository extends JpaRepository<KafkaMessage, Long> {
}
