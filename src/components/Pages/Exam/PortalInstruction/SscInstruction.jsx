import React, { useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useLocation, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

const SscInstruction = ({ instruction, testInstructions }) => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    localStorage.setItem('testId', testInstructions.testInfo.testId);
  }, [testInstructions]);
  return (
    <div className="test-template-outer">
      <div className="test-heading">Candidate Instruction</div>
      <div className="text-template-body">
        <h2>Test Instruction</h2>

        {ReactHtmlParser(instruction)}

        <p className="btn-area">
          <button
            className="btn-lg-green"
            onClick={() => {
              //   document.documentElement.requestFullscreen();

              window.open(
                `/exam`,
                '_blank',
                'height=' +
                  window.screen.height +
                  ',width=' +
                  window.screen.width +
                  ',location=yes,scrollbars=yes'
              );

              //   history.push({
              //     pathname: `/exam`,
              //     state: {
              //       testId: location.state.id,
              //     },
              //   });
              //history.push(`/exam/${match.params.id}`);
            }}>
            I have Read the Instruction- मैंने निर्देश पढ़े है{' '}
          </button>
        </p>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
  };
};

export default connect(mapStateToProps)(SscInstruction);
