import { useState } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header />
      <Main/>
      <Footer />
    </>
  )
}

export default App
