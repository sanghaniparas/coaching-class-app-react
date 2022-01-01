import React, { useEffect } from 'react';
import QuizSolutionQuestion from './../components/QuizSolutionQuestion';
import QuizSolutionAnswers from './../components/QuizSolutionAnswers';
import SolutionBox from './../components/SolutionBox';

const QuizSolutionQuestionWrapper = ({ questions }) => {
  return (
    <div className="quiz-body-container">
      <div className="a-container">
        <div className="quiz-header-group">
          <h2 className="quiz-heading">Solutions</h2>
        </div>
        <div className="quiz-card-wrapper">
          <QuizSolutionQuestion questions={questions} />
          <QuizSolutionAnswers />
          <SolutionBox />
        </div>
      </div>
    </div>
  );
};

export default QuizSolutionQuestionWrapper;
