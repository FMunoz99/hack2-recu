import { ChatResponse } from "@interfaces/chat/ChatResponse";
import { ChatRequest } from "@interfaces/chat/ChatRequest";
import Api from '../api';

// Recupera todos los chats del usuario autenticado
export async function getChats() {
  const api = await Api.getInstance();

  const response = await api.get<null, ChatResponse[]>({
    url: "/api/chats",
  });

  return response;
}

// Crear un nuevo chat
export async function createChat(chatRequest: ChatRequest) {
  const api = await Api.getInstance();

  const response = await api.post<ChatRequest, ChatResponse>(chatRequest, {
    url: "/api/chats",
  });

  return response;
}
