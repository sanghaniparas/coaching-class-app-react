import React, { useState, useEffect } from 'react';
import { TimerIcon } from '../../../Core/Layout/Icon';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const SpeedData = ({ practiceStats }) => {
  const [formattedTime, setFormattedTime] = useState('');

  useEffect(() => {
    if (practiceStats !== null && practiceStats.timeStat !== null) {
      let sec = practiceStats.timeStat.totalTime;
      let duration = moment.duration(sec, 'seconds');
      let formatted = duration.format('hh[h] mm[m] ss[s] ');

      setFormattedTime(formatted);
    }
  }, [practiceStats]);

  return practiceStats !== null && (
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
            <strong>{formattedTime}</strong>
            <p>Time spent</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
};

export default SpeedData;
