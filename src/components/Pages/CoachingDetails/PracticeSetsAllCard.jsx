import React, { Fragment, useState, useEffect } from 'react';
import { Heart, Star, Location, HeartFill } from '../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';
import { University, ArrowDown } from './../../Core/Layout/Icon';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import { Link } from 'react-router-dom';

const PracticeSetsAllCard = ({ practisePage, pageDetails, cardItemNumber, incrementItemNumber }) => {
  const [inWishList, setInWishList] = useState([]);
  const [counter, setCounter] = useState(0);
  const [showMore, setIsShowMore] = useState(false);
  const [dataList, setDataList] = useState([]);
  const history = useHistory();
  const routerPracticePageChange = (id) => {
    let path = `/practice-details/${id}`;
    history.push(path);
  };

  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {
      practisePage.length &&
        practisePage.map((el) =>
          el.objectList.map((el) => checkInWishList(el.id))
        );
    }
    let splitObject = practisePage[0].objectList.slice(0, cardItemNumber);
    let isShowMore = practisePage[0].objectList.length > splitObject.length?true:false;
    setIsShowMore(isShowMore);
    setCounter(splitObject.length);
    setDataList(splitObject);
  }, [practisePage]);

  //   To check which test package is in whishlist and storing it
  const checkInWishList = async (id) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };
    const body = JSON.stringify({
      itemType: '2',
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
      itemType: '2',
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
  const viewMore = (e) => {
    e.preventDefault();
    let incrementCounter = counter+incrementItemNumber;
    let splitViewMoreObject = practisePage[0].objectList.slice(0, incrementCounter);
    let isShowViewMore = practisePage[0].objectList.length > splitViewMoreObject.length?true:false;
    setIsShowMore(isShowViewMore);
    setCounter(splitViewMoreObject.length);
    setDataList(splitViewMoreObject);
  }
  return (
    <div className="a-wrapping-Content  ultra-ligh-grey-bg innerTabPages">
      <div className="a-wrapper">
        <div className="a-container">
          <div className="a-trending flex-width new-flex">
            {practisePage &&
              practisePage.map((item, idx) => (
                <Fragment key={idx}>
                  {item &&
                    dataList.map((innerItem, ids) => (
                      <div className="a-carousel-item" key={ids}>
                        {localStorage.getItem('token') !== '' &&
                          localStorage.getItem('token') !== null && (
                            <div className="a-wishlist">
                              {inWishList.length &&
                              inWishList.find((w) => w.id === innerItem.id)
                                ?.have === 1 ? (
                                <span
                                  onClick={() => handleWishList(innerItem.id)}>
                                  <HeartFill />
                                </span>
                              ) : (
                                <span
                                  onClick={() => handleWishList(innerItem.id)}>
                                  <Heart />
                                </span>
                              )}
                            </div>
                          )}
                        <span className="a-bggray">
                          <h4>{innerItem.setName}</h4>
                          <p>Attempted by {innerItem.totalAttempt}</p>
                        </span>

                        <div className="a-listItem">
                          <div className="a-listTop">
                            <div className="a-itemHead">
                              <h4>{innerItem.coaching.coachingName}</h4>
                              <div className="a-ratingandstars">
                                <div className="a-avatarProfile">
                                  {innerItem.coaching.logoUrl !== null ? (
                                    <span
                                      style={{
                                        backgroundImage: `url(${innerItem.coaching.logoUrl})`,
                                      }}></span>
                                  ) : (
                                    <span
                                      style={{
                                        backgroundImage: `url('https://via.placeholder.com/40x40?text=${innerItem.coaching.coachingName}')`,
                                      }}></span>
                                  )}
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
                                    {item.rating.toFixed(1)}
                                  </b>
                                )}

                                <b>({innerItem.ratingCount} Ratings)</b>
                              </div>
                            </div>

                            <p className="a-location">
                              <span>
                                <Location />
                              </span>{' '}
                              {pageDetails.city.city}, {pageDetails.state.name}
                            </p>

                            <p className="a-typeExam">
                              {!innerItem.examType
                                ? ''
                                : innerItem.examType.examType}
                              {'  '}
                            </p>

                            <ul className="a-optionDetails">
                              <li>Total Chapter: {innerItem.chapterCount}</li>
                              <li>
                                Total Questions: {innerItem.questionCount}
                              </li>
                              <li>
                                {!innerItem.language
                                  ? ''
                                  : innerItem.language.languageName}
                                {'  '}
                              </li>
                            </ul>

                            {innerItem.isPublished === 1 &&
                            innerItem.status === 5 ? (
                              <>
                                <div
                                  className="a-detailsBtn"
                                  onClick={() =>
                                    routerPracticePageChange(innerItem.id)
                                  }>
                                  <span>Start Practice</span>
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="a-detailsBtn">
                                  <button
                                    className="disabled btn-primary radius btn-block"
                                    type="button"
                                    disabled>
                                    UNAVAILABLE
                                  </button>
                                </div>
                              </>
                            )}
                            {/* <div className="a-detailsBtn">
                              <button
                                className="disabled btn-primary radius btn-block"
                                type="button"
                                disabled>
                                COMING SOON
                              </button>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    ))}
                </Fragment>
              ))}
          </div>
          {
            showMore && <p className="viewmore"><Link to="" onClick={(e) => viewMore(e)}>View More <ArrowDown /></Link></p>
          }
        </div>
      </div>
    </div>
  );
};

export default PracticeSetsAllCard;
