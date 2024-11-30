import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FaExclamationTriangle } from 'react-icons/fa'; 
import { useAuthContext } from "@contexts/AuthContext";
import { LoginRequest } from '@interfaces/auth/LoginRequest';
const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext(); // Accede a la función login desde el contexto
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        const loginRequest: LoginRequest = {
            username: formData.username,
            password: formData.password
        };
        // Validación de campos
        if (!formData.username || !formData.password) {
            setError('Ambos campos son obligatorios');
            return;
        }

        // Lógica para manejar el login (llamada a la API, por ejemplo)
        login(loginRequest)
            .then(() => {
                console.log('Inicio de sesión exitoso');
                navigate('/productos'); // Redirige a la página de productos después de un inicio de sesión exitoso
            })
            .catch((error) => {
                console.error('Error en el inicio de sesión:', error);
                setError('Hubo un problema con el inicio de sesión');
            });

        console.log('Datos de inicio de sesión:', formData);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {/* Título CompraFácil */}
                <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">CompraFácil</h1>

                <h2 className="text-2xl font-semibold text-center mb-6">Iniciar sesión</h2>

                {error && (
                    <div className="bg-red-100 text-red-600 p-4 mb-4 rounded-md flex items-center">
                        <FaExclamationTriangle className="mr-2" /> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de usuario:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Contraseña:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Iniciar sesión
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes cuenta?{' '}
                        <button
                            onClick={() => navigate('/auth/register')}
                            className="text-blue-500 hover:underline"
                        >
                            Regístrate
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
