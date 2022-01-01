import React, { useState, useEffect } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectQuizReport } from '../../../../../redux/quiz/quiz.selectors';

const PercentageCalculation = ({ report }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (Object.keys(report)) {
      let seconds = report.timeTaken;
      let duration = moment.duration(seconds, 'seconds');
      let formatted = duration.format('hh[h] mm[m] ss[s] ');
      console.log('formatted ==> ', formatted);
      setTime(formatted); // 01:03:40
    }
  }, [report]);

  return (
    <>
      {Object.keys(report).length > 0 && (
        <>
          <CircularProgressbarWithChildren
            value={parseInt(report.scoreInPercentage)}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#ff7249',
            })}>
            <div className="progress-bar-percent">
              <strong>{report.scoreInPercentage}%</strong>
              <p>Score</p>
            </div>
          </CircularProgressbarWithChildren>
          <CircularProgressbarWithChildren
            value={report.correctCount}
            maxValue={report.totalCount}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#21c179',
            })}>
            <div className="progress-bar-percent">
              <strong>
                {report.correctCount}/{report.totalCount}
              </strong>
              <p>Correct</p>
            </div>
          </CircularProgressbarWithChildren>
          <CircularProgressbarWithChildren
            value={report.incorrectCount}
            maxValue={report.totalCount}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#ea5252',
            })}>
            <div className="progress-bar-percent">
              <strong>
                {report.incorrectCount}/{report.totalCount}
              </strong>
              <p>Incorrect</p>
            </div>
          </CircularProgressbarWithChildren>
          <CircularProgressbarWithChildren
            value={report.timeTaken / 60}
            maxValue={report.duration}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: '#a4a4a4',
            })}>
            <div className="progress-bar-percent">
              <strong>{time}</strong>
              <p>Time Taken</p>
            </div>
          </CircularProgressbarWithChildren>
        </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  report: selectQuizReport,
});

export default connect(mapStateToProps)(PercentageCalculation);
