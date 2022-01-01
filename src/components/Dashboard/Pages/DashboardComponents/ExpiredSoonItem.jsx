import React, { useState, useEffect } from 'react';
import { AlarmClock,
  Share,
  Star,
  WhatsApp,
  TeleGramRound,
  FacebookRound,
  GmailRound } from '../../../Core/Layout/Icon';
import moment from 'moment';
import 'moment-precise-range-plugin';
import Countdown from './Countdown';
import CountDownCon from './CountDownCon';
import { useHistory } from 'react-router-dom';


const style = {
  color: 'red',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
};
const ExpiredSoonItem = ({ el }) => {
  const [validity, setValidity] = useState({});

  const history = useHistory();
  useEffect(() => {
    if (el.validityType !== 1) {
      let start = moment();
      console.log("start", start);
      let end = moment(el.purchase_date).add(parseInt(el.validity), 'days');

      let years = end.diff(start, 'year');
      start.add(years, 'years');

      let months = end.diff(start, 'months');
      start.add(months, 'months');

      let days = end.diff(start, 'days');

      setValidity({ months, days });
    }

    if (el.validityType === 1) {
      let starts = moment();
      let ends = moment(el.expireDate);

      // or as string:
      let diffHuman = moment.preciseDiff(starts, ends, true);
      // example: 2 years 7 months 6 hours 29 minutes 17 seconds

      setValidity({ months: diffHuman.months, days: diffHuman.days });
    }
  }, [el]);


  console.log(moment(el.purchase_date).add(parseInt(el.validity)));


  const thendate = new Date(el.purchase_date);

  // add a day
  thendate.setDate(thendate.getDate() + Number(el.validity));
  console.log("then date", thendate);
  console.log("check ***", moment().isAfter(thendate));

  return (
    <div className="a-test-series" key={el.id}>
      <div className="a-tes-doc test-expiring">
        <div className="test-card-left" onClick={() => { history.push(`/testdetails/${el.id}`) }}>
          <div className="test-card-img">
            <img src={el.packageImageUrl} alt="" />
          </div>
          <div className="test-card-content">
          <span className="share">
                <Share />
                  <div className="toggle" style={{display: "none"}}>
                    <span>
                      <WhatsApp />
                    </span>
                    <span>
                      <FacebookRound />
                    </span>
                    <span>
                      <GmailRound />
                    </span>
                  </div>
              </span>
            <h4 className="test-card-title">{el.packageName}</h4>
            <p className="test-card-subtitle">
              {el.package_test_types.map((item, idx) =>
                idx === el.package_test_types.length - 1 ? (
                  <strong key={idx}>{item.test_type_name} </strong>
                ) : (
                    <strong key={idx}>{item.test_type_name}, </strong>
                  )
              )}
            </p>
            <p className="test-coching">
              <img
                src={require('../../../../assets/images/university.svg')}
                alt=""
              />
              {el.coachings.coachingName} ,{el.coachings.cityName} {el.coachings.stateName}
            </p>
            <p className="test-card-package-title">Package Details</p>
            <ul className="test-card-list">
              <li>Total package: {el.noOfTest}</li>
              <li>No of Test: {el.noOfTest}</li>
              <li>{el.package_languages}</li>
              <li>
                {/* Expires in {validity.months ? `${validity.months} months` : ''}{' '}
                {validity.days ? ` ${validity.days} days` : ''}{' '} */}
                {el.validityType === 0 ? `Valid For ${el.validity} days` : `Expires in ${el.expireDate}`}

              </li>
            </ul>
          </div>
        </div>
        <div className="test-card-right">
          <div className="price-box">
            <p className="test-offer">Offer Price</p>
            <p className="price">
              &#8377;{' '}
              {el.discountPrice === 0 ? el.productPrice : el.discountPrice}{' '}
              {el.discountPrice !== 0 && <span>&#8377; {el.productPrice}</span>}
            </p>
            <p className="offer">{el.discountPrice !== 0 ? (el.discount / el.productPrice * 100) + "% Discount" : "No Discount"}</p>
          </div>
          {/* <p className="expire">
            <AlarmClock fill="#e4556c" />
            Expires in 1D : 06 H :02 M : 40S
          </p> */}
          {/* {moment(
            validity
          ).format('MM DD YYYY, h:mm a')} */}


          <p className="time" style={style}>
            <AlarmClock fill="#e4556c" />
            {el.validityType === 1 ?
              <CountDownCon
                timeTillDate={moment(
                  new Date(el.expireDate)
                ).format('MM DD YYYY, h:mm a')}
                timeFormat="MM DD YYYY, h:mm a"

              />
              :
              <Countdown
                validity={el.validity}
                purchase_date={el.purchase_date}
                style={style}
              />}
          </p>



          <button
            type="button"
            className="btn-primary btn-block"
            style={{ marginTop: '1.5rem' }}>
            Purchased
          </button>


        </div>
      </div>
    </div>
  );
};

export default ExpiredSoonItem;
