import React from 'react';
import { Link } from 'react-router-dom';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow, Heart, Star, Location } from '../../Core/Layout/Icon';
import { ToolTip } from './../../Core/Layout/Tooltip/ToolTip';

export default function CoachingItem({ itemCoaching, title }) {
  console.log(title);

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
    <div className="a-wrapper">
      <div className="a-container">
        <Carousel heading={title}>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {itemCoaching.map((item, idx) => (
              <Link
                to={item.status !== 1 ? `/coaching` : `/coaching/${item.id}`}
                className={`a-carousel-item ${item.status !== 1 && 'card-disabled'
                  }`}
                key={idx}>
                {/* <div className="a-wishlist">
                  <span>
                    <Heart />
                  </span>
                </div> */}
                {item.banner !== null ? (
                  <span
                    style={{
                      backgroundImage: `url(${item.banner.bannerUrl})`,
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
                          {item.logoUrl !== null ? (
                            <span
                              style={{
                                backgroundImage: `url(${item.logoUrl})`,
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
                          </span>{' '}
                          {(item.rating &&
                            item.totalRatingCount.toFixed(1) > 2 &&
                            item.rating.toFixed(1)) ||
                            `-`}
                        </b>

                        <b>
                          (
                          {item.totalRatingCount.toFixed(1) > 2
                            ? `${item.totalRatingCount} Ratings`
                            : `Not Rated`}
                          )
                        </b>

                        {/* { item.rating !== 0  &&
                          <b>
                          <span>
                            <Star />
                          </span>{' '}
                          {item.rating.toFixed(1)}
                          </b>
                        }
                        { item.rating !== 0  &&
                         <b>({item.totalRatingCount} Ratings)</b>
                        } */}
                      </div>
                    </div>
                    <p className="a-location">
                      <span>
                        <Location />
                      </span>{' '}
                      {item.city.city}, {item.state.name}
                    </p>
                    <div className="a-typeExam p-item">
                      {item.examTypes.length <= 2 ? (
                        item.examTypes.map((i, idx) => (
                          <React.Fragment key={idx}>
                            {i.examType}{' '}
                            {idx !== item.examTypes.length - 1 ? ',' : ''}{' '}
                          </React.Fragment>
                        ))
                      ) : (
                          <div>
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
                          </div>
                        )}
                    </div>
                  </div>
                  <div className="a-itemGroup">
                    <div className="a-itemsGp">
                      {/* <h6>
                        {item.testPackageCount === 0
                          ? 0
                          : item.testPackageCount - 1}
                        +
                      </h6> */}
                      {countFormat(item.testPackageCount)}
                      <p>Test</p>
                    </div>
                    <div className="a-itemsGp">
                      {countFormat(item.studentCount)}
                      <p>Students</p>
                    </div>
                    <div className="a-itemsGp">
                      {countFormat(item.totalFollowers)}
                      <p>Followers</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </ReactCarousel>
        </Carousel>
      </div>
    </div>
  );
}
