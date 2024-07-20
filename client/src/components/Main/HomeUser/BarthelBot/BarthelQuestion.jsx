import React from "react";

const BarthelQuestion = (props) => {
  const options = props.payload?.options || [];

  const optionsMarkup = options.map((option) => (
    <button
      key={option}
      onClick={() => props.actionProvider.handleBarthelAnswer(option)}
    >
      {option}
    </button>
  ));

  return <div className="options-container">{optionsMarkup}</div>;
};

export default BarthelQuestion;

