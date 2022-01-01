import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SolutionEachQuestionNumber from './../components/SolutionEachQuestionNumber';

const QuizSolutionBottomBar = ({ modaToggleHandler }) => {
  const history = useHistory();

  return (
    <>
      <div className="quiz-footer">
        <div className="left-container">
          <div className="ans-type">
            <p className="ans">Answered</p>
            <p className="unans">Unanswered</p>
            <p className="notseen">Not Seen</p>
          </div>

          <div className="list">
            <SolutionEachQuestionNumber />
          </div>

          <span className="viewAll" onClick={() => modaToggleHandler()}>
            View All Questions
          </span>
        </div>

        <button
          className="btn-primary quiz-summary-btn"
          onClick={() => history.goBack()}>
          View Summary
        </button>
      </div>
    </>
  );
};

export default QuizSolutionBottomBar;
