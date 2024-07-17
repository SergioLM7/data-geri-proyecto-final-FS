import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main';
import { MensajeError } from '../src/context/MensajeError';


const App = () => {

  const [error, setError] = useState(''); //Para guardar el error

  const updateError = (newError) => {
    setError(newError);
  };
  const errorData = { error, updateError };

  return (
    <>
      <BrowserRouter>
        <MensajeError.Provider value={errorData}>
          <Main />
        </MensajeError.Provider>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
