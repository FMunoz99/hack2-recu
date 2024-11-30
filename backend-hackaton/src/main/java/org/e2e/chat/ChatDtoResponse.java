package org.e2e.chat;

import jakarta.persistence.*;
import lombok.Data;
import org.e2e.messages.domain.Message;
import org.e2e.messages.dto.MessageResponse;
import org.e2e.user.domain.User;

import java.time.ZonedDateTime;
import java.util.List;
@Data
public class ChatDtoResponse {


    private Long id;

    private ZonedDateTime creationDate;

    private String chatName;

    private List<MessageResponse> messages;

}
