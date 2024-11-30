package org.e2e.chat;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chats")
public class ChatController {

    @Autowired
    private ChatService chatService;

    // Crear un chat
    @PostMapping
    public ResponseEntity<ChatDtoResponse> createChat(@RequestBody ChatDtoRequest chatDtoRequest) {
        ChatDtoResponse createdChat = chatService.createChat(chatDtoRequest);
        return new ResponseEntity<>(createdChat, HttpStatus.CREATED);
    }

    // Obtener todos los chats
    @GetMapping
    public ResponseEntity<List<ChatDtoResponse>> getAllChats() {
        List<ChatDtoResponse> allChats = chatService.getAllChats();
        return new ResponseEntity<>(allChats, HttpStatus.OK);
    }

    // Obtener un chat por ID
    @GetMapping("/{chatId}")
    public ResponseEntity<ChatDtoResponse> getChatById(@PathVariable long chatId) {
        ChatDtoResponse chat = chatService.getChatById(chatId);
        return chat != null ? new ResponseEntity<>(chat, HttpStatus.OK)
                : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
