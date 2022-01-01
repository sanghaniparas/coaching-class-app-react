import React, { Fragment, useState, useEffect, useRef } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  ArrowDown,
  BookIcon,
  BookMark,
  LineArrow,
  MenuTwo,
  ModalClose,
  NoQuestion,
  OptionDots,
  PauseIcon,
} from '../../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectPracticeQuestions,selectPracticeLoading } from '../../../../../redux/practice/practice.selectors';
import EachQuestionSerialNumber from './../components/EachQuestionSerialNumber';
import FilterQuestion from './../components/FilterQuestion';
import SingleQuestion from './../components/SingleQuestion';
import {
  updateQuestion,
  saveAnswer,
} from '../../../../../redux/practice/practice.actions';
import QuestionModal from './../components/QuestionModal';
import Loader from 'react-loader-spinner';
import { useToasts } from 'react-toast-notifications';


const PracticeChapterQuestion = ({
  practiceQuestions,
  handleSetToggleReport,
  count,
  setCount,
  resetCount,
  pResultId,
  practiceSidebarToggle,
  practicesidebar,
  practiceLoading,
  filterNumber,
  newPercentage,
  setslideCount,
  slideCount,
  practiceChapters
}) => {

  

  
  const slickRef = useRef();
  const { addToast } = useToasts();
  const [singleQuestion, setSingleQuestion] = useState(null);
  const [singleQuestionIndex, setSingleQuestionIndex] = useState(0);
  const [time, setTime] = useState(0);
  const [modalToggler, setModalToggler] = useState(false);
  // const [slideCount, setslideCount] = useState(0);

  

  const dispatch = useDispatch();
  const history = useHistory();

  const [practiceQuestionsSet, setPracticeQuestionsSet] = useState([]);

  useEffect(() => {
    slideTo()
  }, [])


  const slideTo=()=>{
    let slidecounts = JSON.parse(localStorage.getItem('countP'))
    if( slidecounts > 7 ){
      setslideCount(slidecounts - 7)
       }
      else{
        setslideCount(0)
      }
  }

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 24,
    slidesToScroll: 1,
    // beforeChange: (current, next) =>console.log(`next`, next),
    initialSlide:slideCount,
    responsive: [
      {
        breakpoint: 1600,
        settings: {
          slidesToShow: 12,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 10,
        },
      },
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          initialSlide: 5
        },        
      },
      {
        breakpoint: 360,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 5
        },
      },
    ],
  };
  
  // For toggling modal
  const handleModalOpen = () => {
    setModalToggler(!modalToggler);
  };
  const handleModalClose = () => {
    setModalToggler(!modalToggler);
  };

  const handleCountNext = () => {
    if(practiceQuestions){
      if (count < practiceQuestions.length - 1) {
        setCount((count) => count + 1);
      }

      if (singleQuestion && singleQuestion.state !== 'answered') {
        let updatedObj = {
          id: singleQuestion.id,
          state: 'skipped',
        };

        sendAnswerToBackend();
        dispatch(updateQuestion(updatedObj));
      }

      if(localStorage.getItem('countP')){
      let activesld = JSON.parse(localStorage.getItem('countP'))
      if( activesld > 7 ){
           slickRef.current.slickGoTo(activesld - 6);
         }
         else{
        slideNext()
        }
     }

    }

  };

  const handleCountPrev = () => {
    
    if (count > 0) {
      setCount((count) => count - 1);
    }

    if (singleQuestion.state !== 'answered') {
      let updatedObj = {
        id: singleQuestion.id,
        state: 'skipped',
      };
      sendAnswerToBackend();
      dispatch(updateQuestion(updatedObj));
    }
    if(localStorage.getItem('countP')){
      let activesld = JSON.parse(localStorage.getItem('countP'))
      if( activesld > 7 ){
           slickRef.current.slickGoTo(activesld - 7);
         }
         else{
          slideprev()
        }
     }
      
  };

  //  For selecting single question when user select on top number list
  const handleSingleQuestion = (id) => {
    let findQuestionIndex = practiceQuestions.findIndex((el) => el.id === id);
    setCount(findQuestionIndex);
  if(singleQuestion){
    if (singleQuestion.state !== 'answered') {
      let updatedObj = {
        id: singleQuestion.id,
        state: 'skipped',
      };
      dispatch(updateQuestion(updatedObj));
      sendAnswerToBackend();
      slickGoTo(findQuestionIndex+1)
    }
  } 
  };

  // Sending answer to backend when changing question without an answer
  const sendAnswerToBackend = () => {
    let obj = {
      practiceSetResultId:
        pResultId === null
          ? localStorage.getItem('practiceSetResultId')
          : pResultId,
      practiceSetQuestionId: singleQuestion.id,
      state: 'skipped',
      givenAnswer: '',
      questionTime: time,
    };

    dispatch(saveAnswer(obj));
  };

  useEffect(() => {
  if(practiceQuestions){
   
    setSingleQuestion(practiceQuestions[count]);
    setSingleQuestionIndex(count + 1);
    localStorage.setItem('countP', JSON.stringify(count)); 
    setPracticeQuestionsSet(practiceQuestions);
    // setTimeout(
    //   () =>   slickGoTo(JSON.parse(localStorage.getItem('countP')) +1 || 0), 
    //   2000
    // );
  }
  }, [count, practiceQuestions]);


  useEffect(() => {
    setTime(0);
    let interval = setInterval(() => {
      setTime((time) => time + 1); 
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [singleQuestion]);

  


  const slideNext = () => {
    slickRef.current.slickNext();
  }
  const slideprev = () => {
    slickRef.current.slickPrev();
  }

  const slickGoTo = (id) => {
    slickRef.current.slickGoTo(id - 1)
  }

  // function useOuterClick(callback) {
  //   const callbackRef = useRef(); // initialize mutable callback ref
  //   const innerRef = useRef(); // returned to client, who sets the "border" element
  
  //   // update callback on each render, so second useEffect has most recent callback
  //   useEffect(() => { callbackRef.current = callback; });
  //   useEffect(() => {
  //     document.addEventListener("click", handleClick);
  //     return () => document.removeEventListener("click", handleClick);
  //     function handleClick(e) {
  //       if (innerRef.current && callbackRef.current && 
  //         !innerRef.current.contains(e.target)
  //       ) callbackRef.current(e);
  //     }
  //   }, []); // no dependencies -> stable click listener
        
  //   return innerRef; // convenience for client (doesn't need to init ref himself) 
  // }

  // const innerRef = useOuterClick(ev => {
  //   if(practicesidebar === true){
  //     practiceSidebarToggle()
  //   }
  // });
  //ref={innerRef}

  return (
    
    <Fragment>
      {practiceLoading === false ?(<>
      <div className="top-bar">
        <span className={`practice-menu ${practicesidebar ? 'active' : ''}`} onClick={practiceSidebarToggle} >
          <MenuTwo fill={practicesidebar ? '#fd8041' : '#FFF'}/>
        </span>
        <div className="number-slider" style={{cursor:"pointer"}}>
          <Slider ref={slickRef} {...settings}>
            {practiceQuestions && practiceQuestions.map((item,idx) => (
              <EachQuestionSerialNumber
                key={item.id}
                item={item}
                idx={idx}
                handleSingleQuestion={handleSingleQuestion}
              />
            ))}
          </Slider>
        </div>
        <div className="action-group">
          <FilterQuestion resetCount={() => resetCount()}  pResultId={pResultId} filterNumber={filterNumber}/>
          <span
            className="plyapause"
            onClick={() => {
              console.log("newPercentage",newPercentage);
              if(newPercentage>=100){
                addToast('You have completed this chapter', {
                  appearance: 'success',
                  autoDismiss: true,
                  autoDismissTimeout: 3000,
                });

              }else{
              addToast('Your exam has been paused', {
                appearance: 'success',
                autoDismiss: true,
                autoDismissTimeout: 3000,
              });
            }
              setCount(0);
              handleSetToggleReport();
              
              
            }}>
            <PauseIcon />
          </span>
        </div>
      </div>
      {singleQuestion && practiceQuestions?.length > 0 ? (
        <SingleQuestion
          practiceChapters={practiceChapters}
          time={time}
          singleQuestion={singleQuestion}
          singleQuestionIndex={singleQuestionIndex}
          pResultId={pResultId}
        />
      ) : (
        <h2 className="noqst-wrap">
          <span className="noqst-icon">
            <NoQuestion />
          </span>
          There are no questions!
        </h2>
      )}

      <div className="footer-bar">
        <span className="prev" onClick={handleCountPrev} style={ count ===0 ? { pointerEvents:'none', opacity: '0.7'} : {}}>
          <LineArrow fill="#FFF" />
          Previous
        </span>
        <span className="book" onClick={handleModalOpen} style={{cursor:"pointer"}}>
          <BookIcon />
        </span>
        <span className="next" onClick={handleCountNext} style={ count === practiceQuestions?.length - 1 ? { pointerEvents:'none', opacity: '0.7'} : {}}>
          Next
          <LineArrow fill="#FFF" />
        </span>
      </div>
      {modalToggler && (
        <QuestionModal
          practiceQuestions={practiceQuestions}
          pResultId={pResultId}
          handleModalClose={handleModalClose}
        />
      )}</>):(<>
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
      />
    </div>
    </>)}
    </Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceQuestions: selectPracticeQuestions,
  practiceLoading:selectPracticeLoading
});

export default connect(mapStateToProps)(PracticeChapterQuestion);
