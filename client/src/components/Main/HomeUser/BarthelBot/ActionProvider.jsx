import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {

  const handleBarthelAnswer = (answer) => {
    const barthelQuestions = [
      { question: "¿Cómo es su capacidad para comer?", options: ["Dependiente", "Necesita ayuda", "Independiente"] },
      { question: "¿Puede trasladarse entre la silla y la cama?", options: ["Incapaz", "Necesita gran ayuda", "Necesita mínima ayuda", "Independiente"] },
      // Añade el resto de las preguntas de la escala de Barthel aquí
    ];

    setState((prevState) => {
      const nextIndex = prevState.barthelIndex !== undefined ? prevState.barthelIndex + 1 : 0;
      const nextScore = prevState.barthelScore || 0;

      if (nextIndex < barthelQuestions.length) {
        const question = barthelQuestions[nextIndex];
        const message = createChatBotMessage(question.question, {
          widget: "barthelQuestion",
          payload: { options: question.options },
        });
        return {
          ...prevState,
          barthelIndex: nextIndex,
          barthelScore: nextScore,
          messages: [...prevState.messages, message],
        };
      } else {
        const finalMessage = createChatBotMessage(`Puntuación final en la escala de Barthel: ${nextScore}`);
        return {
          ...prevState,
          barthelIndex: nextIndex,
          messages: [...prevState.messages, finalMessage],
        };
      }
    });
  };

  const handleDefault = () => {
    const message = createChatBotMessage("No entiendo. ¿Podemos empezar con la escala de Barthel?", {
      widget: "barthelQuestion",
      payload: { options: ["Sí", "No"] },
    });
    setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
  
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {},
        });
      })}
    </div>
  );
};

export default ActionProvider;