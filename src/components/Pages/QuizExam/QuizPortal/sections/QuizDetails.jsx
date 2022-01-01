import React, { useState, useEffect } from 'react'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import QuizHeader from './QuizHeader';
import QuizQuestionWrapper from './QuizQuestionWrapper';
import {
  getQuizPortalData,
  setSingleQuestion,
} from './../../../../../redux/quiz/quiz.actions';
import { useDispatch, connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectQuizQuestions,} from '../../../../../redux/quiz/quiz.selectors';
import useQuizSchema from './../../../../../Hooks/useQuizSchema';
import JsonLd from './../../../../../utils/JsonLd';
import { selectQuizPortalConfig, } from './../../../../../redux/quiz/quiz.selectors';
import ReactMeta from '../../../../../utils/ReactMeta';

//exam start modal confirmation
import { ModalClose } from '../../../../Core/Layout/Icon';
import { Modal } from '../../../../Core/Layout/Modal/Modal';
import { useHistory } from 'react-router-dom';



const QuizDetails = ({ match, questions, config,headData}) => {
  const data = useQuizSchema(match.params.id);
  const [examStartModal, setexamStartModal] = useState(false);
  const [timerStart, settimerStart] = useState(false);
  const [pausetime, setpausetime] = useState(0);


  const history = useHistory();


//   window.addEventListener("beforeunload", function (e) {
    
//     var msg = 'Please save the quiz. '
//                             + 'If you leave before saving, your changes will be lost.';

//     (e || window.event).returnValue = msg; 
//     return msg; 
// });
// console.log(`historys`, history)
window.history.pushState(null, null, window.location.href);
window.onpopstate = function () {
    window.history.go(1);
};
// useEffect(()=>{
//   return () => {
//       if (localStorage.getItem('QuizTime')) {
//         history.goForward();
//       }
//     };
// },[])




  // For dispatching actions
  const dispatch = useDispatch();


  // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
  //   if(localStorage.getItem('QuizTime')){
  //     let pausetime=JSON.parse(localStorage.getItem('QuizTime'))
  //     setpausetime(pausetime)
  //     settimerStart(true)
  //   }
  //  }

  //  useEffect(() => {
  //   if(localStorage.getItem('QuizTime')){
  //     let pausetime=JSON.parse(localStorage.getItem('QuizTime'))
  //     setpausetime(pausetime)
  //     settimerStart(true)
  //   }
  // }, []);
  //exam start confirmation

  

  useEffect(() => {
    if(!localStorage.getItem('quizquestions')){
    setexamStartModal(true)
    }
  }, []);

  useEffect(() => {
    // dispatch(getQuizPortalData(match.params.id));
    if(localStorage.getItem('QuizTime')){
      let pausetimes=JSON.parse(localStorage.getItem('QuizTime'))
      settimerStart(true)
      setpausetime(pausetimes)
    }
  }, []);

  // useEffect(() => {
  //   return () => {
  //     localStorage.removeItem('quizquestions');
  //   };
  // }, [])

  // useEffect(() => {
  //   if(!localStorage.getItem('quizqact') && !localStorage.getItem('quizstart')){
  //   setexamStartModal(true)
  //   }
  // }, []);

  useEffect(() => {
    return () => {
      localStorage.removeItem('quizquestions');
      localStorage.removeItem('QuizTime');
      localStorage.removeItem('pTime');
    };
  }, [])

 
  // For fetching quiz questions data
  useEffect(() => {
    dispatch(getQuizPortalData(match.params.id));
    localStorage.setItem('quizId', match.params.id);
  }, []);

  //   For loading first question
  // useEffect(() => {
  //   if (questions !== undefined) {
  //     if(localStorage.getItem('quizqact')){
  //       let actindex=JSON.parse(localStorage.getItem('quizqact'))
  //       // let realindex=actindex + 1
  //       dispatch(setSingleQuestion(questions[actindex]));
       
  //     }
  //     else{dispatch(setSingleQuestion(questions[0]));}
      
  //   }
  // }, [questions]);
  

  useEffect(() => {
    let finalquestiondata={
      questions:questions,
      lastactiveindex:headData?.quizLastIndex
    }
    
    if(!localStorage.getItem('quizquestions')){
      if (questions !== undefined && headData!== undefined) {
      localStorage.setItem('quizquestions', JSON.stringify(finalquestiondata));
        dispatch(setSingleQuestion(questions[headData?.quizLastIndex]));
      }
    }
    else{
      let localDataQuiz=JSON.parse(localStorage.getItem('quizquestions'))
      dispatch(setSingleQuestion(localDataQuiz.questions[localDataQuiz.lastactiveindex]));
    }
    
    
  }, [questions]);
console.log(`config`, config)
  return questions === undefined  ?  (
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
        timeout={10000} //10 secs
      />
    </div>
  ) : (
    <div className="quiz-wrapper">
      <QuizHeader timerStart={timerStart} pausetime={pausetime} match={match}/>
      <QuizQuestionWrapper match={match}/>
      <JsonLd data={JSON.stringify(data)} />
      {config !== undefined && <ReactMeta data={config.quizSeoDesc} />}
      {examStartModal && (
          <Modal addClass="Submit-quiz-Modal modal-sm ">
            {/* <span onClick={() => setexamStartModal(false)} className="close">
              <ModalClose />
            </span> */}

            <h2>Do you want to start the quiz?</h2>
            <div
              className="btn-group"
              style={{ marginLeft: '30%', marginTop: '20px' }}>
              <button
                style={{ marginRight: '10px' }}
                className="btn-grey"
                onClick={() => history.push('/quiz')}
                >
                No
              </button>

              <button
                className="btn-primary radius"
                onClick={() => {
                  setexamStartModal(false);
                  settimerStart(true)
                  // localStorage.setItem('quizstart',true);
                }}
                >
                Yes
              </button>
            </div>
          </Modal>
          
        )}
    </div>
    
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectQuizQuestions,
  config: selectQuizPortalConfig,
  headData: selectQuizPortalConfig,
});

export default connect(mapStateToProps)(QuizDetails);
