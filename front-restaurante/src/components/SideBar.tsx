import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@contexts/AuthContext"; // Asegúrate de que la ruta sea correcta
import { getRoleBasedOnToken } from "src/utils/getRoleBasedOnToken"; // Función para obtener el rol del usuario
import { FaHome, FaShoppingCart, FaUserAlt, FaTools, FaSignOutAlt } from "react-icons/fa"; // Importa los íconos de react-icons
import "@styles/Sidebar.css"; // Asegúrate de importar el archivo CSS de los estilos

const Sidebar = () => {
  const navigate = useNavigate();
  const { session } = useAuthContext(); // Obtiene la sesión del usuario
  const role = getRoleBasedOnToken(); // Obtiene el rol del usuario
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar la visibilidad del menú
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar si el sidebar está abierto

  // Función para manejar la redirección a la página
  const handleNavigation = (route: string) => {
    navigate(route); // Redirige a la ruta pasada como parámetro
  };

  // Lógica para los botones que se mostrarán según el rol
  const getSidebarButtons = () => {
    if (role === "admin") {
      return (
        <>
          <button onClick={() => handleNavigation("/admin")} className="sidebar-button">
            <FaTools /> Administración
          </button>
          <button onClick={() => handleNavigation("/profile")} className="sidebar-button">
            <FaUserAlt /> Mi Perfil
          </button>
          <button onClick={() => handleNavigation("/logout")} className="sidebar-button">
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </>
      );
    }

    if (role === "user") {
      return (
        <>
          <button onClick={() => handleNavigation("/home")} className="sidebar-button">
            <FaHome /> Inicio
          </button>
          <button onClick={() => handleNavigation("/cart")} className="sidebar-button">
            <FaShoppingCart /> Carrito
          </button>
          <button onClick={() => handleNavigation("/profile")} className="sidebar-button">
            <FaUserAlt /> Mi Perfil
          </button>
          <button onClick={() => handleNavigation("/logout")} className="sidebar-button">
            <FaSignOutAlt /> Cerrar sesión
          </button>
        </>
      );
    }

    // Si no hay rol o no se encuentra, mostramos el ícono de login
    return (
      <div className="sidebar-login-icon" onClick={() => handleNavigation("/login")}>
        <FaUserAlt /> {/* Ícono circular de persona */}
      </div>
    );
  };

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
      <h2 className="sidebar-title">El Dragón Chifero</h2>
      
      {/* Ícono que abre o cierra el sidebar */}
      <div className="sidebar-login-container">
        {session ? (
          <div className="sidebar-user-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <FaUserAlt /> {/* Ícono circular de persona */}
          </div>
        ) : (
          <div className="sidebar-login-icon" onClick={() => handleNavigation("/login")}>
            <FaUserAlt /> {/* Ícono de persona para iniciar sesión */}
          </div>
        )}
        
        {/* Menú desplegable con las opciones */}
        {isMenuOpen && session && (
          <div className="sidebar-dropdown-menu">
            {getSidebarButtons()}
          </div>
        )}
      </div>

      {/* Botón para abrir o cerrar el sidebar */}
      <button 
        className="sidebar-toggle-btn" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        ☰ {/* Ícono de menú */}
      </button>
    </div>
  );
};

export default Sidebar;
