import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  getPracticeReport,
  filterQuestions,
} from '../../../../../redux/practice/practice.actions';
import AttemptedReport from './../components/AttemptedReport';
import TimeSpentReport from './../components/TimeSpentReport';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPracticeReport } from '../../../../../redux/practice/practice.selectors';

const PracticeReport = ({ practiceReport, handleSetToggleReport, pResultId ,handleFilterNumber}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("pResultId", pResultId);
    dispatch(getPracticeReport(pResultId));
  }, [pResultId]);

  return (
    <div className="body-content chapter-status">
      <div className="card">
        <div className="card-header">
          <h3>Chapter Progress Status</h3>
        </div>
        <AttemptedReport />
        <TimeSpentReport />
      </div>
      <div className="card listing">
        <ul className="list-items">
          <li>
            <div className="left-info">
              <p>
                {practiceReport &&
                  practiceReport?.unseenSkippedBookmarkedCount?.countUnseen}{' '}
                Unseen
              </p>
              <span>Questions</span>
            </div>
            <button style={practiceReport?.unseenSkippedBookmarkedCount?.countUnseen === 0 ? {'pointerEvents': 'none','opacity': '0.7'}: {}}
              className="btn-primary"
              onClick={() => {
                handleFilterNumber(6);
                handleSetToggleReport();

                dispatch(filterQuestions(6));
              }}>
              Resume Practice
            </button>
          </li>
          <li>
            <div className="left-info">
              <p>
                {practiceReport &&
                  practiceReport?.unseenSkippedBookmarkedCount?.countSkipped}{' '}
                Skipped
              </p>
              <span>Questions</span>
            </div>
            <button style={practiceReport?.unseenSkippedBookmarkedCount?.countSkipped === 0 ? {'pointerEvents': 'none','opacity': '0.7'}: {}}
              className="btn-primary"
              onClick={() => {
                handleFilterNumber(4);
                handleSetToggleReport();
                dispatch(filterQuestions(4));
              }}>
              Revise
            </button>
          </li>
          <li>
            <div className="left-info">
              <p>
                {practiceReport &&
                  practiceReport?.unseenSkippedBookmarkedCount
                    ?.countBookmarked}{' '}
                Bookmarked
              </p>
              <span>Questions</span>
            </div>
            <button style={practiceReport?.unseenSkippedBookmarkedCount?.countBookmarked === 0 ? {'pointerEvents': 'none','opacity': '0.7'}: {}}
              className="btn-primary"
              onClick={() => {
                handleFilterNumber(5);
                handleSetToggleReport();
                dispatch(filterQuestions(5));
              }}>
              Revise{' '}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceReport: selectPracticeReport,
});

export default connect(mapStateToProps)(PracticeReport);
