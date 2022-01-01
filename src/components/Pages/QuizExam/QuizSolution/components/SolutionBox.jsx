import React from 'react';
import { Info } from '../../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectSolutionSingleQuestion } from './../../../../../redux/quiz/quiz.selectors';
import ReactHtmlParser from 'react-html-parser';

const SolutionBox = ({ singleQuestion }) => {
  return (
    Object.keys(singleQuestion).length > 0 && (
      <div className="qst-card quiz solution">
        <div className="solution-header">
          <h5>Solution: {ReactHtmlParser(singleQuestion.correctAnswer)}</h5>
          {/* <p className="report">
            <Info /> Report
          </p> */}
        </div>
        {singleQuestion.solution === null ? (
          <p>Sorry, No solution available !</p>
        ) : (
          ReactHtmlParser(singleQuestion.solution)
        )}
      </div>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  singleQuestion: selectSolutionSingleQuestion,
});

export default connect(mapStateToProps)(SolutionBox);
