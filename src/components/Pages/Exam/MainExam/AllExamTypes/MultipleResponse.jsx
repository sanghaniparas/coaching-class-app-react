import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { saveAnswer } from '../../../../../redux/actions/exam';
import { connect } from 'react-redux';
import Direction from './Direction';

const MultipleResponse = ({
  singleQuestion,
  languageId,
  sectionNumber,
  saveAnswer,
  clearResponse,
  setClearResponse,
  sectionWiseQuestion,
}) => {
  const [value, setValue] = useState([]);

  /**
   * Saving answer to redux store
   */
  useEffect(() => {
    saveAnswer(value.sort().join().replace(/^,|,$/g, ''));
  }, [value]);

  useEffect(() => {
    let givenAns = sectionWiseQuestion.find(
      (el) => el.sIndex === sectionNumber && el.qIndex === singleQuestion.id
    );

    // console.log('givenAns', givenAns && givenAns.answer.charCodeAt(0) - 97);
    // setSelectedAnswer((givenAns && givenAns.answer.charCodeAt(0) - 97) || -1);
    setValue((givenAns && givenAns.answer.split(',')) || []);
  }, [singleQuestion]);

  /**
   * For clearing selected answer
   */
  useEffect(() => {
    if (clearResponse) {
      setValue([]);
      setClearResponse(false);
    }
  }, [clearResponse]);

  /**
   * Clear state on component Unmount
   */
  useEffect(() => {
    return () => saveAnswer('');
  }, []);

  /**
   * for selecting multiple options
   * @param {index} i
   */
  const selectOptions = (i) => {
    const char = String.fromCharCode(96 + (i + 1));
    if (value.includes(char)) {
      let newValue = value.filter((el) => el !== char);
      return setValue(newValue);
    }
    setValue((value) => value.concat(String.fromCharCode(96 + (i + 1))));
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
          <p className="question">{singleQuestion.direction}</p>
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
        <ul className="option-lists">
          {singleQuestion.langs.filter((el) => el.languageId === languageId)
            .length === 0
            ? singleQuestion.langs[0].answer.length > 0
              ? singleQuestion.langs[0].answer.map((el, i) => (
                <Fragment key={i}>
                  <li>
                    <p className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={i}
                        name="options"
                        checked={value.includes(
                          String.fromCharCode(96 + (i + 1))
                        )}
                        onChange={() => selectOptions(i)}
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
                    <p className="custom-checkbox">
                      <input
                        type="checkbox"
                        id={i}
                        name="options"
                        checked={value.includes(
                          String.fromCharCode(96 + (i + 1))
                        )}
                        onChange={() => selectOptions(i)}
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
    sectionWiseQuestion: state.exam.sectionWiseQuestion,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAnswer: (answer) => dispatch(saveAnswer(answer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MultipleResponse);
