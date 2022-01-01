import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setSingleQuestion } from '../../../../../redux/quiz/quiz.actions';
import { selectSolutionQuestions } from '../../../../../redux/quiz/quiz.selectors';
// PAGINATION

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 15,
  slidesToScroll: 1,
  variableWidth: false,
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


const SolutionEachQuestionNumber = ({ questions }) => {
  const dispatch = useDispatch();

  // For setting single question
  const setQuestion = (el) => {
    dispatch(setSingleQuestion(el));
  };

  return (
    <>
      <Slider {...settings}>
        {questions !== undefined &&
          questions.map((el, idx) => {
            let questionSerialNumber = el.questionSerialNo+1;
            if (el.state === 'answered') {
              return (
                <div className={'green-bg'} onClick={() => setQuestion(el)}>
                  {questionSerialNumber}
                </div>
              );
            }
            if (el.state === 'unAnswered') {
              return (
                <div className={'red-bg'} onClick={() => setQuestion(el)}>
                  {questionSerialNumber}
                </div>
              );
            }
            if (el.state === 'notSeen') {
              return (
                <div className={'lightblue-bg'} onClick={() => setQuestion(el)}>
                  {questionSerialNumber}
                </div>
              );
            }
          })}
      </Slider>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  questions: selectSolutionQuestions,
});

export default connect(mapStateToProps)(SolutionEachQuestionNumber);
