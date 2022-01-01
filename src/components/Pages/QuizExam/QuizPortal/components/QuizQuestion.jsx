import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSingleQuestion } from './../../../../../redux/quiz/quiz.selectors';

const QuizQuestion = (props) => {
  console.log(props)
  return (
    props.singleQuestion ? Object.keys(props.singleQuestion).length > 0 && (
      <div className="qst-card quiz">
       {props.singleQuestion?.langs[0] ?
       <React.Fragment>
        <strong>Q.{props.singleQuestion.questionSerialNo +1}</strong>
        <p className="quiz-question">{ReactHtmlParser(props.singleQuestion?.langs[0]?.question)}</p>
       </React.Fragment>
          : <div>No Question has been setup</div>
        }
      </div>
    )
    :
    null
  );
};

const mapStateToProps = createStructuredSelector({
  singleQuestion: selectSingleQuestion,
});

export default connect(mapStateToProps)(QuizQuestion);
