import React from 'react';
import { useHistory } from 'react-router-dom';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow, Heart, Star, Location } from '../../Core/Layout/Icon';
import { ToolTip } from './../../Core/Layout/Tooltip/ToolTip';
import { University } from './../../Core/Layout/Icon';

export default function AboutRelated({ dataCarousel }) {
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
    let path = `/coaching/${id}`;
    history.push(path);
    window.location.reload();
  };

  return (
    <div className="about-Related-carousel">
      <div className="a-container">
        <Carousel heading="">
          <h3 style={{ marginBottom: '20px' }}>Related Coachings</h3>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {dataCarousel &&
              dataCarousel.map((item, idx) => (
                <div className="a-carousel-item" key={idx}>
                  {/* <div className="a-wishlist">
                    <span>
                      <Heart />
                    </span>
                  </div> */}
                  {item.coachingBanner !== null ? (
                    <span
                      style={{
                        backgroundImage: `url(${item.coachingBanner})`,
                      }}></span>
                  ) : (
                    <span
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.coachingName}')`,
                      }}></span>
                  )}
                  <div className="a-listItem streach">
                    <div className="a-listTop">
                      <div className="a-itemHead">
                        <h4>
                          {item.coachingName.length > 36
                            ? `${item.coachingName.substring(0, 36)} ...`
                            : item.coachingName}
                        </h4>
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
                              {/* {item.rating.toFixed(1)} */}
                              {(item.rating &&
                                  item.totalRatingCount.toFixed(1) > 2 &&
                                  item.rating.toFixed(1)) ||
                                  `-`}
                            </b>
                          )}
                          <b>
                            (
                            {item.totalRatingCount &&
                            item.totalRatingCount.toFixed(1) > 2
                              ? `${item.totalRatingCount} Ratings`
                              : `Not Rated`}
                            )
                          </b>
                        </div>
                      </div>
                      <p className="a-location">
                        <span>
                          <Location />
                        </span>{' '}
                        {item?.city?.city}, {item?.state?.name}
                      </p>
                      <p className="a-typeExam p-item">
                        {item.examTypes.length <= 3 ? (
                          item.examTypes.map((i, idx) => (
                            <React.Fragment key={idx}>
                              {i.examType}{' '}
                              {idx !== item.examTypes.length - 1 ? ',' : ''}{' '}
                            </React.Fragment>
                          ))
                        ) : (
                          <div>
                            {item.examTypes.slice(0, 3).map((i, idx) => (
                              <React.Fragment key={idx}>
                                {i.examType}{' '}
                                {idx !== item.examTypes.slice(0, 3).length - 1
                                  ? ','
                                  : ''}{' '}
                              </React.Fragment>
                            ))}

                            <ToolTip
                              message={`${item.examTypes
                                .slice(3)
                                .map((el) => el.examType)} `}
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
                      </p>
                      <div className="a-itemGroup">
                        <div className="a-itemsGp">
                          <h6>
                            {item.studentCount > 1
                              ? `${item.studentCount - 1} +`
                              : item.studentCount || 0}
                          </h6>
                          <p>Students</p>
                        </div>
                        <div className="a-itemsGp">
                          <h6>
                            {item.totalFollowers > 1
                              ? `${item.totalFollowers - 1} +`
                              : item.totalFollowers || 0}
                          </h6>
                          <p>Followers</p>
                        </div>
                        <div className="a-itemsGp">
                          <span
                            className="btn-primary"
                            onClick={() => routerChange(item.id)}>
                            VIEW
                          </span>
                        </div>
                      </div>
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
