import React from "react";
import { FaStar } from "react-icons/fa";
import "@styles/container.css"

interface ContainerProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  ratingScore: number;
  email: string;
  phone: string;
}

const Empleado: React.FC<ContainerProps> = ({ 
  imageUrl, 
  firstName, 
  lastName, 
  ratingScore, 
  email, 
  phone 
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
        
        {/* Rating */}
        <div className="container-rating">
          <FaStar className="star-icon" />
          <span>{ratingScore}</span>
        </div>
        
        {/* Información */}
        <div className="container-info">
          <p>{email}</p>
          <p>{phone}</p>
        </div>
      </div>
    </div>
  );
};

export default Empleado;
