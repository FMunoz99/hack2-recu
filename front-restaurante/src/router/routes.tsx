import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./ProtectedRoute";  // Asegúrate de tener este componente importado
import LoginPage from "@pages/publicas/LoginPage";
import RegisterPage from "@pages/publicas/RegisterPage";
import HomeCliente from "@pages/cliente/HomeCliente";
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

        // Rutas protegidas
        {
          path: "home",
          element: <ProtectedRoute element={<HomeCliente />} role="ROLE_USUARIO" />,
        },

        // Ruta comodín para errores
        { path: "*", element: <ErrorPage /> },
        // Ruta comodín para errores
        { path: "/error", element: <ErrorRole/> },
      ],
    },
  ]);