import React, { Component } from 'react';
import { quiz } from './quiz';
import QuizArena from './QuizArena';

class App extends Component {
	buildQuestions = () => {
		const noQuestions = 5;
		let questionNumArray = [];
		let questionsArray = [];
		while(questionNumArray.length < noQuestions) {
			let questionIndex = Math.floor(Math.random()*10)
			if(questionNumArray.indexOf(questionIndex) === -1) {
				questionNumArray.push(questionIndex);
				questionsArray.push(quiz[questionIndex]);
			}
		}
		return questionsArray;
	}

	render() {
		const questions = this.buildQuestions();
    return (
		<QuizArena questions={questions} />
    );
  }
}

export default App;
