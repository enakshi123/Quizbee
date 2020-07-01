//render the question text and set buttons for user to pick an answer
import React, {useState} from "react"; //hooks :useState 

const QuestionBox = ({question, options, selected}) => {
  const [answer, setAnswer] = useState(options); //state ,setAnswer to update the value
  return (
    <div className="questionBox">
      <div className="question">{question}</div>
      {answer.map((text, index) => (
        <button
          key={index} //from answer array
          className="answerBtn"
          onClick={() => {
            setAnswer([text]);
            //choosen answer
            selected(text);
          }}
        >
          {text}
        </button>
      ))}
    </div>
  );
};

export default QuestionBox;
