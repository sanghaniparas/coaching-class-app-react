import React, { useEffect } from 'react';
import QuizQuestion from './../components/QuizQuestion';
import QuizAnswers from './../components/QuizAnswers';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectSingleQuestion,
  selectQuizPortalConfig,
} from './../../../../../redux/quiz/quiz.selectors';

const QuizQuestionWrapper = ({ singleQuestion, quizConfig, match }) => {
  console.log(singleQuestion)
  //console.log(Object.keys(singleQuestion))
  return (
    <div className="quiz-body-container">
      {singleQuestion ? singleQuestion && <div className="a-container">
        <div className="quiz-header-group">
          {}
          {singleQuestion?.langs && <h2 className="quiz-heading">
            Question {singleQuestion?.questionSerialNo + 1 } of{' '}
            {quizConfig?.totalNoOfQuestion}{' '}
          </h2> }
        </div>
        
        <div className="quiz-card-wrapper">
          <QuizQuestion />
          <QuizAnswers match={match}/>
        </div>
      </div>:
      <div className="a-nodata-Content">No Question has been setup</div>}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  singleQuestion: selectSingleQuestion,
  quizConfig: selectQuizPortalConfig,
});

export default connect(mapStateToProps)(QuizQuestionWrapper);
