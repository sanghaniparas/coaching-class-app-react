import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toggleQuestionPaper } from './../../../../../redux/actions/exam';

const SideInfo = ({
  solutionData,
  sectionNumber,
  setValue,
  toggleQuestionPaper,
  submitModalHandler,
}) => {
  const [questions, setQuestions] = useState([]);
  const [sectionData, setSectionData] = useState({});

  const history = useHistory();

  useEffect(() => {
    if(solutionData && solutionData.sections[sectionNumber]){
      setQuestions(solutionData.sections[sectionNumber].questions);
      setSectionData(solutionData.sections[sectionNumber]);
      console.log(solutionData)
    }
    
  }, [sectionNumber]);

  return (
    <>
      <aside className="solution-sidebar">
        <div className="side-inner">
          <div className="side-header">
            <div className="profile-info">
              <span className="avatar">
                <img
                  src={require('../../../../../assets/images/no-image-icon-md.png')}
                  alt=""
                />
              </span>
              <h4>{localStorage.getItem('username')}</h4>
            </div>
          </div>
          <div className="answer-group">
            <ul>
              <li>
                <span className="ovl green">
                  {Object.keys(sectionData).length > 0 &&
                    sectionData.statesCount.answered}
                </span>{' '}
                Answered
              </li>
              <li>
                <span className="rounded">
                  {Object.keys(sectionData).length > 0 &&
                    sectionData.statesCount.markedAnswered}{' '}
                  <i className="fa fa-check"></i>{' '}
                </span>{' '}
                Marked &amp; Answered
              </li>
              <li>
                <span className="rounded">
                  {Object.keys(sectionData).length > 0 &&
                    sectionData.statesCount.marked}
                </span>{' '}
                Marked
              </li>
              <li>
                <span className="ovl-rev red">
                  {Object.keys(sectionData).length > 0 &&
                    sectionData.statesCount.notAnswered}
                </span>{' '}
                Not Answered
              </li>
              <li>
                <span className="radius red">
                  {Object.keys(sectionData).length > 0 &&
                    sectionData.statesCount.notVisited}
                </span>{' '}
                Not Visited
              </li>
            </ul>
          </div>
          <div className="white-bg reasoning">
            {solutionData?.testConfig?.testPatternType !== 3 && (<>
              <h5 className="mb-0">Section:</h5>
              <p>
                {Object.keys(sectionData).length > 0 && sectionData.sectionName}
              </p> </>)}
          </div>
          <div className="answer-group default">
            <ul>
              {questions.map((el, i) => {
                let state = el.state;

                if (state === 'answered') {
                  return (
                    <li>
                      <span
                        style={{ cursor: 'pointer' }}
                        className="ovl green"
                        onClick={() => setValue(i + 1)}>
                        {i + 1}
                      </span>
                    </li>
                  );
                }
                if (state === 'notAnswered') {
                  return (
                    <li>
                      <span
                        style={{ cursor: 'pointer' }}
                        className="ovl-rev red"
                        onClick={() => setValue(i + 1)}>
                        {i + 1}
                      </span>
                    </li>
                  );
                }
                if (state === 'markedAnswered') {
                  return (
                    <li>
                      <span
                        style={{ cursor: 'pointer' }}
                        className="rounded"
                        onClick={() => setValue(i + 1)}>
                        {i + 1} <i className="fa fa-check"></i>{' '}
                      </span>
                    </li>
                  );
                }
                if (state === 'marked') {
                  return (
                    <li>
                      <span
                        style={{ cursor: 'pointer' }}
                        className="rounded"
                        onClick={() => setValue(i + 1)}>
                        {i + 1}
                      </span>
                    </li>
                  );
                }
                if (state === 'notVisited') {
                  return (
                    <li>
                      <span
                        style={{ cursor: 'pointer' }}
                        className="radius"
                        onClick={() => setValue(i + 1)}>
                        {i + 1}
                      </span>
                    </li>
                  );
                }
              })}
            </ul>
            <div className="action-group">
              <button
                className="btn"
                onClick={() => {
                  toggleQuestionPaper(true);
                }}>
                Question Paper
              </button>
              <button
                className="btn"
                onClick={() => {
                  submitModalHandler();
                }}>
                Summary
              </button>
            </div>
          </div>
          <div className="side-footer">
            <button
              className="submit-btn"
              onClick={() => {
                if(solutionData && solutionData.testInfo && solutionData.testInfo.testResultId){
                  history.push({
                    // pathname: `/reportcard/${solutionData.testInfo.testId}/${testResultId}`,
                    pathname: `/report-card`,
                    state: {
                      testResultId: solutionData?.testInfo?.testResultId,
                      testId: solutionData?.testInfo?.testId},
                      testName: solutionData?.testInfo?.testName,
                    })
                   // localStorage.setItem('testResultId',solutionData?.testInfo?.testResultId);
                    
                }
                
                
              }}>
              View Analysis
            </button>
            {/* <button className="submit-btn ml-10">Detailed Report</button> */}
          </div>
        </div>
      </aside>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    solutionData: state.solution.solutionData,
    sectionNumber: state.exam.sectionNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleQuestionPaper: (show) => dispatch(toggleQuestionPaper(show)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SideInfo);
