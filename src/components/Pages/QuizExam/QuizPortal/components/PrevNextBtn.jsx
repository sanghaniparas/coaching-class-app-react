import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../../../../../config';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { MobileMenu, ModalClose } from './../../../../Core/Layout/Icon';


import {
  setSingleQuestion,
  setQuestionState,
  saveAnswer,
} from '../../../../../redux/quiz/quiz.actions';
import {
  selectQuizQuestions,
  selectSingleQuestion,
  selectQuizPortalConfig,
} from '../../../../../redux/quiz/quiz.selectors';

const PrevNextBtn = ({
  questions,
  answerState,
  singleQuestion,
  quizConfig,
  match
}) => {
  //for dispatching actions
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);

  const [modalToggle, setModalToggle] = useState(false);
  const [duration, setDuration] = useState();

  // useEffect(() => {
  //   setInterval(() => {
  //     setDuration((duration) => duration - 1);
  //   }, 1000);

  //   return () => {
  //     clearInterval(duration);
  //   };
  // }, []);

  useEffect(() => {
    setInterval(() => {
      if(localStorage.getItem('QuizTime')){
      setDuration(JSON.parse(localStorage.getItem('QuizTime')));
      }
    }, 1000);

    return () => {
      clearInterval(duration);
    };
  }, []);


  const history = useHistory();
    //   For submitting the test
    const handleSubmitClick = async () => {

      let localDataQuiz=JSON.parse(localStorage.getItem('quizquestions'))
   
      if(localDataQuiz){
        localDataQuiz.questions.map((quiz, i) => {
          if(localDataQuiz.questions[localDataQuiz.lastactiveindex].state !=='answered' ){
          localDataQuiz.questions[localDataQuiz.lastactiveindex].state =
           answerState.answerNo !== -1 ? 'answered' : 'unAnswered';
          }
        });
        
        let finalquizdata={ 
          questions: localDataQuiz.questions,
          lastactiveindex:localDataQuiz.lastactiveindex
        }
        localStorage.setItem('quizquestions', JSON.stringify(finalquizdata));
      }
    
  
      // next section
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
  
        let time =
          quizConfig.duration * 60 -
          Math.floor(parseInt(localStorage.getItem('QuizTime')) / 1000);
        let submitData=JSON.parse(localStorage.getItem('quizquestions'));
  
        const body = JSON.stringify({
          quizResultId: quizConfig.quizResultId,
          timeTaken: time,
          quizAnswerData:submitData,
          completedSubmit:1,
        });
  
        try {
          const { data } = await axios.post(
            `${BASE_URL}/exam/quiz/submitQuiz`,
            body,
            config
          );
           if(data.code === 200){
             console.log(`hey`, data)
              history.push(
              `/quizreport/${match.params.id}/${quizConfig.quizResultId}`
            );
           }
           else{
             alert("something went wrong! Please submit again")
           }
         
        } catch (err) {
          console.log(err);
        }
    };

  //   For previous button
  // const prevCount = () => {
  //   if (questions !== undefined) {
  //     if (count >= 1) {
  //       setCount((count) => count - 1);
  //     }
  //   }
  //   //Saving state to store of particular question
  //   dispatch(setQuestionState(answerState));

  //   // saving answer
  //   dispatch(
  //     saveAnswer({
  //       quizResultId: quizConfig.quizResultId,
  //       quizQuestionId: singleQuestion.id,
  //       givenAnswer:
  //         answerState.answerNo !== -1
  //           ? String.fromCharCode(65 + answerState.answerNo)
  //           : '',
  //       state: answerState.answerNo !== -1 ? 'answered' : 'unAnswered',
  //     })
  //   );
  // };

  // //   For next button
  // const nextCount = () => {
  //   if (questions !== undefined) {
  //     if (count < questions.length - 1) {
  //       setCount((count) => count + 1);
  //     }
  //   }
  //   if( questions.length === count + 1){
  //     setModalToggle(true)
  //   }

  //   //Saving state to store of particular question
  //   dispatch(setQuestionState(answerState));

  //   // saving answer
  //   dispatch(
  //     saveAnswer({
  //       quizResultId: quizConfig.quizResultId,
  //       quizQuestionId: singleQuestion.id,
  //       givenAnswer:
  //         answerState.answerNo !== -1
  //           ? String.fromCharCode(65 + answerState.answerNo)
  //           : '',
  //       state: answerState.answerNo !== -1 ? 'answered' : 'unAnswered',
  //     })
  //   );
  // };

  //  For setting each question to store
  // useEffect(() => {
  //   if (questions !== undefined) {
  //     dispatch(setSingleQuestion(questions[count]));
  //   }
  // }, [count, questions]);

  // //   If returning to any previous question the again setting count value to that question index
  // useEffect(() => {
  //   if (singleQuestion !== undefined && questions !== undefined) {
  //     let findIndx = questions.findIndex((el) => el.id === singleQuestion.id);
  //     setCount(findIndx);
  //   }
  // }, [singleQuestion, questions]);


  const nextCount=()=>{
    let localDataQuiz=JSON.parse(localStorage.getItem('quizquestions'))
    if(localDataQuiz.lastactiveindex === localDataQuiz.questions.length -1){
      return setModalToggle(true)
    }
    if(localDataQuiz){
      localDataQuiz.questions.map((quiz, i) => {
        if( localDataQuiz.questions[localDataQuiz.lastactiveindex].state !=='answered' ){
        localDataQuiz.questions[localDataQuiz.lastactiveindex].state =
         answerState.answerNo !== -1 ? 'answered' : 'unAnswered';
        //  localDataQuiz.questions[localDataQuiz.lastactiveindex].givenAnswer =
        //  answerState.answerNo !== -1
        //     ? String.fromCharCode(65 + answerState.answerNo)
        //     : '';
        }
      });
      
      let finalquizdata={ 
        questions: localDataQuiz.questions,
        lastactiveindex:localDataQuiz.lastactiveindex + 1
      }
      localStorage.setItem('quizquestions', JSON.stringify(finalquizdata));
      let localactive=JSON.parse(localStorage.getItem('quizquestions'))
      dispatch(setSingleQuestion(localactive.questions[localactive.lastactiveindex]));
    }
  }

  const prevCount=()=>{
    let localDataQuiz=JSON.parse(localStorage.getItem('quizquestions'))
    if(localDataQuiz.lastactiveindex === 0){
      return ;
    }
    if(localDataQuiz){
      localDataQuiz.questions.map((quiz, i) => {
        if( localDataQuiz.questions[localDataQuiz.lastactiveindex].state !=='answered' ){
        localDataQuiz.questions[localDataQuiz.lastactiveindex].state =
         answerState.answerNo !== -1 ? 'answered' : 'unAnswered';
        //  localDataQuiz.questions[localDataQuiz.lastactiveindex].givenAnswer =
        //  answerState.answerNo !== -1
        //     ? String.fromCharCode(65 + answerState.answerNo)
        //     : '';
        }
      });
      
      let finalquizdata={ 
        questions: localDataQuiz.questions,
        lastactiveindex:localDataQuiz.lastactiveindex - 1
      }
      localStorage.setItem('quizquestions', JSON.stringify(finalquizdata));
      let localactive=JSON.parse(localStorage.getItem('quizquestions'))
    dispatch(setSingleQuestion(localactive.questions[localactive.lastactiveindex]));
    }
  }
  return (
    <div className="btn-group">
      <button className="btn-warning-line" onClick={prevCount}>
        Previous
      </button>
      <button className="btn-warning-line" onClick={nextCount}>
        Next
      </button>


      {modalToggle || duration <= 0 ? (
        <Modal addClass="Submit-quiz-Modal modal-sm">
         
          <h2 style={{fontSize: '14px',fontWeight: 'bold',padding: '10px', color: 'black'}}>
            {duration > 0
              ? 'You have reached the last question of the quiz. Do you want to submit the quiz ?'
              : 'Your time is over. Please submit your quiz'}
          </h2>
          <div className="btn-group">
            {duration > 0 && (
              <button
                className="btn-grey"
                onClick={() => setModalToggle(false)}>
                No
              </button>
            )}

            <button className="btn-primary radius" onClick={handleSubmitClick}>
              Yes
            </button>
          </div>
        </Modal>
      ) : null}


    </div>


    

  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectQuizQuestions,
  singleQuestion: selectSingleQuestion,
  quizConfig: selectQuizPortalConfig,
});

export default connect(mapStateToProps)(PrevNextBtn);
