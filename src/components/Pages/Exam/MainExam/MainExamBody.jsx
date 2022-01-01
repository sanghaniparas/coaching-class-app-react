import React, { useState, useEffect } from 'react';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import TestSubmitModal from './TestSubmitModal';
import SectionTab from './SectionTab';
import TopBar from './TopBar';
import TestBody from './../TestInstruction/TestBody';
import { ArrowDown, LineArrow } from '../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import {
  toggleInstruction,
  saveAns,
  saveSectionNumber,
  sectionWiseQuestionState,
  setCurrentQuestionIndex,
  saveReportQuestion,
  getTestSummary,
  getSectionSummary,
} from './../../../../redux/actions/exam';
import {
  verifySaveButtonVisible,
  BookMarkSolution,
} from './../../../../redux/actions/solution';
import MultipleChoice from './AllExamTypes/MultipleChoice';
import MultipleResponse from './AllExamTypes/MultipleResponse';
import MatchMatrix from './AllExamTypes/MatchMatrix';
import MatchFollowing from './AllExamTypes/MatchFollowing';
import FillUpBlanks from './AllExamTypes/FillUpBlanks';
import Essay from './AllExamTypes/Essay';
import TrueFalse from './AllExamTypes/TrueFalse';
import NoQuestion from './AllExamTypes/NoQuestion';
import QuestionPaper from './QuestionPaper';
import PortalInst from './PortalInst';
import SingleDigit from './AllExamTypes/SingleDigit';


const MainExamBody = ({
  testInstructions,
  toggleInstruction,
  showInstruction,
  saveSectionNumber,
  answer,
  saveAns,
  showQuestionPaper,
  showPortalInstruction,
  sectionWiseQuestionState,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  saveReportQuestion,
  reportOptions,
  testId,
  time,
  start,
  interv,
  reset,
  btnName,
  submitModal,
  closeModalHandler,
  submitModalHandler,
  toggleOpenClass,
  getTestSummary,
  verifySaveButtonVisible,
  BookMarkSolution,
  timeTaken,
  getSectionSummary,
  sectionNumber,
  testInstOnPopup,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [orderNo, setOrderNo] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [counter, setCounter] = useState(1);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [clearResponse, setClearResponse] = useState(null);
  const [sidebar, setsidebar] = useState(false);
  const [toggleTab, setToggleTab] = useState(false);
  const sidebarToggleHandler = () => {
    setsidebar(!sidebar);
    toggleOpenClass(!sidebar);
  };

  /**
   * Switching sections & showing interval
   */
   useEffect(() => {
    localStorage.removeItem("activeTab");
    localStorage.setItem("activeTab", activeTab);
    selectTab(activeTab);
   }, []);

  /**
   * Setting Single Question
   */
  useEffect(() => {

    if(testInstructions && testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)]){
      localStorage.setItem(
        'singleQs',
        JSON.stringify(
          testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].questions[currentQuestionIndex - 1]
        )
      );
      setSingleQuestion(
        testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].questions[currentQuestionIndex - 1]
      );
    }

   



  }, [currentQuestionIndex]);

  useEffect(() => {
    const savedQuestion = {
      testResultId: testInstructions.testInfo.testResultId,
      testQuestionId: singleQuestion.id,
    };
    verifySaveButtonVisible(savedQuestion, 'exam');
  }, [singleQuestion]);

  useEffect(() => {

    if (testInstructions && testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)]) {
    let val = fixSectionToggle(((Number(localStorage.getItem("activeTab"))) || 0), currentQuestionIndex);
    if (val > 0) {
      localStorage.setItem(
        'singleQs',
        JSON.stringify(
          testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].questions[
          currentQuestionIndex - 1 - val
          ]
        )
      );
      return setSingleQuestion(
        testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].questions[
        currentQuestionIndex - 1 - val
        ]
      );
    }
    localStorage.setItem(
      'singleQs',
      JSON.stringify(
        testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].questions[currentQuestionIndex - 1]
      )
    );
    setSingleQuestion(
      testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].questions[currentQuestionIndex - 1]
    );

  }
  }, [toggleTab]);

  /**
   * For fixing issue when toggling section tabs
   */
  const fixSectionToggle = (no, len) => {
    if(testInstructions && testInstructions.sections[no]){
      let sectionLength = testInstructions.sections[no].questions.length;
      return len - sectionLength;
    }
   
  };

  /**
   * Save Question and go next
   */
  const moveForward = () => {
   
    if (currentQuestionIndex < questions.length ) {
      setCounter((counter) => counter + 1);
      //   setSingleQuestion(questions[counter]);
      console.log(currentQuestionIndex + 1)
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }

    if (currentQuestionIndex === questions.length) {
      console.log("check")
      if (testInstructions.testConfig.testPatternType === 2) {
        if (((Number(localStorage.getItem("activeTab"))) || 0) !== testInstructions.sections.length - 1) {
          changeTabs();
          setCounter(1);
          setCurrentQuestionIndex(1);
          closeModalHandler();
        }

        if (((Number(localStorage.getItem("activeTab"))) || 0) === testInstructions.sections.length - 1) {
          getTestSummary(testInstructions.testInfo.testResultId);
          submitModalHandler();
        }
      }
    }
    sendAnswer();
    reset()
  };
  /**
   * Save Question and go next
   */
  const moveBackward = () => {
  
    // if()

    if (((Number(localStorage.getItem("activeTab"))) || 0) === 0) {
      if (currentQuestionIndex > 1) {
        setCounter((counter) => counter - 1);
        //   setSingleQuestion(questions[counter]);
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    }

    if (((Number(localStorage.getItem("activeTab"))) || 0) !== 0) {
      if (currentQuestionIndex > 1) {
        setCounter((counter) => counter - 1);
        //   setSingleQuestion(questions[counter]);
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }

      if (currentQuestionIndex === 1) {
        setCounter(1);
        setCurrentQuestionIndex(1);
        setActiveTab((activeTab) => ((Number(localStorage.getItem("activeTab"))) || 0) - 1);
      }
    }
  };

  /**
   * For sending answer to backend
   */
  const sendAnswer = async (state = '') => {
   

   if(localStorage.getItem("activeTab")){
    const activeTab = Number(localStorage.getItem("activeTab")) || 0;
    console.log("hiiiiiiiiii",activeTab);

     try {
      const data = {
        testResultId: testInstructions.testInfo.testResultId,
        testQuestionId: singleQuestion.id,
        givenAnswer: answer,
        section: testInstructions.sections[activeTab].sectionName,
        languageId: localStorage.getItem('langId'),
        state:
          state.length > 0
            ? 'notVisited'
            : answer.length > 0
              ? 'answered'
              : 'notAnswered',
        questionTime: (time.m * 60 + time.s).toString(),
      };
      if (state.length === 0) {
        saveAns(data);
      }
    } catch (err) {
      console.log(err);
    }
   }


 
  };

  /**
   * Mark For Review and move next
   */
  const markAndNext = () => {
    if (currentQuestionIndex <= questions.length - 1) {
      setCounter((counter) => counter + 1);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
    if (currentQuestionIndex === questions.length) {
      if (testInstructions.testConfig.testPatternType === 2) {
        if (((Number(localStorage.getItem("activeTab"))) || 0) !== testInstructions.sections.length - 1) {
          changeTabs();
          setCounter(1);
          setCurrentQuestionIndex(1);
          closeModalHandler();
        }
        // if (activeTab === testInstructions.sections.length - 1) {
        //   getTestSummary(testInstructions.testInfo.testResultId);
        //   submitModalHandler();
        // }
      }
    }

    sendAnswer2();
  };

  /**
   * For sending answer to backend
   */
  const sendAnswer2 = async (state = '') => {
    if(localStorage.getItem("activeTab")){
      const activeTab =localStorage.getItem("activeTab") || 0;
    try {
      const data = {
        testResultId: testInstructions.testInfo.testResultId,
        testQuestionId: singleQuestion.id,
        givenAnswer: answer,
        section: testInstructions.sections[((Number(localStorage.getItem("activeTab"))) || 0)].sectionName,
        languageId: localStorage.getItem('langId'),
        state:
          state.length > 0
            ? 'notVisited'
            : answer.length > 0
              ? 'markedAnswered'
              : 'marked',
        questionTime: (time.m * 60 + time.s).toString(),
      };
      if (state.length === 0) {
        saveAns(data);
      }
    } catch (err) {
      console.log(err);
    }
  } 
  };

  const changeTabs = () => {
    setActiveTab((activeTab) => activeTab + 1);
  };


  const selectTab = (activeTab) => {
    localStorage.setItem("activeTab", activeTab);
    saveSectionNumber(activeTab);
    setCurrentQuestionIndex(1);
    if (testInstructions && testInstructions.sections[activeTab]) {
    setQuestions(
      testInstructions.sections.filter(
        (el) => el.orderNo === testInstructions.sections[activeTab].orderNo
      )[0].questions
    );

    // setSingleQuestion(testInstructions.sections[activeTab].questions[0]);

    if (activeTab > 0) {
      sendAnswer('notVisited');
      sendAnswer2('notVisited');
      setCounter(1);
      if (testInstructions && testInstructions.testConfig.instructionStatus === 1) {
        toggleInstruction(true);
        toggleOpenClass(true);
        setTimeout(() => {
          toggleInstruction(false);
          toggleOpenClass(false);
        }, parseInt(testInstructions.testConfig.intervalTime) * 1000);
      }
    }
    if (testInstructions.testConfig.instructionStatus === 1) {
      const interval = setInterval(() => {
        setActiveTab((activeTab) => activeTab + 1);
        setOrderNo((orderNo) => orderNo + 1);
      }, parseInt(testInstructions.sections[activeTab].sectionTime) * 60000);

      if (activeTab === testInstructions.sections.length - 1) {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }
  };



  const toggleSectionTabs = (tabNo) => {
    localStorage.setItem("activeTab", tabNo);
    selectTab(tabNo);
    setActiveTab(tabNo);
    setToggleTab(!toggleTab);
  };

  const switchSection = () => {
    if ((Number(localStorage.getItem("activeTab")) || 0) !== testInstructions.sections.length - 1) {
      changeTabs();
      setCounter(1);
      setCurrentQuestionIndex(1);
      closeModalHandler();
    }
  };

  const setReportQuestion = (
    testQuestionId,
    questionReportsTypeId,
    otherIssueDesc
  ) => {
    const report = {
      testId: testId,
      testQuestionId,
      questionReportsTypeId,
      testPackageId: testInstructions.testInfo.testPackageId,
      otherIssueDesc,
      packageType: testInstructions.testInfo.packageType,
    };
    saveReportQuestion(report);
  };

  const SaveSolution = () => {
    const savedQuestion = {
      testResultId: testInstructions.testInfo.testResultId,
      testQuestionId: singleQuestion.id,
    };
    BookMarkSolution(savedQuestion, 'exam');
  };

  const chkLastQuestion = () => 
    singleQuestion.questionSerialNo === questions.length &&
    testInstructions.sections.length === ((Number(localStorage.getItem("activeTab"))) || 0) + 1 &&
    true;

    

  const chkFirstQuestion = () =>
  ((Number(localStorage.getItem("activeTab"))) || 0) === 0 && singleQuestion.questionSerialNo === 1 && true;

  const submitTest = () => {
    if (Object.keys(testInstructions).length) {
      if (
        testInstructions.testConfig.testPatternType !== 2 &&
        btnName === 'Next Section'
      ) {
        if(testInstructions && testInstructions.sections[sectionNumber]){
          let data = {
            testResultId: testInstructions.testInfo.testResultId,
            section: testInstructions.sections[sectionNumber].sectionName,
          };

          console.log(data)
          getSectionSummary(data);
          submitModalHandler();
        }
        
        
      }

      if (
        testInstructions.testConfig.testPatternType !== 2 &&
        btnName === 'Submit Test'
      ) {
        getTestSummary(testInstructions.testInfo.testResultId);
        submitModalHandler();
      }

      if (testInstructions.testConfig.testPatternType === 2) {
        getTestSummary(testInstructions.testInfo.testResultId);
        submitModalHandler();
      }
      localStorage.removeItem('activeTab');
    }
     
  };

  return (
    <>
      <div className="solution-app-content">
        <div className="next-btn" onClick={sidebarToggleHandler}>
          <LineArrow />
        </div>
        <SectionTab
          activeTab={activeTab}
          toggleSectionTabs={toggleSectionTabs}
          time={time}
          singleQuestion={singleQuestion}
        />

        {showInstruction || showQuestionPaper || showPortalInstruction ? (
          showPortalInstruction ? (
            <>
              <PortalInst testInstOnPopup={testInstOnPopup} />
            </>
          ) : showQuestionPaper ? (
            <QuestionPaper
              reportOptions={reportOptions}
              singleQuestion={singleQuestion}
              setReportQuestion={setReportQuestion}
              SaveSolutionQuestion={SaveSolution}
            />
          ) : (
                <TestBody
                  testInstructions={testInstructions}
                  showInstruction={showInstruction}
                  orderNo={orderNo}
                  toggleOpenClass={toggleOpenClass}
                />
              )
        ) : (
            <>
              <TopBar
                setReportQuestion={setReportQuestion}
                reportOptions={reportOptions}
                singleQuestion={singleQuestion}
                questions={questions}
                time={time}
                start={start}
                interv={interv}
                SaveSolutionQuestion={SaveSolution}
                testInstructions={testInstructions}
              />
              <div className="solution-body-content">
                {/* SSC template start */}
                <div className="ssc-body-header">
                  <h4>
                    Text Size:
                  <span className="circle">A+</span>
                    <span className="circle">A-</span>
                  </h4>
                </div>
                <div className="ssc-section-header">
                  <h4>
                    Section:{' '}
                    <strong>
                      {testInstructions?.sections[((Number(localStorage.getItem("activeTab"))) || 0)]?.sectionName}
                    </strong>
                  </h4>
                  <div className="marks-panel">
                    <span>(Right mark: {singleQuestion.positiveMark})</span>
                    <span>(Negative Mark: -{singleQuestion.negativeMark})</span>
                  </div>
                </div>
                {/* SSC template end */}

                <div className="body-scroll-area">
                  {singleQuestion.questionType === 1 ? (
                    <MultipleChoice
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 2 ? (
                    <MultipleResponse
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 3 ? (
                    <TrueFalse
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 4 ? (
                    <FillUpBlanks
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 5 ? (
                    <MatchFollowing
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 6 ? (
                    <MatchMatrix
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 7 ? (
                    <Essay
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 8 ? (
                    <SingleDigit
                      singleQuestion={singleQuestion}
                      clearResponse={clearResponse}
                      setClearResponse={setClearResponse}
                    />
                  ) : null}
                  {singleQuestion.questionType === 9 ? <NoQuestion /> : null}
                </div>
              </div>
              {/* JEE Footer */}
              <div className="jee-footer">
                {!chkLastQuestion() && (
                  <button
                    onClick={() => {
                      sectionWiseQuestionState({
                        sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                        qIndex: singleQuestion.id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? 'answered' : 'notAnswered',
                        answer,
                      });
                      moveForward();
                    }}
                    className="btn-green" >
                    Save &amp; Next 
                  </button>
                )}
                <button
                  className="btn-orange"
                  onClick={() => {
                    //reset();
                    sectionWiseQuestionState({
                      sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                      qIndex: singleQuestion.id,
                      time: '10',
                      state: answer.length > 0 ? 'markedAnswered' : 'marked',
                      answer,
                    });
                  }}>
                  Save &amp; Mark For Review
              </button>
                <button
                  className="btn-white"
                  onClick={() => setClearResponse(true)}>
                  CLEAR RESPONSE
              </button>
                <button
                  className="btn-blue"
                  onClick={() => {
                    //reset();
                    sectionWiseQuestionState({
                      sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                      qIndex: singleQuestion.id,
                      time: '10',
                      state: answer.length > 0 ? 'markedAnswered' : 'marked',
                      answer,
                    });
                    markAndNext();
                  }}>
                  MARK FOR REVIEW &amp; NEXT
              </button>
              </div>

              <div className="solution-footer">
                <div className="left-panel">
                  {/* JEE TEMPLATE FOOTER */}
                  {!chkFirstQuestion() && (
                    <button className="btn-border" onClick={moveBackward}>
                      {' '}
                    &#8810; Back{' '}
                    </button>
                  )}
                  {!chkLastQuestion() && (
                    <button
                      className="btn-border"
                      onClick={() => {
                        sectionWiseQuestionState({
                          sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                          qIndex: singleQuestion.id,
                          time: (time.m * 60 + time.s).toString(),
                          state: answer.length > 0 ? 'answered' : 'notAnswered',
                          answer,
                        });
                        moveForward();
                      }}>
                      Next &#8811;
                    </button>
                  )}
                  {/* JEE TEMPLATE FOOTER END */}
                  {/* SSC template start*/}
                  <button
                    className="ssc-prevnext-btn prev"
                    onClick={moveBackward}>
                    <span>
                      <ArrowDown />
                    </span>{' '}
                  Previous
                </button>
                  <button
                    className="ssc-prevnext-btn next"
                    onClick={() => {
                      sectionWiseQuestionState({
                        sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                        qIndex: singleQuestion.id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? 'answered' : 'notAnswered',
                        answer,
                      });
                      moveForward();
                    }}>
                    Next
                  <span>
                      <ArrowDown />
                    </span>
                  </button>
                  <div className="info-btn-group">
                    <span className="btn-yellow">Tag</span>
                    <span
                      className="btn-red"
                      onClick={() => setClearResponse(true)}>
                      Erase
                  </span>
                  </div>
                  {/* SSC template end */}

                  <button
                    className="btn-grey"
                    onClick={() => {
                      //reset();
                      sectionWiseQuestionState({
                        sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                        qIndex: singleQuestion.id,
                        time: '10',
                        state: answer.length > 0 ? 'markedAnswered' : 'marked',
                        answer,
                      });
                      markAndNext();
                    }}>
                    Mark for Review <span> &amp; Next</span>
                  </button>
                  <button
                    className="btn-grey"
                    onClick={() => setClearResponse(true)}>
                    Clear <span>Response</span>
                  </button>
                </div>

                {/* SSc template start */}
                <button
                  className="ssc-submit-btn"
                  onClick={() => {
                    getTestSummary(testInstructions.testInfo.testResultId);
                    submitModalHandler();
                  }}>
                  Submit Test
              </button>

                {/* Ssc template end */}

                {!chkLastQuestion() && (
                  <>
                   {singleQuestion.questionSerialNo === questions.length ?
                   
                   <button
                    className="btn-primary radius"
                    onClick={() => {
                      sectionWiseQuestionState({
                        sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                        qIndex: singleQuestion.id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? 'answered' : 'notAnswered',
                        answer,
                      });
                      sendAnswer();
                    }}>
                    Save
                  </button>


          :
          <button 
          className="btn-primary radius"
          onClick={() => {
            sectionWiseQuestionState({
              sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
              qIndex: singleQuestion.id,
              time: (time.m * 60 + time.s).toString(),
              state: answer.length > 0 ? 'answered' : 'notAnswered',
              answer,
            });
            moveForward();
          }} >
           {singleQuestion.questionSerialNo === questions.length ? 'Save' : 'Save & Next'}
      </button>

                 }
                   
                   
                   {/* <button 
                      className="btn-primary radius"
                      onClick={() => {
                        sectionWiseQuestionState({
                          sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                          qIndex: singleQuestion.id,
                          time: (time.m * 60 + time.s).toString(),
                          state: answer.length > 0 ? 'answered' : 'notAnswered',
                          answer,
                        });
                        moveForward();
                      }} >
                       {singleQuestion.questionSerialNo === questions.length ? 'Save' : 'Save & Next'}
                  </button> */}
                    {/* JEE SAVE BUTTON */}
                    <button className="btn-blue" onClick={() => submitTest()}>
                      {testInstructions.testConfig.testPatternType === 2
                        ? 'Submit'
                        : btnName}
                    </button>
                    {/* JEE SAVE BUTTON END*/}
                    {/* Railway submit */}
                    <button
                      className="btn-primary radius railway-submit"
                      onClick={() => submitTest()}>
                      {testInstructions.testConfig.testPatternType === 2
                        ? 'Submit'
                        : btnName}
                    </button>
                    {/* Railway submit end*/}
                  </>
                )}
                {chkLastQuestion() && (
                  <button
                    className="btn-primary radius"
                    onClick={() => {
                      sectionWiseQuestionState({
                        sIndex: ((Number(localStorage.getItem("activeTab"))) || 0),
                        qIndex: singleQuestion.id,
                        time: (time.m * 60 + time.s).toString(),
                        state: answer.length > 0 ? 'answered' : 'notAnswered',
                        answer,
                      });
                      sendAnswer();
                    }}>
                    Save
                  </button>
                )}
              </div>
            </>
          )}
      </div>
      {submitModal ? (
        <Modal addClass="submitTest">
          <TestSubmitModal
            close={closeModalHandler}
            switchSection={switchSection}
            btnName={btnName}
            timeTaken={timeTaken}
            time={time}
            singleQuestion={singleQuestion}
          />
        </Modal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    showInstruction: state.exam.showInstruction,
    answer: state.exam.answer,
    showQuestionPaper: state.exam.showQuestionPaper,
    showPortalInstruction: state.exam.showPortalInstruction,
    currentQuestionIndex: state.exam.currentQuestionIndex,
    reportOptions: state.exam.reportOptions,
    sectionSummary: state.exam.sectionSummary,
    sectionNumber: state.exam.sectionNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleInstruction: (show) => dispatch(toggleInstruction(show)),
    saveAns: (data) => dispatch(saveAns(data)),
    saveSectionNumber: (val) => dispatch(saveSectionNumber(val)),
    sectionWiseQuestionState: (obj) => dispatch(sectionWiseQuestionState(obj)),
    setCurrentQuestionIndex: (idx) => dispatch(setCurrentQuestionIndex(idx)),
    saveReportQuestion: (report) => dispatch(saveReportQuestion(report)),
    getTestSummary: (testResultId) => dispatch(getTestSummary(testResultId)),
    verifySaveButtonVisible: (savedQuestion, page) =>
      dispatch(verifySaveButtonVisible(savedQuestion, page)),
    BookMarkSolution: (savedQuestion, page) =>
      dispatch(BookMarkSolution(savedQuestion, page)),
    getSectionSummary: (data) => dispatch(getSectionSummary(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainExamBody);
