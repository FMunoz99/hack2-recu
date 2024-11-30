import { useAuthContext } from "@contexts/AuthContext";
import { LoginRequest } from "@interfaces/auth/LoginRequest";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
    const { login } = useAuthContext(); // Accede a la función login desde el contexto
    const [formData, setFormData] = useState<LoginRequest>({ email: "", password: "" });
    const [error, setError] = useState<string | null>(null); // Estado para manejar errores
    const [successMessage, setSuccessMessage] = useState<string | null>(null); // Estado para mensajes de éxito
    const navigate = useNavigate();

    // Maneja los cambios en los campos del formulario
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    // Maneja el envío del formulario
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario
        setError(null); // Reinicia el error
        setSuccessMessage(null); // Reinicia el mensaje de éxito

        try {
            await login(formData); // Llama a la función de login del contexto
            navigate("/dashboard");
            setSuccessMessage("Inicio de sesión exitoso"); // Mensaje de éxito en caso de éxito
        } catch (err) {
            setError("Error al iniciar sesión"); // Maneja el error de inicio de sesión
        }
    }

    return (
        <section className="login-section bg-secondary p-6 rounded-2xl w-full max-w-4xl">
            <h1 className="text-2xl font-bold text-center mb-4" style={{ color: "var(--color-primary)" }}>
                Ingresar 
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4"> {/* Espaciado inferior del campo de email */}
                    <label htmlFor="email" style={{ color: "var(--color-tertiary)" }}>Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full border border-gray-300 rounded-md p-2"
                        style={{ backgroundColor: "var(--color-background)" }}
                    />
                </div>
                <div className="mb-6"> {/* Espaciado inferior del campo de contraseña */}
                    <label htmlFor="password" style={{ color: "var(--color-tertiary)" }}>Contraseña</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full px-3 py-2 border rounded-md"
                        style={{ backgroundColor: "var(--color-background)" }}
                    />
                </div>
                <button
                    id="loginSubmit"
                    className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
                    type="submit"
                    style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-background)"
                    }}
                >
                    Iniciar Sesión
                </button>
            </form>
            {error && <div style={{ color: "red" }}>{error}</div>} {/* Muestra error si existe */}
            {successMessage && <div style={{ color: "blue" }}>{successMessage}</div>} {/* Muestra mensaje de éxito */}
        </section>
    );
}
