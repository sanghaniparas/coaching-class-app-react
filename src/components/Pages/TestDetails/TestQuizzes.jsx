import React, { useEffect, useState } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import {
  Arrow,
  Heart,
  Location,
  Star,
  University,
} from '../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';

export default function TestQuizzes({ data }) {
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

  const history = useHistory();
  const routerPracticePageChange = (id) => {
    let path = `/quizdetails/${id}`;
    history.push(path);
  };
  return (
    <div className="test-quizzes">
      <div className="a-container">
        <div className="header-filter">
          <div className="left-content">
            <h2>Quizzes</h2>
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
                {/* <div className="a-wishlist">
                    <span>
                      <Heart />
                    </span>
                  </div> */}
                <span className="a-bggray">
                  <h4>{item.product_data.quizName}</h4>
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
                            {/* {item.rating.toFixed(1)} */}
                            {(item.product_data.rating &&
                              item.product_data.ratingCount.toFixed(1) > 2 &&
                              item.product_data.rating.toFixed(1)) ||
                              `-`}
                          </b>
                        )}

                        <b>
                          (
                          {item.product_data.ratingCount.toFixed(1) > 2
                            ? `${item.product_data.ratingCount} Ratings`
                            : `Not Rated`}
                          )
                        </b>
                      </div>
                    </div>
                    <p className="a-location">
                      <span>
                        <Location />
                      </span>{' '}
                      Kolkata, WEST BENGAL
                    </p>
                    <p className="a-typeExam">
                      {!item.product_data.examType
                        ? ''
                        : item.product_data.examType.examType}
                      {'  '}
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
                        {'  '}
                      </li>
                    </ul>
                    {item.product_data.isPublished === 1 &&
                    item.product_data.status === 5 ? (
                      <>
                        <div
                          className="a-detailsBtn"
                          onClick={() =>
                            routerPracticePageChange(item.product_data.id)
                          }>
                          <span>Start Quiz</span>
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
