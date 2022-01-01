import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  toggleQuestionPaper,
  setCurrentQuestionIndex,
  sectionWiseQuestionState,
  saveAns,
  togglePortalInstruction,
} from "./../../../../redux/actions/exam";

const SideContent = ({
  time,
  time2,
  setQuestion,
  testInstructions,
  toggleQuestionPaper,
  togglePortalInstruction,
  sectionNumber,
  answer,
  currentQuestionIndex,
  sectionWiseQuestion,
  setCurrentQuestionIndex,
  sectionWiseQuestionState,
  saveAns,
  reset,
  stateCount,
  submitTest,
}) => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (testInstructions && testInstructions.sections[sectionNumber]) {
      setQuestions(testInstructions.sections[sectionNumber].questions);
    }
  }, [sectionNumber]);

  /**
   * For saving answer to backend
   */
  const sendAnswer = async () => {
    try {
      if (testInstructions) {
        const data = {
          testResultId: testInstructions.testInfo.testResultId,
          testQuestionId: questions[currentQuestionIndex - 1].id,
          givenAnswer: answer,
          section: testInstructions.sections[sectionNumber].sectionName,
          state: answer.length > 0 ? "answered" : "notAnswered",
          languageId: localStorage.getItem("langId"),
          questionTime: (time.m * 60 + time.s).toString(),
        };
        saveAns(data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="white-bg reasoning">
        <h5 className="mb-0">Section:</h5>
        <h3>{testInstructions?.sections[sectionNumber]?.sectionName}</h3>
      </div>
      <div className="answer-group default" style={{ overflowY: "auto" }}>
        <ul
          style={{
            pointerEvents: `${
              testInstructions?.testConfig?.testOptions?.find(
                (el) => el.optionsId === 1
              ) !== undefined
                ? "auto"
                : "none"
            }`,
          }}
        >
          {questions.map((el, i) => {
            let question = sectionWiseQuestion.find(
              (element) =>
                element.sIndex === sectionNumber && element.qIndex === el.id
            );
            let state = question?.state;

            if (state === "answered") {
              return (
                <li>
                  <span
                    style={{ cursor: "pointer" }}
                    className="ovl green"
                    onClick={() => {
                      sendAnswer();
                      sectionWiseQuestionState({
                        sIndex: sectionNumber,
                        qIndex: questions[currentQuestionIndex - 1].id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? "answered" : "notAnswered",
                        answer,
                      });
                      setCurrentQuestionIndex(i + 1);
                    }}
                  >
                    {i + 1}
                  </span>
                </li>
              );
            }
            if (state === "notAnswered") {
              return (
                <li>
                  <span
                    style={{ cursor: "pointer" }}
                    className="ovl-rev red"
                    onClick={() => {
                      sendAnswer();
                      sectionWiseQuestionState({
                        sIndex: sectionNumber,
                        qIndex: questions[currentQuestionIndex - 1].id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? "answered" : "notAnswered",
                        answer,
                      });
                      setCurrentQuestionIndex(i + 1);
                    }}
                  >
                    {i + 1}
                  </span>
                </li>
              );
            }
            if (state === "markedAnswered") {
              return (
                <li>
                  <span
                    style={{ cursor: "pointer" }}
                    className="rounded"
                    onClick={() => {
                      sendAnswer();
                      sectionWiseQuestionState({
                        sIndex: sectionNumber,
                        qIndex: questions[currentQuestionIndex - 1].id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? "answered" : "notAnswered",
                        answer,
                      });
                      setCurrentQuestionIndex(i + 1);
                    }}
                  >
                    {i + 1} <i className="fa fa-check"></i>{" "}
                  </span>
                </li>
              );
            }
            if (state === "marked") {
              return (
                <li>
                  <span
                    style={{ cursor: "pointer" }}
                    className="rounded"
                    onClick={() => {
                      sendAnswer();
                      sectionWiseQuestionState({
                        sIndex: sectionNumber,
                        qIndex: questions[currentQuestionIndex - 1].id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? "answered" : "notAnswered",
                        answer,
                      });
                      setCurrentQuestionIndex(i + 1);
                    }}
                  >
                    {i + 1}
                  </span>
                </li>
              );
            }
            if (state === undefined) {
              return (
                <li>
                  <span
                    style={{ cursor: "pointer" }}
                    className="radius"
                    onClick={() => {
                      sendAnswer();
                      sectionWiseQuestionState({
                        sIndex: sectionNumber,
                        qIndex: questions[currentQuestionIndex - 1].id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? "answered" : "notAnswered",
                        answer,
                      });
                      setCurrentQuestionIndex(i + 1);
                    }}
                  >
                    {i + 1}
                  </span>
                </li>
              );
            }
          })}
        </ul>

        {/* SSC template start */}
        <div className="ssc-answer-group">
          <div className="green">
            <span className="box">{`${
              stateCount.answered + stateCount.notAnswered
            }`}</span>
            Attempted
          </div>
          <div className="yellow">
            <span className="box">0</span>
            Tagged
          </div>
          <div className="purple">
            <span className="box">2</span>
            Tagged &amp; Attempted
          </div>
          <div className="white">
            <span className="box">{stateCount.notVisited}</span>
            Unattempted
          </div>
        </div>
        {/* SSC template end */}
        <div className="action-group">
          {/* CAT submit btn */}
          <button className="btn-submit" onClick={() => submitTest()}>
            Submit
          </button>
          {/* CAT submit btn end*/}
          <button
            className="btn"
            onClick={() => {
              toggleQuestionPaper(true);
              togglePortalInstruction(false);
            }}
          >
            Question Paper
          </button>
          <button
            className="btn"
            onClick={() => {
              togglePortalInstruction(true);
              toggleQuestionPaper(false);
            }}
          >
            Instruction
          </button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber,
    answerState: state.exam.answerState,
    sectionWiseQuestion: state.exam.sectionWiseQuestion,
    answer: state.exam.answer,
    currentQuestionIndex: state.exam.currentQuestionIndex,
    prevCurrentQuestionIndex: state.exam.prevCurrentQuestionIndex,
    stateCount: state.exam.stateCount,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionPaper: (show) => dispatch(toggleQuestionPaper(show)),
    togglePortalInstruction: (show) => dispatch(togglePortalInstruction(show)),
    setCurrentQuestionIndex: (idx) => dispatch(setCurrentQuestionIndex(idx)),
    sectionWiseQuestionState: (obj) => dispatch(sectionWiseQuestionState(obj)),
    saveAns: (obj) => dispatch(saveAns(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideContent);

// if (i + 1 !== currentQuestionIndex) {
// 	reset();
//   }
