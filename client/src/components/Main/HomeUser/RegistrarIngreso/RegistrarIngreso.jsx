import React, { useState, useContext } from 'react';
import axios from 'axios';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import { ConfirmationMessage } from '../../../../context/ConfirmationMessage';
import { SetIsSubmitting } from '../../../../context/SetIsSubmitting';


const RegistrarIngreso = ({ onClose }) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { confirmationMessage, setConfirmationMessage } = useContext(ConfirmationMessage);
  const { isSubmitting, setIsSubmitting } = useContext(SetIsSubmitting);

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
      console.log(error);
      if (error.response && error.response.data.message) {
        setConfirmationMessage(`Error: ${error.response.data.message}`);
        setTimeout(() => {
          setConfirmationMessage('');
        }, 3000);
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
            <input type="number" {...register('medico_id', { required: 'ID Médico es necesario', min: { value: 1, message: 'El ID mínimo es de 1' }, maxLength: { value: 7, message: 'El ID no puede tener más de 10 cifras' } })} placeholder="ID Médico" />
            {errors.medico_id && <p>{errors.medico_id.message}</p>}

            <input type="number" {...register('historia_clinica', { required: 'Historia Clínica es necesaria', min: { value: 1, message: 'La historia clínica mínima es de 1' }, maxLength: { value: 7, message: 'La historia clínica no puede tener más de 10 cifras' } })} placeholder="Historia Clínica" />
            {errors.historia_clinica && <p>{errors.historia_clinica.message}</p>}

            <input type="text" {...register('nombre_paciente', {
              required: 'El nombre es necesario', pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                , message: 'El nombre solo admite letras'
              }, minLength: { value: 2, message: 'Nombre debe tener más de dos caracteres' }, maxLength: { value: 50, message: 'El nombre no puede tener más de 50 caracteres' }
            })} placeholder="Nombre paciente" />
            {errors.nombre_paciente && <p>{errors.nombre_paciente.message}</p>}

            <input type="text" {...register('apellido_paciente', {
              required: 'El apellido es necesario', pattern: {
                value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ\s'-]+$/i
                , message: 'El apellido solo admite letras'
              }, minLength: { value: 3, message: 'El apellido debe tener más de 3 caracteres' }, maxLength: { value: 50, message: 'El apellido no puede tener más de 50 caracteres' }
            })} placeholder="Apellido paciente" />
            {errors.apellido_paciente && <p>{errors.apellido_paciente.message}</p>}

            <select {...register('sexo', { required: 'El campo sexo es obligatorio' })}>
              <option value="">--Selecciona--</option>
              <option value="Hombre">Hombre</option>
              <option value="Mujer">Mujer</option>
            </select>
            {errors.sexo && <p>{errors.sexo.message}</p>}

            <input type="number" {...register('edad_paciente', { required: 'La edad es necesaria', minLength: { value: 2, message: 'La edad debe tener al menos 2 números' }, maxLength: { value: 3, message: 'La edad debe tener como máximo 3 números' }, max: { value: 130, message: 'La edad no puede superar los 130' } })} placeholder="Edad paciente" />
            {errors.edad_paciente && <p>{errors.edad_paciente.message}</p>}

            <input type="date" {...register('fecha_ingreso', { required: 'Fecha Ingreso es necesaria' })} placeholder="Fecha de Ingreso" />
            {errors.fecha_ingreso && <p>{errors.fecha_ingreso.message}</p>}

            <input type="date" {...register('fecha_alta', { required: 'Fecha Alta es necesaria' })} placeholder="Fecha de Alta" />
            {errors.fecha_alta && <p>{errors.fecha_alta.message}</p>}

            <select {...register('diagnostico_principal', { required: 'Diagnóstico es necesario' })}>
              <option value="">--Selecciona--</option>
              <option value="ITU">ITU</option>
              <option value="Neumonia">Neumonia</option>
              <option value="ICC">ICC</option>
              <option value="Infeccion intraabd.">Infeccion intraabd.</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.diagnostico_principal && <p>{errors.diagnostico_principal.message}</p>}

            {fecha_alta && fecha_ingreso && fecha_ingreso > fecha_alta && <p>La fecha de ingreso no puede ser posterior a la de alta.</p>}

            <input type="number" {...register('barthel_basal', { required: 'Barthel Ingreso es necesario', min: { value: 0, message: 'El Barthel mínimo es de 0' }, max: { value: 100, message: 'El Barthel máximo es de 100' } })} placeholder="Barthel Ingreso" />
            {errors.barthel_basal && <p>{errors.barthel_basal.message}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar'}</button>
          </form>
        )}
      </div>
    </section>
  );
};

export default RegistrarIngreso;
