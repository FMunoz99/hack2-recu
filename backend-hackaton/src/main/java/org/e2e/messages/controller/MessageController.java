package org.e2e.messages.controller;

import org.e2e.messages.domain.MessageService;
import org.e2e.messages.dto.MessageRequest;
import org.e2e.messages.dto.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/messages")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @PostMapping("/send/{chatId}")
    public ResponseEntity<MessageResponse> sendMessage(
            @RequestBody MessageRequest messageRequest,
            @PathVariable Long chatId) {
        MessageResponse response = messageService.sendMessage(messageRequest, chatId);
        return ResponseEntity.ok(response);
    }
}
