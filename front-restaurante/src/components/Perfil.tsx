import React from "react";
import Button2 from "./Button2"; // Asegúrate de importar el componente Button2
import "@styles/container.css";

interface PerfilProps {
  imageUrl: string; // URL de la imagen del perfil
  firstName: string; // Primer nombre
  lastName: string; // Apellido
  email: string; // Correo electrónico
  phone: string; // Teléfono
  mensajeUno: string; // Mensaje para el primer botón
  mensajeDos: string; // Mensaje para el segundo botón
  handleSave: () => void; // Función para el primer botón
  handleClick2: () => void; // Función para el segundo botón
}

const Perfil: React.FC<PerfilProps> = ({
  imageUrl,
  firstName,
  lastName,
  email,
  phone,
  mensajeUno,
  mensajeDos,
  handleSave,
  handleClick2
}) => {
  return (
    <div className="container">
      {/* Parte 1: Imagen */}
      <img
        src={imageUrl}
        alt={`${firstName} ${lastName}`}
        className="container-image"
      />
      
      {/* Parte 2: Contenido */}
      <div className="container-content">
        {/* Título */}
        <h2 className="container-title">
          {firstName} {lastName}
        </h2>
        
        {/* Información del perfil */}
        <div className="container-info">
          <p>{email}</p>
          <p>{phone}</p>
        </div>

        {/* Botones */}
        <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-evenly" }}>
          <Button2 onClick={handleSave} message={mensajeUno} />
          <Button2 onClick={handleClick2} message={mensajeDos} />
        </div>
      </div>
    </div>
  );
};

export default Perfil;
