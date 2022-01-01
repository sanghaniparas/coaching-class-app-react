import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { CheckCircle, CloseCircle } from '../../../../Core/Layout/Icon';
import { selectSolutionSingleQuestion } from './../../../../../redux/quiz/quiz.selectors';
import QuizSolutionBottomBar from './../sections/QuizSolutionBottomBar';
import SolutionAnalysisModal from './SolutionAnalysisModal';

const QuizSolutionAnswers = ({ singleQuestion }) => {
  // For modal toggle
  const [toggleModal, settoggleModal] = useState(false);

  //   For toggling the question analysis modal
  const modaToggleHandler = () => {
    settoggleModal(!toggleModal);
  };
  const modalCloseHandler = () => {
    settoggleModal(false);
  };

  return (
    Object.keys(singleQuestion).length > 0 && (
      <>
        {singleQuestion.langs[0].answer.map((el, idx) => {
          let rightAns =
            String.fromCharCode(97 + idx) === singleQuestion.correctAnswer;

          let isCorrect =
            singleQuestion.correctAnswer === singleQuestion.givenAnswer;

          let givenAns =
            String.fromCharCode(97 + idx) === singleQuestion.givenAnswer;

          return (
            <div
              className={`qst-card ${rightAns ? 'success' : ''} ${
                isCorrect === false && givenAns ? 'error' : ''
              }`}>
              <div className="qst-left">
                <span className="ans-number">
                  {String.fromCharCode(65 + idx)}
                </span>
                <p>{ReactHtmlParser(el.answer)}</p>
              </div>
              {singleQuestion.givenAnswer !== null && givenAns ? (
                <div className="qst-right">
                  {isCorrect ? <CheckCircle /> : <CloseCircle />} Given Answer
                </div>
              ) : (
                rightAns && (
                  <div className="qst-right">
                    <CheckCircle /> Correct Answer
                  </div>
                )
              )}
            </div>
          );
        })}

        <QuizSolutionBottomBar modaToggleHandler={modaToggleHandler} />

        {toggleModal && (
          <SolutionAnalysisModal modalCloseHandler={modalCloseHandler} />
        )}
      </>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  singleQuestion: selectSolutionSingleQuestion,
});

export default connect(mapStateToProps)(QuizSolutionAnswers);
