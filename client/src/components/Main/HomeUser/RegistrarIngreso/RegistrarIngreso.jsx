import React, { useState } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';


const RegistrarIngreso = ({ onClose }) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setConfirmationMessage('');
    try {
      const response = await axios.post('https://data-geri.onrender.com/api/ingresos', data);
      setConfirmationMessage('Ingreso creado');
      setTimeout(() => {
        setIsSubmitting(false);
        setConfirmationMessage('');
        onClose();
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data.error) {
        setConfirmationMessage(`Error: ${error.response.data.error}`);
      } else {
        setConfirmationMessage('Error al registrar el ingreso.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const fecha_alta = watch("fecha_alta");
  const fecha_ingreso = watch("fecha_ingreso");

  return (
    <section className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}> <FaTimes /> </span>
        <h2>Registrar ingreso</h2>
        {confirmationMessage ? (confirmationMessage && (
          <div className="confirmation">
            {confirmationMessage === 'Ingreso creado' ? (
              <FaCheckCircle color="green" size={24} />
            ) : (
              <FaExclamationCircle color="red" size={24} />
            )}
            <p>{confirmationMessage}</p>
          </div>
        )) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="number" {...register('medico_id', { required: 'ID Médico es requerido' })} placeholder="ID Médico" />
            {errors.medico_id && <p>{errors.medico_id.message}</p>}
            <input type="number" {...register('historia_clinica', { required: 'Historia Clínica es requerida' })} placeholder="Historia Clínica" />
            {errors.historia_clinica && <p>{errors.historia_clinica.message}</p>}
            <input type="text" {...register('nombre_paciente', { required: 'Nombre paciente es requerido', minLegth: 2, maxLength: 50 })} placeholder="Nombre paciente" />
            {errors.nombre_paciente && <p>{errors.nombre_paciente.message}</p>}
            <input type="text" {...register('apellido_paciente', { required: 'Apellido paciente es requerido', minLegth: 3, maxLength: 50 })} placeholder="Apellido paciente" />
            {errors.apellido_paciente && <p>{errors.apellido_paciente.message}</p>}
            <select {...register('sexo', { required: 'Sexo es requerido' })}>
              <option value="">--Selecciona--</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
            {errors.sexo && <p>{errors.sexo.message}</p>}
            <input type="number" {...register('edad_paciente', { required: 'Edad paciente es requerida', minLegth: 2, maxLength: 3, max:150 })} placeholder="Edad paciente" />
            {errors.edad_paciente && <p>{errors.edad_paciente.message}</p>}
            <input type="date" {...register('fecha_ingreso', { required: 'Fecha de Ingreso es requerida' })} placeholder="Fecha de Ingreso" />
            {errors.fecha_ingreso && <p>{errors.fecha_ingreso.message}</p>}
            <input type="date" {...register('fecha_alta', { required: 'Fecha de Alta es requerida' })} placeholder="Fecha de Alta" />
            {errors.fecha_alta && <p>{errors.fecha_alta.message}</p>}
            <select {...register('diagnostico_principal', { required: 'Diagnóstico Principal es requerido' })}>
              <option value="">--Selecciona--</option>
              <option value="ITU">ITU</option>
              <option value="Neumonia">Neumonia</option>
              <option value="ICC">ICC</option>
              <option value="Infeccion intraabd.">Infeccion intraabd.</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.diagnostico_principal && <p>{errors.diagnostico_principal.message}</p>}
            {fecha_alta && fecha_ingreso && fecha_ingreso > fecha_alta && <p>La fecha de ingreso no puede ser posterior a la de alta.</p>}

            <input type="number" {...register('barthel_basal', { required: 'Barthel Ingreso es requerido' })} placeholder="Barthel Ingreso" />
            {errors.barthel_basal && <p>{errors.barthel_basal.message}</p>}
            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar'}</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrarIngreso;
