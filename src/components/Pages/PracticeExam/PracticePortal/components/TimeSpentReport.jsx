import React, { useState, useEffect } from 'react';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { Doughnut } from 'react-chartjs-2';
import {
  CheckCircle,
  CloseCircle,
  MinusCircle,
  TimerClock,
} from '../../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPracticeReport } from '../../../../../redux/practice/practice.selectors';

const TimeSpentReport = ({ practiceReport }) => {
  const [timeSpentState, setTimeSpentState] = useState({
    correctTime: 0,
    incorrectTime: 0,
    skipTime: 0,
  });
  const [time, setTime] = useState({
    totalTime: 0,
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });

  const dataTimeSpent = {
    labels: ['Incorrect', 'Correct', 'Skipped'],
    datasets: [
      {
        data: [
          timeSpentState.incorrectTime,
          timeSpentState.correctTime,
          timeSpentState.skipTime,
        ],
        backgroundColor: ['#e4556c', '#21c179', '#3a466b'],
        hoverBackgroundColor: ['#d11e0a', '#0ad11e', '#c9c4b3'],
      },
    ],
  };

  const options = {
    cutoutPercentage: 89,
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: true,
  };

  useEffect(() => {
    if (practiceReport !== null) {
      setTimeSpentState({
        correctTime: practiceReport.times.correctTime,
        incorrectTime: practiceReport.times.incorrectTime,
        skipTime: practiceReport.times.skipTime,
      });

      //   Getting all the seconds from backend
      let correctSecond = practiceReport.times.correctTime;
      let IncorrectSecond = practiceReport.times.incorrectTime;
      let skippedSecond = practiceReport.times.skipTime;
      let totalSecond = correctSecond + IncorrectSecond + skippedSecond;

      //   Creating duration
      let correctDuration = moment.duration(correctSecond, 'seconds');
      let incorrectDuration = moment.duration(IncorrectSecond, 'seconds');
      let skippedDuration = moment.duration(skippedSecond, 'seconds');
      let totalDuration = moment.duration(totalSecond, 'seconds');

      //   Finally formatting durations
      let correctFormatted = correctDuration.format('hh[h] mm[m] ss[s] ');
      let incorrectFormatted = incorrectDuration.format('hh[h] mm[m] ss[s] ');
      let skippedFormatted = skippedDuration.format('hh[h] mm[m] ss[s] ');
      let totalFormatted = totalDuration.format('hh[h] mm[m] ss[s] ');

      setTime({
        correct: correctFormatted,
        incorrect: incorrectFormatted,
        skipped: skippedFormatted,
        totalTime: totalFormatted,
      }); // 01:03:40
    }
  }, [practiceReport]);

  return (
    <div className="status-box">
      <h2>
        <TimerClock />
        <span>
          {practiceReport && practiceReport.speed} Ques/hr <small>Speed</small>
        </span>
      </h2>
      <div
        className="chart-box"
        style={{ width: '250px', height: '126px', margin: '0px auto' }}>
        <div className="inner-box">
          <p>{time.totalTime}</p>
          <span>Time Spent</span>
        </div>
        <Doughnut data={dataTimeSpent} options={options} />
      </div>
      <ul className="test-report">
        <li>
          <p>Correct</p>
          <span>
            <CheckCircle />
            {time.correct}
          </span>
        </li>
        <li>
          <p>Inorrect</p>
          <span>
            <CloseCircle />
            {time.incorrect}
          </span>
        </li>
        <li>
          <p>Skipped</p>
          <span>
            <MinusCircle />
            {time.skipped}
          </span>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceReport: selectPracticeReport,
});

export default connect(mapStateToProps)(TimeSpentReport);
