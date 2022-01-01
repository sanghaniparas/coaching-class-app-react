import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import Explanation from '../Explanation';
import Direction from './Direction';

const SingleDigit = ({ singleQuestion, languageId }) => {
  return (
    <Fragment>
      {singleQuestion.direction && singleQuestion.direction.length > 250 && (
        <div className="view-container-left">
          <Direction description={singleQuestion.direction} />
        </div>
      )}
      <div
        className={`${singleQuestion.direction &&
          singleQuestion.direction.length > 250 &&
          'view-container-right'
          }`}>
        {singleQuestion.direction && singleQuestion.direction.length < 250 && (
          <p className="question">{singleQuestion.direction}</p>
        )}
         <div className="question grey-bg-box">
        <div className="question-slno">Q.{singleQuestion.questionSerialNo}</div>
         <div className="question-ans">
          {ReactHtmlParser(
            singleQuestion.langs.filter((el) => el.languageId === languageId)
              .length === 0
              ? singleQuestion.langs.map((el) => el.question.replace(/&nbsp;|<p[^>]*>(?:\s|&nbsp;)*<\/p>/ig, '').trim())
              : singleQuestion.langs.filter(
                (el) => el.languageId === languageId
              )[0].question.replace(/&nbsp;|<p[^>]*>(?:\s|&nbsp;)*<\/p>/ig, '').trim()
          )}</div>
        </div>
        <ul className="single-digit">
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((el, i) => {
            //actual correct answer
            let correctAnswer =
              el === parseInt(singleQuestion.langs[0].answer[0].answer);

            //which answer user has given
            let whichAnswer =
              singleQuestion.isCorrect !== null &&
              parseInt(singleQuestion.givenAnswer) === el;

            //your answer is correct or not
            let answerCorrectOrNot =
              singleQuestion.isCorrect !== null &&
              singleQuestion.givenAnswer ===
              singleQuestion.langs[0].answer[0].answer;

            return (
              <>
                <li
                  className={`${correctAnswer ? 'success' : ''}${!answerCorrectOrNot && whichAnswer ? 'error' : ''
                    }`}
                  title={`${singleQuestion.isCorrect !== null &&
                      !answerCorrectOrNot &&
                      whichAnswer
                      ? 'Given Answer'
                      : ''
                    }${singleQuestion.isCorrect !== null &&
                      answerCorrectOrNot &&
                      correctAnswer
                      ? 'Given Answer'
                      : ''
                    }${singleQuestion.isCorrect === null && correctAnswer
                      ? 'Correct Answer'
                      : ''
                    }${singleQuestion.isCorrect !== null &&
                      !answerCorrectOrNot &&
                      correctAnswer
                      ? 'Correct Answer'
                      : ''
                    }`}>
                  <label htmlFor={el}>
                    {el}
                    <input
                      type="radio"
                      name="single-digit"
                      id={el}
                      value={el}
                    />
                  </label>
                </li>
              </>
            );
          })}
        </ul>
        {singleQuestion.solution && (
          <Explanation singleQuestion={singleQuestion} />
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageId: state.exam.languageId,
  };
};

export default connect(mapStateToProps)(SingleDigit);
