import { RegisterRequest } from "@interfaces/auth/RegisterRequest";
import Api from '../api';
import { AuthResponse } from "@interfaces/auth/AuthResponse";

export async function register(registerRequest: RegisterRequest): Promise<AuthResponse> {
    const api = await Api.getInstance();

    const response = await api.post<RegisterRequest, AuthResponse>(registerRequest, {
        url: "/auth/register",
    });

    return response.data; 
}
