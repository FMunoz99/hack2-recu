import React from "react";
import { FaStar } from "react-icons/fa";
import "@styles/container.css";
import Button2 from "@components/Button2";

interface ButtonProps {
  onClick?: () => void; // La función que se ejecutará cuando se haga clic en el botón
  message: string; // El texto a mostrar en el botón
}

interface ContainerProps {
  imageUrl: string;
  firstName: string;
  lastName: string;
  ratingScore: number;
  email: string;
  phone: string;
  buttonOne: ButtonProps; // Propiedades para el primer botón
  buttonTwo: ButtonProps; // Propiedades para el segundo botón
}

const EditarEmpleado: React.FC<ContainerProps> = ({
  imageUrl,
  firstName,
  lastName,
  ratingScore,
  email,
  phone,
  buttonOne,
  buttonTwo,
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

        {/* Botones */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <Button2 onClick={buttonOne.onClick} message={buttonOne.message} />
          <Button2 onClick={buttonTwo.onClick} message={buttonTwo.message} />
        </div>
      </div>
    </div>
  );
};

export default EditarEmpleado;
