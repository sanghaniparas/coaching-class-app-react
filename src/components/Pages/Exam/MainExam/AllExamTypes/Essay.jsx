import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import Direction from './Direction';
import { saveAnswer } from '../../../../../redux/actions/exam';

const Essay = ({
  singleQuestion,
  languageId,
  saveAnswer,
  sectionNumber,
  clearResponse,
  setClearResponse,
  sectionWiseQuestion,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    saveAnswer(value.toString());
  }, [value]);

  useEffect(() => {
    let givenAns = sectionWiseQuestion.find(
      (el) => el.sIndex === sectionNumber && el.qIndex === singleQuestion.id
    );

    // console.log('givenAns', givenAns && givenAns.answer.charCodeAt(0) - 97);
    // setSelectedAnswer((givenAns && givenAns.answer.charCodeAt(0) - 97) || -1);
    setValue((givenAns && givenAns.answer) || '');
  }, [singleQuestion]);

  /**
   * For clearing selected answer
   */
  useEffect(() => {
    if (clearResponse) {
      setValue('');
      setClearResponse(false);
    }
  }, [clearResponse]);

  useEffect(() => {
    return () => saveAnswer('');
  }, []);
  return (
    <Fragment>
      {singleQuestion.direction && singleQuestion.direction.length>250 && <div className="view-container-left">
        <Direction description={singleQuestion.direction}/>
      </div>}
      <div className={`${(singleQuestion.direction && singleQuestion.direction.length>250) && 'view-container-right'}`}>
        {singleQuestion.direction && singleQuestion.direction.length<250 &&<p className="question">
          {singleQuestion.direction}
        </p>}
        <div className="question">
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
        <textarea
          placeholder="Your Answer..."
          value={value}
          onChange={(e) => setValue(e.target.value)}></textarea>
      </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageId: state.exam.languageId,
    sectionWiseQuestion: state.exam.sectionWiseQuestion,
    sectionNumber: state.exam.sectionNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAnswer: (answer) => dispatch(saveAnswer(answer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Essay);
