import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";  // Asegúrate de tener este componente importado
import LoginPage from "@pages/publicas/LoginPage";
import RegisterPage from "@pages/publicas/RegisterPage";
import HomeCliente from "@pages/cliente/HomeCliente";
import ChatDetails from "@pages/cliente/Chatid";
import ErrorPage from "@pages/publicas/ErrorPage";
import HomePage from "@pages/publicas/HomePage";
import ErrorRole from "@pages/publicas/ErrorRole";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      // Rutas públicas
      { path: "", element: <HomePage /> },
      {
        path: "auth",
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
        ],
      },

      // Rutas sin protección
      {
        path: "home",
        children: [
          { path: "", element: <HomeCliente /> }, // Página principal de cliente
          { path: ":id", element: <ChatDetails /> }, // Página de detalles del chat
        ],
      },

      // Ruta comodín para errores
      { path: "*", element: <ErrorPage /> },
      { path: "/error", element: <ErrorRole /> },
    ],
  },
]);
