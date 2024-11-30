package org.e2e.chat;


import jakarta.persistence.*;
import lombok.Data;
import org.e2e.messages.domain.Message;
import org.e2e.user.domain.User;


import java.time.ZonedDateTime;
import java.util.List;
@Data
@Entity
public class Chat {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @ManyToOne
    private User user;

    private ZonedDateTime creationDate;

    private String chatName;

   @OneToMany
    private List<Message> messages;


}
