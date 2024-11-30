interface ButtonProps {
    onClick?: () => void; // La función que se ejecutará cuando se haga clic en el botón
    message: string;      // El texto a mostrar en el botón
  }
  
  export default function Button2({ onClick, message }: ButtonProps) {
    // Define el estilo básico del botón sin depender de la ruta actual
    const buttonStyle = "bg-gray-200 text-primary font-bold";  // Fondo gris claro y texto de color primario por defecto
    
    return (
      <button
        className={`${buttonStyle} mx-6 py-2 px-4 rounded-full cursor-pointer hover:bg-primary hover:text-white transition-all`}  // Al pasar el mouse cambia el fondo a 'bg-primary' y el texto a blanco
        onClick={onClick}  // Se llama a la función onClick pasada como prop
      >
        {message}
      </button>
    );
  }
  