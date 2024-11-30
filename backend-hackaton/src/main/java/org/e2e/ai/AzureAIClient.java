package org.e2e.ai;

import com.azure.ai.inference.ChatCompletionsClient;
import org.springframework.beans.factory.annotation.Value;

import java.net.HttpURLConnection;
import java.net.URL;

public class AzureAIClient {

    // Token de GitHub (esto es lo que quieres usar para autenticarte)
    @Value("${GITHUB_TOKEN}")
    private static  String githubToken ; // Reemplaza con tu token de GitHub

    private static ChatCompletionsClient client;
    // Endpoint para la API de GitHub que devolverá los detalles del usuario autenticado
    private static final String apiUrl = "https://api.github.com/user"; // Este endpoint obtiene la información del usuario

    public static void main(String[] args) {
        // Verificar si el token de GitHub es válido
        if (isGitHubTokenValid(githubToken)) {
            System.out.println("GitHub Token is valid!");
        } else {
            System.out.println("GitHub Token is invalid or expired.");
        }
    }

    // Método para verificar si el token de GitHub es válido
    public static boolean isGitHubTokenValid(String token) {
        try {
            // Crear una URL para la API de GitHub (en este caso, obtener los detalles del usuario)
            URL url = new URL(apiUrl);
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();

            // Configurar el método de la solicitud HTTP (GET)
            connection.setRequestMethod("GET");

            // Agregar el token de GitHub a las cabeceras de la solicitud como Bearer Token
            connection.setRequestProperty("Authorization", "Bearer " + token);

            // Obtener el código de respuesta HTTP
            int responseCode = connection.getResponseCode();

            // Si el código de respuesta es 200 (OK), el token es válido
            return responseCode == HttpURLConnection.HTTP_OK;
        } catch (Exception e) {
            e.printStackTrace();
            return false; // Si hay algún error, consideramos el token no válido
        }
    }

    // Método para obtener el cliente de ChatCompletions
    public static ChatCompletionsClient getClient() {
        if (client == null) {
            throw new IllegalStateException("Client has not been initialized.");
        }
        return client;
    }
}
