import React from "react";
import Login from './Login/Login';
import Home from './Home/Home';
import Nav from '../Nav/Nav';
import { Routes, Route } from 'react-router-dom';


const Main = () => {
  return <main>
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/home" element={<Home />} />
  </Routes>
</main>
};

export default Main;
