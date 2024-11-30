export interface MessageRequest {
  chatID: string;             // Identificador del chat
  aiModel: "GPT4" | "GPT4mini";  // Modelo de IA utilizado (GPT4 o GPT4mini)
}
