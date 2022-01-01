import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlarmClock, Share } from '../../../Core/Layout/Icon';
import moment from 'moment';
import 'moment-precise-range-plugin';
import { ToolTip } from '../../../Core/Layout/Tooltip/ToolTip';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router-dom';


export const TestPackage = ({ testPackage, sortBy }) => {
  const [toggleShare, settoggleShare] = useState(false);
  const [validity, setValidity] = useState({});
  const [expiryDate, setExpiryDate] = useState('');
  const [percent, setPercent] = useState('');
  const [examType, setExamType] = useState([]);
  const [isShowBuyPackage, setIsShowBuyPackage] = useState(0);
  const { addToast } = useToasts();
  const history = useHistory();
  const currentDate = moment();
  const togglehandler = () => {
    settoggleShare(!toggleShare);
  };

  useEffect(() => {
    let dateData = null;
    if (testPackage.saleType !== 4) {
      if (testPackage.validityType === 1) {
        setExpiryDate(moment(testPackage.package_expired_date).format('DD MMMM, YY').toString());
      } else {
        // let start = (testPackage.package_expired === 1)? moment():moment(testPackage.purchase_date);
        let start = moment(testPackage.purchase_date);
        let end = moment(start).add(parseInt(testPackage.validity - 1), 'days');
        if (currentDate.diff(end, 'days') > 0) {
          setIsShowBuyPackage(1);
        }
        // let years = end.diff(start, 'year');
        // start.add(years, 'years');

        // let months = end.diff(start, 'months');
        // start.add(months, 'months');

        // let days = end.diff(start, 'days');

        // let getFirstDateString = '';
        // if(months > 0) {
        //   if(months > 10) {
        //     getFirstDateString += months + ' months ';
        //   } else {
        //     getFirstDateString += months + ' month ';
        //   }
        // }
        // if(days > 10) {
        //   getFirstDateString += days + ' days ';
        // } else {
        //   getFirstDateString += days + ' day ';
        // }
        setExpiryDate(`${end.format('DD MMMM, YY')} at ${end.format('hh:mm A')}`);
      }
    } else {
      if (testPackage.validityType === 1) {
        setExpiryDate(moment(testPackage.package_expired_date).format('DD MMMM, YY').toString());
      } else {
        setExpiryDate('');
      }
    }

    // if (testPackage.validityType !== 1) {
    //   let start = moment();
    //   let end = moment().add(parseInt(testPackage.validity), 'days');

    //   let years = end.diff(start, 'year');
    //   start.add(years, 'years');

    //   let months = end.diff(start, 'months');
    //   start.add(months, 'months');

    //   let days = end.diff(start, 'days');
    //   dateData = { months, days };
    //   console.log('dateData 1 ==> ', dateData);
    //   setValidity({ months, days });
    // }

    // if (testPackage.validityType === 1) {
    //   let starts = moment();
    //   let ends = moment(testPackage.package_expired_date);

    //   // or as string:
    //   let diffHuman = moment.preciseDiff(starts, ends, true);
    //   // example: 2 years 7 months 6 hours 29 minutes 17 seconds
    //   let dateData = { months: diffHuman.months, days: diffHuman.days };
    //   console.log('dateData 2 ==> ', dateData);
    //   setValidity({ months: diffHuman.months, days: diffHuman.days });
    // }
    setPercent(
      (Number(testPackage.noOfAttemptedTest) / Number(testPackage.noOfTest)) *
      100
    );
    let examTypeArray = testPackage.package_exam_types !== '' && testPackage.package_exam_types !== undefined && testPackage.package_exam_types.split(' & ');
    setExamType(examTypeArray);
  }, [testPackage]);

  const buyNow = (item) => {
    if (!!localStorage.getItem('token')) {
      history.push({
        pathname: `/cart`,
        state: { id: item.id, type: 2 },
      });
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };
  const enrollNow = (item) => {
    if (!!localStorage.getItem('token')) {
      history.push({
        pathname: `/testdetails/${item.id}`
      });
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  }
  return (
    <div className="testpackage-wrapper">
      {testPackage.saleType === 4 && (
        <div className="badge">
          <span>Free</span>
        </div>
      )}

      <div className="testpackage-top-container testpackage-top-testseries">
        <div className="left-content">
          <div className="p-img">
            <img src={testPackage.packageImageUrl} alt="" />
          </div>
          <div className="p-container">
            <div className="p-share" onClick={togglehandler}>
              <Share />
              Share
              {toggleShare && (
                <div className="toggle">
                  <Link to="/">
                    <img
                      src={require('../../../../assets/images/whatsapp.svg')}
                      alt=""
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={require('../../../../assets/images/telegram.svg')}
                      alt=""
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={require('../../../../assets/images/facebook.svg')}
                      alt=""
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={require('../../../../assets/images/gmail.svg')}
                      alt=""
                    />
                  </Link>
                  <Link to="/">
                    <img
                      src={require('../../../../assets/images/social-logo1.svg')}
                      alt=""
                    />
                  </Link>
                </div>
              )}
            </div>
            <h4 className="p-title">{testPackage.packageName}</h4>
            <div className="p-left">
              <p className="p-exam-name">
                {examType && examType.slice(0, 3).map((i, idx) => (
                  <React.Fragment key={idx}>
                    {i}{' '}
                    {idx !== examType.slice(0, 3).length - 1 ? '& ' : ''}{' '}
                  </React.Fragment>
                ))}
                <ToolTip
                  message={`${examType && examType.length > 1 && examType.slice(3).map((el) => el)}`}
                  position={'top'}>
                  <p>
                    {examType.length > 1 && '+'}
                    {examType && examType.length > 1 && examType.slice(3).reduce((acc, current) => acc + 1, 0)}
                  </p>
                </ToolTip>
              </p>
              {
                expiryDate !== '' && (
                  <><p className="p-validity"><span>Validity: </span>{expiryDate}{' '}</p></>
                )
              }
              {/* <p className="p-validity">
                <span>Validity: </span>
                {validity.months ? `${validity.months} months` : ''}{' '}
                {validity.days ? ` ${validity.days} days` : ''}{' '}
              </p> */}
              <p className="p-institute">
                <img
                  src={require('../../../../assets/images/university.svg')}
                  alt=""
                />{' '}
                {testPackage.coachings.coachingName}
              </p>
              <p className="p-location">
                <img
                  src={require('../../../../assets/images/location.svg')}
                  alt=""
                />{' '}
                {testPackage.coachings.cityName},{' '}
                {testPackage.coachings.stateName}
              </p>
            </div>
            <div className="p-right">
              <p className="p-fac-details">Faculties Details</p>
              {testPackage.subjectWithFaculty.length ? (
                testPackage.subjectWithFaculty.map((item) => (
                  <div className="p-fac-box">
                    <span className="p-fac-avatar">
                      <img
                        src={require('../../../../assets/images/post-avatar.png')}
                        alt=""
                      />
                    </span>
                    <div className="p-fac-info">
                      <p className="p-fac-name">
                        {item.faculties.map((x, idx) => {
                          if (idx + 1 === item.faculties.length) {
                            return `${x.facultyName}`;
                          } else {
                            return `${x.facultyName}, `;
                          }
                        })}
                      </p>
                      <p className="p-fac-subject">
                        {item.packageSubject.subject}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                  <p>No faculty available!</p>
                )}
            </div>
          </div>
        </div>
        <div className="right-content">
          <p className="p-price">
            &#8377;{' '}
            {testPackage.discountPrice === 0
              ? testPackage.productPrice
              : testPackage.discountPrice}{' '}
            {testPackage.discountPrice !== 0 && (
              <span>
                &#8377; <strike>{testPackage.productPrice}</strike>
              </span>
            )}
          </p>
          <div className="test_packageblk">
          {
            expiryDate !== '' && (
              <>
                <p className="p-exp-label">Package Expired On</p>
                <p className="p-ex-time"><AlarmClock fill="#e4556c" />{expiryDate}{' '}</p>
              </>
            )
          }
          {/* <p className="p-exp-label">Package Expired On</p> */}
          {/*<p className="p-ex-time"> */}
            {/* {validity.months ? `${validity.months} months` : ''}{' '}
            {validity.days ? ` ${validity.days} days` : ''}{' '} */}
            {/* {
              testPackage.validityType === 1?
                testPackage.package_expired_date
                :
                moment(currentDate, "MMMM Do YYYY").add(testPackage.validity, 'days')
            } */}
          {/*</p> */}
          {
            testPackage.saleType === 1 ?
              testPackage.validityType === 1 ?
                <button className="p-btn btn-primary">Purchased</button>
                :
                (isShowBuyPackage === 0) ?
                  <button className="p-btn btn-primary">Purchased</button>
                  :
                  <button className="p-btn btn-primary" style={{ width: '65%' }} onClick={() => buyNow(testPackage)}>Buy Package</button>
              :
              <button className="p-btn btn-primary">Enrolled</button>
          }
          {/* {
            testPackage.validityType === 1? 
              (isShowBuyPackage === 0) ?
                testPackage.saleType === 1 ? 
                  <button className="p-btn btn-primary">Purchased</button>
                  :
                  testPackage.saleType === 4 && <button className="p-btn btn-primary">Enrolled</button>
                :
                testPackage.saleType === 1 ? 
                  <button className="p-btn btn-primary" style={{width: '65%'}} onClick={() => buyNow(testPackage)}>Buy Package</button>
                  :
                  testPackage.saleType === 4 && <button className="p-btn btn-primary" style={{width: '65%'}} onClick={() => enrollNow(testPackage)}>Enroll Now</button>
              :
              testPackage.saleType === 1 ? 
                <button className="p-btn btn-primary">Purchased</button>
                :
                testPackage.saleType === 4 && <button className="p-btn btn-primary">Enrolled</button>
          } */}
          {/* <button className="p-btn btn-primary">Renew</button> */}
          </div>
        </div>
      </div>
      <div className="testpackage-bottom-container">
        <div className="p-percent-wrapper">
          <p className="p-no-of-test">
            {testPackage.noOfAttemptedTest}/
            <span>{testPackage.noOfTest} Tests</span>{' '}
          </p>
          <div className="p-percent-blk">
            <div className="p-percent-bar">
              <span
                className="p-percent-progress"
                style={{ width: percent + '%' }}></span>
            </div>
            <span className="p-percentage">{(Number(percent)).toFixed(2)}%</span>  
          </div>
          
        </div>
        <Link
          to={`/test-series/${testPackage.id}`}
          className="btn-secondary-pill">
          Go To Test Series
        </Link>
      </div>
    </div>
  );
};
