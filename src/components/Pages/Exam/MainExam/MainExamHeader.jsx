import React, { useState, useEffect } from 'react';
import Timer from 'react-compound-timer';
import { connect } from 'react-redux';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { TIMESTATE } from './AllExamTypes/Constant';
import TimeOutSubbmission from './TimeOutSubbmission';
import { BASE_URL } from './../../../../config';
import { Modal } from './../../../Core/Layout/Modal/Modal';
import {
  Info,
  ModalClose,
  QuestionPaperCat,
} from './../../../Core/Layout/Icon';
import ReactHtmlParser from 'react-html-parser';
import { togglePortalInstruction } from './../../../../redux/actions/exam';

const MainExamHeader = ({
  testInstructions,
  setReportCard,
  examPauseHandler,
  resumeBtnClick,
  setResumeBtnClick,
  setTimeTakenToStore,
  sectionNumber,
  timer,
  togglePortalInstruction,
}) => {
  const [name, setName] = useState('Switch Full Screen');
  const [timerState, setTmrState] = useState(0);
  const [time, setTime] = useState(0);
  const [timeSpend, settimeSpend] = useState(0);
  const [showTimeOutPopup, displayTimeOutPopup] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [questionModal, setQuestionModal] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if(testInstructions && testInstructions.sections[sectionNumber]){
    setQuestions(testInstructions.sections[sectionNumber].questions);
    }
  }, [sectionNumber]);

  useEffect(() => {
    let sectionTime = testInstructions.testConfig.duration;
    sectionTime = sectionTime * 60000;
    setTime(sectionTime);
    if (parseInt(localStorage.getItem('setTimeOut'))) {
      //   displayTimeOutPopup(true);
    }
  }, []);

  useEffect(() => {
    if (resumeBtnClick) {
      document.getElementById('resumeBtn').click();
      setResumeBtnClick(false, false);
    }
  }, [resumeBtnClick]);

  useEffect(() => {
    setTimeTakenToStore(testInstructions.testConfig.duration * 60 - timeSpend);
    //setTimeTakenToStore((15-timeSpend));
  }, [timeSpend]);

  useEffect(() => {
    timerState === 1 && reportPage();
    if (timerState === 2) {
      examPauseHandler();
    }
  }, [timerState]);

  //   For toggling ssc template modal
  const handleQuestionModal = () => {
    setQuestionModal(!questionModal);
  };

  const reportPage = async () => {
    const testResultId = testInstructions.testInfo.testResultId;
    const testPackageId = testInstructions.testInfo.testPackageId;
    try {
      if (testResultId) {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        const mainapi = `${BASE_URL}/exam/testPackage/submitTest/`;
        const payload = {
          testResultId: testResultId,
          testPackageId: testPackageId,
          timeTaken: testInstructions.testConfig.duration * 60,
        };
        const res = await axios.post(mainapi, payload, config);
        if (res.status === 200) {
          displayTimeOutPopup(true);
          localStorage.setItem('setTimeOut', 1);
          // const mainapi =
          //   'http://34.236.201.29:4000/exam/testPackage/reportAfterTest/';
          // const payload = { testResultId: testResultId };
          // const res = await axios.post(mainapi, payload, config);
          // setReportCard(res.data.data);
          // localStorage.setItem('testId', 0);
          // history.push({
          //   pathname: `/reportcard`,
          //   state: {
          //     testResultId: testResultId,
          //     testId: testInstructions.testInfo.testId,
          //     testName:  testInstructions.testInfo.testName
          //   },
          // });
          // if (document.fullscreenElement !== null) {
          //   document.exitFullscreen();
          // }
        }
      }
    } catch (error) {
      console.log('Something went wrong. Please try again later !');
    }
  };

  return (
    <>
      <header className="solution-header">
        <a href="javascript:void(0)">
          <img
            src={require('../../../../assets/images/logo.svg')}
            className="solution-logo"
            alt="Pinlist logo"
          />
        </a>
        <h3>
          {Object.keys(testInstructions).length &&
            testInstructions.testInfo.testName}
        </h3>

        <div className="solution-header-right">
          {/* FOR JEE */}
          <div className="profile-info-wrap">
            <span className="profile-pic">
              <img
                src={require('../../../../assets/images/no-image-icon-md.png')}
                alt=""
              />
            </span>
            <div className="profile-info">
              <p>
                Candidate Name: <span>{localStorage.username}</span>
              </p>
              <p>
                Subject Name:{' '}
                <span>
                  {' '}
                  {Object.keys(testInstructions).length &&
                    testInstructions.testInfo.testName}
                </span>
              </p>
            </div>
          </div>
          {/* FOR JEE END*/}

          {/* For banking and railway template */}
          {/* <p className="question-paper">
            <QuestionPaperCat /> Question Paper
          </p> */}
          <p
            className="r-instruction"
            onClick={() => {
              togglePortalInstruction(true);
            }}>
            <Info /> Instructions
          </p>
          <div className="time-left">
            <span>Total time left </span>
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
                  top: '10px',
                  right: '40px',
                  padding: '10px 47px 10px 11px',
                  opacity: '0',
                };
                getTimerState() === TIMESTATE.PLAYING && setTmrState(0);
                getTimerState() === TIMESTATE.STOPPED && setTmrState(1);
                getTimerState() === TIMESTATE.PAUSED && setTmrState(2);
                settimeSpend(Math.floor(getTime() / 1000));
                return (
                  <React.Fragment>
                    <span className="count-box">
                      <Timer.Hours />
                    </span>{' '}
                    :
                    <span className="count-box">
                      {' '}
                      <Timer.Minutes />
                    </span>{' '}
                    :
                    <span className="count-box">
                      {' '}
                      <Timer.Seconds />
                    </span>
                    <div>
                      <button style={pauseStyle} onClick={pause}>
                        Pause
                      </button>
                      <button
                        style={{ display: 'none' }}
                        id="resumeBtn"
                        onClick={resume}>
                        Pause
                      </button>

                      {/* <button
            id="resume"
            style={{
              padding: '1rem',
              background: 'red',
              zIndex: '9000',
              position: 'absolute',
            }}
            onClick={() => {
              resume();
              setPauseIndiualQuestion(true);
            }}>
            Resume
          </button> */}
                    </div>
                  </React.Fragment>
                );
              }}
            </Timer>
          </div>
          <button
            className="btn-dark-blue wd-180"
            onClick={() => {
              if (document.fullscreenElement) {
                document.exitFullscreen();
                setName('Enter Full Screen');
              } else {
                document.documentElement.requestFullscreen();
                setName('Exit Full Screen');
              }
            }}>
            {name}
          </button>
          {testInstructions?.testConfig?.testOptions.find((el) => el.optionsId === 6) !== undefined &&


            <button className="btn-dark-blue" onClick={examPauseHandler}>Pause </button>}

        </div>
        {showTimeOutPopup && (
          <TimeOutSubbmission
            testInstructions={testInstructions}
            time={timer}
          />
        )}
      </header>

      {/* For ssc template */}
      <div className="ssc-subheader">
        <h3>
          {Object.keys(testInstructions).length &&
            testInstructions.testInfo.testName}
        </h3>
        <div className="right-section">
          <span className="q-paper" onClick={handleQuestionModal}>
            Question Paper
          </span>
          <span className="q-time">Time Left:</span>
          <span className="q-timer">{/* {showTimer()} */}</span>
        </div>
      </div>

      {/* SSC template modal */}
      {questionModal && (
        <Modal addClass="ssc-modal">
          <div>
            <div className="modal-header">
              <h3>Question Paper Full View</h3>
              <span onClick={handleQuestionModal}>
                <ModalClose />
              </span>
            </div>
            <div className="modal-body">
              <h1>
                Section Title:{' '}
                {testInstructions?.sections[sectionNumber].sectionName}
              </h1>
              {questions.map((el, idx) => (
                <>
                  <span>Question No: {idx + 1}</span>
                  <h1>{ReactHtmlParser(el.langs[0].question)}</h1>
                </>
              ))}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    togglePortalInstruction: (show) => dispatch(togglePortalInstruction(show)),
  };
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber,
    resumeBtnClick: state.exam.resumeBtnClick,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainExamHeader);
