import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <Main />
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
