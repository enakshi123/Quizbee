// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
import React,{Component} from "react";
import  ReactDOM from "react-dom";
import "./assests/style.css";
import quizService from "./quizService";
import QuestionBox from "./components/QuestionBox";
import Result from "./components/Result";

class Quizbee extends Component{
  state ={ //instantiating local state with array as questionbank(state var in root component as state should be nearest to the parent)
    questionBank:[ ],//random 5 questions stored once we pull them in from api
    score:0,
    responses:0 //no of  ques answered
  };
  getQuestions = () =>{ //invokes quizeservice api and populate the question bank  state variables with results
quizService().then(question =>{
  this.setState({
    questionBank:question
  });
});
  };
  computeAnswer= (answer,correctAnswer)=>{ //user if user's response matches the actual correct ans so increment the score count
if(answer===correctAnswer)
{
this.setState({
  score:this.state.score + 1
});
}
this.setState({ //inall cases to keep a track of responses
  responses:this.state.responses < 5 ? this.state.responses + 1:5
  //value of respnses not beyond 5 as we have 5 questions 

})
  };
  playAgain =() =>{
    this.getQuestions(); //invoke new set of questions
    this.setState({
      score:0,
      responses:0
    });
  }

  componentDidMount(){ //to run functions when component loads
    this.getQuestions();
  }
  render(){
    return(
      <div className="container">
      <div className="title">Quizbee</div>
      {this.state.questionBank.length > 0 && 
      this.state.responses < 5 && 
      this.state.questionBank.map(
        ({question,answers,correct,questionId}) =>(
        <QuestionBox 
        question={question} 
        options={answers} 
        key={questionId} 
        selected={answer=> this.computeAnswer(answer,correct)}
        />
          
        )
          )}
          {this.state.responses === 5 ?(
            <Result score={this.state.score} playAgain={this.playAgain} />
            ):null}
          </div>
         
      
    ); //jsx template that will render on page
    //selected prop will run a function called compute ans which will get user response and actual correct ans

  }
}
ReactDOM.render(<Quizbee />,document.getElementById("root"));
