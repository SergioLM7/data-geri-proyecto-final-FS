import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [createChatBotMessage(`¡Hola! Te voy a ayudar a evaluar la escala Barthel de tus pacientes.`)],
  botName: "Barthel Bot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#376B7E",
    },
  },
  
};

export default config;