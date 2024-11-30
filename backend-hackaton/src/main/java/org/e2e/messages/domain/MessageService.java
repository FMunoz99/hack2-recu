package org.e2e.messages.domain;

import org.e2e.ai.ChatService;
import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.chat.Chat;
import org.e2e.chat.ChatRepository;
import org.e2e.messages.dto.MessageRequest;
import org.e2e.messages.dto.MessageResponse;
import org.e2e.messages.infrastructure.MessageRepository;
import org.e2e.user.domain.User;
import org.e2e.user.infrastructure.BaseUserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;

@Service
public class MessageService {

    @Autowired private MessageRepository messageRepository;
    @Autowired private BaseUserRepository<User> baseUserRepository;
    @Autowired private AuthorizationUtils authorizationUtils;
    @Autowired private ChatRepository chatRepository;

    private final ChatService chatService;  // Instancia de ChatService
    @Autowired
    private ModelMapper modelMapper;

    public MessageService() {
        this.chatService = new ChatService(); // Inicialización del ChatService
    }

    public MessageResponse sendMessage(MessageRequest requestdto, Long chatid) {
        String userEmail = authorizationUtils.getCurrentUserEmail();
        User user = baseUserRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        // Guardar el mensaje del usuario
        Message messageRequest = new Message();
        messageRequest.setContent(requestdto.getContent());
        messageRequest.setAimodel(requestdto.getAimodel());
        messageRequest.setCreationDate(ZonedDateTime.now());
        messageRequest.setSender(Sender.USER);

        // Obtener el chat actual
        Chat chat = chatRepository.findById(chatid)
                .orElseThrow(() -> new UsernameNotFoundException("Chat not found"));
        messageRequest.setChat(chat);

        String aiModelResponse = "";

        if (requestdto.getAimodel() == "gpt-4") {
            aiModelResponse = chatService.getChatModelResponse(requestdto.getContent(),"gpt-4"); // Pasar contenido del mensaje
        } else if (requestdto.getAimodel() == "gpt-4-mini") {
            aiModelResponse = chatService.getChatModelResponse(requestdto.getContent(),"gpt-4-mini"); // Otro modelo
        }

        Message response = new Message();
        response.setAimodel(requestdto.getAimodel());
        response.setContent(aiModelResponse);
        response.setSender(Sender.BOT);
        response.setChat(chat);
        response.setCreationDate(ZonedDateTime.now());


        return modelMapper.map(messageRepository.save(response), MessageResponse.class);
    }
}
