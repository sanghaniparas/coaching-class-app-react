import React, { Fragment, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import PortalHeader from './../PortalInstruction/PortalHeader';
import TestBody from './TestBody';
import TestFooter from './TestFooter';
import { connect } from 'react-redux';
import {
  getTestInstructions,
  changeLanguage,
} from './../../../../redux/actions/exam';

const TestInstruction = ({
  getTestInstructions,
  changeLanguage,
  testInstructions,
  loading,
  match,
}) => {
  const [check, setCheck] = useState(false);
  const location = useLocation();
  const history = useHistory();
  localStorage.setItem('setTimeOut', 0);
  //   localStorage.setItem('testId', 0);

  useEffect(() => {
    window.name = 'main';
    if (localStorage.getItem('langId') === null) {
      localStorage.setItem('langId', 1);
      changeLanguage(parseInt(localStorage.getItem('langId')));
    }
    if (location.state) {
      getTestInstructions(location.state.id);
    } else {
      history.push(`/nomatch`);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(testInstructions).length) {
      localStorage.setItem('testId', testInstructions.testInfo.testId);
      localStorage.setItem('testPackageId', testInstructions.testInfo.testPackageId);
      
    }
  }, [testInstructions]);

  const handleCheck = () => {
    setCheck(!check);
  };

  return (
    <>
      {loading ? (
        <div style={{ minHeight: '100vh' }}>
          <Loader
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
            type="Oval"
            color="#FF7249"
            height={40}
            width={40}
           
          />
        </div>
      ) : (
        <Fragment>
          <div
            className={`portal-wrap  ${
              testInstructions.testInfo.template.toLowerCase() !== 'default' &&
              ['rrb', 'cat', 'gate'].includes(
                testInstructions.testInfo.template.toLowerCase()
              )
                ? 'template-railway'
                : `template-${testInstructions.testInfo.template.toLowerCase()}`
            }`}>
            <PortalHeader testInstructions={testInstructions} />
            <TestBody
              testInstructions={testInstructions}
              handleCheck={handleCheck}
            />
            <TestFooter check={check} id={location.state.id} testPackageId= {testInstructions?.testInfo?.testPackageId}/>
          </div>
        </Fragment>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
 
  return {
    loading: state.exam.loading,
    testInstructions: state.exam.testInstructions,
    
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTestInstructions: (testId) => dispatch(getTestInstructions(testId)),
    changeLanguage: (langId) => dispatch(changeLanguage(langId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestInstruction);
