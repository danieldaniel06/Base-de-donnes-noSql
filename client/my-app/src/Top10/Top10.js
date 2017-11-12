import React from 'react';
import cssModule from 'react-css-modules';
import styles from './Top10.css';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class Top10 extends React.Component {
	static propTypes = {};

	constructor(props) {
		super(props);
		this.state = {
			startDate: moment(),
			endDate: moment()
		};
		this.handleStartDateChange = this.handleStartDateChange.bind(this);
		this.handleEndDateChange = this.handleEndDateChange.bind(this);
	}

	handleStartDateChange(date) {
		this.setState({
			startDate: date
		});
	}

	handleEndDateChange(date) {
		if (date < this.state.startDate) {
			this.setState({
				startDate: date
			});
		}
		this.setState({
			endDate: date
		});
	}

	render() {
		return (
			<div>
				<div className="col-md-6">
					<div className="col-md-6">
						<DatePicker
							selected={this.state.startDate}
							onChange={this.handleStartDateChange}
							placeholderText="Enter date debut"
						/>
					</div>
					<div className="col-md-6">
						<DatePicker
							selected={this.state.endDate}
							onChange={this.handleEndDateChange}
							placeholderText="Enter date fin"
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default cssModule(Top10, styles);
