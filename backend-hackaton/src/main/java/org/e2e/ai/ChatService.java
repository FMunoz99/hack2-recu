package org.e2e.ai;

import com.azure.ai.inference.ChatCompletionsClient;
import com.azure.ai.inference.models.*;
import java.util.ArrayList;
import java.util.List;

public class ChatService {

    private AzureAIClient azureAIClient;

    // Constructor que inicializa el cliente de Azure
    public ChatService() {
        this.azureAIClient = new AzureAIClient();
    }

    // Método para obtener la respuesta del modelo seleccionado
    public String getChatModelResponse(String userMessage, String modelName) {
        // Lista de mensajes para enviar al modelo
        List<ChatRequestMessage> messages = new ArrayList<>();
        messages.add(new ChatRequestSystemMessage("You are a helpful assistant."));
        messages.add(new ChatRequestUserMessage(userMessage));

        // Crear opciones para la solicitud
        ChatCompletionsOptions options = new ChatCompletionsOptions(messages);

        // Selección del modelo según el parámetro 'modelName'
        switch (modelName) {
            case "gpt-4":
                options.setModel("gpt-4");
                break;
            case "gpt-4-mini":
                options.setModel("gpt-4-mini");
                break;
            default:
                options.setModel("gpt-4"); // Por defecto, usar gpt-4
                break;
        }

        // Obtener el cliente de completado desde AzureAIClient
        ChatCompletionsClient client = azureAIClient.getClient();

        // Realizamos la solicitud al modelo con las opciones definidas
        ChatCompletions chatCompletions = client.complete(options);

        // Extraer y devolver la respuesta del modelo
        return chatCompletions.getChoices().stream()
                .findFirst()
                .map(choice -> choice.getMessage().getContent())
                .orElse("No response from AI model");
    }
}
