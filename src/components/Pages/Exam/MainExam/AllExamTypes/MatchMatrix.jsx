import React, { Fragment, useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { saveAnswer } from '../../../../../redux/actions/exam';
import { connect } from 'react-redux';
import { MATRIXCONSTANTANSWER, MATRIXCONSTANTOPTION } from './Constant';
import Direction from './Direction';

const MatchMatrix = ({
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
        for (let optionItem in MATRIXCONSTANTOPTION) {
          const optionFilter = answerFilter.filter((option, key) => {
            if (option.indexOf(MATRIXCONSTANTOPTION[optionItem]) === 2) {
              return option;
            }
          });
          if (optionFilter.length > 0) {
            finalObject =
              (finalObject && `${finalObject},${optionFilter.toString()}`) ||
              `${optionFilter.toString()}`;
          }
        }
      }
    }
    return (finalObject && finalObject.toString()) || '';
  };

  const setSelectedAnswer = (answer, option) => {
    const isCharPresent = selectedOptions.indexOf(answer);
    let formattedAnswer = '';
    if (isCharPresent >= 0) {
      const res = selectedOptions.split(',');
      const staticObjFilter = res.filter((item, key) => {
        if (item.indexOf(answer)) {
          return item;
        }
      });
      const operationalObj = res.filter((item, key) => {
        if (!item.indexOf(answer)) {
          return item;
        }
      });
      if (operationalObj.toString().indexOf(option) >= 0) {
        const filterObj = operationalObj.filter((item, key) => {
          if (item !== `${answer}-${option}`) {
            return item;
          }
        });
        saveAnswer(
          formatAnswer(`${staticObjFilter.toString()},${filterObj.toString()}`)
        );
      } else {
        saveAnswer(
          formatAnswer(
            `${staticObjFilter.toString()},${operationalObj.toString()},${answer}-${option}`
          )
        );
      }
    } else {
      saveAnswer(
        formatAnswer(
          (selectedOptions && `${selectedOptions},${answer}-${option}`) ||
          `${answer}-${option}`
        )
      );
    }
    // let givenAns = sectionWiseQuestion.find(
    //   (el) => el.sIndex === sectionNumber && el.qIndex === singleQuestion.id
    // );
  };

  const answerSection = (optionObject, option) => {
    const isCharPresent = selectedOptions.indexOf(MATRIXCONSTANTANSWER[option]);
    let selectedOption = [];
    if (isCharPresent >= 0) {
      const res = selectedOptions.split(',');
      const optionItem = res.filter((item, key) => {
        if (!item.indexOf(MATRIXCONSTANTANSWER[option])) {
          return item;
        }
      });
      optionItem.map((item, i) => {
        const selOption = item.split('-')[1];
        selectedOption.push(selOption);
      });
    }
    selectedOption = selectedOption.toString();
    return (
      <Fragment>
        {optionObject.map((el, i) => (
          <div className="ans-group" key={i}>
            <div className="a-input">
              <p>{MATRIXCONSTANTOPTION[i]}</p>
              <span className="custom-checkbox">
                <input
                  type="checkbox"
                  name=""
                  checked={selectedOption.indexOf(MATRIXCONSTANTOPTION[i]) >= 0}
                  id={`${MATRIXCONSTANTANSWER[option]}-${MATRIXCONSTANTOPTION[i]}`}
                  onChange={() => {
                    setSelectedAnswer(
                      MATRIXCONSTANTANSWER[option],
                      MATRIXCONSTANTOPTION[i]
                    );
                  }}
                />
                <label
                  htmlFor={`${MATRIXCONSTANTANSWER[option]}-${MATRIXCONSTANTOPTION[i]}`}></label>
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
                        {ReactHtmlParser(el.answer)}
                      </div>
                      <div className="r-input">
                        <span>{MATRIXCONSTANTOPTION[i]}.</span>{' '}
                        {ReactHtmlParser(el.options)}
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
                        {ReactHtmlParser(el.answer)}
                      </div>
                      <div className="r-input">
                        <span>{MATRIXCONSTANTOPTION[i]}.</span>{' '}
                        {ReactHtmlParser(el.options)}
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

export default connect(mapStateToProps, mapDispatchToProps)(MatchMatrix);
