import { Navigate } from "react-router-dom";
import { useAuthContext } from "@contexts/AuthContext"; // Asegúrate de que la ruta sea correcta
import { getRoleBasedOnToken } from "src/utils/getRoleBasedOnToken";

interface ProtectedRouteProps {
    element: JSX.Element;
    role: string
}




export function ProtectedRoute({ element,role }: ProtectedRouteProps) {

    const { session, isLoading } = useAuthContext(); // Desestructuramos directamente


    if (isLoading) return <div>Loading...</div>; // Mostrar un loading mientras se verifica la sesión

    // Si no hay sesión, redirige al login
    if (!session) {
        return <Navigate to={`/auth/login?from=${location.pathname}`} replace />;
    }

    if(role != getRoleBasedOnToken()){
        return <Navigate to={`/error?from=${location.pathname}`} replace />;
    }

    return element; // Si hay sesión y tiene el rol, renderiza el componente hijo (element)
}
