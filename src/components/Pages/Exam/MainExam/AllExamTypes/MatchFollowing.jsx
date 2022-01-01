import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { saveAnswer } from '../../../../../redux/actions/exam';
import { connect } from 'react-redux';
import { MATRIXCONSTANTANSWER, MATRIXCONSTANTOPTION } from './Constant';
import Direction from './Direction';

const MatchFollowing = ({
  singleQuestion,
  languageId,
  saveAnswer,
  selectedOptions,
  clearResponse,
  setClearResponse,
  sectionNumber,
  sectionWiseQuestion,
}) => {
  const [value, setValue] = useState('');
  /**
   * For clearing selected answer
   */
  useEffect(() => {
    if (clearResponse) {
      //setSelectedAnswer(-1);
      saveAnswer('');
      setClearResponse(false);
    }
  }, [clearResponse]);
  useEffect(() => {
    saveAnswer(value.toString());
  }, [value]);

  useEffect(() => {
    let givenAns = sectionWiseQuestion.find(
      (el) => el.sIndex === sectionNumber && el.qIndex === singleQuestion.id
    );
    // setSelectedAnswer((givenAns && givenAns.answer.charCodeAt(0) - 97) || -1);
    setValue((givenAns && givenAns.answer) || '');
  }, [singleQuestion]);

  const formatAnswer = (answerString) => {
    let finalObject = null;
    const answerObject = answerString.split(',');
    for (let ansItem in MATRIXCONSTANTANSWER) {
      const answerFilter = answerObject.filter((ans, key) => {
        if (!ans.indexOf(MATRIXCONSTANTANSWER[ansItem])) {
          return ans;
        }
      });
      if (answerFilter.length > 0) {
        finalObject =
          (finalObject && `${finalObject},${answerFilter.toString()}`) ||
          `${answerFilter.toString()}`;
      }
    }
    return (finalObject && finalObject.toString()) || '';
  };

  const setSelectedAnswer = (answer, option) => {
    const isCharPresent = selectedOptions.indexOf(answer);
    if (isCharPresent >= 0) {
      const res = selectedOptions.split(',');
      const optionItem = res.filter((item, key) => {
        if (item.indexOf(answer)) {
          return item;
        }
      });
      saveAnswer(formatAnswer(`${optionItem.toString()},${answer}-${option}`));
    } else {
      saveAnswer(
        formatAnswer(
          (selectedOptions && `${selectedOptions},${answer}-${option}`) ||
          `${answer}-${option}`
        )
      );
    }
  };

  const answerSection = (optionObject, option) => {
    const isCharPresent = selectedOptions.indexOf(MATRIXCONSTANTANSWER[option]);
    let selectedOption = null;
    if (isCharPresent >= 0) {
      const res = selectedOptions.split(',');
      const optionItem = res.filter((item, key) => {
        if (!item.indexOf(MATRIXCONSTANTANSWER[option])) {
          return item;
        }
      });
      selectedOption = optionItem[0].split('-')[1];
    }
    return (
      <Fragment>
        {optionObject.map((el, i) => (
          <div className="ans-group" key={i}>
            <div className="a-input">
              <p>{MATRIXCONSTANTOPTION[i]}</p>
              <span className="custom-radio">
                <input
                  type="radio"
                  name=""
                  checked={selectedOption === MATRIXCONSTANTOPTION[i]}
                  id={`${MATRIXCONSTANTANSWER[option]}-${MATRIXCONSTANTOPTION[i]}`}
                  onChange={() => {
                    setSelectedAnswer(
                      MATRIXCONSTANTANSWER[option],
                      MATRIXCONSTANTOPTION[i]
                    );
                  }}
                />
                <label
                  htmlFor={`${MATRIXCONSTANTANSWER[option]}-${MATRIXCONSTANTOPTION[i]}`}>
                  &nbsp;
                </label>
              </span>
            </div>
          </div>
        ))}
      </Fragment>
    );
  };
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
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    languageId: state.exam.languageId,
    sectionWiseQuestion: state.exam.sectionWiseQuestion,
    sectionNumber: state.exam.sectionNumber,
    selectedOptions: state.exam.answer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveAnswer: (answer) => dispatch(saveAnswer(answer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchFollowing);
