import React, { useState } from "react";
import axios from "axios";

const CardIngresos = ({
  ingreso_id,
  medico,
  historia,
  nombre,
  apellido,
  sexo,
  edad,
  fecha_ingreso,
  fecha_alta,
  duracion_ingreso,
  diagnostico,
  barthel,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    medico,
    historia,
    nombre,
    apellido,
    sexo,
    edad,
    fecha_ingreso,
    fecha_alta,
    duracion_ingreso,
    diagnostico,
    barthel
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFields({ ...editFields, [name]: value });
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditFields({
      medico,
      historia,
      nombre,
      apellido,
      sexo,
      edad,
      fecha_ingreso,
      fecha_alta,
      duracion_ingreso,
      diagnostico,
      barthel
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`https://data-geri.onrender.com/api/ingresos`, {
        ingreso_id,
        fieldsToUpdate: editFields
      });
      setIsEditing(false);
      onEdit(ingreso_id, editFields); // Actualiza la lista en el componente padre
    } catch (error) {
      console.error('Error al actualizar el ingreso', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://data-geri.onrender.com/api/ingresos`, {
        body: { ingreso_id }
      });
      onDelete(ingreso_id); // Elimina el ingreso de la lista en el componente padre
    } catch (error) {
      console.error('Error al eliminar el ingreso', error);
    }
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>{ingreso_id}</td>
          <td><input name="medico" value={editFields.medico} onChange={handleInputChange} /></td>
          <td><input name="historia" value={editFields.historia} onChange={handleInputChange} /></td>
          <td><input name="nombre" value={editFields.nombre} onChange={handleInputChange} /></td>
          <td><input name="apellido" value={editFields.apellido} onChange={handleInputChange} /></td>
          <td><input name="sexo" value={editFields.sexo} onChange={handleInputChange} /></td>
          <td><input name="edad" value={editFields.edad} onChange={handleInputChange} /></td>
          <td><input name="fecha_ingreso" value={editFields.fecha_ingreso} onChange={handleInputChange} /></td>
          <td><input name="fecha_alta" value={editFields.fecha_alta} onChange={handleInputChange} /></td>
          <td><input name="duracion_ingreso" value={editFields.duracion_ingreso} onChange={handleInputChange} /></td>
          <td><input name="diagnostico" value={editFields.diagnostico} onChange={handleInputChange} /></td>
          <td><input name="barthel" value={editFields.barthel} onChange={handleInputChange} /></td>
          <td>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={handleCancel}>Cancelar</button>
          </td>
        </>
      ) : (
        <>
          <td>{ingreso_id}</td>
          <td>{medico}</td>
          <td>{historia}</td>
          <td>{nombre}</td>
          <td>{apellido}</td>
          <td>{sexo}</td>
          <td>{edad}</td>
          <td>{fecha_ingreso}</td>
          <td>{fecha_alta}</td>
          <td>{duracion_ingreso}</td>
          <td>{diagnostico}</td>
          <td>{barthel}</td>
          <td>
            <button onClick={handleEdit}>Editar</button>
            <button onClick={handleDelete}>Eliminar</button>
          </td>
        </>
      )}
    </tr>
  );
};

export default CardIngresos;