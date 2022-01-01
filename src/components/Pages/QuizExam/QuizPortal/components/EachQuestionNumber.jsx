import React, { Fragment, useState, useEffect, useRef } from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  setSingleQuestion,
  setQuestionState,
  saveAnswer,
  setloadingq
} from '../../../../../redux/quiz/quiz.actions';
import {
  selectQuizQuestions,
  selectQuestionState,
  selectSingleQuestion,
  selectQuizPortalConfig,
} from '../../../../../redux/quiz/quiz.selectors';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useHistory, withRouter } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../../../../../config';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { MobileMenu, ModalClose } from './../../../../Core/Layout/Icon';
// import PrevNextBtn from './PrevNextBtn';




const EachQuestionNumber = ({ 
  questions,
  device,
  answerState,
  singleQuestion,
  quizConfig,
  match}) => {
  const history = useHistory();
  const  slickRef = useRef();
  const dispatch = useDispatch();
  const [count, setCount] = useState(0);
  const [activeEl,setactiveEl]= useState(0);
  
  const [modalToggle, setModalToggle] = useState(false);
  const [duration, setDuration] = useState();
  var questionData=localStorage.getItem('quizquestions')?
  JSON.parse(localStorage.getItem('quizquestions')):undefined;


  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 15,
    slidesToScroll: 1,
    variableWidth: false,
    initialSlide:questionData?questionData.lastactiveindex >= 14?questionData.lastactiveindex-14:0:0,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 15
        }
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 15
        }
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 8
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 8,
          slidesToScroll: 1
        }
      }
    ]
  };

  // For setting single question
  const setQuestion = (el,indx) => {
    localStorage.setItem('quizqact', JSON.stringify(indx));
    if(localStorage.getItem('quizquestions')){
      let localQuizData= JSON.parse(localStorage.getItem('quizquestions'))
      
      localQuizData.questions.map((quiz, i) => {
        if( localQuizData.questions[localQuizData.lastactiveindex].state !=='answered' ){
          localQuizData.questions[localQuizData.lastactiveindex].state =answerState.answerNo !== -1 ? 'answered' : 'unAnswered';
        }
    });

    let finalquizdata={ 
      questions: localQuizData.questions,
      lastactiveindex:indx
    }
    localStorage.setItem('quizquestions', JSON.stringify(finalquizdata));

    }
    dispatch(setSingleQuestion(el));
    dispatch(setQuestionState(answerState));

  };

  
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
    if( localactive){
      if(localactive.lastactiveindex > 14){ slickRef.current.slickGoTo(localactive.lastactiveindex - 14);}
     else{
      slideNext()
     }
    }
    
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
  if( localactive){
    if(localactive.lastactiveindex > 14){ slickRef.current.slickGoTo(localactive.lastactiveindex - 14);}
   else{
    slideprev()
   }
  }
  }
}

const slideNext = () => {
  slickRef.current.slickNext();
}
const slideprev = () => {
  slickRef.current.slickPrev();
}

// useEffect(()=>{
//   if(localStorage.getItem('quizquestions')){
//       var localQuizDatas=JSON.parse(localStorage.getItem('quizquestions'))
//       if(localQuizDatas){
//       slickRef.current.slickGoTo(localQuizDatas?.lastactiveindex - 14);
//       }
//     }
// },[]);


  return (
    <>
    <div className="prev_next-btn">
    <button  style={{"margin":"5px"}} className="btn-warning-line" onClick={prevCount}>
        Previous
      </button>
      <button style={{"margin":"5px"}} className="btn-warning-line" onClick={nextCount}>
        Next
      </button>
    </div>
    {/* <PrevNextBtn answerState={props.answerState}  match={props.match}/> */}
    {device=='desktop' ? <Slider ref={slickRef} {...settings}>
        { questionData !== undefined &&
           questionData.questions.map((el, idx) => {
            // let value = addClass(el, idx);
            return (
              <div
              className={el.state==='answered'?"green-bg":el.state==="unAnswered"?"red-bg":"lightblue-bg"}
                // className={
                //   value?.indx === idx
                //     ? value?.state === 'answered'
                //       ? 'green-bg'
                //       : 'red-bg'
                //     : 'lightblue-bg'
                // }
                onClick={() => setQuestion(el,idx)}>
                {el.questionSerialNo + 1  }
              </div>
            );
          })}
      </Slider> : <>
        {questions !== undefined &&
          questions.map((el, idx) => {
            return (
              <span className="lightblue-bg" onClick={() => setQuestion(el,idx)}>{el.questionSerialNo + 1 }</span>
            );
          })}
          </>
     }
     {modalToggle || duration <= 0 ? (
        <Modal addClass="Submit-quiz-Modal modal-sm">
         
          <h2 style={{fontSize: '14px',fontWeight: 'bold',padding: '10px',color: 'black'}}>
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
      
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectQuizQuestions,
  questionState: selectQuestionState,
  singleQuestion: selectSingleQuestion,
  quizConfig: selectQuizPortalConfig,
});

export default connect(mapStateToProps)(EachQuestionNumber);
