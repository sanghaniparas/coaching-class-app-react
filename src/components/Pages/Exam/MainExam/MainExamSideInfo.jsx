import React, { useState, Fragment } from 'react';
import { connect } from 'react-redux';
import {
  getSectionSummary,
  getTestSummary,
} from './../../../../redux/actions/exam';
import SideHeader from './SideHeader';
import SideContent from './SideContent';

const MainExamSideInfo = ({
  reset,
  setQuestion,
  time,
  btnName,
  testInstructions,
  sectionNumber,
  getSectionSummary,
  getTestSummary,
  submitModalHandler,
}) => {
  const submitTest = () => {
    if (Object.keys(testInstructions).length) {
      if (
        testInstructions.testConfig.testPatternType !== 2 &&
        btnName === 'Next Section'
      ) {
        let data = {
          testResultId: testInstructions.testInfo.testResultId,
          section: testInstructions.sections[sectionNumber].sectionName,
        };
        getSectionSummary(data);
        submitModalHandler();
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
    }
  };

  return (
    <Fragment>
      <aside className="solution-sidebar">
        <div className="side-inner">
          <SideHeader />
          <SideContent
            reset={reset}
            setQuestion={setQuestion}
            time={time}
            submitTest={() => submitTest()}
          />

          <div className="side-footer">
            <button className="submit-btn" onClick={() => submitTest()}>
              {testInstructions.testConfig.testPatternType === 2 ||
              testInstructions.testConfig.testPatternType === 3
                ? 'Submit Test'
                : btnName}
            </button>
          </div>
        </div>
      </aside>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSectionSummary: (data) => dispatch(getSectionSummary(data)),
    getTestSummary: (testResultId) => dispatch(getTestSummary(testResultId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MainExamSideInfo);
