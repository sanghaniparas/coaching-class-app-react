import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Toast from '../../Elements/Toast';
import ReportCardHeader from './ReportCardHeader';
import ReportCardOverview from './ReportCardOverview';
import SectionWiseReport from './SectionWiseReport';
import QusetionDifficultyGraph from './QusetionDifficultyGraph';
import TopPerformer from './TopPerformer';
import RecommendeCoaching from './RecommendeCoaching';
import {
  setLoading,
  setReportCardData,
  getExamResult,
} from '../../../../redux/actions/exam';
import CoachingList from '../../Coaching/CoachingList';
import { BASE_URL } from './../../../../config';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

const ReportCard = ({
  loading,
  setLoading,
  setReportCardData,
  getExamResult,
  reportData,
  match,
  history,
}) => {
  const {
    sectionWiseReport,
    topPerformer,
    questionDifficulty,
    recommendedTestPackages,
    topPerformerStatus
  } = reportData ;
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const location = useLocation();
  localStorage.setItem('setTimeOut', 0);
  const showErrorToast = (message) => {
    toggleIsVisible(true);
    setToastMessage(message);
    setTimeout(() => toggleIsVisible(false), 5000);
  };

  window.onbeforeunload = function () {  return "Your work will be lost."; };

  useEffect(() => {
    localStorage.removeItem('testId');

    const val = document.getElementsByTagName('HTML')[0];
    val.style = '';
    localStorage.setItem('inReport', 1);
    async function getAllReport() {
      setLoading(true);
      const resultTestId = localStorage.getItem('testResultId');

      localStorage.removeItem('reportCardData');
     
      if(localStorage.getItem('reportCardData') && JSON.parse(localStorage.getItem('reportCardData')).testResultId !== resultTestId.toString()){
          localStorage.removeItem('reportCardData');
      }

     
      
      

      console.log("report", resultTestId);
      try {
        if (resultTestId) {
          const config = {
            headers: {
              'Content-Type': 'Application/json',
              Authorization: `${localStorage.token}`,
            },
          };


          if(localStorage.getItem('reportCardData')){
            setReportCardData(JSON.parse(localStorage.getItem('reportCardData')));
            console.log(JSON.parse(localStorage.getItem('reportCardData')))
          }else{
            const mainapi = `${BASE_URL}/exam/testPackage/reportAfterTest/`;
            const payload = { testResultId: resultTestId };
            const res = await axios.post(mainapi, payload, config);
            if(res && res.data && res.data.data){
              const item = res.data.data;
              item.testResultId = resultTestId;
              setReportCardData(item);
              localStorage.setItem('reportCardData', JSON.stringify(item));
              console.log(item)
            }
           
          }


         


        
        }
      } catch (error) {
        showErrorToast('Something went wrong. Please try again later !');
      }
    }
    getAllReport();
    return () => {
      console.log('parseInt(localStorage.getItem', parseInt(localStorage.getItem('inReport')));
      return false;
      if (parseInt(localStorage.getItem('inReport'))) {
        history.goForward();
      }
    };
  }, []);

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
          <>
            <div className="testReport-wrapper">
              <ReportCardHeader
                testName={localStorage.getItem('testName')}
                history={history}
              />
              <div className="testReport-body">
                <div className="container">
                  {reportData?.score && (
                    <ReportCardOverview
                      reportData={reportData}
                      testResultId={localStorage.getItem('testResultId')}
                    />
                  )}
                  {sectionWiseReport && (
                    <SectionWiseReport sectionWiseReport={sectionWiseReport} />
                  )}
                  <div className="perform-wrapper">
                    <div className="perform-left">
                      {/* <div className="card predictor">
                      <h2 className="report-title">Rank Predictor</h2>
                    </div> */}
                      {questionDifficulty && (
                        <QusetionDifficultyGraph
                          questionDifficulty={questionDifficulty}
                        />
                      )}
                    </div>

                    {topPerformer && reportData?.topPerformerStatus !== 2 && <TopPerformer topPerformer={topPerformer} />}
                  </div>
                </div>
                <div className="a-coaching-list-cover viewsolution-carousel">
                  {recommendedTestPackages && (
                    <RecommendeCoaching
                      itemCoaching={recommendedTestPackages}
                      title={'Recommended Test Packages'}
                    />
                  )}
                </div>
              </div>
              <Toast isVisible={isVisible} toastMessage={toastMessage} />
            </div>
          </>
        )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.exam.loading,
    reportData: state.exam.reportCardData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setLoading: (flag) => dispatch(setLoading(flag)),
    setReportCardData: (reaportData) =>
      dispatch(setReportCardData(reaportData)),
      getExamResult: (testId) => dispatch(getExamResult(testId)),
   
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReportCard);
