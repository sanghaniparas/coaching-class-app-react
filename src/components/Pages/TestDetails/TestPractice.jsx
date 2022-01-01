import React, { useState, useEffect } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import {
  Arrow,
  Heart,
  Location,
  Star,
  University,
  HeartFill,
} from '../../Core/Layout/Icon';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import { useHistory } from 'react-router-dom';

export default function TestPractice({ data }) {
  const [inWishList, setInWishList] = useState([]);
  const history = useHistory();

  const [tagId, setTagId] = useState(null);
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    setTagId(data.product_lists[0].tagId);
  }, [data]);

  useEffect(() => {
    if (tagId) {
      setNewData(data.product_lists.filter((el) => el.tagId === tagId));
    }
  }, [data, tagId]);

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

  const routerPracticePageChange = (id) => {
    let path = `/practice-details/${id}`;
    history.push(path);
  };

  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {
      data.length && data.product_lists.map((el) => checkInWishList(el.id));
    }
  }, [data]);

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

  return (
    <div className="test-practice bg-img">
      <div className="a-container">
        <div className="header-filter">
          <div className="left-content">
            <h2>Practice</h2>
          </div>
          <div className="filter-group">
            <select
              name=""
              id=""
              className="bd-orange"
              value={tagId}
              onChange={(e) => setTagId(Number(e.target.value))}>
              {data.product_lists.map((x) => (
                <option value={x.tag_data.id}>{x.tag_data.tagName}</option>
              ))}
            </select>
          </div>
        </div>

        <Carousel heading={''}>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {newData.map((item) => (
              <div className="a-carousel-item" key={item}>
                {/* {localStorage.getItem('token') !== '' &&
                  localStorage.getItem('token') !== null && (
                    <div className="a-wishlist">
                      {inWishList.length &&
                      inWishList.find((w) => w.id === item.product_data.id)
                        ?.have === 1 ? (
                        <span
                          onClick={() => handleWishList(item.product_data.id)}>
                          <HeartFill />
                        </span>
                      ) : (
                        <span
                          onClick={() => handleWishList(item.product_data.id)}>
                          <Heart />
                        </span>
                      )}
                    </div>
                  )} */}
                <span className="a-bggray">
                  <h4>{item.product_data.setName}</h4>
                  <p>Attempted by {item.product_data.totalAttempt}</p>
                </span>
                <div className="a-listItem">
                  <div className="a-listTop">
                    <div className="a-itemHead">
                      <h4>{item.product_data.coaching.coachingName}</h4>
                      <div className="a-ratingandstars">
                        <div className="a-avatarProfile">
                          {item.product_data.coaching.logoUrl !== null ? (
                            <span
                              style={{
                                backgroundImage: `url(${item.product_data.coaching.logoUrl})`,
                              }}></span>
                          ) : (
                            <span
                              style={{
                                backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.product_data.coaching.coachingName}')`,
                              }}></span>
                          )}
                        </div>
                        {!item.product_data.rating ? (
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
                            {item.product_data.rating.toFixed(1)}
                          </b>
                        )}

                        <b>({item.product_data.ratingCount} Ratings)</b>
                      </div>
                    </div>
                    <p className="a-location">
                      <span>
                        <Location />
                      </span>{' '}
                      Kolkata, West Bengal
                    </p>
                    <p className="a-typeExam">
                      {' '}
                      {!item.product_data.examType
                        ? ''
                        : item.product_data.examType.examType}
                    </p>
                    <ul className="a-optionDetails">
                      <li>Total Chapter: {item.product_data.chapterCount}</li>
                      <li>
                        Total Questions: {item.product_data.questionCount}
                      </li>
                      <li>
                        {!item.product_data.language
                          ? ''
                          : item.product_data.language.languageName}
                      </li>
                    </ul>
                    {item.product_data.isPublished === 1 &&
                    item.product_data.status === 5 ? (
                      <>
                        <div
                          className="a-detailsBtn"
                          onClick={() => routerPracticePageChange(item.id)}>
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
                  </div>
                </div>
              </div>
            ))}
          </ReactCarousel>
        </Carousel>
      </div>
    </div>
  );
}
