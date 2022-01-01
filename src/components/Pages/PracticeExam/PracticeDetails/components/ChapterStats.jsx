import React, { useEffect } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import { TestSeries } from '../../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectPracticeStats } from '../../../../../redux/practice/practice.selectors';

const ChapterStats = ({ practiceStats }) => {
  console.log(practiceStats);
  // console.log("locals jayanta",localStorage.getItem('token').length);
  // return practiceStats !== null && practiceStats.chapterStat !== null ? (
  return practiceStats !== null  ? (
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
            <p>Completed</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div> 
  ):(
    <div className="pg-card">
      <h3 className="pg-title">
        {/* <TestSeries /> */}
        Chapter Stats
      </h3>
      <div className="pg-stats-list">
        <ul>
          <li>
            <span className="label">Completed</span>
            <span>
             0
            </span>
          </li>
          <li>
            <span className="label">Ongoing</span>
            <span>
              0
            </span>
          </li>
          <li>
            <span className="label">Unseen</span>
            <span>
            0
            </span>
          </li>
          <li>
            <span className="label">Chapter</span>
            <span>
             0
            </span>
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
            <p>Completed</p>
          </div>
        </CircularProgressbarWithChildren>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceStats: selectPracticeStats,
});

export default connect(mapStateToProps)(ChapterStats);
