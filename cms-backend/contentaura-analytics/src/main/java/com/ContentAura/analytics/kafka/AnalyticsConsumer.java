package com.ContentAura.analytics.kafka;

import com.ContentAura.analytics.model.AnalyticsEvent;
import com.ContentAura.analytics.repository.AnalyticsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyticsConsumer {
    private final AnalyticsRepository analyticsRepository;

    @KafkaListener(topics = "contentaura.analytics.events", groupId = "analytics-group")
    public void consumeEvent(String message) {
        log.info("Received Kafka Event: {}", message);

        // Parse JSON (Assuming message contains projectId, userId, etc.)
        String[] parts = message.replace("\"", "").replace("{", "").replace("}", "").split(",");
        Long projectId = Long.valueOf(parts[1].split(":")[1].trim());
        Integer userId = Integer.valueOf(parts[2].split(":")[1].trim());

        AnalyticsEvent event = AnalyticsEvent.builder()
                .eventType("NEW_PROJECT")
                .projectId(projectId)
                .userId(userId)
                .timestamp(LocalDateTime.now())
                .build();

        analyticsRepository.save(event);
        log.info("Saved event to analytics database: {}", event);
    }
}
