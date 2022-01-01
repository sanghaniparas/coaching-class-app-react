import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { BookMark, Report } from './../../../../Core/Layout/Icon';
import moment from 'moment';
import ReportQuestionModal from '../../../Exam/MainExam/ReportQuestionModal';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import momentDurationFormatSetup from 'moment-duration-format';
import { verifySaveButtonVisible, BookMarkSolution } from './../../../../../redux/actions/solution';

const QuestionTopBar = ({
  singleQuestion,
  questions,
  solutionData,
  reportOptions,
  setReportQuestion,
  showSaveButton,
  verifySaveButtonVisible,
  BookMarkSolution
}) => {
  const wrapperRef = useRef(null);
  const [time, setTime] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState([]);
  const [inCorrectAnswer, setInCorrectAnswer] = useState([]);
  const [reportOption, setReportOption] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [report, setReport] = useState(false);
  const [showThanksMsg, setSectionFeedback] = useState(false);

  const savedQuestion = {
   
    testResultId: solutionData?.testInfo?.testResultId,
    testQuestionId: singleQuestion.id
  }

  useEffect(() => {
    if (Object.keys(singleQuestion)) {
      let seconds = singleQuestion.questionTime;
      let duration = moment.duration(seconds, 'seconds');
      let formatted = duration.format('hh[h] mm[m] ss[s] ');
      setTime(formatted); // 01:03:40
      verifySaveButtonVisible(savedQuestion, 'solution');
    }
  }, [singleQuestion]);

  useEffect(() => {
    let correct = questions.filter((el) => el.isCorrect === 1);
    setCorrectAnswer(correct);
    let inCorrect = questions.filter((el) => el.isCorrect === 0);
    setInCorrectAnswer(inCorrect);
  }, [questions]);

  const SaveSolution = () => BookMarkSolution(savedQuestion, 'solution');

  const reportQuestion = (selectOption) => {
    // if (selectOption === 6) {
    setReportOption(selectOption);
    setReportModal(!reportModal);
    // } else {
    //   setReportQuestion(singleQuestion.id, reportOption, '');
    //   setReport(!report);
    //   setSectionFeedback(true);
    //   setReportModal(!reportModal);
    // }
  };

  const reportToggle = () => {
    setReport(!report);
  };

  const submitReport = (otherIssue) => {
    setReportQuestion(singleQuestion.id, reportOption, otherIssue);
    setReport(false);
    setSectionFeedback(true);
  };

  const closeModalHandler = () => {
    setReportModal(false);
    setSectionFeedback(false);
    setReport(false);
  };
  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setReport(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useOutsideAlerter(wrapperRef);
  return (
    <div className="question-top-bar">
      <h4>
        Que<span>stion</span> {singleQuestion.questionSerialNo} of {questions.length}
      </h4>

      <div className="right-panel">
        <ul className="attempted">
          <li>
            <i>Marks</i>
            <span className="text-red">
              {singleQuestion.isCorrect !== null
                ? singleQuestion.isCorrect
                  ? singleQuestion.positiveMark
                  : `${singleQuestion.negativeMark === 0 ? '0' : -singleQuestion.negativeMark}`
                : 0}
            </span>
          </li>
          <li>
            Attempted
            <span className="text-light-blue">
              {questions.filter((el) => el.givenAnswer !== null).length}
            </span>
          </li>
          <li>
            Correct
            <span className="text-green">{correctAnswer.length}</span>
          </li>
          <li>
            Incorrect
            <span className="text-red">{inCorrectAnswer.length}</span>
          </li>
          <li>
            You
            <span className="text-blue">{time}</span>
          </li>
          {/* <li>
            Topper
            <span className="text-red">1m 43s</span>
          </li> */}
        </ul>
        <ul>
          {/* {showSaveButton && <li>
            <span onClick={SaveSolution} className="report">
              <BookMark /><p>Save</p>
            </span>
          </li>} */}
          <li ref={wrapperRef}>
            <span onClick={reportToggle} className="report">
              <Report /> <p>Report</p>
            </span>
            {report && (
              <div className="dropdown" >
                <ul>
                  {reportOptions.map((el, i) => (
                    <li key={i}
                      id={el.id}
                      onClick={(e) => {
                        reportQuestion(el.id);
                      }}
                    >
                      {el.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        </ul>
      </div>
      {reportModal && (
        <Modal addClass="submitTest modal-sm">
          <ReportQuestionModal
            close={closeModalHandler}
            showThanksMsg={showThanksMsg}
            submitReport={submitReport}
          />
        </Modal>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    solutionData: state.solution.solutionData,
    showSaveButton: state.solution.showSaveButton
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    verifySaveButtonVisible: (savedQuestion, page) => dispatch(verifySaveButtonVisible(savedQuestion, page)),
    BookMarkSolution: (savedQuestion, page) => dispatch(BookMarkSolution(savedQuestion, page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTopBar);
