import React, { Fragment, useState, useEffect } from 'react';
import { BookMark, OptionDots } from '../../../Core/Layout/Icon';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { toggleQuestionPaper } from './../../../../redux/actions/exam';
import Question from './Question';

const QuestionPaper = ({
  testInstructions,
  sectionNumber,
  toggleQuestionPaper,
  reportOptions,
  singleQuestion,
  setReportQuestion,
  clickQuestion,
  SaveSolutionQuestion,
  languageId,
}) => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    setAllQuestions(testInstructions.sections[sectionNumber].questions);
  }, [sectionNumber]);

  useEffect(() => {
    console.log(allQuestions);
  }, [allQuestions]);

  return (
    <Fragment>
      <div className="temp-container">
        <div className="scroll-area">
          <div className="question-paper" style={{ padding: '0 2rem' }}>
            <h2 className="question-title">Question Paper</h2>
            <h3 className="subject-title">
              {testInstructions.sections[sectionNumber].sectionName}
            </h3>
            <ul className="question-list">
              {allQuestions.map((el, i) => (
                <Question
                  key={i}
                  indexKey={i}
                  element={el.langs.find((el) => el.languageId === languageId)}
                  reportOptions={reportOptions}
                  singleQuestion={singleQuestion}
                  setReportQuestion={setReportQuestion}
                  qsIndex={i}
                  SaveSolutionQuestion={SaveSolutionQuestion}
                />
              ))}
            </ul>

            <div className="solution-footer">
              <button
                className="btn-grey"
                style={{ margin: '0 auto', backgroundColor: '#ddd' }}
                onClick={() => toggleQuestionPaper(false)}>
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber,
    languageId: state.exam.languageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionPaper: (show) => dispatch(toggleQuestionPaper(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPaper);
