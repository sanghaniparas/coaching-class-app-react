import React from 'react';
import { AccuracyIcon } from '../../../Core/Layout/Icon';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

const AccuracyData = ({ practiceStats }) => {
  return practiceStats !== null && (
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
  );
};

export default AccuracyData;
