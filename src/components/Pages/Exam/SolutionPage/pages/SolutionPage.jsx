import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Header from './Header';
import ExamBody from './ExamBody';
import SideInfo from './SideInfo';
import { getReportQuestion } from './../../../../../redux/actions/exam';
import { fetchSolutionData } from './../../../../../redux/actions/solution';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const SolutionPage = ({
  testInstructions,
  match,
  loading,
  fetchSolutionData,
  getReportQuestion,
  solutionData,
  history,
}) => {
  const [sidebar, setsidebar] = useState(false);
  const [report, setreport] = useState(false);
  const [counter2, setCounter2] = useState(0);
  const [submitModal, setsubmitModal] = useState(false);
  const location = useLocation();
  const testResultId = match.params.id;
  // const testResultId = location.state.testResultId;

  const submitModalHandler = () => {
    setsubmitModal(!submitModal);
  };

  const closeModalHandler = () => {
    setsubmitModal(false);
  };

  const reportToggle = () => {
    setreport(!report);
  };

  const sidebarToggleHandler = () => {
    setsidebar(!sidebar);
  };

  useEffect(() => {
    localStorage.setItem('inReport', 0);
    getReportQuestion();
    if (testResultId) {
      (async function getData() {
        await fetchSolutionData(testResultId);
      })();
    }
  }, []);

  const setValue = (val) => {
    setCounter2(val);
  };

  return (
    <>



    
      {localStorage.getItem('token') ?
      
      loading || solutionData && Object.keys(solutionData).length === 0 ? (
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
          <>
            <div className={`testQuestions-wrapper ${sidebar ? 'open' : ' '}`}>
              <Header />
              <ExamBody
                sidebarToggleHandler={sidebarToggleHandler}
                reportToggle={reportToggle}
                report={report}
                counter2={counter2}
                submitModal={submitModal}
                closeModalHandler={closeModalHandler}
              />
              <SideInfo
                setValue={setValue}
                submitModalHandler={submitModalHandler}
              />
            </div>
          </>
        ) :
        history.push('/')
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.solution.loading,
    testInstructions: state.exam.testInstructions,
    solutionData: state.solution.solutionData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSolutionData: (testResultId) =>
    dispatch(fetchSolutionData(testResultId)),
    getReportQuestion: () => dispatch(getReportQuestion()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SolutionPage);
