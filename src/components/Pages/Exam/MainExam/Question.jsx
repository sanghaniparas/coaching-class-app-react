import React, { Fragment, useState, useEffect, useRef } from 'react';
import { BookMark, OptionDots, BookMarkFill } from '../../../Core/Layout/Icon';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import {
  toggleQuestionPaper,
  setCurrentQuestionIndex,
} from './../../../../redux/actions/exam';
import ReportQuestionModal from './ReportQuestionModal';
import { Modal } from '../../../Core/Layout/Modal/Modal';

const Question = ({
  reportOptions,
  indexKey,
  element,
  setReportQuestion,
  singleQuestion,
  setCurrentQuestionIndex,
  toggleQuestionPaper,
  qsIndex,
  SaveSolutionQuestion,
  showSaveButton,
}) => {
  const wrapperRef = useRef(null);
  const [question, setquestion] = useState(false);
  const [reportOption, setReportOption] = useState(null);
  const [showThanksMsg, setSectionFeedback] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const questionToggle = () => {
    setquestion(!question);
  };

  const closeModalHandler = () => {
    setReportModal(false);
    setSectionFeedback(false);
    setquestion(false);
  };

  const reportQuestion = (selectOption) => {
    //if(selectOption===6){
    setReportOption(selectOption);
    setReportModal(!reportModal);
    setquestion(!question);
    // }else{
    //   setReportQuestion(singleQuestion.id, reportOption, '');
    //   setSectionFeedback(true);
    //   setReportModal(!reportModal);
    // }
  };

  const SaveSolution = () => {
    SaveSolutionQuestion();
  };

  const submitReport = (otherIssue) => {
    setReportQuestion(singleQuestion.id, reportOption, otherIssue);
    setSectionFeedback(true);
  };
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setquestion(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };
  useOutsideAlerter(wrapperRef);
  return (
    <Fragment>
      <li>
        <span>Q.{indexKey + 1}</span>{' '}
        <span
          style={{ cursor: 'pointer' }}
          onClick={() => {
            toggleQuestionPaper(false);
            setCurrentQuestionIndex(qsIndex + 1);
          }}>
          {ReactHtmlParser(element.question)}
        </span>
        <div className="action-group">
          {/* <span onClick={SaveSolution} className="bookmark">
		  {showSaveButton ? <BookMark  /> : <BookMarkFill />} {' '}
            Save
          </span> */}
          <div className="options">
            <span onClick={(e) => questionToggle(e)}>
              <OptionDots />
            </span>
            {question && (
              <div className="dropdown" ref={wrapperRef}>
                <ul>
                  {reportOptions.map((el, i) => (
                    <li
                      key={i}
                      id={el.id}
                      onClick={(e) => {
                        reportQuestion(el.id);
                      }}>
                      {el.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </li>
      {reportModal && (
        <Modal addClass="submitTest modal-sm">
          <ReportQuestionModal
            close={closeModalHandler}
            showThanksMsg={showThanksMsg}
            submitReport={submitReport}
          />
        </Modal>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber,
    showSaveButton: state.exam.showSaveButton,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionPaper: (show) => dispatch(toggleQuestionPaper(show)),
    setCurrentQuestionIndex: (idx) => dispatch(setCurrentQuestionIndex(idx)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Question);
