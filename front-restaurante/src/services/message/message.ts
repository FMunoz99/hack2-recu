import { MessageRequest } from "@interfaces/message/MessageRequest";
import { MessageResponse } from "@interfaces/message/MessageResponse";
import Api from '../api';

// Recupera los mensajes de un chat específico
export async function getMessages(chatId: string) {
  const api = await Api.getInstance();

  const response = await api.get<null, MessageResponse[]>({
    url: `/api/chats/${chatId}`,
  });

  return response;
}

// Enviar un mensaje a la IA o desde la IA al usuario
export async function sendMessage(messageRequest: MessageRequest) {
  const api = await Api.getInstance();

  const response = await api.post<MessageRequest, MessageResponse>(messageRequest, {
    url: "/api/messages",
  });

  return response;
}
