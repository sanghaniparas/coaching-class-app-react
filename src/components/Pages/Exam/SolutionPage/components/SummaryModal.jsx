import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toggleQuestionPaper } from './../../../../../redux/actions/exam';
import { connect } from 'react-redux';
import axios from 'axios';
import { BASE_URL } from './../../../../../config';

const SummaryModal = ({ close, toggleQuestionPaper, solutionData }) => {
  const [solutionSummary, setSolutionSummary] = useState([]);
  const history = useHistory();

  useEffect(() => {
    (async function fetchSolutionSummary() {
      const payload = {
        testResultId: solutionData.testInfo.testResultId,
      };
      try {
        const response = await axios.post(
          `${BASE_URL}/exam/testPackage/solutionSummary`,
          payload
        );

        setSolutionSummary(response.data.data);
      } catch (err) {
        console.log(err);
      }
    })();
    toggleQuestionPaper(false);
  }, []);

  return (
    <Fragment>
      <div className="modal-header">
        <h3>Test Exam Summary</h3>
      </div>
      <div className="modal-body">
        <table className="table">
          <thead>
            <tr>
              <th>Section Name</th>
              <th>No. of Questions</th>
              <th>Correct</th>
              <th>Incorrect</th>
              <th>Skipped</th>
              <th>Marks</th>
            </tr>
          </thead>
          <tbody>
            {solutionSummary.map((item, i) => (
              <tr key={item}>
                {solutionData.testConfig.testPatternType !== 3 ? (<td>{item.section}</td>) : (<td>none</td>)}
                <td>{item.totalQuestionCount}</td>
                <td>{item.correctQuestionCount}</td>
                <td>{item.incorrectQuestionCount}</td>
                <td>{item.skipQuestionCount}</td>
                <td>{item.score}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colspan="5">Total Marks :</th>
              <th>
                {solutionSummary.reduce(
                  (accumulator, currentValue) =>
                    accumulator + parseInt(currentValue.score),
                  0
                )}
              </th>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="modal-footer">
        <div className="btn-group">
          <button className="btn-grey" onClick={close}>
            Cancel
          </button>
          <button
            className="btn-primary radius"
            onClick={() => {
              history.goBack();
            }}>
            Go to Test Analysis
          </button>
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    solutionData: state.solution.solutionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionPaper: (show) => dispatch(toggleQuestionPaper(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SummaryModal);
