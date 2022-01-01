import React, { useEffect, useState } from 'react';
import QuizReportHeader from './../components/QuizReportHeader';
import QuizSummaryReport from './../components/QuizSummaryReport';
import QuizYourAnswers from './../components/QuizYourAnswers';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { getQuizReport } from './../../../../../redux/quiz/quiz.actions';
import { useHistory } from 'react-router-dom';
import SimilarQuiz from './SimilarQuiz';
import NavBar from './../../../../Core/NavBar/NavBar';
import TopBar from './../../../../Core/TopBar/TopBar';


const QuizReport = ({ match }) => {
  const [ locationKeys, setLocationKeys ] = useState([]);
  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
    localStorage.removeItem('quizquestions');
    localStorage.removeItem('QuizTime');
    localStorage.removeItem('pTime');
   }, []);


  useEffect(() => {
    dispatch(getQuizReport(match.params.id));
    localStorage.setItem('QuizReport', 1);

    // return () => {
    //   if (localStorage.QuizReport) {
    //     history.goForward();
    //   }
    // };
  }, []);

  useEffect(() => {
    console.log(`hgu`, "hgu")
    return () => {
      if (history.action === "POP") {
        history.push("/quiz");
      }
    };
  }, [history])

 
  return (
    <>
      <TopBar />
      <NavBar />
      <div className="quiz-wrapper">
        <QuizReportHeader match={match} />
        <div className="quiz-wrapper">
          <div className="a-container">
            <div className="quiz-report-container">
              <QuizSummaryReport match={match} />
              <QuizYourAnswers />
            </div>
          </div>
        </div>

        {/* <div className="grey-bg-box">
        <div className="a-container">
          <h2>Similar Quizzes</h2>
        </div>
      </div> */}
      </div>
      <SimilarQuiz />
    </>
  );
};

export default QuizReport;
