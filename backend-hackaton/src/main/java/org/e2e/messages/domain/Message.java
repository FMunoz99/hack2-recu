package org.e2e.messages.domain;

import jakarta.persistence.*;
import lombok.Data;
import org.e2e.chat.Chat;

import java.time.ZonedDateTime;

@Data
@Entity
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    private String content;

    private ZonedDateTime creationDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_id")  // Esto es opcional si prefieres el nombre por defecto
    private Chat chat;

    @Enumerated(EnumType.STRING)
    private Sender sender;  // Asumiendo que 'Sender' es una enumeración

    private String aimodel; // Asumiendo que 'aiModel' es una enumeración
}
