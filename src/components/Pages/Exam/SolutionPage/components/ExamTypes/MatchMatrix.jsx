import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import {
  MATRIXCONSTANTANSWER,
  MATRIXCONSTANTOPTION,
} from '../../../MainExam/AllExamTypes/Constant';
import Explanation from './../Explanation';
import Direction from './Direction';

const MatchMatrix = ({ singleQuestion, languageId }) => {
  const generateClass = (currentOption, correctAns, givenAns) => {
    let returnObject = '';
    if (currentOption === correctAns) {
      returnObject = {
        class: 'success',
        title: 'Correct Answer',
      };
    }
    if (currentOption === givenAns) {
      returnObject = {
        class: (givenAns === correctAns && 'success') || 'error',
        title: 'Given Answer',
      };
    }
    return returnObject;
  };

  const answerSection = (optionObject, option) => {
    const correctAnswer =
      singleQuestion.correctAnswer &&
      singleQuestion.correctAnswer.toUpperCase();
    const correctAnswerList = correctAnswer.split(',');
    const givenAnswer =
      singleQuestion.givenAnswer && singleQuestion.givenAnswer.toUpperCase();
    const givenAnswerList = givenAnswer && givenAnswer.split(',');
    const correctAns = correctAnswerList[option].split('-')[1];
    const givenAns =
      givenAnswerList &&
      givenAnswerList[option] &&
      givenAnswerList[option].split('-')[1];
    return (
      <Fragment>
        {optionObject.map((el, i) => {
          const ClassTitle = generateClass(
            MATRIXCONSTANTOPTION[i],
            correctAns,
            givenAns
          );
          return (
            <div className="ans-group" key={i}>
              <div
                className={`a-input ${ClassTitle.class}`}
                title={ClassTitle.title}>
                <p>{MATRIXCONSTANTOPTION[i]}</p>
                <span className="custom-checkbox">
                  <input
                    type="checkbox"
                    name=""
                    checked={
                      correctAns === MATRIXCONSTANTOPTION[i] ||
                      givenAns === MATRIXCONSTANTOPTION[i]
                    }
                    id={`${MATRIXCONSTANTANSWER[option]}-${MATRIXCONSTANTOPTION[i]}`}
                    disabled
                  />
                  <label
                    htmlFor={`${MATRIXCONSTANTANSWER[option]}-${MATRIXCONSTANTOPTION[i]}`}>
                    &nbsp;
                  </label>
                </span>
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

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
          <p className="question">{singleQuestion.direction} </p>
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
        {/* <p className="note">
        <strong>Note:</strong> Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Eum, quibusdam a inventore nostrum, voluptatum eveniet
        magni ipsa dolorum maiores architecto consequatur quae deleniti dolores,
        earum ut. Voluptate possimus iste nihil.
      </p> */}

        <div className="match-matrix">
          <ul className="matrix-item">
            {singleQuestion.langs.filter((obj) => obj.languageId === languageId)
              .length === 0
              ? singleQuestion.langs[0].answer.length > 0
                ? singleQuestion.langs[0].answer.map((el, i, obj) => (
                  <Fragment key={i}>
                    <li>
                      <div className="l-input">
                        <span>{MATRIXCONSTANTANSWER[i]}.</span>{' '}
                        <p>{ReactHtmlParser(el.answer)}</p>
                      </div>
                      <div className="r-input">
                        <span>{MATRIXCONSTANTOPTION[i]}.</span>{' '}
                        <p>{ReactHtmlParser(el.options)}</p>
                      </div>
                    </li>
                  </Fragment>
                ))
                : null
              : singleQuestion.langs
                .filter((obj) => obj.languageId === languageId)[0]
                .answer.map((el, i, obj) => (
                  <Fragment key={i}>
                    <li>
                      <div className="l-input">
                        <span>{MATRIXCONSTANTANSWER[i]}.</span>{' '}
                        <p>{ReactHtmlParser(el.answer)}</p>
                      </div>
                      <div className="r-input">
                        <span>{MATRIXCONSTANTOPTION[i]}.</span>{' '}
                        <p>{ReactHtmlParser(el.options)}</p>
                      </div>
                    </li>
                  </Fragment>
                ))}
            {/*<li>
            <div className="l-input">
              <span>C.</span>{' '}
              <img
                src={require('../../../../../assets/images/math.png')}
                alt=""
              />
            </div>
            <div className="r-input">
              <span>R.</span> BC2 = 2AB2
            </div>
            {answerSection()}
          </li> */}
          </ul>
          {singleQuestion.langs.filter((obj) => obj.languageId === languageId)
            .length === 0
            ? singleQuestion.langs[0].answer.length > 0
              ? singleQuestion.langs[0].answer.map((el, i, obj) => (
                <Fragment key={i}>
                  <div className="ans-group-item">
                    <span className="ans-group-number">
                      {MATRIXCONSTANTANSWER[i]}.
                      </span>
                    {answerSection(obj, i)}
                  </div>
                </Fragment>
              ))
              : null
            : singleQuestion.langs
              .filter((obj) => obj.languageId === languageId)[0]
              .answer.map((el, i, obj) => (
                <Fragment key={i}>
                  <div className="ans-group-item">
                    <span className="ans-group-number">
                      {MATRIXCONSTANTANSWER[i]}.
                      </span>
                    {answerSection(obj, i)}
                  </div>
                </Fragment>
              ))}
        </div>
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

export default connect(mapStateToProps)(MatchMatrix);
