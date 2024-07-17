import React from "react";
import Header from '../../Header/Header';
import NavUser from '../../NavUser/NavUser';
import SearchIngresos from "./SearchIngresos/SearchIngresos";

const Home = ({handleLogout}) => {
  return <section>
    <Header />
    <NavUser  handleLogout={handleLogout} />
    <h1>Esta es la home del usuario logueado</h1>
    <SearchIngresos />
  </section>;
};

export default Home;
