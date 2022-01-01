import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import SummaryModal from './../components/SummaryModal';
import { LineArrow } from './../../../../Core/Layout/Icon';
import SectionTopBar from './../components/SectionTopBar';
import QuestionTopBar from './../components/QuestionTopBar';
import ViewSolutions from './../components/ViewSolutions';
import { connect } from 'react-redux';
import MultipleChoice from './../components/ExamTypes/MultipleChoice';
import MultipleResponse from './../components/ExamTypes/MultipleResponse';
import Essay from './../components/ExamTypes/Essay';
import TrueFalse from './../components/ExamTypes/TrueFalse';
import MatchMatrix from './../components/ExamTypes/MatchMatrix';
import MatchFollowing from './../components/ExamTypes/MatchFollowing';
import FillUpBlanks from './../components/ExamTypes/FillUpBlanks';
import NoQuestion from './../../MainExam/AllExamTypes/NoQuestion';
import SingleDigit from './../components/ExamTypes/SingleDigit';
import {
  saveSectionNumber,
  saveReportQuestion,
} from '../../../../../redux/actions/exam';
import QuestionPaper from '../../SolutionPage/components/QuestionPaper';

const ExamBody = ({
  sidebarToggleHandler,
  reportToggle,
  reportOptions,
  solutionData,
  saveSectionNumber,
  counter2 = 0,
  saveReportQuestion,
  showQuestionPaper,
  submitModal,
  closeModalHandler,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [counter, setCounter] = useState(1);
  const [questions, setQuestions] = useState([]);
  const [singleQuestion, setSingleQuestion] = useState({});
  const [toggleTab, setToggleTab] = useState(false);


  window.onbeforeunload = function () {
    //alert("subodh")
  };

  /**
   * Move to next question
   */
  const moveForward = () => {
    if (counter <= questions.length - 1) {
      setCounter((counter) => counter + 1);
      setSingleQuestion(questions[counter]);
    }

    if (counter === questions.length) {
      if (activeTab !== solutionData.sections.length - 1) {
        tabChangeForward();
        setCounter(1);
      }
    }
  };

  /**
   * Move to previous question
   */
  const moveBackward = () => {
    if (counter > 1) {
      setCounter((counter) => counter - 1);
    }

    if (counter === 1) {
      if (activeTab > 0) {
        tabChangeBackward();
        setCounter(solutionData.sections[activeTab].questions.length - 1);
      }
    }
  };

  /**
   * Changing section tab in forward direction
   */
  const tabChangeForward = () => {
    setActiveTab((activeTab) => activeTab + 1);
  };

  /**
   * Changing section tab in backward direction
   */
  const tabChangeBackward = () => {
    setActiveTab((activeTab) => activeTab - 1);
  };

  useEffect(() => {
    if(solutionData){
      
      setQuestions(solutionData.sections[activeTab].questions);
      saveSectionNumber(activeTab);
    }
   
  }, [activeTab]);

  /**
   * To picking up each question, with help of counter
   */
  useEffect(() => {
    if(solutionData){
      setSingleQuestion(solutionData.sections[activeTab].questions[counter - 1]);
    }
 
  }, [counter]);

  useEffect(() => {
    if (counter2 !== 0) {
      setCounter(counter2);
    }
  }, [counter2]);

  useEffect(() => {
    setCounter(1);
    let val = fixSectionToggle(activeTab, counter);
    if(solutionData){
      if (val > 0) {
        return setSingleQuestion(
          solutionData.sections[activeTab].questions[counter - 1 - val]
        );
      }
      setSingleQuestion(solutionData.sections[activeTab].questions[counter - 1]);
    }
   
  }, [toggleTab]);

  /**
   * For fixing issue when toggling section tabs
   */
  const fixSectionToggle = (no, len) => {
    if(solutionData){
      let sectionLength = solutionData.sections[no].questions.length;
      return len - sectionLength;
    }
    
  };

  const toggleSectionTabs = (tabNo) => {
    setActiveTab(tabNo);
    setToggleTab(!toggleTab);
  };

  const setReportQuestion = (
    testQuestionId,
    questionReportsTypeId,
    otherIssueDesc
  ) => {
    const report = {
      testId: solutionData.testInfo.testId,
      testQuestionId,
      questionReportsTypeId,
      testPackageId: solutionData.testInfo.testPackageId,
      otherIssueDesc,
      packageType: solutionData.testInfo.packageType,
    };
    saveReportQuestion(report);
  };

  return (
    <>
      <div className="solution-app-content">
        <div className="next-btn" onClick={sidebarToggleHandler}>
          <LineArrow />
        </div>
        <SectionTopBar
          activeTab={activeTab}
          toggleSectionTabs={toggleSectionTabs}
        />

        {showQuestionPaper ? (
          <QuestionPaper
            reportOptions={reportOptions}
            singleQuestion={singleQuestion}
            setReportQuestion={setReportQuestion}
          />
        ) : (
          <>
            <QuestionTopBar
              reportOptions={reportOptions}
              singleQuestion={singleQuestion}
              questions={questions}
              setReportQuestion={setReportQuestion}
            />

            <div className="solution-body-content">
              {singleQuestion.questionType === 1 ? (
                <MultipleChoice singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 2 ? (
                <MultipleResponse singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 3 ? (
                <TrueFalse singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 4 ? (
                <FillUpBlanks singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 5 ? (
                <MatchFollowing singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 6 ? (
                <MatchMatrix singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 7 ? (
                <Essay singleQuestion={singleQuestion} />
              ) : null}

              {singleQuestion.questionType === 8 ? (
                <SingleDigit singleQuestion={singleQuestion} />
              ) : null}
              {singleQuestion.questionType === 9 ? <NoQuestion /> : null}
              {/* <ViewSolutions /> */}
            </div>
            <div className="solution-footer">
              <div className="left-panel">
                {counter > 1 && (
                  <button
                    className="btn-grey"
                    onClick={() => {
                      moveBackward();
                    }}>
                    Previous
                  </button>
                )}
                <button
                  className="btn-grey"
                  style={{ cursor: 'default', opacity: '0' }}>
                  Clear Response
                </button>
              </div>

              {counter < questions.length && (
                <button
                  className="btn-primary radius"
                  onClick={() => {
                    moveForward();
                  }}>
                  Next
                </button>
              )}
            </div>
          </>
        )}
      </div>

      {submitModal ? (
        <Modal addClass="submitTest">
          <SummaryModal close={closeModalHandler} />
        </Modal>
      ) : null}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    solutionData: state.solution.solutionData,
    reportOptions: state.exam.reportOptions,
    showQuestionPaper: state.exam.showQuestionPaper,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveSectionNumber: (val) => dispatch(saveSectionNumber(val)),
    saveReportQuestion: (report) => dispatch(saveReportQuestion(report)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExamBody);
