import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import { useToasts } from 'react-toast-notifications';
import useSubTabsData from './../../../Hooks/useSubTabsData';
import TestPackageDetailsSkeleton from './../../../skeletons/TestDetails/TestPackageDetailsSkeleton';
import TestDetailsExamsSkeleton from './../../../skeletons/TestDetails/TestDetailsExamsSkeleton';
import { Modal } from '../../Core/Layout/Modal/Modal';
import ResultPublishModal from '../../../common/ResultPublishModal';

const TestSeriesPackageDetails = ({
  testDetails,
  match,
  testEnroll,
  history,
}) => {
  const [isIndex, setIsIndex] = useState(0);
  const [subTypeId, setSubTypeId] = useState(0);
  const [testName, setTestName] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const [totalList, setTotalList] = useState(0);

  const [newData, setSubTabsData] = useSubTabsData([]);

  const { addToast } = useToasts();

  const changeTab = (idx) => {
    setIsIndex(idx);
    showTestTypes(
      testDetails.examNameExamTypeGroup[idx].examType.id,
      testDetails.examNameExamTypeGroup[idx].examName.id,
      testDetails.examNameExamTypeGroup[idx].packageTestTypes[0]
        .packageTestTypeId
    );
  };

  const showTestTypes = async (
    examTypeId,
    examNameId,
    packageTestTypeId,
    id
  ) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const payload = {
      testPackageId: match.params.id.toString(),
      examTypeId:
        testDetails.examNameExamTypeGroup.length !== 0
          ? examTypeId.toString()
          : null,
      examNameId:
        testDetails.examNameExamTypeGroup.length !== 0
          ? examNameId.toString()
          : null,
      packageTestTypeId:
        testDetails.examNameExamTypeGroup.length !== 0
          ? packageTestTypeId.toString()
          : null,
    };

    setSubTypeId(id);

    try {
      const response = await axios.post(
        `${BASE_URL}/testPackage/testList`,
        payload,
        config
      );

      setTestName(response.data.data);
      setTotalList(response.data.data.length);
      
      // if(localStorage.getItem("totalCount")){
      //   setTotalList(localStorage.getItem("totalCount"));
      // }else{
      //   setTotalList(response.data.data.length);
      //   localStorage.setItem("totalCount",response.data.data.length);
      // }


      
      console.log(response.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Object.keys(testDetails).length === 0) {
      setLoading(true);
    } else {
      setLoading(false);
      showTestTypes(
        testDetails.examNameExamTypeGroup.length !== 0
          ? testDetails.examNameExamTypeGroup[0].examType.id
          : null,
        testDetails.examNameExamTypeGroup.length !== 0
          ? testDetails.examNameExamTypeGroup[0].examName.id
          : null,
        testDetails.examNameExamTypeGroup.length !== 0 ? '' : null
      );
    }

   // console.log(testDetails.testpackageDetails)
    
  }, [testDetails]);

  const alterTabs = useCallback(
    async (examTypeId, examNameId, packageTestTypeId, id) => {
      const payload = {
        testPackageId: match.params.id.toString(),
        examTypeId:
          Object.keys(testDetails).length !== 0 &&
            testDetails.examNameExamTypeGroup.length !== 0
            ? examTypeId.toString()
            : null,
        examNameId:
          Object.keys(testDetails).length !== 0 &&
            testDetails?.examNameExamTypeGroup.length !== 0
            ? examNameId.toString()
            : null,
        packageTestTypeId:
          Object.keys(testDetails).length !== 0 &&
            testDetails?.examNameExamTypeGroup.length !== 0
            ? packageTestTypeId.toString()
            : null,
      };

      try {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        const response = await axios.post(
          `${BASE_URL}/testPackage/testList`,
          payload,
          config
        );

        if (response.data.data) setSubTabsData(response.data.data);
      } catch (err) {
        console.log(err);
      }
    },
    [isIndex]
  );

  useEffect(() => {
    if (Object.keys(testDetails).length !== 0) {
      alterTabs(
        testDetails.examNameExamTypeGroup.length !== 0
          ? testDetails.examNameExamTypeGroup[0].examType.id
          : null,
        testDetails.examNameExamTypeGroup.length !== 0
          ? testDetails.examNameExamTypeGroup[0].examName.id
          : null,
        testDetails.examNameExamTypeGroup.length !== 0 ? '' : null
      );
      setSubTypeId(100);
    }



    

  }, [isIndex, testDetails]);

  const notifyEnroll = (text) => {
    toast.info(text, {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const validateAndAttem = (testId, el) => {
    // if (el.multipleAttempStatus === 2 && el.Attempted === 1){
    //   return notifyEnroll('You already attempted the test!');
    // }
      

    // if (
    //   el.multipleAttempStatus === 1 &&
    //   el.Attempted === parseInt(el.mutlipleAttemp) + 1
    // ){
    //   return notifyEnroll('You already attempted the test!');
    // }
      

    let isTestEnroll = false;
    if (testDetails.testpackageDetails.saleType === 4) {

      if (testEnroll || testDetails.enrollStatus) {

        console.log("test *****");

        isTestEnroll = true;
        history.push({ pathname: `/portal-instructions`, state: { id: testId } });
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        //!isTestEnroll && notifyEnroll('Please Enroll to Attempt ');
      } else {
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
        notifyEnroll('Please Enroll to Attempt ');
      }
    }

    if (
      testDetails.testpackageDetails.saleType === 1 &&
      testDetails.testpackageDetails.packageactive === 1
    ) {
      history.push({ pathname: `/portal-instructions`, state: { id: testId } });
    } else if (testDetails.testpackageDetails.saleType === 1 &&
      testDetails.testpackageDetails.packageactive === 0) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      notifyEnroll('Buy now to attempt the test!');
    }


    if (
      testDetails.testpackageDetails.saleType !== 1 &&
      testDetails.testpackageDetails.saleType === 3 &&
      testDetails.testpackageDetails.passAccess === 1

    ) {
      history.push({ pathname: `/portal-instructions`, state: { id: testId } });
    } else if (testDetails.testpackageDetails.saleType === 3 &&
      testDetails.testpackageDetails.passAccess === 0) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      notifyEnroll('Buy pass to unlock');
    }
  };


  const getCount =(id)=> {
   // console.log(testDetails.testpackageDetails.testTypes.testTypeId || testTypeCount) 
    if(testDetails && testDetails.testpackageDetails && testDetails.testpackageDetails.testTypes){
        const arra = testDetails.testpackageDetails.testTypes;
        const filteredArray = arra.filter(function( obj ) {
          return obj.testTypeId === id;
      }).map(function( obj ) {
          return obj.testTypeCount;
      });
      
      return filteredArray[0] || 0; // a list of ids
    }
  }

 
  const getTotalCount =()=> {
    // console.log(testDetails.testpackageDetails.testTypes.testTypeId || testTypeCount) 
     if(testDetails && testDetails.testpackageDetails && testDetails.testpackageDetails.testTypes){
         const arra = testDetails.testpackageDetails.testTypes;
         const filteredArray = arra.map(function( obj ) {
           return obj.testTypeCount;
       });

       if(filteredArray){
        const count = filteredArray.reduce((acc, val) => acc+val, 0);
        return count || 0; // a list of ids
       }

       
       
       
     }
   }



  return (
    <>
      {Object.keys(testDetails).length &&
        testDetails && testDetails.examNameExamTypeGroup &&  testDetails.examNameExamTypeGroup.length ? (
          <div className="a-coching-card-details">
            <h2>Package Details</h2>

            <div className="a-test-series">
              <div className="a-tes-doc a-test-infoseries">
                {Object.keys(testDetails).length === 0 && (
                  <TestPackageDetailsSkeleton />
                )}
                <ul className="a-test-tab-exam">
                  {Object.keys(testDetails).length === 0
                    ? null
                    : testDetails.examNameExamTypeGroup.map((el, idx) => (
                      <li
                        key={idx}
                        onClick={() => changeTab(idx)}
                        className={isIndex === idx ? 'a-activeTb' : ''}>
                        {el.examName.examName}
                      </li>
                    ))}
                </ul>

                <ul className="a-test-subtab-exam">
                  {Object.keys(testDetails).length && (
                    <li
                      className={subTypeId === 100 ? 'sub-type-test' : ''}
                      onClick={() =>
                        showTestTypes(
                          testDetails.examNameExamTypeGroup[isIndex].examType.id,
                          testDetails.examNameExamTypeGroup[isIndex].examName.id,
                          '',
                          100
                        )
                      }>
                      All({getTotalCount()})
                    </li>
                  )}
                  {Object.keys(testDetails).length === 0
                    ? null
                    : testDetails && testDetails.examNameExamTypeGroup && testDetails.examNameExamTypeGroup.length !== 0
                      ? testDetails.examNameExamTypeGroup[
                        isIndex
                      ].packageTestTypes.map((el, id) => (
                        <>
                        {el.packageTestTypeName &&   <li
                            className={subTypeId === id ? 'sub-type-test' : ''}
                            key={id}
                            onClick={() =>
                              showTestTypes(
                                testDetails.examNameExamTypeGroup[isIndex]
                                  .examType.id,
                                testDetails.examNameExamTypeGroup[isIndex]
                                  .examName.id,
                                el.packageTestTypeId,
                                id
                              )
                            }>
                            {el.packageTestTypeName}{`(`}
                            {getCount(el.packageTestTypeId)}
                           {`)`}
                          </li> }
                        </>
                      ))
                      : null}
                </ul>
              </div>

              <div className="a-tes-doc a-test-listseries">
                {loading ? (
                  <TestDetailsExamsSkeleton />
                ) : (
                    <ul>
                      {testDetails &&  testDetails?.examNameExamTypeGroup?.length > 0 &&
                        testName?.length > 0
                        ? testName.map((el, id) => (
                          <React.Fragment key={id}>
                            <li key={id}>
                              <div className="a-test-list-items">
                                <h5>
                                  {el.testName}
                                  {el.isFree ? <b>FREE</b> : null}
                                </h5>
                                <div className="a-test-question-info">
                                  <span className="info-wrapper">
                                    <div className="a-test-question">
                                      <p style={{ fontWeight: '700' }}>
                                        <i>Total</i> Questions
                                    </p>
                                      <span style={{ fontWeight: '900' }}>
                                        {el.totalQuestion}
                                      </span>
                                    </div>
                                    <div className="a-test-maxmarks">
                                      <p style={{ fontWeight: '700' }}>Marks</p>
                                      <span style={{ fontWeight: '900' }}>
                                        {el.marks}
                                      </span>
                                    </div>
                                    <div className="a-test-time">
                                      <p style={{ fontWeight: '700' }}>
                                        <i>Time</i>
                                      </p>
                                      <span style={{ fontWeight: '900' }}>
                                        {el.duration} Mins
                                    </span>
                                    </div>
                                    <div className="a-test-language">
                                      <p style={{ fontWeight: '700' }}>
                                        <i>Language</i>
                                      </p>
                                      <span style={{ fontWeight: '900' }}>
                                        {el.testLanguage.map((el, id) =>
                                          el.languageId === 1
                                            ? ' English '
                                            : ' Hindi '
                                        )}
                                        {/* Hindi &amp; English */}
                                      </span>
                                    </div>
                                  </span>

                                  {(el.attemptButtonStatus==3 ) ? (
                                      <>
                                        <button
                                          className="summary-btn-solution"
                                          onClick={() => {
                                            if (el.candidate_setting_subsequent !== 1 && !el.resultPublished) {
                                              return setModalShow(true)
                                            }
                                            if(localStorage.getItem('token')){
                                              window.location.href = `/testsolution/${el.testResultId}`;
                                              localStorage.setItem('testResultIdReport', el.testResultId);
                                              localStorage.setItem('testResultId',el.testResultId);
                                              localStorage.removeItem("solutionData");
                                            }else{
                                              history.push(
                                                `/`
                                              );
                                            }

                                          
                                          }}>
                                          <span>View Solution</span>
                                        </button>
                                        <button
                                          className="summary-btn-analysis"
                                          onClick={() => {
                                            if (el.candidate_setting_subsequent !== 1 && !el.resultPublished) {
                                              return setModalShow(true)
                                            }
                                            localStorage.setItem('testResultId', el.testResultId)
                                            history.push({
                                              // pathname: `/reportcard/${testInstructions.testInfo.testId}/${testResultId}`,
                                              pathname: `/report-card`,
                                              state: {
                                                testResultId: el.testResultId,
                                                testId: el.testId,
                                                testName: el.testName,
                                              },
                                            });
                                          }}>
                                          <span>Analysis</span>
                                        </button>
                                      </>
                                    ) : (
                                      <div className={`a-test-btn `}>
                                        <span
                                          onClick={() => {
                                            if (!localStorage.token) {
                                              return addToast(
                                                'Please login to attempt the test',
                                                {
                                                  appearance: 'warning',
                                                  autoDismissTimeout: 4000,
                                                  autoDismiss: true,
                                                }
                                              );
                                            }
                                            validateAndAttem(el.id, el);
                                          }}>

                                          { el.saleType === 1 
                                            && testDetails.testpackageDetails.packageactive !== 1 
                                            && testDetails.testpackageDetails.passAccess === 0 
                                            && el.isResume === 0 &&
                                            'BUY NOW'}

                                          { el.saleType !== 4 && el.saleType !== 1 &&
                                            testDetails.testpackageDetails
                                              .packageactive !== 1 && testDetails.testpackageDetails
                                                .passAccess === 0 &&
                                            'Buy to unlock'}

                                          { el.attemptButtonStatus===1 &&
                                            el.isResume !== 1 &&
                                            el.saleType === 4 &&
                                            'Attempt Now'}

                                          {el.attemptButtonStatus===1 &&
                                            el.isResume !== 1 &&
                                            el.saleType === 3 &&
                                            testDetails.testpackageDetails
                                              .passAccess === 1 &&
                                            'Attempt Now'}

                                          {el.attemptButtonStatus===1 &&
                                            el.isResume !== 1 &&
                                            el.saleType !== 4 &&
                                            testDetails.testpackageDetails
                                              .packageactive === 1 &&
                                            'Attempt Now'}

                                          {el.attemptButtonStatus===2 &&
                                            'Resume Test'}

                                          {el.attemptButtonStatus===4 &&
                                            'ReAttempt'}


                                        </span>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </li>
                          </React.Fragment>
                        ))
                        : null}
                    </ul>
                  )}
              </div>
            </div>
          </div>
        ) : (
          ''
        )}
      {modalShow &&
        <ResultPublishModal text="Your Result Is Not Published Yet" setModalShow={setModalShow} />
      }
    </>
  );
};

export default withRouter(TestSeriesPackageDetails);
