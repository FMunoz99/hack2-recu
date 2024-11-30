import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importar el hook useNavigate
import { getChats, createChat } from "@services/chat/chat";
import { ChatRequest } from "@interfaces/chat/ChatRequest";

const HomeCliente = () => {
    const [chats, setChats] = useState<any[]>([]); // Lista de chats
    const [newChatName, setNewChatName] = useState<string>(""); // Nombre del nuevo chat
    const [error, setError] = useState<string | null>(null); // Manejo de errores en el nombre del chat
    const navigate = useNavigate(); // Hook para redirigir

    useEffect(() => {
        fetchChats(); // Obtener los chats al montar el componente
    }, []);

    // Obtener y ordenar los chats por fecha de creación
    const fetchChats = async () => {
        try {
            const response = await getChats();
            const sortedChats = response.sort(
                (a, b) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
            );
            setChats(sortedChats);
        } catch (error) {
            console.error("Error fetching chats:", error);
        }
    };

    // Crear un nuevo chat con validación
    const handleCreateChat = async () => {
        if (!newChatName.trim()) {
            setError("El nombre del chat no puede estar vacío."); // Mostrar error si está vacío
            return;
        }
        setError(null); // Limpiar errores

        const chatRequest: ChatRequest = { chatName: newChatName };

        try {
            const response = await createChat(chatRequest);
            setChats((prevChats) =>
                [...prevChats, response].sort(
                    (a, b) =>
                        new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime()
                )
            );
            setNewChatName(""); // Limpiar el campo de nombre
        } catch (error) {
            console.error("Error creating chat:", error);
        }
    };

    // Manejar clic en un chat y redirigir a su ruta
    const handleChatClick = (chatId: string) => {
        navigate(`/home/${chatId}`);
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen">
            {/* Lista de chats */}
            <div className="bg-gray-200 w-full lg:w-1/4 p-4">
                <h2 className="text-xl font-bold mb-4">Chats</h2>
                <div className="space-y-2">
                    {chats.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => handleChatClick(chat.id)} // Agregar evento de clic
                            className="p-2 cursor-pointer hover:bg-gray-300 rounded"
                        >
                            {chat.chatName}
                        </div>
                    ))}
                </div>
                <div className="mt-4 flex flex-col space-y-2">
                    {/* Input para nuevo chat */}
                    <input
                        type="text"
                        value={newChatName}
                        onChange={(e) => setNewChatName(e.target.value)}
                        className="p-3 border border-gray-300 rounded-lg focus:outline-none"
                        placeholder="Nuevo chat..."
                    />
                    {/* Mensaje de error */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {/* Botón para crear chat */}
                    <button
                        onClick={handleCreateChat}
                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                        Crear Chat
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HomeCliente;
