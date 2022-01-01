import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Toast from '../../Elements/Toast';
import axios from 'axios';
import {
  setReportCardData,
  setTimerState,
} from '../../../../redux/actions/exam';
import { BASE_URL } from './../../../../config';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import Loader from 'react-loader-spinner';
const TestSubmitModal = ({
  close,
  switchSection,
  btnName,
  sectionSummary,
  testSummary,
  testInstructions,
  setReportCardData,
  flagPauseExam,
  setTimerState,
  timeTaken,
  time,
  timeout,
  singleQuestion,
  sectionWiseQuestion,
  answer,
  sectionNumber,
}) => {
  const history = useHistory();
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const [loader, setLoader] = useState(false);
  const [submitBtnDisable, setSubmitBtnDisable] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };



  const reportPage = async () => {
    const testResultId = testInstructions.testInfo.testResultId;
    
    const testPackageId = testInstructions.testInfo.testPackageId;



 


    let singleQs =
      singleQuestion === undefined
        ? JSON.parse(localStorage.getItem('singleQs'))
        : singleQuestion;

    try {
      if (testResultId) {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        if (
          sectionWiseQuestion.find((el) => el.qIndex === singleQs.id) ===
          undefined
        ) {
          const ansSave = await axios.post(
            `${BASE_URL}/exam/testPackage/saveAnswer`,
            {
              testResultId: testResultId,
              testQuestionId: singleQs.id,
              givenAnswer: answer,
              section: testInstructions.sections[sectionNumber].sectionName,
              languageId: localStorage.getItem('langId'),
              state: answer.length > 0 ? 'answered' : 'notAnswered',
              questionTime: (time.m * 60 + time.s).toString(),
            },
            config
          );
        }
       

        const mainapi = `${BASE_URL}/exam/testPackage/submitTest/`;
        const payload = {
          testResultId: testResultId,
          testPackageId: testPackageId,
          timeTaken: timeTaken,
        };
        const res = await axios.post(mainapi, payload, config);

        if (res.status === 200) {


          // if(localStorage.getItem('reportCardData') && JSON.parse(localStorage.getItem('reportCardData')).testResultId !== testResultId.toString()){
          //   localStorage.removeItem('reportCardData');
          // }
      
         
          // if(localStorage.getItem('reportCardData')){
          //   localStorage.setItem('testId', 0);
          //   setReportCardData(JSON.parse(localStorage.getItem('reportCardData')));
          // }else{
          //   const mainapi = `${BASE_URL}/exam/testPackage/reportAfterTest/`;
          //   const payload = { testResultId: testResultId };
          //   const res = await axios.post(mainapi, payload, config);
          //   localStorage.setItem('testId', 0);
          //   const item = res.data.data;
          //   item.testResultId = testResultId;
          //   setReportCardData(item);
          //   localStorage.setItem('reportCardData', JSON.stringify(item));
           
          // }
          


          if (testInstructions.testInfo.candidateSettingSubsequent !== 1) {
            setModalShow(true)
          } else {
            localStorage.setItem("testResultId", testResultId)
            history.push({
              // pathname: `/reportcard/${testInstructions.testInfo.testId}/${testResultId}`,
              pathname: `/report-card`,
              state: {
                testResultId: testResultId,
                testId: testInstructions.testInfo.testId,
                testName: testInstructions.testInfo.testName,
              },
            });
          }
          if (document.fullscreenElement !== null) {
            document.exitFullscreen();
          }
        }
      }
    } catch (error) {
      showErrorToast('Something went wrong. Please try again later !');
    }
  };

  const resumeTest = () => {
    close();
    setTimerState(false, true);
  };

  return (
    <Fragment>

        {/* <Loader
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
           
          /> */}


      <div className="modal-header">
        <h3>Test Exam Summary</h3>
      </div>
      <div className="modal-body">
        <table className="table">
          <thead>
            <tr style={{ textAlign: 'center' }}>
              <th>Section Name</th>
              <th>No. of Questions</th>
              <th>Answered</th>
              <th>Not Answered</th>
              <th>Marked & Answered</th>
              <th>Marked</th>
              <th>Not Visited</th>
            </tr>
          </thead>
          <tbody>
            {testSummary.length === 0 ? (
              <tr style={{ textAlign: 'center' }}>
                <td>{sectionSummary?.section}</td>
                <td>{sectionSummary?.noOfQuestion}</td>
                <td>{sectionSummary.statesCount?.answered}</td>
                <td>{sectionSummary?.statesCount?.notAnswered}</td>
                <td>{sectionSummary?.statesCount?.markedAnswered}</td>
                <td>{sectionSummary?.statesCount?.marked}</td>
                <td>{sectionSummary?.statesCount?.notVisited}</td>
              </tr>
            ) : (
                testSummary.length &&
                testSummary.map((el, i) => (
                  <tr style={{ textAlign: 'center' }} key={i}>
                    <td>{el.section}</td>
                    <td>{el.noOfQuestion}</td>
                    <td>{el.statesCount?.answered}</td>
                    <td>{el.statesCount?.notAnswered}</td>
                    <td>{el.statesCount?.markedAnswered}</td>
                    <td>{el.statesCount?.marked}</td>
                    <td>{el.statesCount?.notVisited}</td>
                  </tr>
                ))
              )}
          </tbody>
          <tfoot>
            {testSummary.length > 0 && (
              <tr style={{ textAlign: 'center' }}>
                <th>Total</th>
                <th>
                  {testSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.noOfQuestion,
                    0
                  )}
                </th>
                <th>
                  {testSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.statesCount.answered,
                    0
                  )}
                </th>
                <th>
                  {testSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.statesCount.notAnswered,
                    0
                  )}
                </th>
                <th>
                  {testSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.statesCount.markedAnswered,
                    0
                  )}
                </th>
                <th>
                  {testSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.statesCount.marked,
                    0
                  )}
                </th>
                <th>
                  {testSummary.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.statesCount.notVisited,
                    0
                  )}
                </th>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
      <div className="modal-footer">
        <h3>Are you sure you want to submit?</h3>
        {!timeout && (
          <div className="btn-group">
            {!flagPauseExam && (
              <button className="btn-grey" onClick={close}>
                Close
              </button>
            )}
            {flagPauseExam && (
              <button className="btn-grey" onClick={resumeTest}>
                Resume Test
              </button>
            )}
            
            <button
              disabled={submitBtnDisable}
              className={`btn-primary radius  btn btn-lg btn-warning`}
              onClick={() => {
                if (
                  btnName === 'Submit Test' ||
                  testInstructions.testConfig.testPatternType === 2 || testInstructions.testConfig.testPatternType === 3
                ) {
                  setSubmitBtnDisable(true);
                  setLoader(true);
                  return reportPage();
                }
                switchSection();
              }}>

               {loader ? <span class="glyphicon glyphicon-refresh glyphicon-refresh-animate">Submitting...</span> 
                  :

              testInstructions.testConfig.testPatternType === 2 || testInstructions.testConfig.testPatternType === 3
                ? 'Submit Test'
                : btnName
              }
            </button>
          </div>
        )} 
        {timeout && (
          <div className="btn-group">
            <button className="btn-primary radius" onClick={() => reportPage()}>
              Get Report
            </button>
          </div>
        )}
      </div>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />

      {modalShow && < Modal addClass="enrolled-modal" >
        <div className="enrolled-success">
          {/* <img
            src={require('../assets/images/ArrowVerified.svg')}
            alt="verify"
          /> */}
          <h2></h2>
          <p>
            Thanks For Appearing The Test{' '}
            {/* {text} */}
          </p>

          <button
            className="p-btn btn-primary"
            onClick={() => {
              window.close();
              window.open(`/testdetails/${testInstructions.testInfo.testPackageId}`, 'main');
               localStorage.removeItem('activeTab')
              setModalShow(false)
            }}>
            Close
            </button>
        </div>
      </Modal >}
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    sectionSummary: state.exam.sectionSummary,
    testSummary: state.exam.testSummary,
    testInstructions: state.exam.testInstructions,
    flagPauseExam: state.exam.flagPauseExam,
    sectionWiseQuestion: state.exam.sectionWiseQuestion,
    answer: state.exam.answer,
    sectionNumber: state.exam.sectionNumber,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setReportCardData: (reaportData) =>
      dispatch(setReportCardData(reaportData)),
    setTimerState: (flag, resumeBtnClk) =>
      dispatch(setTimerState(flag, resumeBtnClk)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TestSubmitModal);
