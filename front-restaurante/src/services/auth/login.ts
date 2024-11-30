import { AuthResponse } from "@interfaces/auth/AuthResponse";
import { LoginRequest } from "@interfaces/auth/LoginRequest";
import Api from '../api';

export async function login(loginRequest: LoginRequest) {
 const api = await Api.getInstance();

 //Manda un LoginRequest y recibe un AuthResponse
 const response = await api.post<LoginRequest, AuthResponse>(loginRequest, {
  url: "/auth/login",
 });

 return response;
 
}