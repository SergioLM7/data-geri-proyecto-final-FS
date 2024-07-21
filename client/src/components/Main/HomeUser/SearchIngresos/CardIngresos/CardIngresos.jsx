import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faFolderClosed, faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const CardIngresos = ({
  ingreso_id,
  medico_id,
  historia_clinica,
  nombre_paciente,
  apellido_paciente,
  sexo,
  edad_paciente,
  fecha_ingreso,
  fecha_alta,
  duracion_ingreso,
  diagnostico_principal,
  barthel_basal,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFields, setEditFields] = useState({
    ingreso_id,
    medico_id,
    historia_clinica,
    nombre_paciente,
    apellido_paciente,
    sexo,
    edad_paciente,
    fecha_ingreso,
    fecha_alta,
    duracion_ingreso,
    diagnostico_principal,
    barthel_basal,
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
      ingreso_id,
      medico_id,
      historia_clinica,
      nombre_paciente,
      apellido_paciente,
      sexo,
      edad_paciente,
      fecha_ingreso,
      fecha_alta,
      duracion_ingreso,
      diagnostico_principal,
      barthel_basal,
    });
  };

  const handleSave = async () => {
    const updatedFields = {
      ...editFields,
      medico_id: parseInt(editFields.medico_id, 10),
      historia_clinica: parseInt(editFields.historia_clinica, 10),
      edad_paciente: parseInt(editFields.edad_paciente, 10),
      duracion_ingreso: parseInt(editFields.duracion_ingreso, 10),
      barthel_basal: parseInt(editFields.barthel_basal, 10)
    };
    try {
      const response = await axios.put(`https://data-geri.onrender.com/api/ingresos`, {
        ingreso_id,
        fieldsToUpdate: updatedFields
      });
      setIsEditing(false);
      onEdit(updatedFields);
    } catch (error) {
      console.error('Error al actualizar el ingreso', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`https://data-geri.onrender.com/api/ingresos/${ingreso_id}`);
      onDelete(ingreso_id);
    } catch (error) {
      console.error('Error al eliminar el ingreso', error);
    }
  };

  return (
    <tr>
      {isEditing ? (
        <>
          <td>{ingreso_id}</td>
          <td><input type="number" name="medico_id" value={editFields.medico_id} onChange={handleInputChange} /></td>
          <td><input type="number" name="historia_clinica" value={editFields.historia_clinica} onChange={handleInputChange} /></td>
          <td><input type="text" name="nombre_paciente" value={editFields.nombre_paciente} onChange={handleInputChange} /></td>
          <td><input type="text" name="apellido_paciente" value={editFields.apellido_paciente} onChange={handleInputChange} /></td>
          <td><input type="text" name="sexo" value={editFields.sexo} onChange={handleInputChange} /></td>
          <td><input type="number" name="edad_paciente" value={editFields.edad_paciente} onChange={handleInputChange} /></td>
          <td><input type="text" name="fecha_ingreso" value={editFields.fecha_ingreso} onChange={handleInputChange} /></td>
          <td><input type="text" name="fecha_alta" value={editFields.fecha_alta} onChange={handleInputChange} /></td>
          <td><input type="number" name="duracion_ingreso" value={editFields.duracion_ingreso} onChange={handleInputChange} /></td>
          <td><input type="text" name="diagnostico_principal" value={editFields.diagnostico_principal} onChange={handleInputChange} /></td>
          <td><input type="number" name="barthel_basal" value={editFields.barthel_basal} onChange={handleInputChange} /></td>
          <td>
            <FontAwesomeIcon icon={faFolderClosed} onClick={handleSave} />
            <FontAwesomeIcon icon={faSquareXmark} onClick={handleCancel} />
          </td>
        </>
      ) : (
        <>
          <td>{ingreso_id}</td>
          <td>{medico_id}</td>
          <td>{historia_clinica}</td>
          <td>{nombre_paciente}</td>
          <td>{apellido_paciente}</td>
          <td>{sexo}</td>
          <td>{edad_paciente}</td>
          <td>{fecha_ingreso}</td>
          <td>{fecha_alta}</td>
          <td>{duracion_ingreso}</td>
          <td>{diagnostico_principal}</td>
          <td>{barthel_basal}</td>
          <td>
            <FontAwesomeIcon className="fas fa-edit" icon={faEdit} onClick={() => handleEdit()} />
            <FontAwesomeIcon className="fas fa-trash-alt" icon={faTrashAlt} onClick={() => handleDelete()} />
          </td>
        </>
      )}
    </tr>
  );
};

export default CardIngresos;