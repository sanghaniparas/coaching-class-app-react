import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import {
  AccuracyIcon,
  CheckCircle,
  CloseCircle,
  MinusCircle,
} from '../../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPracticeReport } from '../../../../../redux/practice/practice.selectors';

const AttemptedReport = ({ practiceReport }) => {
  const [attemptedState, setAttemptedState] = useState({
    totalAttempted: 0,
    totalCorrect: 0,
    totalSkipped: 0,
    totalWrong: 0,
  });

  const dataAttempted = {
    labels: ['Incorrect', 'Correct', 'Skipped'],
    datasets: [
      {
        data: [
          attemptedState.totalWrong,
          attemptedState.totalCorrect,
          attemptedState.totalSkipped,
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
    console.log(practiceReport);
    if (practiceReport !== null) {
      setAttemptedState({
        totalAttempted: practiceReport.attempted.totalAttempted,
        totalCorrect: practiceReport.attempted.totalCorrect,
        totalSkipped: practiceReport.attempted.totalSkipped,
        totalWrong: practiceReport.attempted.totalWrong,
      });
    }
  }, [practiceReport]);
  return (
    <div className="status-box">
      <h2>
        <AccuracyIcon />
        <span>
          {practiceReport && practiceReport.accuracy}% <small>Accuracy</small>
        </span>
      </h2>
      <div
        className="chart-box"
        style={{ width: '250px', height: '126px', margin: '0px auto' }}>
        <div className="inner-box">
          <p>{attemptedState.totalAttempted + attemptedState.totalSkipped}</p>
          <span>Attempted</span>
        </div>
        <Doughnut data={dataAttempted} options={options} />
      </div>
      <ul className="test-report">
        <li>
          <p>Correct</p>
          <span>
            <CheckCircle />
            {attemptedState.totalCorrect}
          </span>
        </li>
        <li>
          <p>Inorrect</p>
          <span>
            <CloseCircle />
            {attemptedState.totalWrong}
          </span>
        </li>
        <li>
          <p>Skipped</p>
          <span>
            <MinusCircle />
            {attemptedState.totalSkipped}
          </span>
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceReport: selectPracticeReport,
});

export default connect(mapStateToProps)(AttemptedReport);
