import { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Footer from './components/Footer';
import Main from './components/Main';
import { MensajeError } from '../src/context/MensajeError';
import { ConfirmationMessage } from './context/ConfirmationMessage';
import { SetIsSubmitting } from './context/SetIsSubmitting';


const App = () => {

  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const errorData = { error, setError };
  const confirmationMessageData = { confirmationMessage, setConfirmationMessage };
  const setIsSubmittingData = { isSubmitting, setIsSubmitting };

  return (
    <>
      <BrowserRouter>
        <MensajeError.Provider value={errorData}>
          <ConfirmationMessage.Provider value={confirmationMessageData}>
            <SetIsSubmitting.Provider value={setIsSubmittingData}>
              <Main />
            </SetIsSubmitting.Provider>
          </ConfirmationMessage.Provider>
        </MensajeError.Provider>
      </BrowserRouter>
      <Footer />
    </>
  )
}

export default App;