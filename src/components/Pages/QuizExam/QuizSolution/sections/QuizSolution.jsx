import React, { useEffect } from 'react';
import {
  setSingleQuestion,
  getSolutionData,
  getQuizPortalData,
} from './../../../../../redux/quiz/quiz.actions';
import { useDispatch, connect } from 'react-redux';
import QuizSolutionHeader from './QuizSolutionHeader';
import QuizSolutionQuestionWrapper from './QuizSolutionQuestionWrapper';
import { selectSolutionQuestions } from '../../../../../redux/quiz/quiz.selectors';
import { createStructuredSelector } from 'reselect';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const QuizSolution = ({ match, questions }) => {
  // For dispatching actions
  const dispatch = useDispatch();

  // For fetching quiz questions data
  useEffect(() => {
    dispatch(getSolutionData(match.params.id));
    // dispatch(getQuizPortalData(Number(localStorage.getItem('quizId'))));
    localStorage.removeItem('QuizReport');
  }, []);

  //   For loading first question
  useEffect(() => {
    if (questions !== undefined) {
      dispatch(setSingleQuestion(questions[0]));
    }
  }, [questions]);

  return questions === undefined ? (
    <div style={{ minHeight: '100vh' }}>
      <Loader
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
        type="Oval"
        color="#FF7249"
        height={40}
        width={40}
        timeout={3000} //3 secs
      />
    </div>
  ) : (
    <div className="quiz-wrapper quiz-solution-wrapper">
      <QuizSolutionHeader />
      <QuizSolutionQuestionWrapper questions={questions} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectSolutionQuestions,
});

export default connect(mapStateToProps)(QuizSolution);
