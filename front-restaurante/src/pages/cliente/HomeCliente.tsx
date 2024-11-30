import { useState, useEffect } from "react";
import { getChats, createChat } from "@services/chat/chat";
import { getMessages, sendMessage } from "@services/message/message";
import { ChatRequest } from "@interfaces/chat/ChatRequest"; // Asegúrate de importar el tipo ChatRequest
import { MessageRequest } from "@interfaces/message/MessageRequest"; // Asegúrate de importar el tipo MessageRequest
import { MessageResponse } from "@interfaces/message/MessageResponse"; // Asegúrate de importar el tipo MessageResponse

const HomeCliente = () => {
    const [currentChat, setCurrentChat] = useState<any | null>(null);  // El chat actual
    const [message, setMessage] = useState<string>("");  // El mensaje a enviar
    const [messages, setMessages] = useState<MessageResponse[]>([]);  // Lista de mensajes en el chat
    const [chats, setChats] = useState<any[]>([]);  // Lista de chats
    const [newChatName, setNewChatName] = useState<string>("");  // Nombre del nuevo chat

    useEffect(() => {
        fetchChats();  // Obtener los chats cuando el componente se monta
    }, []);

    // Obtener todos los chats del usuario
    const fetchChats = async () => {
        try {
            const response = await getChats();  // Usar el servicio para obtener los chats
            setChats(response);  // Guardar los chats en el estado
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    // Obtener los mensajes de un chat específico
    const fetchMessages = async (chatId: string) => {
        try {
            const response = await getMessages(chatId);  // Usar el servicio para obtener los mensajes
            setMessages(response);  // Guardar los mensajes en el estado
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };

    // Enviar un mensaje
    const handleMessageSend = async () => {
        if (message.trim() && currentChat) {
            const messageRequest: MessageRequest = {
                content: message,
                chatID: currentChat.id,
                aiModel: "GPT-4", // Cambia el modelo según sea necesario
            };

            try {
                const response = await sendMessage(messageRequest);  // Usar el servicio para enviar el mensaje
                setMessages((prevMessages) => [
                    ...prevMessages,
                    response,  // Añadir el mensaje enviado
                ]);
                setMessage("");  // Limpiar el campo de mensaje
            } catch (error) {
                console.error("Error sending message:", error);
            }
        }
    };

    // Seleccionar un chat para mostrar sus mensajes
    const handleChatSelect = (chatId: string) => {
        setCurrentChat(chats.find((chat) => chat.id === chatId));  // Establecer el chat actual
        setMessages([]);  // Limpiar los mensajes al seleccionar un nuevo chat
        fetchMessages(chatId);  // Obtener los mensajes del chat seleccionado
    };

    // Crear un nuevo chat
    const handleCreateChat = async () => {
        if (newChatName.trim()) {
            const chatRequest: ChatRequest = {
                name: newChatName,
            };

            try {
                const response = await createChat(chatRequest);  // Usar el servicio para crear el chat
                setChats([...chats, response]);  // Añadir el nuevo chat a la lista
                setNewChatName("");  // Limpiar el campo de nombre del chat
            } catch (error) {
                console.error("Error creating chat:", error);
            }
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="bg-gray-200 w-full lg:w-1/4 p-4">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <div className="space-y-2">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleChatSelect(chat.id)}
                            className="p-2 cursor-pointer hover:bg-gray-300 rounded"
                        >
                            {chat.name}
                        </div>
                    ))}
                    <div className="mt-4 flex items-center space-x-2">
                        <input
                            type="text"
                            value={newChatName}
                            onChange={(e) => setNewChatName(e.target.value)}
                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none"
                            placeholder="Nuevo chat..."
                        />
                        <button
                            onClick={handleCreateChat}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                        >
                            Crear Chat
                        </button>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-white p-4 flex flex-col">
                <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>

                <div className="flex-1 overflow-auto bg-gray-50 p-4 rounded-lg border border-gray-300">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`mb-3 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                            <p
                                className={`inline-block px-4 py-2 rounded-md ${
                                    msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200"
                                }`}
                            >
                                {msg.content}
                            </p>
                            <span className="text-sm text-gray-400 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                        </div>
                    ))}
                </div>

                <div className="mt-4 flex items-center space-x-2">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Escribe un mensaje..."
                    />
                    <button
                        onClick={handleMessageSend}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeCliente;
