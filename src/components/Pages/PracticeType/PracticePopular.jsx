import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import {
  Arrow,
  Heart,
  LineArrow,
  Location,
  Search,
  Star,
} from '../../Core/Layout/Icon';

export default function PracticePopular({
  title,
  itemCoaching,
  practicePopuparExamType,
}) {
  const history = useHistory();

  const [displayPracticePopular, setDisplayPracticePopular] = useState(
    itemCoaching
  );
  const filterChange = (event) => {
    if (event.target.value) {
      setDisplayPracticePopular(
        itemCoaching.filter((item) => item.examTypeId == event.target.value)
      );
    } else {
      setDisplayPracticePopular(itemCoaching);
    }
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
  const countFormat = (countItem) => (
    <h6>{countItem < 2 ? countItem : `${countItem - 1}+`}</h6>
  );
  return (
    <div className="poplar-coaching">
      <div className="a-wrapper">
        <div className="a-container">
          <div className="header-filter">
            <div className="left-content">
              <h2>{title}</h2>
            </div>
            <div className="filter-group">
              <span>Filter by</span>
              <select name="" id="" onChange={(event) => filterChange(event)}>
                <option value="">All Exams</option>
                {practicePopuparExamType.map((el, idx) => (
                  <option key={idx} value={el.id}>
                    {el.examType}
                  </option>
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
              {displayPracticePopular &&
                displayPracticePopular.map((item, idx) => (
                  <div
                    onClick={() => history.push(`/coaching/${item.coachingId}`)}
                    style={{ cursor: 'pointer' }}
                    className="a-carousel-item"
                    key={idx}>
                    {item.coachingBannerUrl !== null ? (
                      <span
                        style={{
                          backgroundImage: `url(${item.coachingBannerUrl})`,
                        }}></span>
                    ) : (
                      <span
                        style={{
                          backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.coachingName}')`,
                        }}></span>
                    )}

                    <div className="a-listItem">
                      <div className="a-listTop">
                        <div className="a-itemHead">
                          <h4>{item.coachingName}</h4>
                          <div className="a-ratingandstars">
                            <div className="a-avatarProfile">
                              {item.coachingLogoUrl !== null ? (
                                <span
                                  style={{
                                    backgroundImage: `url(${item.coachingLogoUrl})`,
                                  }}></span>
                              ) : (
                                <span
                                  style={{
                                    backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coachingName}')`,
                                  }}></span>
                              )}
                            </div>
                            <b>
                              <span>
                                <Star />
                              </span>
                              {item.coachingRatingCount >= 3
                                ? item.coachingRating.toFixed(1)
                                : '-'}
                            </b>
                            <b>
                              {item.coachingRatingCount >= 3
                                ? `${item.coachingRatingCount} Ratings`
                                : `(Not Rated)`}
                            </b>
                          </div>
                        </div>
                        <p className="a-location">
                          <span>
                            <Location />
                          </span>
                          {item.cityName}, {item.stateName}
                        </p>
                        <p className="a-typeExam">
                          <p>{item.examTypeName}</p>
                        </p>
                      </div>
                      <div className="a-itemGroup">
                        <div className="a-itemsGp">
                          {countFormat(item.coachingTestCount || 0)  || 0}
                          <p>Test</p>
                        </div>
                        <div className="a-itemsGp">
                          {countFormat(item.coachingStudentCount || 0) || 0}
                          <p>Students</p>
                        </div>
                        <div className="a-itemsGp">
                          {countFormat(item.coachingFollowersCount || 0) || 0}
                          <p>Followers</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </ReactCarousel>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
