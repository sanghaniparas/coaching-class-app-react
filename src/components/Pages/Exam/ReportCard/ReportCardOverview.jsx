import React, { useState, useEffect, Fragment } from 'react';
import { useHistory, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import {
  Score,
  Rank,
  Atempted,
  Percentile,
  Accuracy,
  TimerClock,
  CheckCircle,
  CloseCircle,
  MinusCircle,
} from '../../../Core/Layout/Icon';
import { QUESTIONATTEMPT } from './Constant';
import { ToolTip } from './../../../Core/Layout/Tooltip/ToolTip';
import moment from 'moment';
import momentDurationFormatSetup from 'moment-duration-format';

const ReportCardOverview = ({
  reportData,
  testInstructions,
  match,
  testResultId,
}) => {
  const [timeData, setTimeData] = useState({
    correct: 0,
    incorrect: 0,
    skipped: 0,
  });

  const history = useHistory();
  const { strongerWeakFastestSlowest } = reportData;
  const data = {
    labels: [
      QUESTIONATTEMPT.INCORRECT,
      QUESTIONATTEMPT.CORRECT,
      QUESTIONATTEMPT.SCIPPED,
    ],
    datasets: [
      {
        data: [
          reportData.time.incorrectTime,
          reportData.time.correctTime,
          reportData.time.skipTime,
        ],
        backgroundColor: ['#e4556c', '#21c179', '#3a466b'],
        hoverBackgroundColor: ['#d11e0a', '#0ad11e', '#c9c4b3'],
      },
    ],
  };

  const options = {
    cutoutPercentage: 88,
    legend: {
      display: false,
    },
    responsive: true,
    maintainAspectRatio: true,
  };
  const report = [
    {
      name: 'Your Score',
      point: reportData.score.score,
      outOff: reportData.score.total,
    },
    {
      name: 'Rank',
      point: reportData.rank.rank,
      outOff: reportData.rank.total,
    },
    {
      name: 'Attempted',
      point: reportData.attempted.attempted,
      outOff: reportData.attempted.total,
    },
    {
      name: 'Percentile',
      point: reportData.percentile,
    },
    {
      name: 'Accuracy',
      point: reportData.accuracy,
    },
  ];

  const icon = (iconName) => {
    if (iconName === 'your score') {
      return <Score />;
    } else if (iconName === 'rank') {
      return <Rank />;
    } else if (iconName === 'attempted') {
      return <Atempted />;
    } else if (iconName === 'percentile') {
      return <Percentile />;
    } else {
      return <Accuracy />;
    }
  };

  useEffect(() => {
    if (Object.keys(reportData).length > 0) {
      // 	let seconds = singleQuestion.questionTime;
      //   let duration = moment.duration(seconds, 'seconds');
      //   let formatted = duration.format('hh[h] mm[m] ss[s] ');

      let correct = moment.duration(reportData.time.correctTime, 'seconds');
      let correctFormatted = correct.format('hh[h] mm[m] ss[s]');

      let inCorrect = moment.duration(reportData.time.incorrectTime, 'seconds');
      let incorrectFormatted = inCorrect.format('hh[h] mm[m] ss[s]');

      let skipTime = moment.duration(reportData.time.skipTime, 'seconds');
      let skipTimeFormatted = skipTime.format('hh[h] mm[m] ss[s]');

      setTimeData({
        correct: correctFormatted,
        incorrect: incorrectFormatted,
        skipped: skipTimeFormatted,
      });
    }
  }, []);
  return (
    <Fragment>
      <div className="card">
        <h2 className="report-title">Report Card</h2>
        <div className="report-card-container">
          {report.map((item) => (
            <div key={item.name} className="report-card">
              {icon(item.name.toLowerCase())}
              <div className="report-info">
                {item.name === 'Percentile' || item.name === 'Accuracy' ? (
                  <>
                    <p className="percent">
                      {item.point}%{' '}
                      {/* {item.name === 'percentile' && (
                        <ToolTip
                          message={'Based on user first attempt .'}
                          position={'right'}>
                          <img
                            src={require('../../../../assets/images/info.svg')}
                            alt=""
                          />
                        </ToolTip>
                      )}{' '} */}
                    </p>
                  </>
                ) : (
                    <p className="percent">
                      {item.point} <span>/{item.outOff}</span>
                    </p>
                  )}
                <p className="name">
                  {item.name}{' '}
                  {/* {item.name === 'rank' && (
                    <ToolTip
                      message={'Based on user first attempt .'}
                      position={'right'}>
                      <img
                        src={require('../../../../assets/images/info.svg')}
                        alt=""
                      />
                    </ToolTip>
                  )} */}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="report-topic-container">
          <div className="report-test-calculation">
            <h2>
              <TimerClock />{' '}
              <span>
                {reportData?.speed} Ques/hr <small>speed</small>
              </span>
            </h2>
            <div className="test-timing-chart" style={{ width: '250px', height: '126px', margin: '0 auto' }}>
              <Doughnut data={data} options={options} />
            </div>
            <ul className="test-report">
              <li>
                <p>Correct</p>
                <span>
                  <CheckCircle /> {timeData.correct}
                </span>
              </li>
              <li>
                <p>incorrect</p>
                <span>
                  <CloseCircle /> {timeData.incorrect}
                </span>
              </li>
              <li>
                <p>Skipped</p>
                <span>
                  <MinusCircle /> {timeData.skipped}
                </span>
              </li>
            </ul>
          </div>
          <div className="report-test-problems">
            <ul>
              <li>
                <span>Strong Area</span>
                <span>{strongerWeakFastestSlowest.stronger}</span>
              </li>
              <li>
                <span>Weak Area</span>
                <span>{strongerWeakFastestSlowest.weak}</span>
                {/* <span>Physics &amp; English</span> */}
              </li>
              <li>
                <span>Fastest Area</span>
                <span>{strongerWeakFastestSlowest.fastest}</span>
                {/* <span>Reasoning &amp; Computer</span> */}
              </li>
              <li>
                <span>Slowest Area</span>
                <span>{strongerWeakFastestSlowest.slowest}</span>
              </li>
            </ul>
            <div className="btn-group">
              <button
                className="btn-grey"
                onClick={
                  () => {
                    if(localStorage.getItem('token')){
                      history.push(
                        `/testsolution/${testResultId}`
                      );
                      localStorage.removeItem("solutionData");
                    }else{
                      history.push(
                        `/`
                      );
                    }
                  }
                  
                 
                 
                }>
                View Solution
              </button>
              {/* <button className="btn-primary radius">Detailed Report</button> */}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    // sectionNumber: state.exam.sectionNumber,
  };
};

export default connect(mapStateToProps)(withRouter(ReportCardOverview));
