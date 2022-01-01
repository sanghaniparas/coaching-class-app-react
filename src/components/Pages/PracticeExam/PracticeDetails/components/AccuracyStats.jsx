import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { AccuracyIcon } from '../../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectPracticeStats } from '../../../../../redux/practice/practice.selectors';

const AccuracyStats = ({ practiceStats }) => {
  console.log("practice set ***", practiceStats);
  return practiceStats !== null ? (
    <div className="pg-card">
      <h3 className="pg-title">
        <AccuracyIcon />
        Accuracy Stats
      </h3>
      <div className="pg-stats-list">
        <ul>
          <li>
            <span className="label">Correct</span>
            <span>{practiceStats.accuracyStat !== null ? practiceStats.accuracyStat.totalCorrect : 0}</span>
          </li>
          <li>
            <span className="label">Incorrect</span>
            <span>{practiceStats.accuracyStat !== null ? practiceStats.accuracyStat.totalWrong : 0}</span>
          </li>
          <li>
            <span className="label">Skipped</span>
            <span>{practiceStats.accuracyStat !== null ? practiceStats.accuracyStat.totalSkipped : 0}</span>
          </li>
          <li>
            <span className="label">Q.Attempted</span>
            <span>{practiceStats.accuracyStat !== null ? practiceStats.accuracyStat.totalAttempted : 0}</span>
          </li>
        </ul>
      </div>
      <div className="pg-stats-percent">

        <CircularProgressbarWithChildren
          value={parseInt(practiceStats?.accuracyStat !== null || !isNaN(practiceStats?.accuracyStat) ? !isNaN(practiceStats?.accuracyStat?.accuracy) ? practiceStats?.accuracyStat?.accuracy : 0 : 0)}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: '#fd8041',
          })}>


          <div className="progress-bar-percent">
            <strong>{practiceStats?.accuracyStat !== null || !isNaN(practiceStats?.accuracyStat) ? !isNaN(practiceStats?.accuracyStat?.accuracy) ? practiceStats?.accuracyStat?.accuracy : 0 : 0}%</strong>
            <p>Accuracy</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  ):(
    <div className="pg-card">
      <h3 className="pg-title">
        {/* <TestSeries /> */}
        Accuracy Stats
      </h3>
      <div className="pg-stats-list">
        <ul>
          <li>
            <span className="label">Correct</span>
            <span>{0}</span>
          </li>
          <li>
            <span className="label">Incorrect</span>
            <span>{0}</span>
          </li>
          <li>
            <span className="label">Skipped</span>
            <span>{0}</span>
          </li>
          <li>
            <span className="label">Q.Attempted</span>
            <span>{0}</span>
          </li>
        </ul>
      </div>
      <div className="pg-stats-percent">

        <CircularProgressbarWithChildren
          value={0}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: '#fd8041',
          })}>


          <div className="progress-bar-percent">
            <strong>{0}%</strong>
            <p>Accuracy</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceStats: selectPracticeStats,
});

export default connect(mapStateToProps)(AccuracyStats);
