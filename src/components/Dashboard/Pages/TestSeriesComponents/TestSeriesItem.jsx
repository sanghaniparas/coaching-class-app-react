import React, { useState, useEffect } from 'react';
import TestScheduleModal from './TestScheduleModal';
import moment from 'moment';
import { AlarmClock } from '../../../Core/Layout/Icon';
import { useLocation } from 'react-router-dom';

const TestSeriesItem = ({ grid, item, packageData }) => {
  console.log("item data come", item);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isButtonShow, setIsButtonShow] = useState(1);
  const [isOverScheduleTest, setIsOverScheduleTest] = useState(0);
  const [isOpenSchedule, setIsOpenSchedule] = useState(0);
  const currentDate = moment();
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  useEffect(() => {
    if (packageData != null) {
      if (packageData.saleType) {
        if (packageData.saleType !== 4) {
          if (packageData.validityType === 0) {
            let start = moment(packageData.purchase_date);
            let end = moment(start).add(parseInt(packageData.validity - 1), 'days');
            if (currentDate.diff(moment(end), 'days') > 0) {
              setIsButtonShow(0);
            }
          }
        }
      }
      if (item.TestSchedule) {
        let addMinute = moment(item.TestSchedule).add(item.duration, 'minutes').format('DD MMMM, hh:mm A');
        // if(currentDate.diff(item.TestSchedule, 'days') < 0 || currentDate.diff(addMinute, 'days') > 0) {
        //   setIsOverScheduleTest(1);
        // } 
        if (currentDate.diff(item.TestSchedule, 'days') > 0) {
          setIsOpenSchedule(1);
        }
      }
      if (item.id === 111) {
        let check;
        check = moment(item.candidateSettingSubsequentDate).isAfter();
        console.log(check);
      }
    }
  }, [item, packageData]);
  return (
    <>
      <div className={`a-test-list-items ${grid ? 'gridview' : 'listview'}`}>
        <div className="a-test-left-info">
          <h5>
            <span className="test-wrap">
              <span className="test_name">{item.testName}</span>            
              {item.difficultyLevel === 1 && <b className="text-green">EASY</b>}
              {item.difficultyLevel === 2 && (
                <b className="text-warning">MODERATE</b>
              )}
              {item.difficultyLevel === 3 && (
                <b className="text-red">DIFFICULT</b>
              )}
              
            
              {/* {!location.pathname.includes('/attempted-test') && item.packageTestType.testTypeName !== 'Live Test' &&
                item.isResume !== 1 &&
                item.candidateSettingSubsequent !== 3 && (
                  <span onClick={onOpenModal}>
                    <AlarmClock fill="#fd8041" />
                  </span>
                )} */}
              {
                !location.pathname.includes('/test-series/') ?
                  item.packageTestType.testTypeName !== 'Live Test' && item.TestSchedule !== null && (
                    <span /*onClick={onOpenModal}*/>
                      <AlarmClock />
                    </span>
                  )
                  :
                  item.packageTestType.testTypeName !== 'Live Test' && item.testAttempted === 0 && item.packageTestType.dateEnabled === 1 && (
                    <span onClick={onOpenModal}>
                      <AlarmClock fill={`${item.TestSchedule !== null ? '#fd8041' : '#898989'}`} />
                    </span>
                  )
              }
            </span>
            {item.packageTestType.testTypeName === 'Live Test' && (
              <span className="livetest">Live Test</span>
            )}
          </h5>
          
          <div className="a-test-question-info a-test-question-info-new">
            {
              location.pathname.includes('/attempted-test') ?
                <>
                  <div className="a-test-item">
                    <p>Rank</p>
                    <span>{item.rank.rank?item.rank.rank + '/':''}{item.rank.total}</span>
                  </div>
                  <div className="a-test-item">
                    <p>Marks Obtained</p>
                    <span>{item.score?item.score + '/':''}{item.totalMarks}</span>
                  </div>
                </>
                :
                <>
                  <div className="a-test-item">
                    <p>Total Questions</p>
                    <span>{item.totalQuestion}</span>
                  </div>
                  <div className="a-test-item">
                    <p>Max. Marks</p>
                    <span>{item.marks}</span>
                  </div>
                </>
            }

            <div className="a-test-item">
              <p>Time {location.pathname.includes('/attempted-test') ? 'Taken' : ''}</p>
              <span>{item.duration} Mins</span>
            </div>
            <div className="a-test-item">
              <p>Language</p>
              {item.testLanguage.length === 2 ? (
                <span>Hindi &amp; English</span>
              ) : (
                  <span>English</span>
                )}
            </div>
          </div>
        </div>
        <div className="a-test-btn-info">
          {!location.pathname.includes('/attempted-test') && item.TestSchedule && (
            <span>
              {isOpenSchedule === 1 ? 'Open On' : 'Scheduled On'}:{' '}
              {`${moment(item.TestSchedule).format('DD MMMM')} @ ${moment(item.TestSchedule).format('hh:mm A')}`}
            </span>
          )}
          {/* {item.candidateSettingSubsequent === 3 && (
            <span>
              Scheduled On:{' '}
              {moment(item.candidateSettingSubsequentDate).format('lll')}
            </span>
          )} */}
          {!location.pathname.includes('/attempted-test') && item.lastAttempted && (
            <span>{item.testAttempted === 1 ? 'Appeared On' : 'Last Appeared On'}: {moment(item.lastAttempted).format('lll')}</span>
          )}
          {
            location.pathname.includes('/attempted-test') && (
              <span>Appeared On: {moment(item.attemptedOn).format('DD MMMM, YYYY')}</span>
            )
          }
          {/* {item.attemptedOn && (
            <span>Attempted On: {moment(item.attemptedOn).format('lll')}</span>
          )} */}
          {
            location.pathname.includes('/test-series/') &&
              isButtonShow ?
              item.TestSchedule ?
                isOpenSchedule === 0 ? <button className="btn-dark-grey">START TEST</button> : <button className="btn-light-blue">START TEST</button>
                :
                item.isResume === 1 ?
                  <button className="btn-orange">Resume Test</button>
                  :
                  item.testAttempted === 0 ?
                    <button className="btn-orange-dark">UNLOCK TEST</button>
                    :
                    (item.multipleAttempStatus === 0 || item.multipleAttempStatus === 2) ?
                      <div className="btn-blk"><button className="btn-dark-blue">ANALYSIS</button><button className="btn-green">VIEW SOLUTION</button></div>
                      :
                      ((item.testAttempted - 1) < parseInt(item.mutlipleAttemp)) ?
                        <button className="btn-orange-dark">RE ATTEMPT TEST</button>
                        :
                        <><button className="btn-dark-blue">ANALYSIS</button><button className="btn-green">VIEW SOLUTION</button></>
              : null
          }
          {
            location.pathname.includes('/attempted-test') && <div className="btn-blk"><button className="btn-dark-blue">ANALYSIS</button><button className="btn-green">VIEW SOLUTION</button></div>
          }

          {
            location.pathname.includes('/pass-access') && isButtonShow ?
              item.TestSchedule ?
                isOpenSchedule === 0 ? <button className="btn-dark-grey">START TEST</button> : <button className="btn-light-blue">START TEST</button>
                :
                item.isResume === 1 ?
                  <button className="btn-orange">Resume Test</button>
                  :
                  item.testAttempted === 0 ?
                    <button className="btn-orange-dark">UNLOCK TEST</button>
                    :
                    (item.multipleAttempStatus === 0 || item.multipleAttempStatus === 2) ?
                      <div className="btn-blk"><button className="btn-dark-blue">ANALYSIS</button><button className="btn-green">VIEW SOLUTION</button></div>
                      :
                      ((item.testAttempted - 1) < parseInt(item.mutlipleAttemp)) ?
                        <button className="btn-orange-dark">RE ATTEMPT TEST</button>
                        :
                        <><button className="btn-dark-blue">ANALYSIS</button><button className="btn-green">VIEW SOLUTION</button></>
              : null
          }
         
        </div>
      </div>
      <TestScheduleModal
        open={open}
        onCloseModal={onCloseModal}
        testID={item.id}
      />
    </>
  );
};

export default TestSeriesItem;
