import React, { useState } from 'react';

const barthelQuestions = [
  {
    question: "Comer",
    options: [
      { text: "Incapaz", score: 0 },
      { text: "Necesita ayuda para cortar, extender mantequilla, usar condimentos, etc.", score: 5 },
      { text: "Independiente (la comida está al alcance de la mano)", score: 10 }
    ]
  },
  {
    question: "Trasladarse entre la silla y la cama",
    options: [
      { text: "Incapaz, no se mantiene sentado", score: 0 },
      { text: "Necesita ayuda importante (una persona entrenada o dos personas), puede estar sentado", score: 5 },
      { text: "Necesita algo de ayuda (una pequeña ayuda física o ayuda verbal)", score: 10 },
      { text: "Independiente", score: 15 }
    ]
  },
  {
    question: "Aseo personal",
    options: [
      { text: "Necesita ayuda con el aseo personal", score: 0 },
      { text: "Independiente para lavarse la cara, las manos y los dientes, peinarse (y afeitarse)", score: 5 },
    ]
  },
  {
    question: "Uso del retrete",
    options: [
      { text: "Dependiente", score: 0 },
      { text: "Necesita alguna ayuda, pero puede hacer algo solo", score: 5 },
      { text: "Independiente (entrar y salir, limpiarse y vestirse)", score: 10 },
    ]
  },
  {
    question: "Bañarse o ducharse",
    options: [
      { text: "Dependiente", score: 0 },
      { text: "Independiente para bañarse o ducharse", score: 5 }
    ]
  },
  {
    question: "Desplazarse",
    options: [
      { text: "Inmóvil", score: 0 },
      { text: "Independiente en silla de ruedas en 50 metros", score: 5 },
      { text: "Anda con pequeña ayuda de una persona (física o verbal)", score: 10 },
      { text: "Independiente al menos 50 metros, con cualquier tipo de muleta, excepto andador", score: 15 }
    ]
  },
  {
    question: "Subir y bajar escaleras",
    options: [
      { text: "Incapaz", score: 0 },
      { text: "Necesita ayuda física o verbal puede llevar cualquier tipo de muleta", score: 5 },
      { text: "Independiente para subir y bajar", score: 10 }
    ]
  },
  {
    question: "Vestirse y desvestirse",
    options: [
      { text: "Dependiente", score: 0 },
      { text: "Necesita ayuda, pero puede hacer la mitad, aproximadamente, sin ayuda", score: 5 },
      { text: "Independiente, incluyendo botones, cremalleras, cordones, etc.", score: 10 }
    ]
  },
  {
    question: "Control de heces",
    options: [
      { text: "Incontinente (o necesita que le suministren enema)", score: 0 },
      { text: "Accidente excepcional (uno/semana)", score: 5 },
      { text: "Continente", score: 10 }
    ]
  },
  {
    question: "Control de orina",
    options: [
      { text: "Incontinente, o sondado incapaz de cambiarse la bolsa", score: 0 },
      { text: "Accidente excepcional (máximo uno/24 horas)", score: 5 },
      { text: "Continente, durante al menos 7 días", score: 10 }
    ]
  },
];

const BarthelBot =() => {
  const [messages, setMessages] = useState([{ text: "Hola, vamos a evaluar el índice de Barthel. ¿Estás list@?", isbot: true }]);
  const [currentQuestion, setCurrentQuestion] = useState(-1);
  const [score, setScore] = useState(0);
  const [testCompleted, setTestCompleted] = useState(false);

  const startTest = () => {
    setCurrentQuestion(0);
    setMessages([{ text: barthelQuestions[0].question, isbot: true }]);
  };

  const handleOptionClick = (optionScore) => {
    setScore(score + optionScore);

    if (currentQuestion < barthelQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setMessages([{ text: barthelQuestions[currentQuestion + 1].question, isbot: true }]);
    } else {
      setCurrentQuestion(-1);
      setTimeout(()=> {
        setMessages([{ text: `¡Evaluación completa! Puntuación total del índice de Barthel: ${score + optionScore}`, isbot: true }]);
      }, 500);
      setTestCompleted(true);
    }
  };

  const resetTest = () => {
    setMessages([{ text: "Hola, vamos a evaluar la escala de Barthel. ¿Estás listo?", isbot: true }]);
    setCurrentQuestion(-1);
    setScore(0);
    setTestCompleted(false);
  };

  return (
    <article className='bot-container'>
      {messages.map((message, index) => (
         <div key={index} className={`message ${message.isbot ? 'bot-message' : 'user-message'}`}>
         {message.text}
       </div>
      ))}
       {currentQuestion === -1 && !testCompleted && (
        <button className="option-button" onClick={startTest}>Comenzar</button>
      )}
      {currentQuestion >= 0 && currentQuestion < barthelQuestions.length && (
        <div>
          {barthelQuestions[currentQuestion].options.map((option, index) => (
            <button key={index} className="option-button" onClick={() => handleOptionClick(option.score)}>
              {option.text}
            </button>
          ))}
        </div>
      )}
      {testCompleted && (
        <button className="option-button" onClick={resetTest}>Reiniciar</button>
      )}
    </article>
  );
}

export default BarthelBot;