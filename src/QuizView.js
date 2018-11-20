import React, { Component } from 'react';
import { Button, Container, Divider, Grid, Header, Progress, Radio, Segment } from 'semantic-ui-react';
import './QuizView.css';

export default class QuizView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuestion: this.props.question,
			currentAnswer: '',
			enableSubmit: false,
			questionNum: 0,
			percent: 20
		}
	}

	componentWillReceiveProps(nextProps) {
		if(nextProps.question) {
			this.setState({ currentQuestion: nextProps.question});
		}
	}

	handleChange = (event, { value }) => {
		this.setState({ currentAnswer: value });
		if(this.state.questionNum === 4) {
			this.setState({ enableSubmit: true });
		}
	}

	goToNextQuestion = () => {
		this.setState(prevState => ({
			questionNum: prevState.questionNum+1,
			percent: prevState.percent >= 100 ? 0 : prevState.percent + 20
		}), () => {
			this.props.nextQuestion(this.state.currentAnswer, this.state.questionNum)
			this.setState({ currentAnswer: '' });
			if(this.state.questionNum === 5) {
				this.setState({ enableSubmit: false });
			}
		});
	}

	enableNext = () => {
		if(this.state.questionNum === 4) {
			return false;
		} else {
			if(this.state.currentAnswer.length === 0) {
				return false;
			} else {
				return true;
			}
		}
	}

	render() {
		let { question, answers, answer } = this.state.currentQuestion;
		let { currentAnswer, enableSubmit, questionNum, percent } = this.state;
		return(
			<div className='quiz-view'>
				<Container fluid>
					<Grid>
						<Grid.Row>
							<Grid.Column mobile={7} tablet={16} computer={16}>
								<Segment>
										
									<Grid>
										<Grid.Row>
											<Grid.Column>
												<Progress percent={percent} indicating/>
												<Header as='h2'>{question}</Header>
											</Grid.Column>
										</Grid.Row>
									</Grid>

									<Grid columns={2}>
										<Grid.Row>
											<Grid.Column mobile={8} tablet={8} computer={8}>
												<Radio
													label={answers.a}
													checked={currentAnswer === 'a'}
													onChange={this.handleChange}
													value='a'
												/>
											</Grid.Column>
											<Grid.Column mobile={8} tablet={8} computer={8}>
												<Radio
													label={answers.b}
													checked={currentAnswer === 'b'}
													onChange={this.handleChange}
													value='b'
												/>
											</Grid.Column>
										</Grid.Row>

										<Grid.Row>
											<Grid.Column mobile={8} tablet={8} computer={8}>
												<Radio
													label={answers.c}
													checked={currentAnswer === 'c'}
													onChange={this.handleChange}
													value='c'
												/>
											</Grid.Column>
											<Grid.Column mobile={8} tablet={8} computer={8}>
												<Radio
													label={answers.d}
													checked={currentAnswer === 'd'}
													onChange={this.handleChange}
													value='d'
												/>
											</Grid.Column>
										</Grid.Row>
									</Grid>

									<Divider horizontal hidden />
									
									<Button
										disabled={!this.enableNext()}
										onClick={this.goToNextQuestion}
										primary
									>
										Next
									</Button>
									<Button
										disabled={!enableSubmit}
										onClick={this.goToNextQuestion}
										color='green'
									>
										Submit
									</Button>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		);
	}

}
