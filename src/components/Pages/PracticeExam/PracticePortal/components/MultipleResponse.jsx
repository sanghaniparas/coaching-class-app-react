import React from 'react';
import { CheckCircle, CloseCircle } from '../../../../Core/Layout/Icon';

const MultipleResponse = ({ singleQuestion }) => {
  return (
    <>
      {singleQuestion.langs[0].answer.map((el, idx) => {
        return (
          <div class="qst-card">
            <span class="ans-number">{idx + 1}</span>
            <p>{el.answer}</p>
          </div>
        );
      })}
      {/* <div className="qst-card success">
        <div className="qst-left">
          <span class="ans-number">4</span>
          <p>Lorem ipsum dolor sit</p>
        </div>
        <div className="qst-right">
          <CheckCircle />
          Correct Answer
        </div>
      </div>
      <div className="qst-card error">
        <div className="qst-left">
          <span class="ans-number">4</span>
          <p>Lorem ipsum dolor sit</p>
        </div>
        <div className="qst-right">
          <CloseCircle />
          Incorrect
        </div>
      </div> */}
    </>
  );
};

export default MultipleResponse;
