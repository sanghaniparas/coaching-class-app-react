import React, { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSolutionSingleQuestion } from './../../../../../redux/quiz/quiz.selectors';

const QuizSolutionQuestion = (props) => {
  return (
    Object.keys(props.singleQuestion).length > 0 && (
      <>
        <div className="qst-card quiz solution-quiz-question">
          <div>
            Question {props.singleQuestion.questionSerialNo+1} Of{' '}
            {props.questions.length}
          </div>
          <div>
            <p>{ReactHtmlParser(props.singleQuestion.langs[0].question)}</p>
          </div>
        </div>
      </>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  singleQuestion: selectSolutionSingleQuestion,
});

export default connect(mapStateToProps)(QuizSolutionQuestion);
