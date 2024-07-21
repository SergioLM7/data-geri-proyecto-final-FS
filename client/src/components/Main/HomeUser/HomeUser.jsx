import React, { useState } from "react";
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import SearchIngresos from "./SearchIngresos/SearchIngresos";
import RegistrarIngreso from './RegistrarIngreso/RegistrarIngreso';
import BarthelBot from '../BarthelBot/BarthelBot';


const Home = ({ handleLogout }) => {

  const [ModalOpen, setModalOpen] = useState(false);
  const [showBot, setShowBot] = useState(false);


  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return <>
    <Header />
    <NavUser handleLogout={handleLogout} />
    <h2>Gestiona los ingresos</h2>
    <section className="home-user">
      <SearchIngresos />
      <button onClick={openModal}>Registrar Ingreso</button>
      {ModalOpen && <RegistrarIngreso onClose={closeModal} />}
    </section>
    <section className="chatbot-section">
      <button onClick={() => setShowBot(!showBot)}>
        {showBot ? 'Cerrar' : 'Abrir'} Evaluación de Barthel
      </button>
      {showBot && <BarthelBot />}
    </section>
  </>
};

export default Home;
