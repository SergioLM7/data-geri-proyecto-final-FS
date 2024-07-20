import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ConfirmationMessage } from '../../../context/ConfirmationMessage';
import { SetIsSubmitting } from '../../../context/SetIsSubmitting';
import Header from '../../Header/Header';

const RegisterUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { confirmationMessage, setConfirmationMessage } = useContext(ConfirmationMessage);
  const { isSubmitting, setIsSubmitting } = useContext(SetIsSubmitting);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://data-geri.onrender.com/api/medicos', data);
      console.log(response);
      setConfirmationMessage('Médico/Usuario creado');
      setTimeout(() => {
        setIsSubmitting(false);
        setConfirmationMessage('');
        navigate('/');
      }, 3000);
    } catch (error) {
      console.log(error)
      if (error.response && error.response.data.message) {
        setConfirmationMessage(`Error: ${error.response.data.message}`);
      } else {
        setConfirmationMessage('Error al registrar el usuario.');
      }
    } finally {
      setTimeout(() => {
        setIsSubmitting(false);
        setConfirmationMessage('');
      }, 3000);
    }
  };

  return (
    <>
      <Header />
      <section className='register-medico'>
        <h2>Registrar nuevo Médico</h2>
        {confirmationMessage && (
          <div className="confirmation">
            {confirmationMessage === 'Médico/Usuario creado' ? (
              <FaCheckCircle color="green" size={24} />
            ) : (
              <FaExclamationCircle color="red" size={24} />
            )}
            <p>{confirmationMessage}</p>
          </div>
        )}
        {!confirmationMessage && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register('nombre_medico', { required: 'Nombre es requerido', pattern: {value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ]+$/i, message: 'El nombre solo admite letras'}, minLength: {value:2, message: 'El nombre debe tener más de 2 letras'}, maxLength: {value: 70, message: 'El nombre debe tener menos de 70 caracteres'}  })} placeholder="Nombre" />
            {errors.nombre_medico && <p>{errors.nombre_medico.message}</p>}

            <input type="text" {...register('apellido_medico', { required: 'Apellido es requerido', pattern: {value: /^[A-Za-zÁÉÍÓÚáéíóúÀÈÌÒÙàèìòùÂÊÎÔÛâêîôûÄËÏÖÜäëïöüÿÇçÑñ]+$/i, message: 'El apellido solo admite letras'}, minLength: {value:3, message: 'El apellido debe tener más de 3 letras'}, maxLength: {value: 70, message: 'El apellido debe tener menos de 70 caracteres'} })} placeholder="Apellido" />
            {errors.apellido_medico && <p>{errors.apellido_medico.message}</p>}

            <input type="email" {...register('email', { required: 'Email es requerido', pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'El email introducido no tiene el formato necesario'} })} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}

            <input type="password" {...register('password_hash', { required: 'Contraseña es requerida', pattern: {value: /^(?=.*[A-Z])(?=.*\d)\w{4,19}$/i, message: 'La contraseña debe tener letras y números, más de 3 caracteres y menos de 20'} })} placeholder="Contraseña" />
            {errors.password_hash && <p>{errors.password_hash.message}</p>}

            <input type="number" {...register('id_colegiado', { required: 'ID Colegiado es requerido', minLength: {value: 3, message: 'El ID debe tener, al menos, 3 cifras'}, maxLength: {value: 20, message: 'El ID debe tener, máximo, 20 cifras'}, min: {value: 1, message: 'El ID no puede ser menor que 1'} })} placeholder="ID Colegiado" />
            {errors.id_colegiado && <p>{errors.id_colegiado.message}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar médico'}</button>
          </form>
        )}
      </section>
    </>
  );
};

export default RegisterUser;
