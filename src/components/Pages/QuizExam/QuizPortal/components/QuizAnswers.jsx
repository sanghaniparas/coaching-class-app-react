import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  selectQuestionState,
  selectSingleQuestion,
} from './../../../../../redux/quiz/quiz.selectors';
import PrevNextBtn from './PrevNextBtn';
import QuizBottomBar from './../sections/QuizBottomBar';
import AnalysisModal from './AnalysisModal';

const QuizAnswers = ({ singleQuestion, questionState, match }) => {
  // For modal toggle
  const [toggleModal, settoggleModal] = useState(false);

  //   For toggling the question analysis modal
  const modaToggleHandler = () => {
    settoggleModal(!toggleModal);
  };
  const modalCloseHandler = () => {
    settoggleModal(false);
  };
  
  //-----------------------------------------------------------------

  //   For saving answer state
  const [answerState, setAnswerState] = useState({
    questionId: -1,
    answerNo: -1,
  });

  //   For finding the question and saving answer state
  useEffect(() => {
    if (singleQuestion !== undefined && questionState !== undefined) {
      let findQs = questionState.find(
        (el) => el.questionId === singleQuestion.id
      );

      if (findQs === undefined)
        setAnswerState({ questionId: singleQuestion.id, answerNo: -1 });

      if (findQs !== undefined) setAnswerState(findQs);
    }
  }, [singleQuestion, questionState]);

  //   When clicking each answer option
  const clickAnswerSelect = (singleQs, idx) => {
     setAnswerState({ questionId: singleQs.id, answerNo: idx });
     let localDataQuiz=JSON.parse(localStorage.getItem('quizquestions'))
     if(localDataQuiz){
       localDataQuiz.questions.map((quiz, i) => {
         if(quiz.id===singleQs.id){
           localDataQuiz.questions[i].state ='answered' ;
           localDataQuiz.questions[i].givenAnswer= String.fromCharCode(65 + idx);
           localDataQuiz.questions[i].isCorrect= String.fromCharCode(65 + idx).toLowerCase() === localDataQuiz.questions[i].correctAnswer?1:0;
           
         }
         localStorage.setItem('quizquestions', JSON.stringify(localDataQuiz));
       });
     }
  };

  var localDataQuizcss
  if(localStorage.getItem('quizquestions')){
    localDataQuizcss=JSON.parse(localStorage.getItem('quizquestions'))
  }
  var activecss
  if(localDataQuizcss){
     activecss=localDataQuizcss.questions.find(q=>q.id===singleQuestion.id)
    console.log(`activecss`,activecss)
  }
  console.log(`activecss`, activecss)
  return (
    singleQuestion ? Object.keys(singleQuestion).length > 0 && (
      <>
        {singleQuestion?.langs[0]?.answer.map((el, idx) => {
          return (
            <div
              className={
                // answerState.answerNo === idx ? 'qst-card success' : 'qst-card'
                activecss?activecss.state==='answered' &&
                activecss.givenAnswer===String.fromCharCode(65 + idx)?"qst-card success":"qst-card":null
              }
              onClick={() => {
                
                clickAnswerSelect(singleQuestion, idx);
              }}>
              <div className="qst-left">
                <span className="ans-number">
                  {String.fromCharCode(65 + idx)}
                </span>
                <p>{ReactHtmlParser(el.answer)}</p>
              </div>
            </div>
          );
        })}

        {/* <PrevNextBtn answerState={answerState}  match={match}/> */}

        <QuizBottomBar
          modaToggleHandler={modaToggleHandler}
          answerState={answerState}
        />
        {toggleModal && <AnalysisModal modalCloseHandler={modalCloseHandler} />}
      </>
    ): null
  );
};

const mapStateToProps = createStructuredSelector({
  singleQuestion: selectSingleQuestion,
  questionState: selectQuestionState,
});

export default connect(mapStateToProps)(QuizAnswers);
