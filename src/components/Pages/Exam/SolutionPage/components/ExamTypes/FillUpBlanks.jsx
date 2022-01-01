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

const FillUpBlanks = ({ singleQuestion, languageId }) => {
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

        {/* <div className="input-group">
        <input type="text" placeholder="Type Your answer here..." />
      </div> */}

        <div className="fill-in-the-blanks-ans">
          <div className="solution-item success">
            <div className="left-info">
              <strong>{singleQuestion.rangeFrom !== null ? `${singleQuestion.rangeFrom} - ${singleQuestion.rangeTo}` : singleQuestion.langs[0].answer[0].answer}</strong>
            </div>
            <div className="right-info">
              <span>
                {singleQuestion.isCorrect === 1
                  ? 'Given Answer'
                  : 'Correct Answer'}{' '}
                <CheckCircle />{' '}
              </span>
            </div>
          </div>
        </div>
        {singleQuestion.isCorrect === 0 && (
          <div className="fill-in-the-blanks-ans">
            {singleQuestion.isCorrect !== null && (
              <div
                className={`${singleQuestion.isCorrect !== null
                    ? singleQuestion.isCorrect
                      ? 'solution-item success'
                      : 'solution-item error'
                    : 'solution-item'
                  }`}>
                <div className="left-info">
                  <strong>
                    {singleQuestion.givenAnswer !== null
                      ? singleQuestion.givenAnswer
                      : ''}
                  </strong>
                </div>
                <div className="right-info">
                  <span>
                    Your Answer{' '}
                    {singleQuestion.isCorrect ? (
                      <CheckCircle />
                    ) : (
                        <CloseCircle />
                      )}{' '}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

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

export default connect(mapStateToProps)(FillUpBlanks);
