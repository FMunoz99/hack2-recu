import { useLocation, useNavigate } from "react-router-dom";
interface ButtonProps {
	to?: string;      // La ruta a la que se quiere navegar
	message: string; // El texto a mostrar en el botón
  }

  export default function Button({ to, message }: ButtonProps) {
	const location = useLocation();    // Obtiene la ubicación actual
	const navigate = useNavigate();    // Inicializa la función de navegación
  
	// Define el estilo del botón dependiendo de la ruta actual
	const buttonStyle =
	  location.pathname === to ? "bg-primary text-white font-bold" : "bg-secondary";
  
	  function handleClick() {
		if (to) { // Verificamos que 'to' esté definido
		  navigate(to);
		}
	  }

	return (
		<button
			className={`${buttonStyle} mx-6 py-2 px-4 rounded-full cursor-pointer`}
			onClick={handleClick}
		>
			{message}
		</button>
	);
}
