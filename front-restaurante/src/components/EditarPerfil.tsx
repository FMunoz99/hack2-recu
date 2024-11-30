import React from "react";
import Button2 from "@components/Button2"; // Asegúrate de importar correctamente

interface PatchUsuario {
  firstName: string;
  lastName: string;
  phone: string;
  password: string;
}

interface EditarPerfilProps {
  imageUrl: string;
  mensajeUno: string;
  mensajeDos: string;
  handleClick1: () => void;
  handleClick2: () => void;
  onUpdateUsuario: (data: PatchUsuario) => void; // Función para actualizar los datos en el padre
  initialData: PatchUsuario; // Valores iniciales del formulario
}

const EditarPerfil: React.FC<EditarPerfilProps> = ({
  imageUrl,
  mensajeUno,
  mensajeDos,
  handleClick1,
  handleClick2,
  onUpdateUsuario,
  initialData,
}) => {
  const [formData, setFormData] = React.useState<PatchUsuario>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onUpdateUsuario(formData);
    handleClick1();
  };

  return (
    <div className="container" style={{ display: "flex", flexDirection: "row" }}>
      {/* Sección Izquierda: Imagen */}
      <div className="container-image" style={{ flex: "1" }}>
        <img
          src={imageUrl}
          alt="Perfil"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </div>

      {/* Sección Derecha: Formulario */}
      <div className="container-content" style={{ flex: "1" }}>
        <h2 className="container-title">Editar Perfil</h2>
        <form style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="input-field"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="input-field"
          />
        </form>

        {/* Botones */}
        <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-evenly" }}>
          <Button2 onClick={handleSave} message={mensajeUno} />
          <Button2 onClick={handleClick2} message={mensajeDos} />
        </div>
      </div>
    </div>
  );
};

export default EditarPerfil;
