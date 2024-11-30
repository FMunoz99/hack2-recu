import { useNavigate } from 'react-router-dom'; // Asegúrate de importar useNavigate
import { FaExclamationTriangle } from 'react-icons/fa'; // Asegúrate de importar el ícono

const ErrorRole = () => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Regresa a la página anterior
    };

    return (
        <main className='flex flex-col items-center justify-center h-screen bg-gray-100'>
            <div className='bg-white p-10 rounded-lg shadow-lg text-center'>
                <div className='flex justify-center'>
                    <FaExclamationTriangle size={50} className='text-red-500 mb-4' />
                </div>
                <h1 id='notFound' className='text-3xl font-bold mb-4'>403</h1>
                <h2 className='text-3xl font-bold mb-4'>Acceso Denegado</h2>
                <span className='text-gray-600 mb-6'>No estás autorizado para acceder a esta página.</span>
                <br />
                <button
                    id='historyBack'
                    onClick={handleBack}
                    className='bg-primary text-white font-bold py-2 px-4 my-5 rounded-full hover:bg-primary-dark'
                >
                    Volver
                </button>
            </div>
        </main>
    );
};

export default ErrorRole; // Asegúrate de exportar el componente al final
