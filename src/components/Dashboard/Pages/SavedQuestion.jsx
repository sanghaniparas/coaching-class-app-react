import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookMark, CalenderIcon, LineArrow } from '../../Core/Layout/Icon';
import { Layout } from '../Layout/Layout';
import moment from 'moment';
import { BASE_URL } from './../../../config';
import axios from 'axios';
import CustomDropdownRadio from '../../Pages/Elements/CustomDropdownRadio';
import Accordion from '../../Pages/Elements/Accordion';
import ReactHtmlParser from 'react-html-parser';
import Loader from 'react-loader-spinner';
import { QuestionList } from './SaveQuestionComponents/QuestionList';
import ReportModal from '../../Pages/PracticeExam/PracticePortal/components/ReportModal';
import { Modal } from '../../Core/Layout/Modal/Modal';

export const SavedQuestion = () => {
  const [dropdown, setdropdown] = useState(false);
  const [savedQuestionList, setSavedQuestionList] = useState('');
  const [savedPracticeQuestionList, setSavedPracticeQuestionList] = useState('');
  const [savedTestQuestionList, setSavedTestQuestionList] = useState('');
  const [showPractice, setShowPractice] = useState(false);
  const [showTest, setShowTest] = useState(true);
  const [examTypeList, setexamTypeList] = useState(null);
  const [examPreferenceTypeList, setExamPreferenceTypeList] = useState(null);
  // const [examType, setExamType] = useState(-1);
  const [examType, setExamType] = useState('');
  const [loading, setLoading] = useState(false);
  const dropdownToggleHandler = () => {
    setdropdown(!dropdown);
  };
  // Added by Jayatish
  let today = moment().startOf('day');
  let yesterday = moment().subtract(1, 'days').startOf('day');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [dateNumber, setDateNumber] = useState(6);
  const [dateRange, setDateRange] = useState('');
  const [reportModalToggle, setReportModalToggle] = useState(false);
  const [reportTypeId, setReportTypeId] = useState('');
  const [singleQuestion, setsingleQuestion] = useState(null);
  const [accordianObj, setAccordianObj] = useState({
    'practiceDataToggleOg': [],
    'practiceDataToggle': [], 
    'practiceDataQuestionArr': [],
    'practiceLatestBookmarkDate': [],
    'practiceShowReportSection': [],
    'practiceShowReportSectionOg': [],
    'testDataToggleOg': [],
    'testDataToggle': [],
    'testDataQuestionArr': [],
    'testLatestBookmarkDate': [],
    'testShowReportSection': [],
    'testShowReportSectionOg': [],
  })
  const [practiceQuestionNumber, setPracticeQuestionNumber] = useState(0);
  const [testQuestionNumber, setTestQuestionNumber] = useState(0);
  const [reportTypes, setReportTypes] = useState([]);
  const checkDate = (date) => {
    let dateVal = '';
    if(moment(date).isSame(today, 'd')) {
      dateVal = 'Today';
    } else {
      if (moment(date).isSame(yesterday, 'd')) {
        dateVal = 'Yesterday';
      } else {
        dateVal = moment(date).format('DD/MM/YYYY');
      }
    }
    return dateVal;
  }
  useEffect(() => {
    let totalPracticeDataQuestion = 0,
        totalTestDataQuestion = 0,
        practiceDataToggle = [],
        practiceDataQuestionArrayList = [],
        practiceDateArrayList = [],
        productReportTotalArr = [],
        testDataToggle = [],
        testDataQuestionArrayList = [],
        testDateArrayList = [],
        testReportTotalArr = [];
    if(savedQuestionList!=='') {
      if(savedQuestionList.practiceSubjectData.length) {
        savedQuestionList.practiceSubjectData.map(practiceSubject => {
          let individualPracticeQuestion = 0;
          let practiceChapterDateArr = [];
          let practiceSubjectReportArr = [];
          practiceSubject.chapters.map(practiceSubjectChapter => {
            let practiceReportArr = [];
            totalPracticeDataQuestion = totalPracticeDataQuestion + practiceSubjectChapter.bookmarkData.length;
            individualPracticeQuestion = individualPracticeQuestion + practiceSubjectChapter.bookmarkData.length;
            if(practiceSubjectChapter.bookmarkData.length) {
              for(let i=0;i<practiceSubjectChapter.bookmarkData.length;i++) {
                practiceReportArr.push(false);
              }
              practiceChapterDateArr.push(new Date(practiceSubjectChapter.lastBookmarkedAt));
            }
            practiceSubjectReportArr.push(practiceReportArr);
          });
          productReportTotalArr.push(practiceSubjectReportArr);
          let praciiceMaxDate = new Date(Math.max.apply(null, practiceChapterDateArr));
          practiceDateArrayList.push(checkDate(praciiceMaxDate));
          practiceDataToggle.push(false);
          practiceDataQuestionArrayList.push(individualPracticeQuestion);
        });
      }
      if(savedQuestionList.testSubjectData.length) {
        savedQuestionList.testSubjectData.map(testSubject => {
          let individualTestQuestion = 0;
          let testChapterDateArr = [];
          let testSubjectReportArr = [];
          testSubject.chapters.map(testSubjectChapter => {
            let testReportArr = [];
            totalTestDataQuestion = totalTestDataQuestion + testSubjectChapter.bookmarkData.length;
            individualTestQuestion = individualTestQuestion + testSubjectChapter.bookmarkData.length;
            if(testSubjectChapter.bookmarkData.length) {
              for(let i=0;i<testSubjectChapter.bookmarkData.length;i++) {
                testReportArr.push(false);
              }
              testChapterDateArr.push(new Date(testSubjectChapter.lastBookmarkedAt));
            }
            testSubjectReportArr.push(testReportArr);
          });
          testReportTotalArr.push(testSubjectReportArr);
          let testMaxDate = new Date(Math.max.apply(null, testChapterDateArr));
          testDateArrayList.push(checkDate(testMaxDate));
          testDataToggle.push(false);
          testDataQuestionArrayList.push(individualTestQuestion);
        })
      }
      setAccordianObj((accordianObj) => ({
        practiceDataToggleOg: practiceDataToggle,
        practiceDataToggle: practiceDataToggle,
        practiceDataQuestionArr: practiceDataQuestionArrayList,
        practiceLatestBookmarkDate: practiceDateArrayList,
        practiceShowReportSection: productReportTotalArr,
        practiceShowReportSectionOg: productReportTotalArr,
        testDataToggleOg: testDataToggle,
        testDataToggle: testDataToggle,
        testDataQuestionArr: testDataQuestionArrayList,
        testLatestBookmarkDate: testDateArrayList,
        testShowReportSection: testReportTotalArr,
        testShowReportSectionOg: testReportTotalArr,
      }))
      setPracticeQuestionNumber(totalPracticeDataQuestion);
      setTestQuestionNumber(totalTestDataQuestion);
    }
    setLoading(false);
  }, [savedQuestionList])
  const handleArroowToggle = (index, value, type) => {
    if(type=='practice') {
      let changePracticeSetToggle = [];
      accordianObj.practiceDataToggle.map((practiceValue, practiceIndex) => {
        if(practiceIndex===index) {
          changePracticeSetToggle.push(value);
        } else {
          changePracticeSetToggle.push(accordianObj.practiceDataToggleOg[practiceIndex]);
        }
      })
      setAccordianObj((accordianObj) => ({
        ...accordianObj,
        practiceShowReportSection: resetObj(accordianObj.practiceShowReportSectionOg),
        practiceDataToggle: changePracticeSetToggle
      }))
    }
    if(type=='test') {
      let changeTestSetToggle = [];
      accordianObj.testDataToggle.map((testValue, testIndex) => {
        if(testIndex===index) {
          changeTestSetToggle.push(value);
        } else {
          changeTestSetToggle.push(accordianObj.testDataToggleOg[testIndex]);
        }
      })
      setAccordianObj((accordianObj) => ({
        ...accordianObj,
        testShowReportSection: resetObj(accordianObj.testShowReportSectionOg),
        testDataToggle: changeTestSetToggle
      }))
    }
  }
  // Added by Jayatish
  
  const [accordion, setaccordion] = useState(false)
  const accordionToggle = () => {
      setaccordion(!accordion)
  }
  const [dateDuration, setDateDuration] = useState({
    startDate: '',
    endDate: '',
  });
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };
  const getExamTypeList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/testpackagePage`);
      setexamTypeList(res.data.data);
    } catch (error) {
      console.log('Something went wrong. Please try again later !');
    }
  };
  const getSavedQuestion = async(payload) => {
    try {      
      const {
        data: { data },
      } = await axios.post(
        `${BASE_URL}/dashboard/dashboard/saved-question`,
        payload,
        config
      );
      // let practiceSubjectDataArr = [],
      let practiceDataArr = [],
          // testSubjectDataArr = [],
          testDataArr = [];
      data.practiceSubjectData.map(practiceList => {
        let practiceSubjectDataArr = [];
        practiceList.chapters.map(practiceChapter => {
          if(practiceChapter.bookmarkData.length > 0) {
            practiceSubjectDataArr.push(practiceChapter);
          }
        });
        if(practiceSubjectDataArr.length > 0) {
          practiceList.chapters = practiceSubjectDataArr;
          practiceDataArr.push(practiceList);
        }
      });
      data.testSubjectData.map(testList => {
        let testSubjectDataArr = [];
        testList.chapters.map(testChapter => {
          if(testChapter.bookmarkData.length > 0) {
            testSubjectDataArr.push(testChapter);
          }
        });
        if(testSubjectDataArr.length > 0) {
          testList.chapters = testSubjectDataArr;
          testDataArr.push(testList);
        }
      });
      let dataArr = {
        practiceSubjectData: practiceDataArr,
        testSubjectData: testDataArr
      }
      // setSavedQuestionList(data);
      setSavedQuestionList(dataArr);
      setSavedPracticeQuestionList(dataArr.practiceSubjectData);
      setSavedTestQuestionList(dataArr.testSubjectData);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchReportTypes() {
      try {
        const {
          data: { data },
        } = await axios.get(`${BASE_URL}/exam/getQuestionReportsTypes`);
        setReportTypes(data);
      } catch (err) {
        console.log(err);
      }
    }
    const payload = {
      date_filter: '',
      from_date_filter: '',
      to_date_filter:'',
      exam_type: ''
    };
    getExamTypeList();
    getSavedQuestion(payload);
    fetchReportTypes();
  }, []);

  useEffect(() => {
    async function getExamPreferences() {
      setLoading(true);
      try {
        const { data: { data } } = await axios.get(
          `${BASE_URL}/profile/getExamPreference`,
          config
        );
        let dataArray = [{
          id: '',
          examType: 'All'
        }]
        data.map(singleData => {
          if(examTypeList.all_exam_types.findIndex(x => x.id === singleData)!==-1) {
            let indexNumber = examTypeList.all_exam_types.findIndex(x => x.id === singleData);
            dataArray.push(examTypeList.all_exam_types[indexNumber]);
          }
        });
        let examPreferenceDataList = {
          all_exam_types: dataArray 
        }
        setExamPreferenceTypeList(examPreferenceDataList);
      } catch (error) {
        console.log(error);
      }
    }
    if(examTypeList) {
      getExamPreferences();
    }
  }, [examTypeList]);
  const selectSection = (section) => {
    if (section === 'practice') {
      setAccordianObj((accordianObj) => ({
        ...accordianObj,
        testShowReportSection: resetObj(accordianObj.testShowReportSectionOg),
        testDataToggle: accordianObj.testDataToggleOg
      }))
      setShowPractice(true);
      setShowTest(false);
    } else {
      setAccordianObj((accordianObj) => ({
        ...accordianObj,
        practiceShowReportSection: resetObj(accordianObj.practiceShowReportSectionOg),
        practiceDataToggle: accordianObj.practiceDataToggleOg
      }))
      setShowPractice(false);
      setShowTest(true);
    }
  };
  const allExamType = examPreferenceTypeList?.all_exam_types;
  // const allExamType = examTypeList?.all_exam_types;
  const filterExamType = (selectedValue) => {
    const payload = {
      date_filter: dateFilter==='All Time'?'':dateNumber.toString(),
      from_date_filter: dateDuration.startDate,
      to_date_filter: dateDuration.endDate,
      exam_type: selectedValue
    };
    getSavedQuestion(payload);
    setExamType(selectedValue)
  };

  const filterByDate = async (num) => {
    setDateRange('');
    let dateFilterString = '';
    if(num === 1) {
      dateFilterString = 'Today';
    } if(num === 2) {
      dateFilterString = 'Last 7 Days';
    } if(num === 3) {
      dateFilterString = 'This month';
    } if(num === 4) {
      dateFilterString = 'This Year';
    } if(num === 5) {
      dateFilterString = 'Last Year';
    } if(num === 6) {
      dateFilterString = 'All Time';
    }
    setDateNumber(num);
    setDateFilter(dateFilterString);
    setDateDuration({
      startDate: '',
      endDate: '',
    });
    const payload = {
      date_filter: num.toString(),
      from_date_filter: '',
      to_date_filter:'',
      exam_type: ''
    };
    getSavedQuestion(payload);
    dropdownToggleHandler(false);
  };

  // const generatetitle = (item, idx) => {
  //   return `${item.subject} ${item.chapters.length} Chapters | ${item.chapters[idx].bookmarkData.length} Questions`;
  // }

  // const generateBody = (item, idx) => {
  //   let question = '';
  //   for(let i=0; i<item.chapters[idx].bookmarkData.length;i++){
  //     question = `${question}<p>${item.chapters[idx].bookmarkData[i].question}</p>`;
  //   }
  //   return question;
  // }

  

  const submitDate = () => {
    setDateFilter('All Time');
    setDateRange(`${dateDuration.startDate} - ${dateDuration.endDate}`);
    const payload = {
      date_filter: '',
      from_date_filter: dateDuration.startDate,
      to_date_filter:dateDuration.endDate,
      exam_type: ''
    };
    getSavedQuestion(payload);
    dropdownToggleHandler(false);
  };

  const resetCalender = () => {
    setDateNumber(6);
    setDateFilter('All Time');
    setDateRange('');
    setDateDuration({
      startDate: '',
      endDate: '',
    });
    const payload = {
      date_filter: '',
      from_date_filter: '',
      to_date_filter:'',
      exam_type: ''
    };
    getSavedQuestion(payload);
    dropdownToggleHandler(false);
  }

  const handleBookmark = async (bookmarkId, bookmarkType) => {
    let unBookmarkPayload = {
      bookmarkType: bookmarkType,
      bookmarkId: bookmarkId
    }
    try {      
      const {
        data: { data },
      } = await axios.post(
        `${BASE_URL}/dashboard/dashboard/remove-from-bookmark`,
        unBookmarkPayload,
        config
      );
      const payload = {
        date_filter: dateFilter==='All Time'?'':dateNumber.toString(),
        from_date_filter: dateDuration.startDate,
        to_date_filter: dateDuration.endDate,
        exam_type: examType
      };
      getSavedQuestion(payload);
    } catch (error) {
      console.log(error);
    }
  }

  const reportHandle = (type, subjectIndex, chapterIndex, bookmarkIndex) => {
    if(type==='practice') {
      let copyPracticeReportSection = clone(accordianObj.practiceShowReportSection);
      let practiceReportHandleVal = copyPracticeReportSection[subjectIndex][chapterIndex][bookmarkIndex];
      for(let i=0;i<copyPracticeReportSection[subjectIndex][chapterIndex].length;i++) {
        if(i===bookmarkIndex) {
          copyPracticeReportSection[subjectIndex][chapterIndex][bookmarkIndex] = !practiceReportHandleVal;
        }else {
          copyPracticeReportSection[subjectIndex][chapterIndex][i] = false;
        }
      }
      setAccordianObj((accordianObj) => ({
        ...accordianObj,
        practiceShowReportSection: copyPracticeReportSection
      }));
    } if(type==='test') {
      let copyTestReportSection = clone(accordianObj.testShowReportSection);
      let testReportHandleVal = copyTestReportSection[subjectIndex][chapterIndex][bookmarkIndex];
      for(let i=0;i<copyTestReportSection[subjectIndex][chapterIndex].length;i++) {
        if(i===bookmarkIndex) {
          copyTestReportSection[subjectIndex][chapterIndex][bookmarkIndex] = !testReportHandleVal;
        }else {
          copyTestReportSection[subjectIndex][chapterIndex][i] = false;
        }
      }
      setAccordianObj((accordianObj) => ({
        ...accordianObj,
        testShowReportSection: copyTestReportSection
      }));
    }
    
  }

  const clone = (obj) => {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
  }

  const resetObj = (Obj) => {
    for(let i=0; i<Obj.length; i++) {
      for(let j=0; j<Obj[i].length; j++){
        for(let k=0; k<Obj[i][j].length; k++) {
          Obj[i][j][k] = false;
        }
      }
    }
    return Obj;
  } 
  //   For toggling report modal
  const reportModalOpen = (e, questionId, resultId) => {
    setReportTypeId(e.target.id);
    setsingleQuestion({
      id: questionId
    });
    localStorage.setItem('practiceSetResultId', resultId);
    setReportModalToggle(!reportModalToggle);
  };
  const reportModalClose = () => {
    setsingleQuestion(null);
    localStorage.removeItem('practiceSetResultId');
    setReportModalToggle(!reportModalToggle);
  };
  return (
    <Layout>
      <div className="question-filter saved-section-filter">
        <div className="button-group saved-section">
          <span 
            className={`${showTest && 'active'}`}
            id="test" 
            onClick={() => selectSection('test')}
          >
            Tests (
            {testQuestionNumber}
            )
          </span>
          <span
            className={`${showPractice && 'active'}`}
            id="practice"
            onClick={() => selectSection('practice')}>
            Practice (
            {practiceQuestionNumber}
            )
          </span>
          
        </div>
        <div className="filter">
          <div className="custom-dropdown">
            <button className="btn" onClick={dropdownToggleHandler}>
              {/* This month */}
              {dateRange===''?dateFilter:dateRange}
            </button>
            {dropdown && (
              <ul className="custom-date">
                <li>
                  <span className="label">Quick Dates</span>
                </li>
                <li>
                  <span onClick={() => filterByDate(1)}>
                    <div>Today</div>
                  </span>
                  <span onClick={() => filterByDate(2)}>
                    <div>Last 7 Days</div>
                  </span>
                </li>
                <li>
                  <span onClick={() => filterByDate(3)}>
                    <div>This month</div>
                  </span>
                  <span onClick={() => filterByDate(4)}>
                    <div>This Year</div>
                  </span>
                </li>
                <li>
                  <span onClick={() => filterByDate(5)}>
                    <div>Last Year</div>
                  </span>
                  <span onClick={() => filterByDate(6)}>
                    <div>All time</div>
                  </span>
                </li>
                <li>
                  <p className="date-range">Dates Range</p>
                  <div className="date-wrap">
                    <div className="input-group">
                      <input
                        type="date"
                        value={dateDuration.startDate}
                        onChange={(e) =>
                          setDateDuration({
                            ...dateDuration,
                            startDate: e.target.value,
                          })
                        }
                      />
                      {/* <CalenderIcon />  */}
                    </div>
                    <span className="highphen"></span>
                    <div className="input-group">
                      <input
                        type="date"
                        value={dateDuration.endDate}
                        onChange={(e) =>
                          setDateDuration({
                            ...dateDuration,
                            endDate: e.target.value,
                          })
                        }
                      />
                      {/* <CalenderIcon />  */}
                    </div>
                  </div>
                </li>
                <li>
                  <button className="btn-grey" onClick={()=>resetCalender()}>Cancel</button>
                  <button className="btn-primary radius" onClick={submitDate}>Apply</button>
                </li>
              </ul>
            )}
          </div>
          {allExamType && (
            <CustomDropdownRadio
              itemList={allExamType}
              respondSelectedItem={filterExamType}
              keyItem={'examType'}
              type={'examType'}
              multi={true}
            />
          )}
        </div>
      </div>
      {
        loading?
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
            timeout={3000} //3 secs
          />
          :
          showPractice &&
            <div className="savequestion-wrapper">
              {
                savedPracticeQuestionList.length > 0 ? 
                  savedPracticeQuestionList.map((practiceQuestion, practiceQuestionIndex) => (
                    <QuestionList 
                      type='practice'
                      key={practiceQuestionIndex}
                      keyIndex={practiceQuestionIndex}
                      data={practiceQuestion}
                      dataToggle={accordianObj.practiceDataToggle}
                      handleArroowToggle={handleArroowToggle}
                      dataQuestionArr={accordianObj.practiceDataQuestionArr}
                      latestBookmarkData={accordianObj.practiceLatestBookmarkDate}
                      showReportSection={accordianObj.practiceShowReportSection}
                      reportTypes={reportTypes}
                      reportHandle={reportHandle}
                      reportModalOpen={reportModalOpen}
                      handleBookmark={handleBookmark}
                      typeId={1}
                    />
                    // <div className={`item-wrap ${accordianObj.practiceDataToggle[practiceQuestionIndex] ? 'open' : ''}`} key={practiceQuestionIndex}>
                    //   <div className="items card" onClick={() => handleArroowToggle(practiceQuestionIndex, !accordianObj.practiceDataToggle[practiceQuestionIndex], 'practice')}>
                    //       <div className="left-info">
                    //           <h3 className="title">{practiceQuestion.subject}</h3>
                    //           <span className="label">{practiceQuestion.chapters.length} {practiceQuestion.chapters.length>1?'Chapters':'Chapter'}</span>
                    //           <span className="label">{accordianObj.practiceDataQuestionArr[practiceQuestionIndex]} {accordianObj.practiceDataQuestionArr[practiceQuestionIndex] > 1?'Questions':'Question'}</span>
                    //       </div>
                    //       <div className="right-info">
                    //           <span>{accordianObj.practiceLatestBookmarkDate[practiceQuestionIndex]} <i style={{cursor: 'pointer'}} /*onClick={() => handleArroowToggle(practiceQuestionIndex, !accordianObj.practiceDataToggle[practiceQuestionIndex], 'practice')}*/><LineArrow /></i></span>
                    //       </div>
                    //   </div>
                    //   <div className={`item-dropdown ${accordianObj.practiceDataToggle[practiceQuestionIndex] ? 'active' : ''}`}>
                    //     {
                    //       practiceQuestion.chapters.length && (
                    //         <div className={`a-accordian`}>
                    //           <div className="a-container">
                    //             {
                    //               practiceQuestion.chapters.map((chapter, idx) => (
                    //                 <div className="a-wrapper" key={idx}>
                    //                   <div className="a-faqwrap">
                    //                     <Accordion key={idx} title={chapter.chapter} question={`${chapter.bookmarkData.length} Questions`}>
                    //                       {
                    //                         chapter.bookmarkData.length && chapter.bookmarkData.map((bookMark, bookMarkIndex) => (
                    //                           <div className="accordion-content-div" key={bookMarkIndex}>
                    //                             <p className={`content-header-text`}>
                    //                               <span>{bookMark.quesPosition} of {chapter.chapterQuestionCount}</span>
                    //                               <span>{bookMark.practiceSetName}</span>
                    //                             </p>
                    //                             <p className="act-btn" onClick={() => handleBookmark(bookMark.id, 1)}>
                    //                               <BookMark fill={'#fd8041'} />
                    //                               Saved
                    //                             </p>
                    //                             <p className={`report-btn`} onClick={() => reportHandle('practice', practiceQuestionIndex, idx, bookMarkIndex)}>
                    //                               {accordianObj.practiceShowReportSection[practiceQuestionIndex][idx][bookMarkIndex] && 
                    //                                 <div className={`report-div`}>
                    //                                   <ul>
                    //                                     {reportTypes.length &&
                    //                                       reportTypes.map((el) => (
                    //                                         <li id={el.id} /*onClick={reportModalOpen}*/>
                    //                                           {el.name}
                    //                                         </li>
                    //                                       ))}
                    //                                   </ul>
                    //                                 </div>
                    //                               }
                    //                             </p>
                    //                             <div className={`accordian-desc`}>{ReactHtmlParser(bookMark.question)}</div>
                    //                           </div>
                    //                         ))
                    //                       }
                    //                     </Accordion>
                    //                   </div>
                    //                 </div>
                    //               ))
                    //             }
                    //           </div>
                    //         </div>
                    //       )
                    //     }
                    //   </div>
                    // </div>
                  ))
                  :
                  <div className="a-nodata-Content">No Practice Saved Question Available</div>
              }
            </div>
      }
      {
        showTest &&
          <div className="savequestion-wrapper">
            {
              savedTestQuestionList.length > 0 ? 
                savedTestQuestionList.map((testQuestion, testQuestionIndex) => (
                  <QuestionList 
                    type='test'
                    key={testQuestionIndex}
                    keyIndex={testQuestionIndex}
                    data={testQuestion}
                    dataToggle={accordianObj.testDataToggle}
                    handleArroowToggle={handleArroowToggle}
                    dataQuestionArr={accordianObj.testDataQuestionArr}
                    latestBookmarkData={accordianObj.testLatestBookmarkDate}
                    showReportSection={accordianObj.testShowReportSection}
                    reportTypes={reportTypes}
                    reportHandle={reportHandle}
                    handleBookmark={handleBookmark}
                    typeId={2}
                  />
                  // <div className={`item-wrap ${accordianObj.testDataToggle[testQuestionIndex] ? 'open' : ''}`} key={testQuestionIndex}>
                  //   <div className="items card" onClick={() => handleArroowToggle(testQuestionIndex, !accordianObj.testDataToggle[testQuestionIndex], 'test')}>
                  //       <div className="left-info">
                  //           <h3 className="title">{testQuestion.subject}</h3>
                  //           <span className="label">{testQuestion.chapters.length} {testQuestion.chapters.length > 1?'Chapters':'Chapter'}</span>
                  //           <span className="label">{accordianObj.testDataQuestionArr[testQuestionIndex]} {accordianObj.testDataQuestionArr[testQuestionIndex] > 1?'Questions':'Question'}</span>
                  //       </div>
                  //       <div className="right-info">
                  //           <span>{accordianObj.testLatestBookmarkDate[testQuestionIndex]} <i style={{cursor: 'pointer'}} /*onClick={() => handleArroowToggle(testQuestionIndex, !accordianObj.testDataToggle[testQuestionIndex], 'test')}*/><LineArrow /></i></span>
                  //       </div>
                  //   </div>
                  //   <div className={`item-dropdown ${accordianObj.testDataToggle[testQuestionIndex] ? 'active' : ''}`}>
                  //     {
                  //       testQuestion.chapters.length && (
                  //         <div className={`a-accordian`}>
                  //           <div className="a-container">
                  //             {
                  //               testQuestion.chapters.map((chapter, idx) => (
                  //                 <div className="a-wrapper" key={idx}>
                  //                   <div className="a-faqwrap">
                  //                     <Accordion key={idx} title={chapter.chapter} question={`${chapter.bookmarkData.length} Questions`}>
                  //                       {
                  //                         chapter.bookmarkData.length && chapter.bookmarkData.map((bookMark, bookMarkIndex) => (
                  //                           <div className="accordion-content-div" key={bookMarkIndex}>
                  //                             <p className={`content-header-text`}>
                  //                               <span>{bookMark.quesPosition} of {chapter.chapterQuestionCount}</span>
                  //                               <span>{bookMark.testName}</span>
                  //                             </p>
                  //                             <p className={`act-btn`} onClick={() => handleBookmark(bookMark.id, 2)}>
                  //                               <BookMark fill={'#fd8041'} />
                  //                               Saved
                  //                             </p>
                  //                             <p className={`report-btn`} onClick={() => reportHandle('test', testQuestionIndex, idx, bookMarkIndex)}>
                  //                               {accordianObj.testShowReportSection[testQuestionIndex][idx][bookMarkIndex] && <div className={`report-div`}>This is report section</div>}
                  //                             </p>
                  //                             <div>{ReactHtmlParser(bookMark.question)}</div>
                  //                           </div>
                  //                         ))
                  //                       }
                  //                     </Accordion>
                  //                   </div>
                  //                 </div>
                  //               ))
                  //             }
                  //           </div>
                  //         </div>
                  //       )
                  //     }
                  //   </div>
                  // </div>
                ))
                :
                <div className="a-nodata-Content">No Test Saved Question Available</div>
            }
          </div>
      }
      {/* <div className="savequestion-wrapper">
        <div className={`item-wrap ${accordion ? 'open' : ''}`}>
            <div className="items card" onClick={accordionToggle}>
                <div className="left-info">
                    <h3 className="title">Mathematics</h3>
                    <span className="label">3 Chapters</span>
                    <span className="label">8 Questions</span>
                </div>
                <div className="right-info">
                    <span>Today <LineArrow /></span>
                </div>
            </div>
            <div className={`item-dropdown ${accordion ? 'active' : ''}`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem assumenda nam illum magni molestias consequatur quo ducimus, maxime quam voluptatem, aspernatur voluptate corporis ipsam, porro voluptates rerum iusto? Voluptates.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem assumenda nam illum magni molestias consequatur quo ducimus, maxime quam voluptatem, aspernatur voluptate corporis ipsam, porro voluptates rerum iusto? Voluptates.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem assumenda nam illum magni molestias consequatur quo ducimus, maxime quam voluptatem, aspernatur voluptate corporis ipsam, porro voluptates rerum iusto? Voluptates.
            </div>
        </div>
        <div className={`item-wrap`}>
            <div className="items card">
                <div className="left-info">
                    <h3 className="title">Mathematics</h3>
                    <span className="label">3 Chapters</span>
                    <span className="label">8 Questions</span>
                </div>
                <div className="right-info">
                    <span>Today <LineArrow /></span>
                </div>
            </div>
            <div className={`item-dropdown`}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem assumenda nam illum magni molestias consequatur quo ducimus, maxime quam voluptatem, aspernatur voluptate corporis ipsam, porro voluptates rerum iusto? Voluptates.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem assumenda nam illum magni molestias consequatur quo ducimus, maxime quam voluptatem, aspernatur voluptate corporis ipsam, porro voluptates rerum iusto? Voluptates.
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint exercitationem assumenda nam illum magni molestias consequatur quo ducimus, maxime quam voluptatem, aspernatur voluptate corporis ipsam, porro voluptates rerum iusto? Voluptates.
            </div>
        </div>
      </div> */}

      {/* {showPractice &&
        savedQuestionList &&
        savedPracticeQuestionList.length > 0 && (
          <div className="savequestion-wrapper">
            <div className={`a-accordian`}>
              <div className="a-container">
                <div className="a-wrapper">
                  <div className="a-faqwrap">
                    {savedPracticeQuestionList.filter((x) => {
                      if (examType !== -1) {
                        return x.examTypeId == examType;
                      } else {
                        return true;
                      }
                      }).map((practiceSub, idx) => (
                        <Accordion key={idx} title={generatetitle(practiceSub, idx)}>
                          {ReactHtmlParser(generateBody(practiceSub, idx))}
                        </Accordion>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      {showTest &&
        savedQuestionList && savedTestQuestionList.length > 0 && (
          <div className="savequestion-wrapper">
            <div className={`a-accordian`}>
              <div className="a-container">
                <div className="a-wrapper">
                  <div className="a-faqwrap">
                    {savedTestQuestionList.filter((x) => {
                      if (examType !== -1) {
                        return x.examTypeId == examType;
                      } else {
                        return true;
                      }
                      }).map((testSub, idx) => (
                        <Accordion key={idx} title={generatetitle(testSub, idx)}>
                          {ReactHtmlParser(generateBody(testSub, idx))}
                        </Accordion>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} */}
      {reportModalToggle && (
        <Modal addClass="submitTest modal-sm">
          <ReportModal
            reportTypeId={reportTypeId}
            singleQuestion={singleQuestion}
            reportModalClose={reportModalClose}
          />
        </Modal>
      )}
    </Layout>
  );
};
