import React, { Fragment } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import Direction from './Direction';

const Essay = ({ singleQuestion, languageId }) => {
  return (
    <Fragment>
      {singleQuestion.direction && singleQuestion.direction.length>250 && <div className="view-container-left">
        <Direction description={singleQuestion.direction}/>
      </div>}
      <div className={`${(singleQuestion.direction && singleQuestion.direction.length>250) && 'view-container-right'}`}>
        {singleQuestion.direction && singleQuestion.direction.length<250 &&<p className="question">
          {singleQuestion.direction}
        </p>}
      <p className="question">
       Q.{singleQuestion.questionSerialNo}
        {ReactHtmlParser(
          singleQuestion.langs.filter((el) => el.languageId === languageId)
            .length === 0
            ? singleQuestion.langs.map((el) => el.question)
            : singleQuestion.langs.filter(
                (el) => el.languageId === languageId
              )[0].question
        )}
      </p>

      {singleQuestion.langs.filter((el) => el.languageId === languageId)
        .length === 0 ? (
        singleQuestion.langs[0].answer.length > 0 ? (
          singleQuestion.langs[0].answer.map((el, i) => (
            <Fragment key={i}>
              <p className="note">
                <strong>Note:</strong> {el.answer}
              </p>
            </Fragment>
          ))
        ) : null
      ) : singleQuestion.langs.filter((el) => el.languageId === languageId)[0]
          .answer.length > 0 ? (
        <p className="note">
          <strong>Note:</strong>{' '}
          {singleQuestion.langs
            .filter((el) => el.languageId === languageId)[0]
            .answer.map((el, i) => (
              <Fragment key={i}>{el.answer}</Fragment>
            ))}
        </p>
      ) : null}

      <div className="input-group">
        <textarea placeholder="Your Answer..."></textarea>
      </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageId: state.exam.languageId,
  };
};

export default connect(mapStateToProps)(Essay);
