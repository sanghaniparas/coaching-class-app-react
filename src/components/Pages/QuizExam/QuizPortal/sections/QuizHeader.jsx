import React, { useEffect, useState } from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import Countdown from 'react-countdown';
import Timer from 'react-compound-timer';
import { ModalClose } from '../../../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectQuizPortalConfig, } from './../../../../../redux/quiz/quiz.selectors';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import axios from 'axios';
import { BASE_URL } from './../../../../../config';
import {
  PauseIcon,
} from '../../../../Core/Layout/Icon';

const QuizHeader = ({ headData,timerStart,pausetime,quizConfig,match }) => {
  const [time, setTime] = useState();
  const [modalToggle, setModalToggle] = useState(false);
  const history = useHistory();


  useEffect(() => {
  
      setInterval(() => {
        setTime(headData?.quizTimeRemaining  - JSON.parse(localStorage.getItem('QuizTime')/60000))
      }, 1000);

    

    return () => {
      clearInterval(time);
      localStorage.removeItem('QuizTime');
    };
  }, []);



  const handleSubmitClick = async () => {
    let localDataQuiz=JSON.parse(localStorage.getItem('quizquestions'))
   
    if(localDataQuiz){
      localDataQuiz.questions.map((quiz, i) => {
        if(localDataQuiz.questions[localDataQuiz.lastactiveindex].state !=='answered' ){
        localDataQuiz.questions[localDataQuiz.lastactiveindex].state ='unAnswered';
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
        completedSubmit:0,
      });

      try {
        const { data } = await axios.post(
          `${BASE_URL}/exam/quiz/submitQuiz`,
          body,
          config
        );
         if(data.code === 200){
           console.log(`hey`, data)
            history.push('/quiz');
         }
         else{
           alert("something went wrong! Please submit again")
         }
       
      } catch (err) {
        console.log(err);
      }
  }
console.log(`headDatas`, headData)
  return (
    headData !== undefined && (
      <>
        <div className="quiz-header">
          <div className="quiz-header-left">
            {headData !== undefined && headData?.examType?.logoUrl && (
              <img
                src={`${headData.examType.logoUrl}`}
                alt=""
                className="quiz-header-logo"
              />
            )}

            <div className="content">
              <h2>{headData.quizName}</h2>
              {
                headData !== undefined && Object.keys(headData).length > 0 && (
                  <p>
                    {headData !== undefined && headData?.examType?.examType} |{' '}
                    By : {headData.coachingName}
                  </p>
                )
              }
              
            </div>
          </div>
          <div className="quiz-header-right">
            {
              headData !== undefined && Object.keys(headData).length > 0 && (
                <>
                  <div className="time">
                    <h5>{headData !== undefined && headData?.duration} Mins</h5>
                    <p>Total Time</p>
                  </div>
                  {/* <div style={{"cursor":"pointer","marginLeft":'20px',"marginRight": '10px'}}>
                     <span>
                       <PauseIcon />
                     </span>
                  </div> */}
                  <div className="time-left">
                    <CircularProgressbarWithChildren
                      value={time}
                      maxValue={headData?.quizTimeRemaining}
                      strokeWidth={5}
                      styles={buildStyles({
                        pathColor: '#ff5d6d',
                      })}>
                      <div className="progress-bar-percent">
                        <strong>
                          {timerStart === true?
                          <Timer
                            initialTime={pausetime?pausetime :headData?.quizTimeRemaining * 60000}
                            // initialTime={headData?.duration * 60000}
                            startImmediately={true}
                            direction="backward">
                              {/* {headData.duration} */}
                            {({ getTime }) => {
                              // console.log(getTime())
                              localStorage.setItem('QuizTime', Math.floor(getTime()));
                              return (
                                <React.Fragment>
                                  <div>
                                    <Timer.Hours /> : <Timer.Minutes /> :{' '}
                                    <Timer.Seconds />
                                  </div>
                                </React.Fragment>
                              );
                            }}
                          </Timer>:null}
                        </strong>
                        <p>Time Left</p>
                      </div>
                    </CircularProgressbarWithChildren>
                  </div>
                </>
              )
            }
            
            <div className="close" onClick={() => setModalToggle(!modalToggle)}>
              <ModalClose fill="#fff" />
            </div>
          </div>
        </div>
        {modalToggle && (
          <Modal addClass="Submit-quiz-Modal modal-sm ">
            <span onClick={() => setModalToggle(false)} className="close">
              <ModalClose />
            </span>

            <h2>Do you want to close?</h2>
            <div
              className="btn-group"
              style={{ marginLeft: '30%', marginTop: '20px' }}>
              <button
                style={{ marginRight: '10px' }}
                className="btn-grey"
                onClick={() => setModalToggle(false)}>
                No
              </button>

              <button
                className="btn-primary radius"
                onClick={handleSubmitClick}>
                Yes
              </button>
            </div>
          </Modal>
        )}
      </>
    )
  );
};

const mapStateToProps = createStructuredSelector({
  headData: selectQuizPortalConfig,
  quizConfig: selectQuizPortalConfig,
});

export default connect(mapStateToProps)(QuizHeader);
