import React from "react";
import { FaStar } from "react-icons/fa";

interface ProductoProps {
  imageUrl: string; // URL de la imagen del producto
  productName: string; // Nombre del producto
  description: string; // Descripción del producto
  price: number; // Precio del producto
}

const Producto: React.FC<ProductoProps> = ({
  imageUrl,
  productName,
  description,
  price,
}) => {
  return (
    <div className="relative flex flex-row w-72 border rounded-lg shadow-md overflow-hidden" 
         style={{ 
           backgroundColor: "var(--color-background)", 
           borderColor: "var(--color-secondary)" 
         }}>
      {/* Imagen del producto (Parte izquierda) */}
      <div
        className="w-1/2 h-48 bg-cover bg-center"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: "var(--color-secondary)", // Fondo por defecto si no hay imagen
        }}
      ></div>

      {/* Contenido del producto (Parte derecha) */}
      <div className="flex flex-col justify-between p-4 w-1/2 text-center">
        {/* Título */}
        <h2 
          className="text-lg font-bold mb-2" 
          style={{ color: "var(--color-primary)" }}
        >
          {productName}
        </h2>

        {/* Descripción */}
        <p className="text-sm" style={{ color: "var(--color-tertiary)" }}>
          {description}
        </p>
        
        {/* Estrella con el precio */}
        <div
          className="absolute bottom-2 right-2 flex items-center justify-center w-12 h-12 text-sm font-bold rounded-full shadow-md"
          style={{
            backgroundColor: "var(--color-primary)",
            color: "var(--color-background)",
          }}
        >
          <FaStar className="mr-1" />
          ${price.toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default Producto;
