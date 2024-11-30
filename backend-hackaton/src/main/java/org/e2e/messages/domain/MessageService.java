package org.e2e.messages.domain;

import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.chat.Chat;
import org.e2e.chat.ChatRepository;
import org.e2e.messages.dto.MessageRequest;
import org.e2e.messages.dto.MessageResponse;
import org.e2e.messages.infrastructure.MessageRepository;
import org.e2e.user.domain.User;
import org.e2e.user.infrastructure.BaseUserRepository;
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


    public MessageResponse sendMessage(MessageRequest requestdto, Long chatid){

        String userEmail = authorizationUtils.getCurrentUserEmail();
        User user = baseUserRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        //Guardar el mensaje del usuario

        Message messageRequest = new Message();
        messageRequest.setContent(requestdto.getContent());
        messageRequest.setAimodel(requestdto.getAimodel());
        messageRequest.setCreationDate(ZonedDateTime.now());
        messageRequest.setSender(Sender.USER);


        Chat chat = chatRepository.findById(chatid).
                orElseThrow(() -> new UsernameNotFoundException("Chat not found"));

        messageRequest.setChat(chat);


        //Lógica para guardar y preguntar a la api de chat dependiendo el modelo:

        MessageResponse response = new MessageResponse();

        if(requestdto.getAimodel() == aiModel.GPT4){

        } else if (requestdto.getAimodel() == aiModel.GPT4mini) {

        }

        else {

        }


        return response;
    }




}
