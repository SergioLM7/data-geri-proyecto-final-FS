import React from "react";
import Header from '../../Header/Header';
import Nav from '../../Nav/Nav';

const Home = () => {
  return <section>
    <Header />
    <Nav />
    <h1>Esta es la home del usuario logueado</h1>
  </section>;
};

export default Home;
