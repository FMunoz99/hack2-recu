import { jwtDecode } from "jwt-decode";
import { useStorageState } from "@hooks/useStorageState";

interface DecodedToken {
    role: string;
    username: string;
    issuedAt: number; // UNIX timestamp
    expiresAt: number; // UNIX timestamp
}

export function getRoleBasedOnToken(): string | null {
    const [state, setSession] = useStorageState("token"); 

    if (!state[1]) {
        console.error("Token not found");
        return null; // Manejar casos donde no hay token
    }

    // Verificar si el token tiene el formato adecuado
    if (state[1].split(".").length !== 3) {
        console.error("Invalid token format");
        return null;
    }

    try {
        const decodedToken = jwtDecode<DecodedToken>(state[1]);

        if (!decodedToken.role) {
            console.error("Role not found in token");
            return null; // Si el rol no está presente, devolver null
        }

        return decodedToken.role;
    } catch (error) {
        console.error("Error decoding token:", error);
        return null; // Manejar errores al decodificar el token
    }
}
