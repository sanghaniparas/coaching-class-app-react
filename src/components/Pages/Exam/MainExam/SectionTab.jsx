import React, { Fragment, useEffect, useState, useRef } from 'react';
import Timer from 'react-compound-timer';
import {
  changeLanguage,
  switchTabsStateCount,
} from './../../../../redux/actions/exam';
import { connect } from 'react-redux';
import OutsideClickHandler from 'react-outside-click-handler';
import { TIMESTATE } from './AllExamTypes/Constant';
import { CalculatorIcon, Info } from '../../../Core/Layout/Icon';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const SectionTab = ({
  testInstructions,
  activeTab,
  changeLanguage,
  toggleSectionTabs,
  stateCount,
  switchTabsStateCount,
  sectionNumber,
  loading
}) => {
  const [langId, setLangId] = useState(0);
  const [timerState, setTmrState] = useState(0);
  const [timeSpend, settimeSpend] = useState(0);



  

  useEffect(() => {
    setLangId(parseInt(localStorage.langId));
    
  }, []);
  

  useEffect(() => {
    if(testInstructions && testInstructions.sections[sectionNumber]){
    const data = {
      testResultId: testInstructions.testInfo.testResultId,
      section: testInstructions.sections[sectionNumber].sectionName,
    };

    switchTabsStateCount(data);

  }
  }, [sectionNumber]);

  const [btnShow, setbtnShow] = useState(false);
  const btnToggleHandler = () => {
    setTimeout(
      () => setbtnShow(!btnShow), 
      1000
    );
    
  };

  const showTimer = () => (
    <Timer
      initialTime={
        Object.keys(testInstructions).length &&
        testInstructions.testConfig.duration * 60000
      }
      direction="backward">
      {({
        start,
        resume,
        pause,
        stop,
        reset,
        timerState,
        getTimerState,
        getTime,
      }) => {
        const pauseStyle = {
          position: 'absolute',
          top: '10px',
          right: '40px',
          padding: '10px 47px 10px 11px',
          opacity: '0',
        };
        getTimerState() === TIMESTATE.PLAYING && setTmrState(0);
        getTimerState() === TIMESTATE.STOPPED && setTmrState(1);
        getTimerState() === TIMESTATE.PAUSED && setTmrState(2);
        settimeSpend(Math.floor(getTime() / 1000));
        return (
          <React.Fragment>
            <span className="count-box">
              <Timer.Hours />
            </span>{' '}
            :
            <span className="count-box">
              {' '}
              <Timer.Minutes />
            </span>{' '}
            :
            <span className="count-box">
              {' '}
              <Timer.Seconds />
            </span>
            <div>
              <button style={pauseStyle} onClick={pause}>
                Pause
              </button>
              <button
                style={{ display: 'none' }}
                id="resumeBtn"
                onClick={resume}>
                Pause
              </button>
            </div>
          </React.Fragment>
        );
      }}
    </Timer>
  );

  return (
    <>
      <div className="cat-top-bar">
        <ul className="list-items">
          <li className="active">
            <span>
              VARC <Info />{' '}
            </span>{' '}
          </li>
          <li>
            <span>
              DILR <Info />{' '}
            </span>
          </li>
          <li>
            <span>
              QA <Info />{' '}
            </span>
          </li>
        </ul>
        <div className="calculator-icon">
          <CalculatorIcon />
        </div>
      </div>
      <div className="section-top-bar">
        <div className="left-panel">
          <ul className="jee-list">
            {Object.keys(testInstructions).length &&
              testInstructions.sections.map((el, i) => (
                <Fragment key={i}>
                  <li
                    className={((Number(localStorage.getItem("activeTab"))) || 0) === i ? 'active' : ''}
                    onClick={() => {
                      toggleSectionTabs(i);
                      btnToggleHandler();
                    }}>
                    <OutsideClickHandler
                      onOutsideClick={() => {
                        setbtnShow(false);
                      }}>
                      {/* <button
                      disabled={
                        testInstructions.testConfig.testPatternType === 1 ||
                          testInstructions.testConfig.testPatternType === 3
                          ? true
                          : false
                      }                        
                      > */}
                      {el?.sectionName}
                      {/* </button> */}
                    </OutsideClickHandler>
                  </li>
                </Fragment>
              ))}

            {/* <li>JEE - MAIN II</li>
            <li className="active">Physics</li>
            <li>Chemistry</li>
            <li>Mathematics</li>
            <li>Biology</li> */}
          </ul>
          {testInstructions.testConfig.testPatternType !== 3 && (
            <>
              <h4>Sections:</h4>
              <div className="section-scroll">
                {Object.keys(testInstructions).length &&
                  testInstructions.sections.map((el, i) => (
                    <Fragment key={i}>
                      <div className="btn-group-dropdown">
                        <OutsideClickHandler
                          onOutsideClick={() => {
                            setbtnShow(false);
                          }}>
                          <button
                            disabled={
                              testInstructions.testConfig.testPatternType ===
                                1 ||
                              testInstructions.testConfig.testPatternType === 3
                                ? true
                                : false
                            }
                            onClick={() => {
                              toggleSectionTabs(i);
                              btnToggleHandler();
                            }}
                            className={
                              ((Number(localStorage.getItem("activeTab"))) || 0) === i
                                ? 'btn btn-default active'
                                : 'btn btn-default'
                            }>
                            {el?.sectionName}
                          </button>

                      {loading &&    <ul
                            className={`btn-dropdown ${
                              btnShow ? ((Number(localStorage.getItem("activeTab"))|| 0) === i ? 'open' : '') : ''
                            }`}>


                          <li>
                              <span className="ovl green">
                                {stateCount?.answered || 0}
                              </span>{' '}
                              Answered
                            </li>
                          
                            <li>
                              <span className="ovl-rev red">
                                {stateCount?.notAnswered || 0}
                              </span>{' '}
                              Not Answered
                            </li>
                            <li>
                              <span className="rounded">
                                {stateCount?.marked || 0}
                              </span>{' '}
                              Marked
                            </li>
                            <li>
                              <span className="radius red">
                                {stateCount?.notVisited || 0}
                              </span>{' '}
                              Not Visited
                            </li>
                          </ul>
                }
                        
                        </OutsideClickHandler>
                      </div>
                    </Fragment>
                  ))}
              </div>{' '}
            </>
          )}
        </div>
        <div className="right-panel">
          {/* JEE Exam */}
          {/* <select name="" id="" className="jee-selct-exam">
            <option value="">B.Tech</option>
          </select> */}

          <p className="r-time">
            Time Left: <span>{showTimer()}</span>
          </p>
          <p>Language</p>
          <select
            value={langId}
            onChange={(e) => {
              setLangId(parseInt(e.target.value));
              localStorage.setItem('langId', parseInt(e.target.value));
              changeLanguage(parseInt(e.target.value));
            }}
            className="form-control input-sm">
            {Object.keys(testInstructions).length &&
              testInstructions.languages.map((el, i) => (
                <option value={el.id}>{el.languageName}</option>
              ))}
          </select>
        </div>
      </div>
      <div className="r-tabsection">
        {Object.keys(testInstructions).length &&
          testInstructions.sections.map((el, i) => (
            <Fragment key={i}>
              <div
                className={((Number(localStorage.getItem("activeTab"))) || 0) === i ? 'tab-btn' : 'tab-btn active'}
                onClick={() => {
                  toggleSectionTabs(i);
                  btnToggleHandler();
                }}>
                <OutsideClickHandler
                  onOutsideClick={() => {
                    setbtnShow(false);
                  }}>
                  {/* <button
                    disabled={
                      testInstructions.testConfig.testPatternType === 1 ||
                        testInstructions.testConfig.testPatternType === 3
                        ? true
                        : false
                    }                        
                    > */}
                  {el?.sectionName}

                  <Info fill="#5bb1fa" />
                  {/* </button> */}
                </OutsideClickHandler>
              </div>
            </Fragment>
          ))}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    testInstructions: state.exam.testInstructions,
    sectionNumber: state.exam.sectionNumber,
    stateCount: state.exam.stateCount,
    loading:true
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguage: (langId) => dispatch(changeLanguage(langId)),
    switchTabsStateCount: (data) => dispatch(switchTabsStateCount(data)),
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SectionTab);
