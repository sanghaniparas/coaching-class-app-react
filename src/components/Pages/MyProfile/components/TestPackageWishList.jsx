import React, { useState, useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import {
  Arrow,
  Heart,
  Star,
  University,
  HeartFill,
} from '../../../Core/Layout/Icon';
import { ToolTip } from './../../../Core/Layout/Tooltip/ToolTip';
import Carousel from './../../Elements/Carousel';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import {
  selectWishListQuiz,
  selectWishListTest,
  selectWishListPractice,
} from '../../../../redux/MyProfile/profile.selectors';
import { useHistory } from 'react-router-dom';
import {
  fetchWishListQuiz,
  updateWishListPackages,
  fetchWishListPractice,
  fetchWishListPackages,
} from './../../../../redux/MyProfile/profile.actions';
import { BASE_URL } from './../../../../config';
import axios from 'axios';

const TestPackageWishList = ({ testPackages, practiceList, quizList }) => {
  const [examType, setExamType] = useState([]);
  const { addToast } = useToasts();

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
    { width: 350, itemsToShow: 2, itemsToScroll: 1 },
    { width: 650, itemsToShow: 3, itemsToScroll: 1 },
    { width: 850, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 3 },
    { width: 1750, itemsToShow: 3 },
  ];

  const history = useHistory();
  const dispatch = useDispatch();

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  // Remove from wishlist on click
  const handleRemoveWishList = async (id) => {
    dispatch(updateWishListPackages(id));

    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };
    const body = JSON.stringify({
      itemId: id,
      itemType: '1',
    });
    try {
      const response = await axios.post(
        `${BASE_URL}/wishlist/remove-from-wishlist`,
        body,
        config
      );
    } catch (err) {
      console.log(err);
    }
  };

  // For fetching exam types for dropdown
  useEffect(() => {
    (async function fetchExamTypes() {
      const {
        data: { data },
      } = await axios.get(`${BASE_URL}/misc/examType`);

      setExamType(data);
    })();
  }, []);

  // For changing and filtering examtypes
  const handleExamTypeChange = (e) => {
    dispatch(
      fetchWishListPackages({ packageType: '1', examTypeId: e.target.value })
    );
    dispatch(
      fetchWishListPractice({ packageType: '2', examTypeId: e.target.value })
    );
    dispatch(
      fetchWishListQuiz({ packageType: '3', examTypeId: e.target.value })
    );
    console.log(e.target.value);
  };

  useEffect(() => {
    console.log('test ***', testPackages);
  }, [testPackages]);

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
      {testPackages === null || practiceList === null || quizList === null ? (
        <div style={{ minHeight: '100vh' }}>
          <Loader
            style={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              transform: 'translate(-50%, -60%)',
            }}
            type="Oval"
            color="#FF7249"
            height={40}
            width={40}
            timeout={3000} //3 secs
          />
        </div>
      ) : (
        <>
          <div className="header-filter">
            <div className="left-content">
              <h3>
                WishList(
                {testPackages?.count + practiceList?.count + quizList?.count})
              </h3>
              <p>You can remove or filter packages by category</p>
            </div>
            <div className="filter-group">
              <select name="" id="" onChange={handleExamTypeChange}>
                <option value="">All</option>
                {examType.length &&
                  examType.map((el) => (
                    <option value={el.id}>{el.examType}</option>
                  ))}
              </select>
            </div>
          </div>
          <div className="testpackages-filterwise grey-bg-box">
            <div className="a-container">
              <h3
                style={{
                  color: '#3a466b',
                  fontWeight: '800',
                  marginBottom: '5px',
                  marginLeft: '10px',
                  fontSize: '20px',
                }}>
                Packages
              </h3>
              {/* {testPackages.count == 0 ? "0" : "no"} */}
              {testPackages.count != 0 ? (
                <Carousel heading={''}>
                  <ReactCarousel
                    itemsToShow={3}
                    itemsToScroll={1}
                    breakPoints={breakPoints}
                    renderArrow={myArrow}
                    style={{ cursor: 'pointer' }}>
                    {testPackages &&
                      testPackages.data.map((item, idx) => (
                        <div className="a-carousel-item" key={idx}  onClick={() => routerChange(item.id)}>
                          <div className="a-wishlist">
                            <span onClick={() => handleRemoveWishList(item.id)}>
                              <HeartFill />
                            </span>
                          </div>
                          {item.packageImageUrl !== null ? (
                            <span
                             
                              style={{
                                backgroundImage: `url(${item.packageImageUrl})`,
                              }}></span>
                          ) : (
                            <span
                             
                              style={{
                                backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.coaching.coachingName}')`,
                              }}></span>
                          )}

                          <div className="a-listItem">
                            <div className="a-listTop">
                              <div
                                className="a-itemHead"
                                onClick={() => routerChange(item.id)}
                                style={{ cursor: 'pointer' }}>
                                <h4>{item.packageName}</h4>
                                <div className="a-ratingandstars">
                                  <div className="a-avatarProfile">
                                    {item.coaching.logoUrl !== null ? (
                                      <span
                                        style={{
                                          backgroundImage: `url(${item.coaching.logoUrl})`,
                                          cursor: 'pointer',
                                        }}></span>
                                    ) : (
                                      <span
                                        style={{
                                          backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coaching.coachingName}')`,
                                        }}></span>
                                    )}
                                  </div>
                                  <b>
                                    <span>
                                      <Star />
                                    </span>{' '}
                                    {(item.rating &&
                                      item.ratingCount.toFixed(1) > 2 &&
                                      item.rating.toFixed(1)) ||
                                      `-`}
                                  </b>
                                  <b>
                                    ({' '}
                                    {item.ratingCount.toFixed(1) > 2
                                      ? `${item.ratingCount} Ratings`
                                      : `Not Rated`}
                                    )
                                  </b>
                                </div>
                              </div>
                              <p className="a-university">
                                <span>
                                  <University />
                                </span>
                                {item.coaching.coachingName}
                              </p>
                              <div className="a-typeExam p-item">
                                {item.examTypes.length <= 3 ? (
                                  item.examTypes.map((i, idx) => (
                                    <React.Fragment key={idx}>
                                      {i.examType}{' '}
                                      {idx !== item.examTypes.length - 1
                                        ? ','
                                        : ''}{' '}
                                    </React.Fragment>
                                  ))
                                ) : (
                                  <div>
                                    {item.examTypes
                                      .slice(0, 3)
                                      .map((i, idx) => (
                                        <React.Fragment key={idx}>
                                          {i.examType}{' '}
                                          {idx !==
                                          item.examTypes.slice(0, 3).length - 1
                                            ? ','
                                            : ''}{' '}
                                        </React.Fragment>
                                      ))}

                                    <ToolTip
                                      message={`${item.examTypes
                                        .slice(3)
                                        .map((el) => el.examType)}`}
                                      position={'top'}>
                                      <p>
                                        {'+'}
                                        {item.examTypes
                                          .slice(3)
                                          .reduce((acc, current) => acc + 1, 0)}
                                      </p>
                                    </ToolTip>
                                  </div>
                                )}
                              </div>
                              <ul
                                className="a-optionDetails"
                                onClick={() => routerChange(item.id)}>
                                <li>No of Tests: {item.noOfTest}</li>
                                
                                  {item.testTypes && item.testTypes.length > 0 && item.testTypes[0].testTypeName!=='' && <li>
                                    { item.testTypes.map((el, i) =>
                                        i === item.testTypes.length - 1
                                          ? `${el.testTypeCount} ${el.testTypeName}`
                                          : `${el.testTypeCount} ${el.testTypeName} + `
                                      ) }
                                   
                                </li> }
                                <li>
                                  {' '}
                                  {item &&
                                    item.languages.map((i, idx) => (
                                      <span key={idx}>
                                        {i.languageName} <b>|</b>{' '}
                                      </span>
                                    ))}
                                </li>
                                <li>Validity {item.validity}</li>
                              </ul>
                              <div
                                className="a-rupeeDetails"
                                onClick={() => routerChange(item.id)}>
                                {(item.onSaleStatus === 0 &&
                                  item.saleType === 4 && (
                                    <p>
                                      <span>&#8377;</span> 0 /-
                                    </p>
                                  )) || (
                                  <p>
                                    <span>&#8377;</span>{' '}
                                    {item.discountPrice
                                      ? item.discountPrice
                                      : item.productPrice}{' '}
                                    /-
                                  </p>
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
                                    {item.saleType === 4 && (
                                      <span onClick={() => routerChange(item.id)}>UNLOCK FREE</span>
                                    )}
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
                      ))}
                  </ReactCarousel>
                </Carousel>
              ) : (
                <h4 style={{ marginLeft: '1rem', color: 'gray' }}>
                  No Package Found
                </h4>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  testPackages: selectWishListTest,
  practiceList: selectWishListPractice,
  quizList: selectWishListQuiz,
});

export default connect(mapStateToProps)(TestPackageWishList);
