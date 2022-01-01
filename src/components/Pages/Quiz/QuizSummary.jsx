import React from 'react'
import { Facebook, Gmail, LinkedinIcon, SummaryReport, TwitterIcon } from '../../Core/Layout/Icon';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

export default function QuizSummary() {
  return (
    <div className="quiz-wrapper">
      <div className="quiz-header summary">
        <div className="quiz-header-left">

          <div className="content">
            <h2>Good Try, Sonal Gupta</h2>
            <p>Keep Practicing, Keep Improving.</p>
          </div>
        </div>
        <div className="quiz-header-right">
          <button className="btn-gold">Rate this Quiz</button>
        </div>

      </div>
      <div className="quiz-wrapper">
        <div className="a-container">
          <div className="quiz-report-container">

            <div className="summary-report half">
              <h2>Summary Reports</h2>
              <span className="summary-icon">
                <SummaryReport />
              </span>
              <div className="rank">
                <p>Your Rank</p>
                <h4>100/201</h4>
              </div>
              <div className="percent-calculation">
                <CircularProgressbarWithChildren
                  value={66}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#ff7249"
                  })}
                >
                  <div className="progress-bar-percent">
                    <strong>60%</strong>
                    <p>Score</p>
                  </div>
                </CircularProgressbarWithChildren>
                <CircularProgressbarWithChildren
                  value={66}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#21c179"
                  })}
                >
                  <div className="progress-bar-percent">
                    <strong>60/100</strong>
                    <p>Correct</p>
                  </div>
                </CircularProgressbarWithChildren>
                <CircularProgressbarWithChildren
                  value={66}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#ea5252"
                  })}
                >
                  <div className="progress-bar-percent">
                    <strong>30/100</strong>
                    <p>Incorrect</p>
                  </div>
                </CircularProgressbarWithChildren>
                <CircularProgressbarWithChildren
                  value={66}
                  strokeWidth={5}
                  styles={buildStyles({
                    pathColor: "#a4a4a4"
                  })}
                >
                  <div className="progress-bar-percent">
                    <strong>01:28:05</strong>
                    <p>Time Taken</p>
                  </div>
                </CircularProgressbarWithChildren>
              </div>
              <div className="share-link">
                <span>Share with your friends!</span>
                <p className="item">
                  <span><Facebook /></span>
                  <span><Gmail /></span>
                  <span><TwitterIcon /></span>
                  <span><LinkedinIcon /></span>
                </p>
              </div>
            </div>

            <div className="your-answer half">
              <h2>Your Answers</h2>
              <ul className="answer-list">
                {
                  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map(item => (
                    <li key={item}>
                      <span>{item}</span>
                    </li>
                  ))
                }
              </ul>
              <div className="btn-group">
                <button className="btn-grey">View Solution</button>
                <button className="btn-primary radius">Check more Quizzes</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grey-bg-box">
        <div className="a-container">
          <h2>Similar Quizzes</h2>
        </div>
      </div>
    </div>
  )
}
