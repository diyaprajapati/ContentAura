package com.ContentAura.cms_service.kafka.producer;

import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class KafkaProducerService {
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public KafkaProducerService(KafkaTemplate<String, Object> kafkaTemplate) {
        this.kafkaTemplate = kafkaTemplate;
    }

    public void sendEvent(String eventType, Long projectId, Long schemaId, Integer userId) {
        Map<String, Object> event = new HashMap<>();
        event.put("eventType", eventType);
        event.put("projectId", projectId);
        event.put("schemaId", schemaId);
        event.put("userId", userId);
        event.put("timestamp", Instant.now().toString());

        kafkaTemplate.send("contentaura.analytics.events", event);
        System.out.println("Sent event: " + event);
    }

    public void sendMessage(String topic ,String message) {
        kafkaTemplate.send(topic, message);
        System.out.println("Send message: " + message);
    }
}
