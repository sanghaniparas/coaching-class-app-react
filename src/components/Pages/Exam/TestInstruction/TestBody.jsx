import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
  changeLanguage,
  toggleInstruction,
} from './../../../../redux/actions/exam';
import { connect } from 'react-redux';
import { AlarmClock } from '../../../Core/Layout/Icon';
import moment from 'moment'


const TestBody = ({
  testInstructions,
  toggleInstruction,
  showInstruction = false,
  orderNo,
  changeLanguage,
  handleCheck,
  toggleOpenClass
}) => {
  console.log(testInstructions)
  const [intervalTime, setintervalTime] = useState(testInstructions.testConfig.intervalTime || null);

  useEffect(() => {
    if(testInstructions){
      const interval = setInterval(() => {
        setintervalTime(intervalTime => intervalTime - 1)
      }, 1000);
      return () => clearInterval(interval)
    }
  }, [testInstructions.testConfig.intervalTime, intervalTime])

  useEffect(() => {
    console.log("intervalTime", intervalTime);
  }, [intervalTime])


  return (
    <>
    {testInstructions && 
      <div className="temp-container temp-inst langchoose">
        <div className="scroll-area">
          <div className="portal-body">
            <h2 className="temp-instruction">
              Test Instruction
              {/* <div className="choose-lang">
                <p>Choose Your default Language</p>
                <select name="" id="">
                  <option value="">English</option>
                </select>
              </div> */}
            </h2>
            <div className="bodycontainer">
              {showInstruction ? null : (
                <h3 className="temp-instruction-sub">
                  {testInstructions?.testInfo?.testName} -{' '}
                  {testInstructions?.testInfo?.packageTestType?.testTypeName}
                </h3>
              )}

              {showInstruction ? null : (
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <h4 className="tem-sub-title">
                    Duration: {testInstructions?.testConfig?.duration} Mins
                  </h4>
                  <h4 className="tem-sub-title">
                    Maximum Marks: {testInstructions?.testConfig?.marks}
                  </h4>
                </div>
              )}

          
              {testInstructions && ReactHtmlParser(testInstructions?.testInstruction?.testContent)}
                
                 
            </div>
          </div>
        </div>
        <div className="portal-sidebar">
          <div className="avatar-info">
            <span className="avatar-img">
              <img
                src={require('../../../../assets/images/no-image-icon-md.png')}
                alt=""
              />
            </span>
            <h3>John Smith</h3>
          </div>
        </div>
      </div>
}
      {showInstruction ? null : (
        <>
          <div className="temp-lang-selection">
            <div className="choose-lang">
              Choose your default Language:
              <select
                onChange={(e) => {
                  localStorage.setItem('langId', parseInt(e.target.value));
                  changeLanguage(parseInt(e.target.value));
                }}>
                {testInstructions.languages.map((el, i) => (
                  <option key={el.id}
                    selected={
                      el.id === parseInt(localStorage.getItem('langId'))
                    }
                    value={el.id}>
                    {el.languageName}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-red-1">
              <strong>
                Please Note all questions will appear in your default language.
                This language can be changed for a particular question later on.{' '}
              </strong>
            </p>
            <hr />
            <h4 className="tem-sub-title">Declaration:</h4>
            <p className="custom-checkbox">
              <input type="checkbox" id="declaration" onChange={handleCheck} />
              <label htmlFor="declaration">
                I have read and understood the instructions. All computer
                hardware allotted to me are in proper working condition. I
                declare that I am not in possession of / not wearing / not
                carrying any prohibited gadget like mobile phone, bluetooth
                devices etc. /any prohibited material with me into the
                Examination Hand agree that in case of not adhering to the
                instructions, I shall be liable to be debarred from this Test
                and/or to disciplinary action, which may include ban from future
                Tests / Examinations
              </label>
            </p>
          </div>
        </>
      )}

      {showInstruction ? (
        <div className="solution-footer">
          <div className="left-panel">
            <button
              className="btn-grey"
              style={{ cursor: 'default', opacity: '0' }}>
              Mark for Review &amp; Next
            </button>
            <button
              className="btn-grey"
              style={{ cursor: 'default', opacity: '0' }}>
              Clear Response
            </button>
          </div>

          <p className="intervalTime" style={{ color: "red" }}><AlarmClock />{' '}{moment.duration(intervalTime, 'seconds').format("hh[hrs]:mm [mins]:ss [secs]")}</p>


          <button
            className="radius"
            onClick={() => {
              toggleInstruction(false)
              toggleOpenClass(false)

            }}

            style={{
              backgroundColor: '#3a466b',
              border: 'none',
              padding: '10px 20px',
              fontWeight: '600',
              color: '#fff',
              borderRadius: '4px',
            }}>
            Continue Test
          </button>
        </div>
      ) : null}
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (langId) => dispatch(changeLanguage(langId)),
    toggleInstruction: (value) => dispatch(toggleInstruction(value)),
  };
};

export default connect(null, mapDispatchToProps)(TestBody);
