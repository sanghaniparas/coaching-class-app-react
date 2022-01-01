import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import QuizRatingModal from './QuizRatingModal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectQuizReport } from '../../../../../redux/quiz/quiz.selectors';
import { useToasts } from 'react-toast-notifications';


const QuizReportHeader = ({ match,report }) => {
  console.log(`hlo`, report)
  const { addToast } = useToasts();
  const [modalToggle, setmodalToggle] = useState(false);
  const [rate, setrate] = useState(false);

  const history = useHistory();

  const ratingModalHandler = () => {
    if(report.logedInUserRating > 0 || rate ===true)
    {
      return  addToast('You have already rated this practice set', {
        appearance: 'error',
        autoDismiss: 'true',
        autoDismissTimeout: 3000,
      });

    }else{
    setmodalToggle(!modalToggle);
    }
  };
  const modalCloseHandler = () => {
    setmodalToggle(false);
  };
  return (
    <>
      <div className="quiz-header summary quiz-header-right_rate">
        <div className="quiz-header-left">
          <div className="content">
            <h2>Good Try, {localStorage.getItem('username')}</h2>
            <p>Keep Practicing, Keep Improving.</p>
          </div>
        </div>
        <div className="quiz-header-right">
          <button className="btn-gold" onClick={ratingModalHandler}>
            Rate this Quiz
          </button>
        </div>
      </div>
      {modalToggle && (
        <Modal addClass="package-rating">
          <QuizRatingModal modalClose={modalCloseHandler} match={match} setrate={setrate} />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  report: selectQuizReport,
});
export default connect(mapStateToProps)(QuizReportHeader);
