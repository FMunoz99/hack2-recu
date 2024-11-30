import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        phone: ""
    });
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
            // Aquí iría el código para manejar el registro (por ejemplo, enviando datos a la API)
            // Simulación de éxito de registro
            setSuccessMessage("Registro exitoso"); // Mensaje de éxito
            navigate("/welcome"); // Redirige a la página de bienvenida o el dashboard
        } catch (err) {
            setError("Error al registrar usuario"); // Maneja el error de registro
        }
    }

    return (
        <section className="register-section bg-secondary p-6 rounded-2xl w-full max-w-4xl">
            <h1 className="text-2xl font-bold text-center mb-4" style={{ color: "var(--color-primary)" }}>
                Registrarse 
            </h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4"> {/* Espaciado inferior del campo de primer nombre */}
                    <label htmlFor="firstName" style={{ color: "var(--color-tertiary)" }}>Primer Nombre</label>
                    <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        className="block w-full border border-gray-300 rounded-md p-2"
                        style={{ backgroundColor: "var(--color-background)" }}
                    />
                </div>
                <div className="mb-4"> {/* Espaciado inferior del campo de apellido */}
                    <label htmlFor="lastName" style={{ color: "var(--color-tertiary)" }}>Apellido</label>
                    <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        className="block w-full border border-gray-300 rounded-md p-2"
                        style={{ backgroundColor: "var(--color-background)" }}
                    />
                </div>
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
                <div className="mb-4"> {/* Espaciado inferior del campo de teléfono */}
                    <label htmlFor="phone" style={{ color: "var(--color-tertiary)" }}>Teléfono</label>
                    <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
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
                    id="registerSubmit"
                    className="bg-primary text-white font-bold mx-6 py-2 px-4 rounded-full cursor-pointer"
                    type="submit"
                    style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-background)"
                    }}
                >
                    Registrarse
                </button>
            </form>
            {error && <div style={{ color: "red" }}>{error}</div>} {/* Muestra error si existe */}
            {successMessage && <div style={{ color: "blue" }}>{successMessage}</div>} {/* Muestra mensaje de éxito */}
        </section>
    );
}
