export interface MessageRequest {
    chatID: string;  
    aiModel: string; 
    sender: "user" | "ai";  
    content: string;  
    timestamp: string; 
  }
  