import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { CheckCircle, CloseCircle } from '../../../../../Core/Layout/Icon';
import Explanation from '../Explanation';
import Direction from './Direction';

const MultipleResponse = ({ singleQuestion, languageId }) => {
  return (
    <Fragment>
      {singleQuestion.direction && singleQuestion.direction.length > 250 && <div className="view-container-left">
        <Direction description={singleQuestion.direction} />
      </div>}
      <div className={`${(singleQuestion.direction && singleQuestion.direction.length > 250) && 'view-container-right'}`}>
        {singleQuestion.direction && singleQuestion.direction.length < 250 && <p className="question">
          {singleQuestion.direction}
        </p>}
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
        <ul className="option-lists solution-wrapper">
          {singleQuestion.langs.filter((el) => el.languageId === languageId)
            .length === 0
            ? singleQuestion.langs[0].answer.length > 0
              ? singleQuestion.langs[0].answer.map((el, i) => {
                let correctAnswers = singleQuestion.correctAnswer.split(',');

                let isCorrectAnswer = correctAnswers.includes(
                  String.fromCharCode(97 + i)
                );
                let isGivenAnswerClass =
                  singleQuestion.isCorrect !== null &&
                    !correctAnswers.includes(String.fromCharCode(97 + i))
                    ? singleQuestion.isCorrect
                      ? 'success'
                      : 'error'
                    : '';

                let isGivenAnswer = singleQuestion.givenAnswer
                  ?.split(',')
                  .includes(String.fromCharCode(97 + i));

             
                return (
                  <Fragment key={i}>
                    <li>
                      <div
                        className={`solution-item ${isCorrectAnswer && ' success'
                          } ${isGivenAnswer && isGivenAnswerClass}`}>
                        <div className="left-info">
                          <p>
                            <span className="number-tag">{String.fromCharCode(65 + i)}</span>{' '}
                            {ReactHtmlParser(el.answer)}
                          </p>
                        </div>
                        {isGivenAnswer ? (
                          <div className="right-info">
                            {singleQuestion.isCorrect === 0 &&    <span className='error'>
                              Given Answer{' '} 
                              {<CloseCircle />}{' '}
                            </span> }
                         {singleQuestion.isCorrect === 1 &&   <span className='success' >
                              Given Answer{' '} 
                              {<CheckCircle />}{' '}
                            </span>

                        }
                            {isCorrectAnswer && (
                                <span>
                                Correct Answer <CheckCircle />{' '}
                              </span>
                              ) }{' '}
                          </div>
                        ): (
                          isCorrectAnswer  && (
                              <div className="right-info">
                                <span>
                                  Correct Answer <CheckCircle />{' '}
                                </span>
                              </div>
                            )
                          )}



                        
                      </div>
                    </li>
                  </Fragment>
                );
              })
              : null
            : singleQuestion.langs
              .filter((el) => el.languageId === languageId)[0]
              .answer.map((el, i) => {
                let correctAnswers = singleQuestion.correctAnswer.split(',');

                let isCorrectAnswer = correctAnswers.includes(
                  String.fromCharCode(97 + i)
                );
                let isGivenAnswerClass =
                  singleQuestion.isCorrect !== null &&
                    !correctAnswers.includes(String.fromCharCode(97 + i))
                    ? singleQuestion.isCorrect
                      ? 'success'
                      : 'error'
                    : '';

                let isGivenAnswer = singleQuestion.givenAnswer
                  ?.split(',')
                  .includes(String.fromCharCode(97 + i));


                  let rightAns =
                  String.fromCharCode(97 + i) ===
                  singleQuestion.correctAnswer;

                let isCorrect =
                  singleQuestion.correctAnswer === singleQuestion.givenAnswer;

                let givenAns =
                  String.fromCharCode(97 + i) === singleQuestion.givenAnswer;



                return (
                  <Fragment key={i}>
                    <li>
                      <div
                        className={`solution-item ${isCorrectAnswer && ' success'
                          } ${isGivenAnswer && isGivenAnswerClass}`}>
                        <div className="left-info">
                          <p>
                            <span  className="number-tag">{String.fromCharCode(65 + i)}</span>{' '}
                            {ReactHtmlParser(el.answer)}
                          </p>
                        </div>
                        {isGivenAnswer ? (
                          <div className="right-info">
                            {singleQuestion.isCorrect === 0 &&    <span className='error'>
                              Given Answer{' '} 
                              {<CloseCircle />}{' '}
                            </span> }
                         {singleQuestion.isCorrect === 1 &&   <span className='success' >
                              Given Answer{' '} 
                              {<CheckCircle />}{' '}
                            </span>

                        }
                            {isCorrectAnswer && (
                                <span>
                                Correct Answer <CheckCircle />{' '}
                              </span>
                              ) }{' '}
                          </div>
                        ): (
                          isCorrectAnswer  && (
                              <div className="right-info">
                                <span>
                                  Correct Answer <CheckCircle />{' '}
                                </span>
                              </div>
                            )
                          )}





                      </div>
                    </li>
                  </Fragment>
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

export default connect(mapStateToProps)(MultipleResponse);
