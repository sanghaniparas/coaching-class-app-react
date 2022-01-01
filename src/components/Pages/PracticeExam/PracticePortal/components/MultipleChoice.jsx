import React, { useState } from 'react';
import { CheckCircle, CloseCircle, PracticeChapter } from '../../../../Core/Layout/Icon';
import {
  storeAnswer,
  getChapters,
  practiceChapters,
} from './../../../../../redux/practice/practice.actions';
import { useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';


const MultipleChoice = ({ singleQuestion, match, practiceChapters, pResultId }) => {
  const dispatch = useDispatch();

  console.log(pResultId)

  const handleStoreAnswer = (idx) => {
    dispatch(storeAnswer(String.fromCharCode(97 + idx)));

    console.log(idx)

    console.log(practiceChapters)

    const index = practiceChapters.findIndex(emp => emp.practiceSetResultId === pResultId);
    const employees = [...practiceChapters] // important to create a copy, otherwise you'll modify state outside of setState call
    if(practiceChapters[index] && practiceChapters[index].practiceSetQuestionAttemptedCount){
    practiceChapters[index].practiceSetQuestionAttemptedCount = employees[index].practiceSetQuestionAttemptedCount + 1 || 0 ;

    localStorage.setItem("practiceChapters", JSON.stringify(practiceChapters));
    }
    const data = {
      practiceSetId: match.params.practiceId,
      subjectId: match.params.subjectId,
    };

    console.log(data)

    // setTimeout(
    //   () => dispatch(getChapters(data)), 
    //   3000
    // );
  
    
  };

  return (
    <>
      {singleQuestion.langs[0].answer.map((el, idx) => {
        return (
          <div
            className={`qst-card ${
              singleQuestion.state === 'answered' && 'disable-card'
            } ${
              singleQuestion.isCorrect === 0 &&
              singleQuestion.givenAnswer === String.fromCharCode(97 + idx) &&
              'error'
            } ${
              singleQuestion.isCorrect === 0 &&
              singleQuestion.correctAnswer === String.fromCharCode(97 + idx) &&
              'success'
            } ${
              singleQuestion.isCorrect === 1 &&
              singleQuestion.correctAnswer === String.fromCharCode(97 + idx) &&
              'success'
            }`}
            onClick={() => handleStoreAnswer(idx)}
            style={{cursor:"pointer"}}>
            <div className="qst-left">
              <span className="ans-number">{idx + 1}</span>
              <p>{ReactHtmlParser(el.answer)}</p>
            </div>
            {singleQuestion.isCorrect === 0 &&
              singleQuestion.givenAnswer === String.fromCharCode(97 + idx) && (
                <div className="qst-right">
                  <CloseCircle />
                  Given Answer
                </div>
              )}
            {singleQuestion.isCorrect === 0 &&
              singleQuestion.correctAnswer ===
                String.fromCharCode(97 + idx) && (
                <div className="qst-right">
                  <CheckCircle />
                  Correct Answer
                </div>
              )}

            {singleQuestion.isCorrect === 1 &&
              singleQuestion.correctAnswer ===
                String.fromCharCode(97 + idx) && (
                <div className="qst-right">
                  <CheckCircle />
                  Given Answer
                </div>
              )}
          </div>
        );
      })}
    </>
  );
};

export default withRouter(MultipleChoice);
