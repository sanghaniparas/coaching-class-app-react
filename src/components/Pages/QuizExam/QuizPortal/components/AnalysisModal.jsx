import React, { useState, useEffect } from 'react';
import { ModalClose } from '../../../../Core/Layout/Icon';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectStatesCount,
  selectQuizQuestions,
  selectQuestionState,
} from './../../../../../redux/quiz/quiz.selectors';

const AnalysisModal = ({
  modalCloseHandler,
  statesCount,
  questions,
  questionState,
}) => {
  //   For creating li classes by checking condition
  // const addClass = (item, idx) => {
  //   let findEl = questionState.find((el) => el.questionId === item.id);

  //   if (findEl !== undefined) {
  //     if (findEl.answerNo === -1) {
  //       return {
  //         indx: idx,
  //         state: 'unanswered',
  //       };
  //     }

  //     if (findEl.answerNo !== -1) {
  //       return {
  //         indx: idx,
  //         state: 'answered',
  //       };
  //     }
  //   }
  // };
  var questionData=localStorage.getItem('quizquestions')?
  JSON.parse(localStorage.getItem('quizquestions')):undefined;

  var ans=0;
  var unans=0;
  var notseen=0;
  if(questionData){
    ans=questionData.questions.filter(e=>e.state==="answered").length
    unans=questionData.questions.filter(e=>e.state==="unAnswered").length
    notseen=questionData.questions.filter(e=>e.state==="notSeen").length
  }
  console.log(`hhyh`," hi")
  return (
    <Modal addClass="analysis-modal">
      <div className="modal-header">
        <h3>All Questions Analysis</h3>
        <span className="close" onClick={modalCloseHandler}>
          <ModalClose />
        </span>
      </div>
      <div className="modal-body">
        <ul className="analysis-item">
          { questionData !== undefined &&
             questionData.questions.map((el, idx) => {
              return (
                <li
                  className=
                    {el.state==='answered'?"green-bg":el.state==="unAnswered"?"red-bg":"lightblue-bg"}
                  >
                  {el.questionSerialNo +1}
                </li>
              );
            })}
        </ul>
        <div className="ans-type">
          <p className="ans">
            Answered: {`(${ans})`}
          </p>
          <p className="unans">
            Unanswered: {`(${unans})`}
          </p>
          <p className="notseen">
            Not Seen: {`(${notseen})`}
          </p>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  statesCount: selectStatesCount,
  questions: selectQuizQuestions,
  questionState: selectQuestionState,
});

export default connect(mapStateToProps)(AnalysisModal);
