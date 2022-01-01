import React, { useEffect, useState } from 'react';
import { Heart, Star, University, HeartFill } from '../../../Core/Layout/Icon';
import { ToolTip } from './../../../Core/Layout/Tooltip/ToolTip';
import { useHistory } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import { BASE_URL } from './../../../../config';
import moment from 'moment';
const TestPackageItem = ({ item, arr }) => {
  const history = useHistory();
  const [inWishList, setInWishList] = useState([]);
  const { addToast } = useToasts();

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {
      arr.home_page_test_package_lists.map((el) =>
        checkInWishList(el.packageId)
      );
    }
  }, [arr]);

  //   To check which test package is in whishlist and storing it
  const checkInWishList = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: '1',
      itemId: id,
    });
    try {
      const {
        data: { data, message },
      } = await axios.post(`${BASE_URL}/wishlist/checkWishList`, body, config);

      if (message !== 'Invalid auth token') {
       if(inWishList.length > 0){
        setInWishList((inWishList) => [...inWishList, { id, have: data.have }]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for changings
  const handleWishList = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: '1',
      itemId: id,
    });
    let selected =
      inWishList.length && inWishList.find((w) => w.id === id).have;
    let updatedIndex;
    try {
      if (selected === 1) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/remove-from-wishlist`,
          body,
          config
        );
        updatedIndex = inWishList.findIndex((w) => w.id === id);
        inWishList[updatedIndex].have = 0;
      }
      if (selected === 0) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/add-to-wishlist`,
          body,
          config
        );
        updatedIndex = inWishList.findIndex((w) => w.id === id);
        inWishList[updatedIndex].have = 1;
      }

      setInWishList([...inWishList]);
    } catch (err) {
      console.log(err);
    }
  };

  const buyNow = (item) => {
    if (!!localStorage.getItem('token')) {
      history.push({
        pathname: `/cart`,
        state: { id: item.packageId, type: 2 },
      });
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };

  const checkValidity = (validity) => {
    let start = moment();
    let end = moment().add(parseInt(validity), 'days');

    let years = end.diff(start, 'year');
    start.add(years, 'years');

    let months = end.diff(start, 'months');
    start.add(months, 'months');

    let days = end.diff(start, 'days');

    if (months === 0 && days === 0) {
      return;
    }
    return (
      <li>
        {'Validity  :'}
        {months ? `${months} months` : ''} {days ? ` ${days} days` : ''}{' '}
      </li>
    );
  };

  const checkValidity2 = (expireDate) => {
    let starts = moment();
    let ends = moment(expireDate);

    let diffHuman = moment.preciseDiff(starts, ends, true);
    return (
      <li>
        {'Validity  :'}
        {diffHuman.months ? `${diffHuman.months} months` : ''}{' '}
        {diffHuman.days ? ` ${diffHuman.days} days` : ''}{' '}
      </li>
    );
  };

  return (
    <div className="a-carousel-item" key={item}>
      {localStorage.getItem('token') !== '' &&
        localStorage.getItem('token') !== null && (
          <div className="a-wishlist">
            {inWishList.length &&
            inWishList.find((w) => w.id === item.packageId)?.have === 1 ? (
              <span onClick={() => handleWishList(item.packageId)}>
                <HeartFill />
              </span>
            ) : (
              <span onClick={() => handleWishList(item.packageId)}>
                <Heart />
              </span>
            )}
          </div>
        )}
      {item.packageImageUrl === null ? (
        <span
          onClick={() => routerChange(item.packageId)}
          style={{
            backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.coaching.coachingName}')`,
          }}></span>
      ) : (
        <span
          onClick={() => routerChange(item.packageId)}
          style={{
            backgroundImage: `url(${item.packageImageUrl})`,
          }}></span>
      )}

      <div className="a-listItem">
        <div className="a-listTop">
          <div
            className="a-itemHead"
            onClick={() => routerChange(item.packageId)}>
            <h4>{item.packageName}</h4>
            <div className="a-ratingandstars">
              <div className="a-avatarProfile">
                {item.coaching.logoUrl === null ? (
                  <span
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coaching.coachingName}')`,
                    }}></span>
                ) : (
                  <span
                    style={{
                      backgroundImage: `url(${item.coaching.logoUrl})`,
                    }}></span>
                )}
              </div>
              <b>
                <span>
                  <Star />
                </span>{' '}
                {/* {(item.rating &&
                  item.rating.toFixed(1) > 2 &&
                  item.rating.toFixed(1)) ||
                  `-`} */}
                {item.ratingCount >= 3 ? item.rating.toFixed(1) : '-'}
              </b>
              <b>
                {/* {item.ratingCount.toFixed(1) > 3
                  ? `${item.ratingCount} Ratings`
                  : `Not Rated`} */}
                {item.ratingCount >= 3
                  ? `${item.ratingCount} Ratings`
                  : `(Not Rated)`}
              </b>
            </div>
          </div>
          <p
            className="a-university"
            onClick={() => routerChange(item.packageId)}>
            <span>
              <University />
            </span>
            {item.coaching.coachingName}
          </p>
          <p
            className="a-typeExam"
            onClick={() => routerChange(item.packageId)}>
            {item.exam_types.length <= 3 ? (
              item.exam_types.map((i, idx) => (
                <React.Fragment key={idx}>
                  {i.examType} {idx !== item.exam_types.length - 1 ? '& ' : ''}{' '}
                </React.Fragment>
              ))
            ) : (
              <div>
                {item.exam_types.slice(0, 3).map((i, idx) => (
                  <React.Fragment key={idx}>
                    {i.examType}{' '}
                    {idx !== item.exam_types.slice(0, 3).length - 1 ? '& ' : ''}{' '}
                  </React.Fragment>
                ))}

                <ToolTip
                  message={`${item.exam_types
                    .slice(3)
                    .map((el) => el.examType)}`}
                  position={'top'}>
                  <p>
                    {'+'}
                    {item.exam_types
                      .slice(3)
                      .reduce((acc, current) => acc + 1, 0)}
                  </p>
                </ToolTip>
              </div>
            )}
          </p>
          <ul
            className="a-optionDetails"
            onClick={() => routerChange(item.packageId)}>
            <li>No of Tests: {item.noOfTest}</li>
            {item.testTypes && item.testTypes.length > 0 && item.testTypes[0].testTypeName!=='' && (
            <li>
                  {item.testTypes.map((el, i) =>
                      i === item.testTypes.length - 1
                        ? `${el.testTypeCount} ${el.testTypeName}`
                        : `${el.testTypeCount} ${el.testTypeName} + `
                    )
            }
                </li>)
            }
            <li>
              {item &&
                item.languages.map((i, idx) => (
                  <span key={idx}>
                    {i.languageName} <b>|</b>{' '}
                  </span>
                ))}
            </li>
           
            {item.validityType === 0 &&
                          checkValidity(item.validity)}

                        {item.validityType === 1 &&
                          checkValidity2(item.expireDate || item.validity)}
            
          </ul>
          <div
            className="a-rupeeDetails"
            onClick={() => routerChange(item.packageId)}>
                {(item.onSaleStatus === 0 && item.saleType === 4 && (
                              <p>
                              {' '} <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',paddingRight: '10px',color: '#212121'}}>&#8377;{' '} 0</span>
                            <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',textDecoration: 'line-through'}}>&#8377;{' '} {item.productPrice}</span>
                            /-
                            </p>
                          )) || (
                            item.discountPrice!==null
                            ?  <p>
                            {' '} <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',paddingRight: '10px',color: '#212121'}}>&#8377;{' '} {item.discountPrice}</span>
                            <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',textDecoration: 'line-through'}}>&#8377;{' '} {item.productPrice}</span>
                           
                            /-</p> 
                            :  <p> 
                            {' '}<span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800'}}>&#8377;{' '} {item.productPrice}</span>
                            /-</p> 
                            )
                            }
            {/* {item.discountPrice > 0 && item.saleType !== 4 && (
              <p>
                {' '}
                <span>&#8377;</span> {item.discountPrice}/- {'    '}
              
              </p>
            )}

            {item.discountPrice === 0 && item.productPrice > 0 && (
              <p>
                {' '}
                <span>&#8377;</span> {item.productPrice}/- {'    '}
              </p>
            )}

            {item.discountPrice > 0 && item.saleType === 4 && (
              <p>
                {' '}
                <span>&#8377;</span> <strike></strike> {item.productPrice}/-{' '}
                {'    '}
              </p>
            )} */}
          </div>
          {item.saleType === 1 && (
            <div className="a-detailsBtn">
              <span onClick={() => buyNow(item)}>BUY NOW</span>
            </div>
          )}

          {item.saleType === 2 && (
            <div
              className="a-detailsBtn"
              onClick={() => routerChange(item.packageId)}>
              <span>Share &amp; Unlock</span>
            </div>
          )}

          {item.saleType === 3 && (
            <div
              className="a-detailsBtn"
              onClick={() => routerChange(item.packageId)}>
              <span>BUY PASS TO UNLOCK</span>
            </div>
          )}

          {item.saleType === 4 && (
            <div
              className="a-detailsBtn"
              onClick={() => routerChange(item.packageId)}>
              <span>UNLOCK FREE</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestPackageItem;
