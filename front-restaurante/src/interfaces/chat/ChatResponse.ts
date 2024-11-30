import { MessageResponse } from "@interfaces/message/MessageResponse";

export interface ChatResponse {
    id: number;                 // Identificador único del chat
    chatName: string;           // Nombre del chat
    creationDate: string;       // Fecha de creación en formato ISO 8601
    messages: MessageResponse[]; // Lista de mensajes asociados al chat
}
