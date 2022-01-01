import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { disableShortCuts } from "./../../../../utils/DisableShortCut";
import MainExamHeader from "./MainExamHeader";
import MainExamBody from "./MainExamBody";
import MainExamSideInfo from "./MainExamSideInfo";
import { connect } from "react-redux";
import axios from "axios";
import {

  getExamResult,
  getReportQuestion,
  setReportCardData,
  getTestSummary,
  setTimerState,
  setTimeTaken,
} from "./../../../../redux/actions/exam";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { Redirect } from "react-router-dom";
import { teamplateList } from "../../Global/Constant";

const MainExam = ({
  testInstructions,
  sectionNumber,
  currentQuestionIndex,
  sectionWiseQuestion,
  getInstructions,
  getExamResult,
  getTestInstructions,
  getReportQuestion,
  loading,
  match,
  history,
  getTestSummary,
  setTimerState,
  flagPauseExam,
  teamplate,
}) => {
  //   For Each Question Timer
  const [time, setTime] = useState({ s: 0, m: 0, h: 0 });
  const [interv, setInterv] = useState();
  const [btnName, setBtnName] = useState("Submit Test");
  const [submitModal, setsubmitModal] = useState(false);
  const [pauseTime, setPauseTime] = useState({ s: 0, m: 0, h: 0 });
  const [timeTaken, setTimeTaken] = useState(0);
  const location = useLocation();

  useEffect(() => {
    window.onpopstate = () => {
      if (window.confirm("Do you want to go to Test Package Listing")) {
        console.log(testInstructions);
        if (testInstructions && testInstructions.testInfo) {
          window.location.href = `/testdetails/${testInstructions.testInfo.testPackageId}`;
        }
      }
    };

  });


  const submitModalHandler = () => {
    setsubmitModal(!submitModal);
  };
  const closeModalHandler = () => {
    setsubmitModal(false);
  };

  const [open, setopen] = useState(false);
  const toggleOpenClass = (open) => {
    setopen(open);
  };

  useEffect(() => {
    if (localStorage.getItem("testId")) {
     
      localStorage.setItem("testStarted", 1);
      getExamResult(localStorage.getItem("testId"));
      // getInstructions(match.params.id);
      getReportQuestion();

      return () => {
        if (parseInt(localStorage.getItem("testStarted"))) {
          history.goForward();
        }
      };
    } else {
      history.push("/nomatch");
    }
  }, []);

  useEffect(() => {
    // disableShortCuts();

    return () => {
      // window.onbeforeunload = null;
    };
  }, []);

  /**
   * For setting submit button and modal button name
   */
  useEffect(() => {
    if (testInstructions && testInstructions.sections) {
      if (sectionNumber === testInstructions.sections.length - 1) {
        setBtnName("Submit Test");
      }
    }
  }, [sectionNumber]);

  /**
   * For Showing the previous time of the question
   */
  useEffect(() => {
    if (
      sectionNumber &&
      testInstructions &&
      testInstructions.sections &&
      testInstructions.sections[sectionNumber]
    ) {
      let sg =
        testInstructions.sections[sectionNumber].questions[
          currentQuestionIndex - 1
        ];

      reset();
      if (sg) {
        const value = sectionWiseQuestion.find(
          (element) =>
            element.sIndex === sectionNumber && element.qIndex === sg.id
        );

        if (value !== undefined) {
          let num = parseInt(value.time);
          let h = Math.floor(num / 3600);
          let m = Math.floor((num % 3600) / 60);
          let s = Math.floor((num % 3600) % 60);

          setTime({ s: s, m: m, h: h });
        } else {
          setTime({ s: 0, m: 0, h: 0 });
        }
      } else {
        setTime({ s: 0, m: 0, h: 0 });
      }
    }
  }, [currentQuestionIndex, sectionNumber]);

  /**
   * To start the question timer
   */
  const start = () => {
    //run();
    setInterv(setInterval(run, 1000));
  };

  /**
   * Reset the timer
   */
  const reset = () => {
    clearInterval(interv);
    setTime({ s: 0, m: 0, h: 0 });
  };

  //   Assigning time to variables
  let updatedS = time.s;
  let updatedM = time.m;
  let updatedH = time.h;

  const run = () => {
    if (updatedM === 59) {
      updatedH++;
      updatedM = 0;
    }
    if (updatedS === 59) {
      updatedM++;
      updatedS = -1;
    }
    updatedS++;
    return setTime({ s: updatedS, m: updatedM, h: updatedH });
  };

  const setReportCard = (reaportData) => setReportCardData(reaportData);

  const examPauseHandler = () => {
    getTestSummary(testInstructions.testInfo.testResultId);
    setTimerState(true, false);
    submitModalHandler();
    setPauseTime(time);
  };
  const setResumeBtnClick = (flag, resumeBtnClk) => {
    setTimerState(flag, resumeBtnClk);
    setTime(pauseTime);
  };

  const setTimeTakenToStore = (timeSpend) => setTimeTaken(timeSpend);

  const createTeamplateList = () => {
    switch (teamplate && teamplate.toLowerCase()) {
      case teamplateList.SSC:
      // return 'template-ssc';
      //   case teamplateList.BANKING:
      //   case teamplateList.RAILWAY:
      //     return 'template-railway';
      //   case teamplateList.CAT:
      //   case teamplateList.GATE:
      //     return 'template-railway cat';
      //   case teamplateList.JEE:
      //     return 'template-jee';
      default:
        return "";
    }
  };

  const testInstOnPopup = () => {
    switch (teamplate && teamplate.toLowerCase()) {
      //   case teamplateList.BANKING:
      //   case teamplateList.RAILWAY:
      //   case teamplateList.CAT:
      //   case teamplateList.GATE:
      //     return true;

      default:
        return false;
    }
  };

  return (
    <>
      {loading || parseInt(localStorage.getItem("inReport")) ? (
        <div style={{ minHeight: "100vh" }}>
          <Loader
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
            type="Oval"
            color="#FF7249"
            height={40}
            width={40}
          />
        </div>
      ) : (
        <>
          {/* template-railway  cat */}
          <div
            className={`testQuestions-wrapper ${createTeamplateList()} ${
              open ? "open" : ""
            }`}
          >
            <MainExamHeader
              timer={time}
              setReportCard={setReportCard}
              examPauseHandler={examPauseHandler}
              setResumeBtnClick={setResumeBtnClick}
              setTimeTakenToStore={setTimeTakenToStore}
            />
            <MainExamBody
              testId={localStorage.getItem("testId")}
              // testId={match.params.id}
              time={(!flagPauseExam && time) || pauseTime}
              start={start}
              interv={interv}
              reset={reset}
              btnName={btnName}
              submitModal={submitModal}
              closeModalHandler={closeModalHandler}
              toggleOpenClass={toggleOpenClass}
              submitModalHandler={submitModalHandler}
              timeTaken={timeTaken}
              reset={reset}
              time={(!flagPauseExam && time) || pauseTime}
              btnName={btnName}
              submitModalHandler={submitModalHandler}
              testInstOnPopup={testInstOnPopup()}
            />
            <MainExamSideInfo
              reset={reset}
              time={(!flagPauseExam && time) || pauseTime}
              btnName={btnName}
              submitModalHandler={submitModalHandler}
            />
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.exam.loading,
    showInstruction: state.exam.showInstruction,
    sectionWiseQuestion: state.exam.sectionWiseQuestion,
    sectionNumber: state.exam.sectionNumber,
    currentQuestionIndex: state.exam.currentQuestionIndex,
    testInstructions: state.exam.testInstructions,
    flagPauseExam: state.exam.flagPauseExam,
    teamplate: state?.exam?.testInstructions?.testInfo?.template,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
   
    getExamResult: (testId) => dispatch(getExamResult(testId)),
    getReportQuestion: () => dispatch(getReportQuestion()),
    setReportCardData: (reaportData) =>
      dispatch(setReportCardData(reaportData)),
    getTestSummary: (testResultId) => dispatch(getTestSummary(testResultId)),
    setTimerState: (flag, resumeBtnClk) =>
      dispatch(setTimerState(flag, resumeBtnClk)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainExam);
