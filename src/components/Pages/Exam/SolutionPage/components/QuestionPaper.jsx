import React, { Fragment, useState, useEffect } from 'react';
import { BookMark, OptionDots } from '../../../../Core/Layout/Icon';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { toggleQuestionPaper } from './../../../../../redux/actions/exam';
import Question from './Question';

const QuestionPaper = ({
  solutionData,
  sectionNumber,
  toggleQuestionPaper,
  reportOptions,
  singleQuestion,
  setReportQuestion,
  languageId,
}) => {
  const [allQuestions, setAllQuestions] = useState([]);

  useEffect(() => {
    setAllQuestions(solutionData.sections[sectionNumber].questions);
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
              {solutionData?.sections[sectionNumber].sectionName}
            </h3>
            <ul className="question-list">
              {allQuestions &&
                allQuestions.map((el, i) => (
                  <Question
                    element={el.langs.find(
                      (el) => el.languageId === languageId
                    )}
                    singleQuestion={singleQuestion}
                    reportOptions={reportOptions}
                    setReportQuestion={setReportQuestion}
                    indexKey={i}
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
    solutionData: state.solution.solutionData,
    sectionNumber: state.exam.sectionNumber,
    reportOptions: state.exam.reportOptions,
    languageId: state.exam.languageId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionPaper: (show) => dispatch(toggleQuestionPaper(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionPaper);
