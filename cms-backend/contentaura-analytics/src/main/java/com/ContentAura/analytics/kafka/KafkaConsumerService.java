package com.ContentAura.analytics.kafka;

import com.ContentAura.analytics.entity.KafkaMessage;
import com.ContentAura.analytics.repository.KafkaMessageRepository;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumerService {

    private final KafkaMessageRepository kafkaMessageRepository;

    public KafkaConsumerService(KafkaMessageRepository kafkaMessageRepository) {
        this.kafkaMessageRepository = kafkaMessageRepository;
    }

    @KafkaListener(topics = "content-aura-topic", groupId = "content-aura-group")
    public void consumeMessage(String message) {
        System.out.println("Received message in Analytics: " + message);

        KafkaMessage kafkaMessage = new KafkaMessage();
        kafkaMessage.setTopic("content-aura-topic");
        kafkaMessage.setMessage(message);

        kafkaMessageRepository.save(kafkaMessage);
        System.out.println("Message saved to DB!");
    }
}
