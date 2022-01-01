import React from 'react';
import { connect } from 'react-redux';
import { selectQuizReport } from '../../../../../redux/quiz/quiz.selectors';
import { createStructuredSelector } from 'reselect';
import { withRouter, useHistory } from 'react-router-dom';

const QuizYourAnswers = ({ report, match }) => {
  const history = useHistory();

  return (
    Object.keys(report).length > 0 && (
      <div className="your-answer half">
        <h2>Your Answers</h2>
        <ul className="answer-list">
          {report.questionsState.map((el, idx) => {
            if (el.state === 'answered') {
              return (
                <li style={{ color: 'white' }} key={idx}>
                  <span className="green-bg">{idx + 1}</span>
                </li>
              );
            }
            if (el.state === 'unAnswered') {
              return (
                <li style={{ color: 'white' }} key={idx}>
                  <span className="red-bg">{idx + 1}</span>
                </li>
              );
            }
            if (el.state === 'notSeen') {
              return (
                <li style={{ color: 'white' }} key={idx}>
                  <span className="lightblue-bg">{idx + 1}</span>
                </li>
              );
            }
          })}
        </ul>
        <div className="btn-group">
          <button
            className="btn-grey"
            onClick={() => history.push(`/quizsolution/${match.params.id}`)}>
            View Solution
          </button>
          <button className="btn-primary radius" onClick={() => history.push(`/quiz`)}>Check more Quizzes</button>
        </div>
      </div>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  report: selectQuizReport,
});

export default withRouter(connect(mapStateToProps)(QuizYourAnswers));
