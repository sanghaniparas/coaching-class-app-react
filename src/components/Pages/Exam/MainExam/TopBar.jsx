import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Timer from 'react-compound-timer';
import { BookMark, Report, BookMarkFill } from '../../../Core/Layout/Icon';
import { TIMESTATE } from './AllExamTypes/Constant';
import ReportQuestionModal from './ReportQuestionModal';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import OutsideClickHandler from 'react-outside-click-handler';
import { changeLanguage } from './../../../../redux/actions/exam';

const TopBar = ({
  singleQuestion,
  questions,
  reportOptions,
  setReportQuestion,
  time,
  start,
  interv,
  showSaveButton,
  SaveSolutionQuestion,
  resumeBtnClick,
  testInstructions,
  changeLanguage,
}) => {
  const [langId, setLangId] = useState(0);
  const [report, setReport] = useState(false);
  const [showThanksMsg, setSectionFeedback] = useState(false);
  const [reportOption, setReportOption] = useState(null);
  const [reportModal, setReportModal] = useState(false);
  const [timerState, setTmrState] = useState(0);
  const [timeSpend, settimeSpend] = useState(0);

  useEffect(() => {
    setLangId(parseInt(localStorage.langId));
  }, []);
  /**
   * Start the timer when mounts
   */
  useEffect(() => {
    if (resumeBtnClick) {
      return clearInterval(interv);
    } else {
      start();
      return () => clearInterval(interv);
    }
  }, [singleQuestion, resumeBtnClick]);

  const closeModalHandler = () => {
    setReportModal(false);
    setSectionFeedback(false);
    setReport(false);
  };

  /**
   * For Toggling report option
   */
  const reportToggle = () => {
    setReport(!report);
  };

  const reportQuestion = (selectOption) => {
    //if (selectOption === 6) {
    setReportOption(selectOption);
    setReportModal(!reportModal);
    // } else {
    //   setReportQuestion(singleQuestion.id, reportOption, '');
    //   setReport(!report);
    //   setSectionFeedback(true);
    //   setReportModal(!reportModal);
    // }
  };

  const submitReport = (otherIssue) => {
    setReportQuestion(singleQuestion.id, reportOption, otherIssue);
    setReport(!report);
    setSectionFeedback(true);
  };

  const SaveSolution = () => {
    SaveSolutionQuestion();
  };

  const showTimer = () => (
    <Timer
      initialTime={
        Object.keys(testInstructions).length &&
        testInstructions.testConfig.duration * 60000
      }
      direction="backward">
      {({
        start,
        resume,
        pause,
        stop,
        reset,
        timerState,
        getTimerState,
        getTime,
      }) => {
        const pauseStyle = {
          position: 'absolute',
          top: '0px',
          right: '0px',
          padding: '0px 0px 0px 0px',
          opacity: '0',
        };
        getTimerState() === TIMESTATE.PLAYING && setTmrState(0);
        getTimerState() === TIMESTATE.STOPPED && setTmrState(1);
        getTimerState() === TIMESTATE.PAUSED && setTmrState(2);
        settimeSpend(Math.floor(getTime() / 1000));
        return (
          <React.Fragment>
            <Timer.Hours />:<Timer.Minutes />:<Timer.Seconds />
            <>
              <button style={pauseStyle} onClick={pause}>
                Pause
              </button>
              <button
                style={{ display: 'none' }}
                id="resumeBtn"
                onClick={resume}>
                Pause
              </button>
            </>
          </React.Fragment>
        );
      }}
    </Timer>
  );

  return (
    <>
      <div className="question-top-bar">
        <h4>
          Que<span>stion</span> {singleQuestion.questionSerialNo} of{' '}
          {questions.length}
        </h4>

        <div className="right-panel">
          <p className="mark">
            <i>Mark :</i>{' '}
            <span className="positive">+{singleQuestion.positiveMark}</span>
            <span className="negetive">{singleQuestion.negativeMark === 0 ? 0 : `-${singleQuestion.negativeMark}`}</span>
          </p>
          <p className="question-time">
            <i>Question</i> Time{' '}
            <span>
              {time.h >= 10 ? time.h : '0' + time.h}:
              {time.m >= 10 ? time.m : '0' + time.m}:
              {time.s >= 10 ? time.s : '0' + time.s}
              {/* {showTimer()} */}
            </span>
          </p>
          <ul>
            <li>
              <span onClick={SaveSolution} className="bookmark">
                {showSaveButton ? <BookMark /> : <BookMarkFill />} <p>Save</p>
              </span>
            </li>
            <li>
              {/* <OutsideClickHandler
                onOutsideClick={() => {
                  setReport(false);
                }}> */}
              <span onClick={reportToggle} className="report">
                <Report /> <p>Report</p>
              </span>
              {report && (
                <div className="dropdown">
                  <ul>
                    {reportOptions.map((el, i) => (
                      <li
                        key={i}
                        id={el.id}
                        onClick={() => {
                          reportQuestion(el.id);
                          setReportModal(true);
                          console.log('ayan');
                        }}>
                        {el.name}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* </OutsideClickHandler> */}
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

      <div className="r-language-select">
        <span className="l-label">View In: </span>
        <select
          value={langId}
          onChange={(e) => {
            setLangId(parseInt(e.target.value));
            localStorage.setItem('langId', parseInt(e.target.value));
            changeLanguage(parseInt(e.target.value));
          }}
          className="form-control input-sm">
          {Object.keys(testInstructions).length &&
            testInstructions.languages.map((el, i) => (
              <option value={el.id}>{el.languageName}</option>
            ))}
        </select>
      </div>
      <div className="r-qst-bar">
        <h4>Question No. {singleQuestion.questionSerialNo}</h4>
        {/* CAT temp */}
        {/* <div className="cat-right-bar">
          <p className="currect-ans">
            Marks for correct answer <span>3</span>
          </p>
          <p className="negative-ans">
            Negative Marks <span>1</span>
          </p>
        </div> */}
        {/* <OutsideClickHandler
          onOutsideClick={() => {
            setReport(false);
          }}> */}
        <span className="report" onClick={reportToggle}>
          Report Question
        </span>
        {/* {report && (
            <div className="dropdown">
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
          )} */}
        {/* </OutsideClickHandler> */}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    showSaveButton: state.exam.showSaveButton,
    resumeBtnClick: state.exam.resumeBtnClick,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (langId) => dispatch(changeLanguage(langId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);
