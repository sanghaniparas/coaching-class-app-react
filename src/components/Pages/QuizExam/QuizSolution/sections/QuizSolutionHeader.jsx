import React, { useEffect, useState } from 'react';
import { ModalClose } from '../../../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectSolutionConfigData,
  selectQuizPortalConfig,
} from './../../../../../redux/quiz/quiz.selectors';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import moment from 'moment';

const QuizSolutionHeader = ({ headData, config }) => {
  const [modalToggle, setModalToggle] = useState(false);
  const history = useHistory();
  let quizTime = 0;
  if(headData !== undefined && headData.time_taken > 60) {
    quizTime = moment.duration(headData.time_taken, 'seconds').format('hh[h] mm[m] ss[s] ');
  } else {
    quizTime = `${headData.time_taken}  Secs`;
  }
  return (
    headData !== undefined && (
      <>
        <div className="quiz-header">
          <div className="quiz-header-left">
            {headData !== undefined && headData.examType.logoUrl && (
              <img
                src={`${headData.examType.logoUrl}`}
                alt=""
                className="quiz-header-logo"
              />
            )}

            <div className="content">
              <h2>{headData.quizName}</h2>
              <p>
                {headData !== undefined && headData.examType.examType} |{' '}
                By : {config?.coachingName}
              </p>
            </div>
          </div>
          <div className="quiz-header-right">
            <div className="time">
              {/* <h5>
                {headData !== undefined && headData.time_taken > 60
                  ? `${(headData.time_taken / 60).toFixed(2)} Mins`
                  : `${headData.time_taken} Secs`}
              </h5> */}
              <h5>{quizTime}</h5>
              <p>Time Taken</p>
            </div>

            <div className="close" onClick={() => setModalToggle(!modalToggle)}>
              <ModalClose fill="#fff" />
            </div>
          </div>
        </div>
        {modalToggle && (
          <Modal addClass="Submit-quiz-Modal modal-sm ">
            <span onClick={() => setModalToggle(false)} className="close">
              <ModalClose />
            </span>

            <h2>Do you want to close?</h2>
            <div
              className="btn-group"
              style={{ marginLeft: '30%', marginTop: '20px' }}>
              <button
                style={{ marginRight: '10px' }}
                className="btn-grey"
                onClick={() => setModalToggle(false)}>
                Cancel
              </button>

              <button
                className="btn-primary radius"
                onClick={() => history.push('/quiz')}>
                Close
              </button>
            </div>
          </Modal>
        )}
      </>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  headData: selectSolutionConfigData,
  config: selectQuizPortalConfig,
});

export default connect(mapStateToProps)(QuizSolutionHeader);
