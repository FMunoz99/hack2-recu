import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useAuthContext } from "@contexts/AuthContext";
import { RegisterRequest } from '@interfaces/auth/RegisterRequest';


const RegisterPage = () => {
    const navigate = useNavigate();
    const {register} = useAuthContext(); // Accede a la función login desde el contexto
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        role: 'client', // Valor inicial para el rol
    });
    const [error, setError] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const { username, password, role } = formData;
    
        // Crear el objeto de registro
        const registerRequest: RegisterRequest = {
            username: username,
            password: password,
            role: role
        };
    
        // Validación de campos
        if (!username || !password || !role) {
            setError('Todos los campos son obligatorios');
            return;
        }
    
        // Lógica para manejar el registro (llamada a la API, por ejemplo)
        // Asegúrate de que la función 'register' esté definida correctamente y reciba 'registerRequest' como parámetro
        register(registerRequest)
            .then(() => {
                console.log('Registro exitoso');
                navigate('/auth/login'); // Redirige al login después de un registro exitoso
            })
            .catch((error) => {
                console.error('Error en el registro:', error);
                setError('Hubo un problema con el registro');
            });
    
        console.log('Datos de registro:', registerRequest);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
                {/* Título CompraFácil */}
                <h1 className="text-4xl font-bold text-center text-blue-500 mb-8">CompraFácil</h1>

                <h2 className="text-2xl font-semibold text-center mb-6">Registro de Usuario</h2>
                
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

                    <div>
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700">Rol:</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                            className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="client">Usuario</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Registrar
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        ¿Ya tienes cuenta?{' '}
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="text-blue-500 hover:underline"
                        >
                            Inicia sesión
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
