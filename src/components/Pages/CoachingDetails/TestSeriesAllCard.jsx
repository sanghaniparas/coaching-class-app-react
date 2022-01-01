import React, { Fragment, useState, useEffect } from "react";
import { useToasts } from "react-toast-notifications";
import {
  Heart,
  Star,
  University,
  HeartFill,
  ArrowDown
} from "../../Core/Layout/Icon";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./../../../config";
import { Link } from 'react-router-dom';
import moment from 'moment';

const TestSeriesAllCard = ({ testSeriesPage, pageDetails, cardItemNumber, incrementItemNumber }) => {
  const [inWishList, setInWishList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showMore, setIsShowMore] = useState(false);
  const [dataList, setDataList] = useState([]);
  const { addToast } = useToasts();

  const history = useHistory();

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" ||
      localStorage.getItem("token") !== null
    ) {
      testSeriesPage.length &&
        testSeriesPage[0].objectList.map((el) => checkInWishList(el.id));
    }
    let splitObject = testSeriesPage[0].objectList.slice(0, cardItemNumber);
    let isShowMore = testSeriesPage[0].objectList.length > splitObject.length?true:false;
    setIsShowMore(isShowMore);
    setCounter(splitObject.length);
    setDataList(splitObject);
  }, [testSeriesPage]);

  //   To check which test package is in whishlist and storing it
  const checkInWishList = async (id) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: "1",
      itemId: id,
    });
    try {
      const {
        data: { data, message },
      } = await axios.post(`${BASE_URL}/wishlist/checkWishList`, body, config);

      if (message !== "Invalid auth token") {
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
        "Content-Type": "Application/json",
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: "1",
      itemId: id,
    });
    let selected = inWishList.find((w) => w.id === id).have;
    console.log(id, selected, inWishList);
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
    console.log(item)
    if (!!localStorage.getItem("token")) {
      if(item.id){
        history.push({
          pathname: `/cart`,
          state: { id: item.id, type: 2 },
        });
      }else{
        history.push({
          pathname: `/cart`,
          state: { id: item.testpackageDetails.id, type: 2 },
        });
      }
     
    } else {
      addToast("Please Login to add product in cart", {
        appearance: "warning",
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };
  const viewMore = (e) => {
    e.preventDefault();
    let incrementCounter = counter+incrementItemNumber;
    let splitViewMoreObject = testSeriesPage[0].objectList.slice(0, incrementCounter);
    let isShowViewMore = testSeriesPage[0].objectList.length > splitViewMoreObject.length?true:false;
    setIsShowMore(isShowViewMore);
    setCounter(splitViewMoreObject.length);
    setDataList(splitViewMoreObject);
}

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

  console.log(diffHuman)
  return (
    <li>
      {'Validity  :'}
      {diffHuman.months ? `${diffHuman.months} months` : ''}{' '}
      {diffHuman.days ? ` ${diffHuman.days} days` : ''}{' '}
    </li>
  );
};


  return (
    <div className="a-wrapping-Content ultra-ligh-grey-bg innerTabPages">
      <div className="a-wrapper">
        <div className="a-container">
          <div className="a-trending flex-width new-flex">
            {testSeriesPage.length &&
              testSeriesPage.map((item, idx) => (
                <Fragment key={idx}>
                  {item &&
                    dataList.map((innerItem, ids) => (
                      <div className="a-carousel-item" key={ids}>
                        {localStorage.getItem("token") !== "" &&
                          localStorage.getItem("token") !== null && (
                            <div className="a-wishlist">
                              {inWishList.length &&
                              inWishList.find((w) => w.id === innerItem.id)
                                ?.have === 1 ? (
                                <span
                                  onClick={() => handleWishList(innerItem.id)}
                                >
                                  <HeartFill />
                                </span>
                              ) : (
                                <span
                                  onClick={() => handleWishList(innerItem.id)}
                                >
                                  <Heart />
                                </span>
                              )}
                            </div>
                          )}
                        {innerItem.packageImageUrl !== null ? (
                          <span
                            onClick={() => routerChange(innerItem.id)}
                            style={{
                              backgroundImage: `url(${innerItem.packageImageUrl})`,
                            }}
                          ></span>
                        ) : (
                          <span
                            onClick={() => routerChange(innerItem.id)}
                            style={{
                              backgroundImage: `url('https://via.placeholder.com/272x150?text=${innerItem.packageName}')`,
                            }}
                          ></span>
                        )}
                        <div className="a-listItem">
                          <div className="a-listTop">
                            <div
                              className="a-itemHead"
                              onClick={() => routerChange(innerItem.id)}
                            >
                              <h4>
                                {innerItem?.packageName?.length > 36
                                  ? `${innerItem.packageName.substring(
                                      0,
                                      36
                                    )} ...`
                                  : innerItem.packageName}
                              </h4>
                              <div className="a-ratingandstars">
                                <div className="a-avatarProfile">
                                  {innerItem.coaching.logoUrl !== null ? (
                                    <span
                                      style={{
                                        backgroundImage: `url(${innerItem.coaching.logoUrl})`,
                                      }}
                                    ></span>
                                  ) : (
                                    <span
                                      style={{
                                        backgroundImage: `url('https://via.placeholder.com/40x40?text=${innerItem.coaching.coachingName}')`,
                                      }}
                                    ></span>
                                  )}
                                </div>

                                {!item.rating ? (
                                  <b>
                                    <span>
                                      <Star />
                                    </span>{" "}
                                    -
                                  </b>
                                ) : (
                                  <b>
                                    <span>
                                      <Star />
                                    </span>
                                    {/* {item.rating.toFixed(1)} */}
                                    {(item.rating &&
                                      item.ratingCount.toFixed(1) > 2 &&
                                      item.rating.toFixed(1)) ||
                                      `-`}
                                  </b>
                                )}

                                {/* <b>({innerItem.ratingCount} Ratings)</b> */}
                                <b>
                                  (
                                  {innerItem.ratingCount.toFixed(1) > 2
                                    ? `${innerItem.ratingCount} Ratings`
                                    : `Not Rated`}
                                  )
                                </b>
                              </div>
                            </div>
                            <p className="a-location">
                              <span>
                                <University />
                              </span>{" "}
                              {pageDetails.coachingName}
                            </p>

                            <p
                              className="a-typeExam"
                              onClick={() => routerChange(innerItem.id)}
                            >
                              {/* SSC */}
                              {!innerItem.examTypes
                                ? ""
                                : innerItem.examTypes.map((i, idx) => (
                                    <b key={idx}>
                                      {i.examType}
                                      {"  "}{" "}
                                    </b>
                                  ))}
                            </p>

                            <ul
                              className="a-optionDetails"
                              onClick={() => routerChange(innerItem.id)}
                            >
                              <li>No of Tests: {innerItem.noOfTest}</li>
                              {innerItem.testTypes &&
                              innerItem.testTypes.length !== 0 ? (
                                <li>
                                  {innerItem.testTypes.length > 0
                                    ? innerItem.testTypes.map((el, i) =>
                                        i === innerItem.testTypes.length - 1
                                          ? `${el.testTypeCount} ${el.testTypeName}`
                                          : `${el.testTypeCount} ${el.testTypeName} + `
                                      )
                                    : ``}
                                </li>
                              ) : null}

                              <li>
                                {!innerItem.languages
                                  ? ""
                                  : innerItem.languages.map((i, idx) => (
                                      <span key={idx}>
                                        {i.languageName} <b>|</b>{" "}
                                      </span>
                                    ))}
                              </li>

                              {innerItem.validityType === 0 && checkValidity(innerItem.validity)}

                              {innerItem.validityType === 1 && checkValidity2(innerItem.expireDate)}



                            </ul>

                            <div
                              className="a-rupeeDetails"
                              onClick={() => routerChange(innerItem.id)}
                            >
                              {(innerItem.onSaleStatus === 0 &&
                                innerItem.saleType === 4 && (
                                  <p>
                                  {' '} <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',paddingRight: '10px',color: '#212121'}}>&#8377;{' '} 0</span>
                                <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',textDecoration: 'line-through'}}>&#8377;{' '} {innerItem.productPrice}</span>
                                /-
                                </p>
                                )) || (
                                  innerItem.discountPrice!==null
                                  ?  <p>
                                  {' '} <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',paddingRight: '10px',color: '#212121'}}>&#8377;{' '} {innerItem.discountPrice}</span>
                                  <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',textDecoration: 'line-through'}}>&#8377;{' '} {innerItem.productPrice}</span>
                                 
                                  /-</p> 
                                  :  <p> 
                                  {' '}<span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800'}}>&#8377;{' '} {innerItem.productPrice}</span>
                                  /-</p> 
                              )}
                            </div>

                            {innerItem.status === 5 ? (
                              innerItem.onSaleStatus === 0 ? (
                                <div className="a-detailsBtn">
                                  {innerItem.saleType === 1 && (
                                    <span onClick={() => buyNow(innerItem)}>
                                      BUY NOW
                                    </span>
                                  )}
                                  {innerItem.saleType === 2 && (
                                    <span  onClick={() => routerChange(innerItem.id)}>SHARE & UNLOCK</span>
                                  )}
                                  {innerItem.saleType === 3 && (
                                    <span  onClick={() => routerChange(innerItem.id)}>SHARE THROUGH PASS</span>
                                  )}
                                  {innerItem.saleType === 4 && (
                                    <span  onClick={() => routerChange(innerItem.id)}>UNLOCK FREE</span>
                                  )}
                                </div>
                              ) : (
                                <div className="a-detailsBtn">
                                  <button
                                    className="disabled btn-primary radius btn-block"
                                    type="button"
                                    disabled
                                  >
                                    UNAVAILABLE
                                  </button>
                                </div>
                              )
                            ) : (
                              <div className="a-detailsBtn">
                                <button
                                  className="disabled btn-primary radius btn-block"
                                  type="button"
                                  disabled
                                >
                                  UNAVAILABLE
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </Fragment>
              ))
              }
          </div>
          {
            showMore && <p className="viewmore"><Link to="" onClick={(e) => viewMore(e)}>View More <ArrowDown /></Link></p>
          }
        </div>
      </div>
    </div>
  );
};

export default TestSeriesAllCard;
