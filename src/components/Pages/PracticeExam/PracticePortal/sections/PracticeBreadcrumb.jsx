import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  selectPracticeChapters,
  selectResumeState,
  selectStaticPracticeQuestions,
} from '../../../../../redux/practice/practice.selectors';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';

const PracticeBreadcrumb = ({
  toggleReport,
  handleSetToggleReport,
  staticPracticeQuestions,
  practiceChapters,
  pResultId,
  resumeState,
  practiceId,
  setNewpercentage
}) => {
  const [percentage, setPercentage] = useState(0);
  const [chapterName, setChapterName] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pResultId !== null && practiceChapters ) {
      let findChapterName = practiceChapters.find(
        (el) => el.practiceSetResultId === parseInt(pResultId)
      )?.chapter;

      setChapterName(findChapterName);

      //console.log("findChapterName ***", findChapterName);
    }
  }, [practiceChapters, pResultId]);

  useEffect(() => {
    if (staticPracticeQuestions && staticPracticeQuestions.length) {
      let answeredQuestions = staticPracticeQuestions.filter(
        (el) => el.state === 'answered'
      );

      let percentageAttempted =
        (answeredQuestions.length / staticPracticeQuestions.length) * 100;

      setPercentage(percentageAttempted);
      setNewpercentage(percentageAttempted)
    }
  }, [staticPracticeQuestions]);



  const goToPracticeDetails = () => {
    window.location.href= `/practice-details/${practiceId}`
  }

  return (
    <div className="practice-bredcrum">
      <div className="a-container">
        <div className="breadcrumb-inner">
          <ul>
            <li onClick={() => history.push('/')} style={{cursor:'pointer'}}>Home</li>
            <li style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>
              Practice
            </li>
            <li style={{ cursor: 'pointer' }} onClick={() => history.goBack()}>{localStorage.getItem('subjectIndex')}</li>
            <li >
              <div>{chapterName}</div>
            </li>
          </ul>

          {toggleReport === true ? (
            <>
            <div
              className="btn-primary resume_btn"
              onClick={() => handleSetToggleReport()}>
              Resume
            </div>
            <div
            className="btn-primary go-back"
            onClick={() => goToPracticeDetails()}>
            Back to Practice Details
          </div>
          </>
          ) : (
            <div className="percent-bar">
              <p>Chapter attempted {Math.floor(percentage)}%</p>
              <div className="percentbar">
                <span
                  className="fill-inner"
                  style={{ width: `${Math.floor(percentage)}%` }}></span>
              </div>
            </div>
          )}

          {/* <div className="btn-primary" onClick={() => localStorage.setItem('practicePause', 0)}>Resume</div> */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  staticPracticeQuestions: selectStaticPracticeQuestions,
  practiceChapters: selectPracticeChapters,
});

export default connect(mapStateToProps)(PracticeBreadcrumb);
