import React, { Component } from 'react';
import QuizView from './QuizView';
import Chart from './Chart';

export default class QuizArena extends Component {
	constructor(props) {
		super(props);
		this.state = {
			questions: this.props.questions,
			currentQuestion: this.props.questions[0],
			completed: false,
			correct: 0
		}
	}

	sendNextQuestion = (selectedAnswer, questionNum) => {
		let currentQuestion = questionNum-1;
		let questions = this.state.questions;
		questions[currentQuestion].selectedAnswer = selectedAnswer;
		this.setState({ questions: questions});
		if(currentQuestion < 4) {
			this.setState({
				currentQuestion: this.props.questions[currentQuestion+1]
			});
		} else if(currentQuestion === 4) {
			let correct = 0, wrong = 0;
			questions.map(question => {
				question.answer === question.selectedAnswer ?	correct++ :	wrong++;
			});
			this.setState({ correct: correct, completed: true });
		}
	}

	render() {
		let { currentQuestion, completed, correct } = this.state;
		if(!completed) {
			return (
				<QuizView
					question={this.state.currentQuestion}
					nextQuestion={this.sendNextQuestion}
					handleSubmit={this.handleSubmit}
				/>
			);
		} else {
			return (
				<Chart data={correct} />
			);
		}
	}
}
