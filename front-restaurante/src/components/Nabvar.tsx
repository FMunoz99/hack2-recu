import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@contexts/AuthContext"; // Asegúrate de que la ruta sea correcta
import { FaBars, FaUserCircle } from "react-icons/fa"; // Importa los íconos de react-icons
import Sidebar from "@components/SideBar"; // Asegúrate de que la ruta sea correcta

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar la visibilidad del Sidebar
  const navigate = useNavigate();
  const { session } = useAuthContext(); // Verificamos si el usuario está autenticado

  // Función para redirigir a la página de inicio
  const handleHomeClick = () => {
    navigate("/"); // Redirige a la página de inicio
  };

  // Función para manejar el click en el perfil
  const handleProfileClick = () => {
    navigate("/profile"); // Redirige a la página de perfil
  };

  // Función para abrir/cerrar el sidebar
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen); // Cambia el estado de la visibilidad del sidebar
  };

  return (
    <div>
      {/* Navbar */}
      <nav
        className="flex justify-between items-center p-4"
        style={{
          backgroundColor: "var(--color-primary)", // Usamos la variable de color primario
          color: "var(--color-background)", // Color del texto
        }}
      >
        {/* Botón de la izquierda (ícono de sidebar) */}
        <button
          className="text-white text-2xl"
          onClick={handleSidebarToggle} // Cambia el estado para abrir/cerrar el sidebar
        >
          <FaBars />
        </button>

        {/* Título centrado */}
        <h1
          className="text-xl font-bold cursor-pointer"
          onClick={handleHomeClick}
          style={{ textAlign: "center", flexGrow: 1 }} // Centramos el texto
        >
          El Dragón Chifero
        </h1>

        {/* Botón de la derecha (foto de perfil del usuario) */}
        {session ? (
          <button onClick={handleProfileClick} className="rounded-full border-2 border-white p-2">
            <FaUserCircle size={30} color="white" />
          </button>
        ) : (
          <button
            className="rounded-full border-2 border-white p-2"
            onClick={() => navigate("/auth/login")}
          >
            Iniciar sesión
          </button>
        )}
      </nav>

      {/* Sidebar: Condicionalmente renderiza el Sidebar si el estado isSidebarOpen es true */}
      {isSidebarOpen && <Sidebar />} {/* Muestra el Sidebar cuando isSidebarOpen es true */}
    </div>
  );
};

export default Navbar;
