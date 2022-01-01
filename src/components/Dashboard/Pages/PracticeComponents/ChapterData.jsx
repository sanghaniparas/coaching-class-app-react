import React from 'react';
import { TestSeries } from '../../../Core/Layout/Icon';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';

const ChapterData = ({ practiceStats }) => {
  return practiceStats !== null && (
    <div className="pg-card">
      <h3 className="pg-title">
        <TestSeries />
        Chapter Stats
      </h3>
      <div className="pg-stats-list">
        <ul>
          <li>
            <span className="label">Completed</span>
            <span>
              {practiceStats.chapterStat !== null ?
                practiceStats.chapterStat.totalComplete : 0}
            </span>
          </li>
          <li>
            <span className="label">Ongoing</span>
            <span>
              {practiceStats.chapterStat !== null ?
                practiceStats.chapterStat.totalResume : 0}
            </span>
          </li>
          <li>
            <span className="label">Unseen</span>
            <span>
              {practiceStats.chapterStat !== null ?
                practiceStats.chapterStat.totalUnseen : 0}
            </span>
          </li>
          <li>
            <span className="label">Chapter</span>
            <span>
              {practiceStats.chapterStat !== null ?
                practiceStats.chapterStat.totalChapter : 0}
            </span>
          </li>
        </ul>
      </div>
      <div className="pg-stats-percent">
        <CircularProgressbarWithChildren
          value={parseInt(practiceStats.chapterStat !== null ? practiceStats.chapterStat.percentComplete : 0)}
          strokeWidth={5}
          styles={buildStyles({
            pathColor: '#fd8041',
          })}>
          <div className="progress-bar-percent">
            <strong>{practiceStats.chapterStat !== null ? practiceStats.chapterStat.percentComplete : 0}%</strong>
            <p>Progress</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  )
};

export default ChapterData;
