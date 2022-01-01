import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  CheckCircle,
  CloseCircle,
  Video,
} from '../../../../../Core/Layout/Icon';
import { connect } from 'react-redux';
import Explanation from '../Explanation';
import Direction from './Direction';

const MultipleChoice = ({ singleQuestion, languageId }) => {
  return (
    <Fragment>
      {singleQuestion.direction && singleQuestion.direction.length > 250 && <div className="view-container-left">
        <Direction description={singleQuestion.direction} />
      </div>}
      <div className={`${(singleQuestion.direction && singleQuestion.direction.length > 250) && 'view-container-right'}`}>
        {singleQuestion.direction && singleQuestion.direction.length < 250 && <p className="question">
         {singleQuestion.direction}
        </p>}
        <div className="question grey-bg-box" >
        <div className="question-slno">Q.{singleQuestion.questionSerialNo}</div>
         <div className="question-ans">{ReactHtmlParser(
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
                        className={`solution-item ${rightAns ? 'success' : ''
                          } ${isCorrect === false && givenAns ? 'error' : ''}`}>
                        <div className="left-info">
                          <p>
                            <span className="number-tag">{String.fromCharCode(65 + i)}</span>
                            {ReactHtmlParser(el.answer)}
                          </p>
                        </div>
                        {singleQuestion.givenAnswer !== null && givenAns ? (
                          <div className="right-info">
                            <span>
                              Given Answer{' '}
                              {isCorrect ? <CheckCircle /> : <CloseCircle />}{' '}
                            </span>
                          </div>
                        ) : (
                            rightAns && (
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
                        className={`solution-item ${rightAns ? 'success' : ''
                          } ${isCorrect === false && givenAns ? 'error' : ''}`}>
                        <div className="left-info">
                          <p>
                            <span className="number-tag">{String.fromCharCode(65 + i)}</span>
                            {ReactHtmlParser(el.answer)}
                          </p>
                        </div>
                        {singleQuestion.givenAnswer !== null && givenAns ? (
                          <div className="right-info">
                            <span>
                              Given Answer{' '}
                              {isCorrect ? <CheckCircle /> : <CloseCircle />}{' '}
                            </span>
                          </div>
                        ) : (
                            rightAns && (
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

export default connect(mapStateToProps)(MultipleChoice);
