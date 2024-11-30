import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMessages, sendMessage } from "@services/message/message"; // Servicios GET y POST
import { MessageResponse, MessageRequest } from "@interfaces/message/MessageResponse";

const ChatDetails = () => {
    const { id } = useParams<{ id: string }>(); // Obtener el ID del chat desde la URL
    const navigate = useNavigate(); // Hook para redirigir
    const [messages, setMessages] = useState<MessageResponse[]>([]); // Lista de mensajes del chat
    const [newMessage, setNewMessage] = useState<string>(""); // Mensaje nuevo a enviar
    const [error, setError] = useState<string | null>(null); // Manejo de errores
    const [loading, setLoading] = useState<boolean>(true); // Estado de carga
    const [sending, setSending] = useState<boolean>(false); // Estado de envío de mensajes

    useEffect(() => {
        if (id) {
            fetchMessages(id); // Obtener mensajes al cargar el componente
        }
    }, [id]);

    // Función para obtener los mensajes del chat
    const fetchMessages = async (chatId: string) => {
        setLoading(true);
        try {
            const response = await getMessages(chatId);
            setMessages(response);
        } catch (error) {
            console.error("Error fetching messages:", error);
            setError("No se pudieron cargar los mensajes.");
        } finally {
            setLoading(false);
        }
    };

    // Función para enviar un nuevo mensaje
    const handleSendMessage = async () => {
        if (!newMessage.trim()) return; // Evitar enviar mensajes vacíos
        setSending(true);

        const messageRequest: MessageRequest = {
            chatID: id || "",
            aiModel: "GPT4", // Puedes cambiarlo a "GPT4mini" si aplica
        };

        try {
            const response = await sendMessage({
                ...messageRequest,
                content: newMessage,
            });
            setMessages((prev) => [...prev, response]); // Añadir el mensaje enviado
            setNewMessage(""); // Limpiar el cuadro de texto
        } catch (error) {
            console.error("Error sending message:", error);
            setError("No se pudo enviar el mensaje.");
        } finally {
            setSending(false);
        }
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            <h2 className="text-xl font-bold mb-4">Chat ID: {id}</h2>
            {loading ? (
                <p className="text-gray-500">Cargando mensajes...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <div className="flex-1 overflow-y-auto bg-white p-4 rounded shadow mb-4">
                    {messages.length === 0 ? (
                        <p className="text-gray-500">No hay mensajes en este chat.</p>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 p-3 rounded ${
                                    index % 2 === 0
                                        ? "bg-blue-50 text-blue-900"
                                        : "bg-gray-50 text-gray-900"
                                }`}
                            >
                                <p className="text-sm font-semibold">Mensaje:</p>
                                <p className="text-lg mb-2">{message.content}</p>
                                <p className="text-xs text-gray-400">
                                    {new Date(message.timestamp).toLocaleString()}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            )}
            {/* Formulario para enviar un mensaje */}
            <div className="flex items-center bg-white p-3 rounded shadow">
                <input
                    type="text"
                    className="flex-1 border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring focus:border-blue-500"
                    placeholder="Escribe un mensaje..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                />
                <button
                    onClick={handleSendMessage}
                    className={`ml-3 px-4 py-2 rounded text-white ${
                        sending
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-500 hover:bg-blue-600"
                    }`}
                    disabled={sending}
                >
                    {sending ? "Enviando..." : "Enviar"}
                </button>
            </div>
            {/* Botón para regresar a Home */}
            <button
                onClick={() => navigate("/home")}
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 self-start"
            >
                Volver a Home
            </button>
        </div>
    );
};

export default ChatDetails;
