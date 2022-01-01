import React, { useEffect, useState } from 'react';
import { withRouter, useHistory } from 'react-router-dom';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import { useToasts } from 'react-toast-notifications';
import Carousel from '../Elements/Carousel';
import axios from 'axios';
import {
  Arrow,
  Heart,
  Star,
  Location,
  University,
  HeartFill,
} from '../../Core/Layout/Icon';
import { BASE_URL } from './../../../config';
import CardSkeleton from './../../../skeletons/CardSkeleton';
import { ToolTip } from './../../Core/Layout/Tooltip/ToolTip';
import moment from 'moment';

const TestSeriesSimilarPackage = ({ testDetails, match }) => {
  const [res, setRes] = useState([]);
  const [count, setCount] = useState(true);
  const [inWishList, setInWishList] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    setTimeout(() => {
      setCount(false);
    }, 1000);
  }, []);

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

  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? 'prev' : 'next';
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}>
        {carlPointer}
      </button>
    );
  };

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];

  const history = useHistory();

  const routerChange = (id) => {
    console.log(id);
    let path = `/testdetails/${id}`;
    history.push(path);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    async function fetchSimilarTestPackage() {
      try {
        const response = await axios.get(
          `${BASE_URL}/testPackage/differentCoachingSimilarTestPackages/${match.params.id}`
        );

        setRes(response.data.data);
      } catch (err) {
        console.log(err);
      }
    }

    fetchSimilarTestPackage();
  }, []);

  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {
      res && res.length && res.map((el) => checkInWishList(el.id));
    }
  }, [res]);

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
        setInWishList((inWishList) => [...inWishList, { id, have: data.have }]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for changing
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

  return (
    <>
      {res && res.length !== 0 ? (
        <Carousel heading="">
          {res && res.length !== 0 && (
            <h1
              style={{
                fontWeight: '900',
                fontSize: '22px',
                marginBottom: '1rem',
              }}>
              Similar Test Series Packages
            </h1>
          )}
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {res.length === 0 && count === true ? (
              <CardSkeleton />
            ) : (
              res.map((item, id) => (
                <React.Fragment key={id}>
                  <div className="a-carousel-item">
                    {localStorage.getItem('token') !== '' &&
                      localStorage.getItem('token') !== null && (
                        <div className="a-wishlist">
                          {inWishList.length &&
                          inWishList.find((w) => w.id === item.id)?.have ===
                            1 ? (
                            <span onClick={() => handleWishList(item.id)}>
                              <HeartFill />
                            </span>
                          ) : (
                            <span onClick={() => handleWishList(item.id)}>
                              <Heart />
                            </span>
                          )}
                        </div>
                      )}
                    {item.packageImageUrl === null ? (
                      <span
                        onClick={() => routerChange(item.id)}
                        style={{
                          backgroundImage: `url('https://via.placeholder.com/272x150')`,
                        }}></span>
                    ) : (
                      <span
                        onClick={() => routerChange(item.id)}
                        style={{
                          backgroundImage: `url(${item.packageImageUrl})`,
                        }}></span>
                    )}

                    <div className="a-listItem">
                      <div className="a-listTop">
                        <div
                          className="a-itemHead"
                          onClick={() => routerChange(item.id)}>
                          <h4>
                            {' '}
                            {item.packageName.length > 36
                              ? `${item.packageName.substring(0, 36)} ...`
                              : item.packageName}
                          </h4>

                          <div className="a-ratingandstars">
                            <div className="a-avatarProfile">
                              <span
                                style={{
                                  backgroundImage: `url(${item.coaching.logoUrl})`,
                                }}></span>
                            </div>

                            {!item.rating ? (
                              <b>
                                <span>
                                  <Star />
                                </span>{' '}
                                -
                              </b>
                            ) : (
                              <b>
                                <span>
                                  <Star />
                                </span>
                                {(item.rating &&
                                  item.ratingCount.toFixed(1) > 2 &&
                                  item.rating.toFixed(1)) ||
                                  `-`}
                              </b>
                            )}

                            <b>
                              (
                              {item.ratingCount &&
                              item.ratingCount.toFixed(1) > 2
                                ? `${item.ratingCount} Ratings`
                                : `Not Rated`}
                              )
                            </b>
                          </div>
                        </div>
                        <p className="a-location">
                          <span>
                            <University />
                          </span>{' '}
                          {item.coaching.coachingName}
                        </p>
                        <p
                          className="a-typeExam"
                          onClick={() => routerChange(item.id)}>
                          {
                            item.examTypes.length <= 2? (
                              item.examTypes.map((i, idx) => (
                                <React.Fragment key={idx}>
                                  {i.examType}{' '}
                                  {idx !== item.examTypes.length - 1 ? ',' : ''}{' '}
                                </React.Fragment>
                              ))
                            ):(
                              <>
                              {item.examTypes.slice(0, 2).map((i, idx) => (
                                <React.Fragment key={idx}>
                                  {i.examType}{' '}
                                  {idx !== item.examTypes.slice(0, 2).length - 1
                                    ? ','
                                    : ''}{' '}
                                </React.Fragment>
                              ))}
                              <ToolTip
                                message={`${item.examTypes
                                  .slice(2)
                                  .map((el) => el.examType)}`}
                                position={'top'}>
                                <p>
                                  {'+'}
                                  {item.examTypes
                                    .slice(2)
                                    .reduce((acc, current) => acc + 1, 0)}
                                </p>
                              </ToolTip>
                              </>
                            )
                          }
                          {/* {item.examTypes.length === 0
                            ? null
                            : item.examTypes.map((el, id) =>
                                id === item.examTypes.length - 1
                                  ? `${el.examType}`
                                  : `${el.examType}, `
                              )} */}
                        </p>
                        <ul
                          className="a-optionDetails"
                          onClick={() => routerChange(item.id)}>
                          <li>No of Tests: {item.noOfTest}</li>
                          {item.testTypes && item.testTypes.length > 0 &&  item.testTypes[0].testTypeName!=='' &&
                          <li>
                            {item.testTypes.length > 0
                              ? item.testTypes.map((el, i) =>
                                  i === item.testTypes.length - 1
                                    ? `${el.testTypeCount} ${el.testTypeName}`
                                    : `${el.testTypeCount} ${el.testTypeName} + `
                                )
                              : ``}
                          </li>}
                          <li>
                            {item.languages.map((el, id) => (
                              <span key={id}>
                                {el.languageName} <b>|</b>{' '}
                              </span>
                            ))}
                          </li>
                          {item.validityType === 0 &&
                          checkValidity(item.validity)}

                        {item.validityType === 1 &&
                          checkValidity2(item.expireDate)}
                        </ul>
                        <div
                          className="a-rupeeDetails"
                          onClick={() => routerChange(item.id)}>
                          {(item.onSaleStatus === 0 &&
                            item.saleType === 4 && (
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
                          )}
                        </div>

                        {item.status === 5 ? (
                          item.onSaleStatus === 0 ? (
                            <div className="a-detailsBtn">
                              {item.saleType === 1 && (
                                <span onClick={() => buyNow(item)}>
                                  BUY NOW
                                </span>
                              )}
                              {item.saleType === 2 && (
                                <span onClick={() => routerChange(item.id)}>SHARE & UNLOCK</span>
                              )}
                              {item.saleType === 3 && (
                                <span onClick={() => routerChange(item.id)}>SHARE THROUGH PASS</span>
                              )}
                              {item.saleType === 4 && <span onClick={() => routerChange(item.id)}>UNLOCK FREE</span>}
                            </div>
                          ) : (
                            <div className="a-detailsBtn"> 
                              <button
                                className="disabled btn-primary radius btn-block"
                                type="button"
                                disabled>
                                UNAVAILABLE
                              </button>
                            </div>
                          )
                        ) : (
                          <div className="a-detailsBtn">
                            <button
                              className="disabled btn-primary radius btn-block"
                              type="button"
                              disabled>
                              UNAVAILABLE
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))
            )}
          </ReactCarousel>
        </Carousel>
      ) : (
        ''
      )}
    </>
  );
};

export default withRouter(TestSeriesSimilarPackage);
