import "@styles/index.css"
import { RouterProvider } from 'react-router-dom';
import { router } from '@router/routes'; // Importa el router centralizado
import { AuthProvider } from './contexts/AuthContext'; // Proveedor de contexto para autenticación

function App() {
  return (
    <AuthProvider> 
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;