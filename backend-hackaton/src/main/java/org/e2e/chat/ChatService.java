package org.e2e.chat;

import org.e2e.auth.utils.AuthorizationUtils;
import org.e2e.user.domain.User;
import org.e2e.user.infrastructure.BaseUserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.modelmapper.TypeToken;
import java.lang.reflect.Type;
import java.time.ZonedDateTime;
import java.util.List;

@Service
public class ChatService {

    @Autowired ChatRepository chatRepository;
    @Autowired
    BaseUserRepository<User> baseUserRepository;
    @Autowired
    AuthorizationUtils authorizationUtils;
    @Autowired
    ModelMapper modelMapper;

    public ChatDtoResponse createChat(ChatDtoRequest chat) {

        String userEmail = authorizationUtils.getCurrentUserEmail();
        User user = baseUserRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        Chat chatnuevo = new Chat();
        chatnuevo.setChatName(chat.getChatName());
        chatnuevo.setCreationDate(ZonedDateTime.now());
        chatnuevo.setUser(user);

        chatRepository.save(chatnuevo);

        return modelMapper.map(chatnuevo, ChatDtoResponse.class);
    }


    public List<ChatDtoResponse> getAllChats() {
        String userEmail = authorizationUtils.getCurrentUserEmail();
        User user = baseUserRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        List<Chat> chats = chatRepository.findByUser(user);

        // Mapeo de lista utilizando TypeToken
        Type listType = new TypeToken<List<ChatDtoResponse>>() {}.getType();
        return modelMapper.map(chats, listType);
    }


    public ChatDtoResponse getChatById(long chatId) {
        String userEmail = authorizationUtils.getCurrentUserEmail();
        User user = baseUserRepository
                .findByEmail(userEmail)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));


        return modelMapper.map(chatRepository.findById(chatId), ChatDtoResponse.class);
    }

}
