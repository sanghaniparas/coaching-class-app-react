import React, { useState, useEffect } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { TimerIcon } from '../../../../Core/Layout/Icon';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectPracticeStats } from '../../../../../redux/practice/practice.selectors';

const SpeedStats = ({ practiceStats }) => {

  const [formattedTime, setFormattedTime] = useState('');
  console.log("practice set speed***", practiceStats);

  useEffect(() => {
    if (practiceStats !== null && practiceStats.timeStat !== null) {
      let sec = practiceStats.timeStat.totalTime;
      let duration = moment.duration(sec, 'seconds');
      let formatted = duration.format('hh[h] mm[m] ss[s] ');

      setFormattedTime(formatted);
    }
  }, [practiceStats]);

  return practiceStats !== null ? (
    <div className="pg-card">
      <h3 className="pg-title">
      <TimerIcon />
        Speed Stats
      </h3>
      <div className="pg-stats-list">
        <ul>
          <li>
            <span className="label">Correct</span>
            <span>{practiceStats.timeStat !== null ? practiceStats.timeStat.correctTime : 0}</span>
          </li>
          <li>
            <span className="label">Incorrect</span>
            <span>{practiceStats.timeStat !== null ? practiceStats.timeStat.incorrectTime : 0}</span>
          </li>
          <li>
            <span className="label">Skipped</span>
            <span>{practiceStats.timeStat !== null ? practiceStats.timeStat.skipTime : 0}</span>
          </li>
          <li>
            <span className="label">Ques/hr</span>
            <span>{practiceStats.timeStat !== null ? practiceStats.timeStat.speedPerHour : 0}</span>
          </li>
        </ul>
      </div>
      <div className="pg-stats-percent">
        <CircularProgressbarWithChildren
          value={parseInt(practiceStats.timeStat !== null ? practiceStats.timeStat.totalTime : 0)}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: '#fd8041',
          })}>
          <div className="progress-bar-percent">
            <strong>{practiceStats.timeStat !==null ? formattedTime:0}</strong>
            <p>Time Taken </p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  ) :(<div className="pg-card">
  <h3 className="pg-title">
    {/* <TestSeries /> */}
    Speed Stats
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
        <span className="label">Ques/hr</span>
        <span>{0}</span>
      </li>
    </ul>
  </div>
  <div className="pg-stats-percent">
    <CircularProgressbarWithChildren
      value={parseInt(0)}
      strokeWidth={5}
      styles={buildStyles({
        pathColor: '#fd8041',
      })}>
      <div className="progress-bar-percent">
        <strong>{0}</strong>
        <p>Time Taken</p>
      </div>
    </CircularProgressbarWithChildren>
  </div>
</div>);
};

const mapStateToProps = createStructuredSelector({
  practiceStats: selectPracticeStats,
});

export default connect(mapStateToProps)(SpeedStats);
