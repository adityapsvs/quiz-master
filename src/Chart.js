import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import './QuizView.css'
import {
  PieChart,
  Pie,
	Sector,
  Cell,
  Label,
	Legend,
	Tooltip,
  ResponsiveContainer
} from 'recharts';
export default class Chart extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			correct: this.props.data
		}
	}

	render() {
		let { correct } = this.state;
		const data = [{name: 'Correct', value: correct}, {name: 'Wrong', value: 5-correct}];
		const COLORS = ["#0088FE", "#FF8042"];
		return(
			<div className='quiz-view'>
				<Container fluid>
					<Grid>
						<Grid.Row>
							<Grid.Column mobile={7} tablet={16} computer={16}>
								<Segment>
									<ResponsiveContainer width='100%' minHeight={400}>
										<PieChart>
											<Pie data={data} dataKey='value' innerRadius={20} outerRadius={100} fill='#ffffff' label labelLine={false}>
												{data.map((entry, index) => <Cell key={index} fill={COLORS[index % COLORS.length]}/>)}
												<Label value='Analysis' position='outside' />
											</Pie>
											<Legend verticalAlign='top' height={40} iconType='circle'/>
											<Tooltip animationEasing='ease' wrapperStyle={{background:'#393e44'}} labelStyle={{color: '#ff9801'}}/>
										</PieChart>
									</ResponsiveContainer>
								</Segment>
							</Grid.Column>
						</Grid.Row>
					</Grid>
				</Container>
			</div>
		);
	}

}
