import { LoginRequest } from "src/interfaces/auth/LoginRequest";
import { RegisterRequest } from "src/interfaces/auth/RegisterRequest";
import { useStorageState, setStorageItemAsync } from "@hooks/useStorageState";
import Api from '../services/api';
import { login } from "../services/auth/login";
import { register } from "../services/auth/register";
import { createContext, ReactNode, useContext, useEffect } from "react";

// Definir el tipo del contexto de autenticación

interface AuthContextType {
    register: (signupRequest: RegisterRequest) => Promise<void>;
    login: (loginRequest: LoginRequest) => Promise<void>;
    logout: () => void;
    session?: string; // TOKEN
    isLoading: boolean;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);



async function loginHandler(loginRequest: LoginRequest, setSession: (value: string) => void,) {
    const response = await login(loginRequest);
    const token = response.data.token;
    setSession(token);  // Guardamos el token en el estado
    setStorageItemAsync("token",token)
    console.log("Token guardado después de login:", token); // Verificar el token
   console.log("sessionStorage después de login:", localStorage.getItem("token")); // Verificar sessionStorage
}

async function signupHandler(signupRequest: RegisterRequest, setSession: (value: string) => void,) {

    const response = await register(signupRequest);
    
    setSession(response.token);
    setStorageItemAsync("token",response.token)
}

export function AuthProvider({ children }: { children: ReactNode }) {

    const [state, setSession] = useStorageState("token"); 

    useEffect(() => {
        const setApiAuthorization = async () => {
            const api = await Api.getInstance();
            if (!state[0] && state[1]) { // Asegúrate de que no está cargando y que session no es nulo
                api.authorization = state[1]; // Asegúrate de que session sea un string
            }
        };
        setApiAuthorization();
    }, [state]); // Se ejecuta cada vez que state cambia

    const authContextValue: AuthContextType = {
        register: (signupRequest: RegisterRequest) => signupHandler(signupRequest, setSession),
        login: (loginRequest: LoginRequest) => loginHandler(loginRequest, setSession),
        logout: () => {
            setSession(null); // Elimina el token del estado
            localStorage.removeItem("token"); // Elimina el token de localStorage
        },
        session: state[1] || "", // Asegúrate de que session nunca sea nulo
        isLoading: state[0], // Indica si está cargando
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuthContext() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext debe usarse dentro de AuthProvider");
    }
    return context;
}
