import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import axios from 'axios';
import { ConfirmationMessage } from '../../../context/ConfirmationMessage';
import { SetIsSubmitting } from '../../../context/SetIsSubmitting';
import Header from '../../Header/Header';

const RegisterUser = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { confirmationMessage, setConfirmationMessage } = useContext(ConfirmationMessage);
  const { isSubmitting, setIsSubmitting } = useContext(SetIsSubmitting);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post('https://data-geri.onrender.com/api/medicos', data);
      setConfirmationMessage('Médico/Usuario creado');
    } catch (error) {
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
            <input type="text" {...register('nombre_medico', { required: 'Nombre es requerido', pattern: /^[A-Za-z]+$/i, minLength: 2, maxLength: 70 })} placeholder="Nombre" />
            {errors.nombre_medico && <p>{errors.nombre_medico.message}</p>}
            {errors?.nombre_medico?.type === "pattern" && (
              <p>Solo se aceptan caracteres alfabéticos</p>
            )}

            <input type="text" {...register('apellido_medico', { required: 'Apellido es requerido', pattern: /^[A-Za-z]+$/i, minLength: 2, maxLength: 70 })} placeholder="Apellido" />
            {errors.apellido_medico && <p>{errors.apellido_medico.message}</p>}
            {errors?.apellido_medico?.type === "pattern" && (
              <p>Solo se aceptan caracteres alfabéticos</p>
            )}

            <input type="email" {...register('email', { required: 'Email es requerido', pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i })} placeholder="Email" />
            {errors.email && <p>{errors.email.message}</p>}
            {errors?.email?.type === "pattern" && (
              <p>El email introducido no es válido</p>
            )}

            <input type="password" {...register('password_hash', { required: 'Contraseña es requerida', pattern: /^(?=.*[A-Z])(?=.*\d)\w{4,19}$/i })} placeholder="Contraseña" />
            {errors.password_hash && <p>{errors.password_hash.message}</p>}
            {errors?.password_hash?.type === "pattern" && (
              <p>La contraseña debe tener tanto letras como números, más de 3 caracteres y menos de 20.</p>
            )}

            <input type="number" {...register('id_colegiado', { required: 'ID Colegiado es requerido' })} placeholder="ID Colegiado" />
            {errors.id_colegiado && <p>{errors.id_colegiado.message}</p>}

            <button type="submit" disabled={isSubmitting}>{isSubmitting ? 'Registrando...' : 'Registrar médico'}</button>
          </form>
        )}
      </section>
    </>
  );
};

export default RegisterUser;
