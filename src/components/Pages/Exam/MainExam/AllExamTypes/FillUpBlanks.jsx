import React, { Fragment, useState, useEffect } from 'react';
import NumPad from 'react-numpad';
import ReactHtmlParser from 'react-html-parser';
import { saveAnswer } from '../../../../../redux/actions/exam';
import { connect } from 'react-redux';
import Direction from './Direction';

const FillUpBlanks = ({
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
    <>
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
          <p className="question">
            <strong>Direction:</strong> 
          {singleQuestion.direction}</p>
        )}
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

        {singleQuestion.rangeFrom !== null ? (
          <NumPad.Number
            onChange={(value) => {
              setValue(value);
            }}
            placeholder={'Type Your answer...'}
            value={value}
            //   inline={true}
            negative={false}
            decimal={false}>
            <input
              style={{
                padding: '10px',
                marginLeft: '37px',
                border: '1px solid #c9c8c8',
                borderRadius: '5px',
                width: '30%',
              }}
            />
          </NumPad.Number>
        ) : (
            <div className="input-group">
              <input
                type="text"
                value={value}
                placeholder="Type Your answer here..."
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
          )}
      </div>
    </>
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

export default connect(mapStateToProps, mapDispatchToProps)(FillUpBlanks);
