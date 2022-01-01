import React from 'react';
import { selectSolutionQuestions } from '../../../../../redux/quiz/quiz.selectors';
import { ModalClose } from '../../../../Core/Layout/Icon';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const SolutionAnalysisModal = ({ modalCloseHandler, questions }) => {
  console.log('questions ==> ', questions);
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
          {questions.map((el) => (
            <li
              className={
                (el.state === 'answered' && 'green-bg') ||
                (el.state === 'unAnswered' && 'red-bg') ||
                'lightblue-bg'
              }>
              {el.questionSerialNo +1}
            </li>
          ))}
        </ul>
        <div className="ans-type">
          <p className="ans">Answered ({questions.filter(c => c.state === 'answered').length})</p>
          <p className="unans">Unanswered ({questions.filter(c => c.state === 'unAnswered').length})</p>
          <p className="notseen">Not Seen ({questions.filter(c => c.state === 'notSeen').length})</p>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectSolutionQuestions,
});

export default connect(mapStateToProps)(SolutionAnalysisModal);
