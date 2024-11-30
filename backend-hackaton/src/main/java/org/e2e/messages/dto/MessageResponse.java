package org.e2e.messages.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import org.e2e.messages.domain.Sender;
import org.e2e.messages.domain.aiModel;

import java.time.ZonedDateTime;
@Data
public class MessageResponse {


    private String content;

    private ZonedDateTime creationDate;

}
