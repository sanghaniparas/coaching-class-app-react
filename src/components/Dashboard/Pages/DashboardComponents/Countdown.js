import React from 'react';
import moment from 'moment';

class Countdown extends React.Component {
	state = {
		days: undefined,
		hours: undefined,
		minutes: undefined,
		seconds: undefined
	}
	componentDidMount() {
		this.interval = setInterval(() => {
			const { validity, purchase_date } = this.props;

			var thendate = new Date(purchase_date);

			// add a day
			thendate.setDate(thendate.getDate() + Number(validity));

			const now = moment();
			const countdown = moment(thendate - now);

			const days = countdown.format('D');
			const hours = countdown.format('HH');
			const minutes = countdown.format('mm');
			const seconds = countdown.format('ss');

			this.setState({ days, hours, minutes, seconds });
		}, 1000);
	}

	componentWillUnmount() {
		if (this.interval) {
			clearInterval(this.interval);
		}
	}

	render() {
		const { days, hours, minutes, seconds } = this.state;

		if (!seconds) {
			return null;
		}

		return (
			<>
				{days && <>{days}<span>days</span></>}
				{hours && <>{hours}<span>hours</span></>}
				{minutes && <>{minutes}<span>mins</span></>}
				{seconds && <>{seconds}<span>secs</span></>}
			</>
		);
	}
}

export default Countdown;