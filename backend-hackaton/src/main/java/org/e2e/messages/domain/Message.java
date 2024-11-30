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

    @ManyToOne
    private Chat chat;

    private Sender sender;

    private aiModel aimodel;








}
