import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { saveAnswer } from '../../../../../redux/actions/exam';
import { connect } from 'react-redux';
import Direction from './Direction';

const TrueFalse = ({
  singleQuestion,
  languageId,
  sectionNumber,
  saveAnswer,
  clearResponse,
  setClearResponse,
  sectionWiseQuestion,
}) => {
  const [value, setValue] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(-1);

  useEffect(() => {
    saveAnswer(value);
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
      setSelectedAnswer(-1);
      setValue('');
      setClearResponse(false);
    }
  }, [clearResponse]);

  useEffect(() => {
    return () => saveAnswer('');
  }, []);
  return (
    <Fragment>
      {singleQuestion.direction && singleQuestion.direction.length > 250 && <div className="view-container-left">
        <Direction description={singleQuestion.direction} />
      </div>}
      <div className={`${(singleQuestion.direction && singleQuestion.direction.length > 250) && 'view-container-right'}`}>
        {singleQuestion.direction && singleQuestion.direction.length < 250 && <p className="question">
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
        <ul className="option-lists">
          {singleQuestion.langs.filter((el) => el.languageId === languageId)
            .length === 0
            ? singleQuestion.langs[0].answer.length > 0
              ? singleQuestion.langs[0].answer.map((el, i) => (
                <Fragment key={i}>
                  <li>
                    <p className="custom-radio">
                      <input
                        type="radio"
                        id={i}
                        name="options"
                        checked={value === String.fromCharCode(96 + (i + 1))}
                        onChange={(e) => {
                          setSelectedAnswer(i);
                          setValue(String.fromCharCode(96 + (i + 1)));
                        }}
                      />
                      <label htmlFor={i}>{ReactHtmlParser(el.answer)}</label>
                    </p>
                  </li>
                </Fragment>
              ))
              : null
            : singleQuestion.langs
              .filter((el) => el.languageId === languageId)[0]
              .answer.map((el, i) => (
                <Fragment key={i}>
                  <li>
                    <p className="custom-radio">
                      <input
                        type="radio"
                        id={i}
                        name="options"
                        checked={value === String.fromCharCode(96 + (i + 1))}
                        onChange={(e) => {
                          setSelectedAnswer(i);
                          setValue(String.fromCharCode(96 + (i + 1)));
                        }}
                      />
                      <label htmlFor={i}>{ReactHtmlParser(el.answer)}</label>
                    </p>
                  </li>
                </Fragment>
              ))}
        </ul>
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

export default connect(mapStateToProps, mapDispatchToProps)(TrueFalse);
