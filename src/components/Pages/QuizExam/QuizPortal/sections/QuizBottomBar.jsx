import React, { useState, useEffect } from 'react';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { MobileMenu, ModalClose } from './../../../../Core/Layout/Icon';
import EachQuestionNumber from './../components/EachQuestionNumber';
import axios from 'axios';
import { BASE_URL } from './../../../../../config';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectQuizPortalConfig } from './../../../../../redux/quiz/quiz.selectors';
import { useHistory, withRouter } from 'react-router-dom';
// import PrevNextBtn from '../components/PrevNextBtn'


const QuizBottomBar = ({
  modaToggleHandler,
  answerState,
  quizConfig,
  match,
}) => {
  const [modalToggle, setModalToggle] = useState(false);
  
// QUIZ MOBILE FOOTER TOGGLE
const [quizFooter, setquizFooter] = useState(false);
const quizFooterTooggle = () => {
  setquizFooter(!quizFooter)
}

  const history = useHistory();

    // For submitting the test
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

  return (
    <>
    {/* <PrevNextBtn answerState={answerState}  match={match}/> */}
      <div className="quiz-footer">
        <div className="left-container">
          <div className="ans-type">
            <p className="ans">Answered</p>
            <p className="unans">Unanswered</p>
            <p className="notseen">Not Seen</p>
          </div>

          <div className="list">
            <EachQuestionNumber  answerState={answerState} match={match} device="desktop"/>
          </div>

          <span className="viewAll" onClick={modaToggleHandler}>
            View All Questions
          </span>
        </div>

        <button
          className="btn-primary"
          onClick={() => setModalToggle(!modalToggle)}>
          Submit Quiz
        </button>
      </div>

      {modalToggle  ? (
        <Modal addClass="Submit-quiz-Modal modal-sm">
         
            <span
              onClick={() => setModalToggle(false)}
              className="close"
            >
              <ModalClose />
            </span>
        

          <h2> 
             Do you want to submit the quiz ? 
          </h2>
          <div className="btn-group">
          
              <button
                className="btn-grey"
                onClick={() => setModalToggle(false)}
                 style={{marginRight:"25px"}}>
                No
              </button>
            

            <button className="btn-primary radius" onClick={handleSubmitClick}>
              Yes
            </button>
          </div>
        </Modal>
      ) : null}

      {/* QUIZ FOOTER MOBILE */}
       <div className="quiz-footer-toggle" onClick={quizFooterTooggle}>
         <MobileMenu/>
       </div>
        <div className={`quiz-footer-mobile-wrapper ${quizFooter ? 'open' : ''}`}>
          <div className="ans-type">
            <p className="ans">Answered</p>
            <p className="unans">Unanswered</p>
            <p className="notseen">Not Seen</p>
          </div>
          <div className="ans-list">

          <EachQuestionNumber answerState={answerState} device="mobile"/>
             
               {/* <span className="lightblue-bg" >{el.questionSerialNo +1 }</span> */}
                
                
             
          

           
           
          </div>
        </div>
      {/* QUIZ FOOTER MOBILE END*/}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  quizConfig: selectQuizPortalConfig,
});

export default withRouter(connect(mapStateToProps)(QuizBottomBar));
