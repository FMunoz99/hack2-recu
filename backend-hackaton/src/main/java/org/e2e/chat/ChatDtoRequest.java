package org.e2e.chat;

import jakarta.persistence.*;
import lombok.Data;
import org.e2e.messages.domain.Message;
import org.e2e.user.domain.User;

import java.time.ZonedDateTime;
import java.util.List;
@Data
public class ChatDtoRequest {

    private String chatName;

}
