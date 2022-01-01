import React, { useState } from 'react'
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { ToolTip } from './../../Core/Layout/Tooltip/ToolTip';
import { Arrow, Heart, LineArrow, Location, Search, Star } from '../../Core/Layout/Icon';
import { useHistory } from 'react-router-dom';


export default function PassPopular({ title, itemCoaching }) {
  // console.log("");
  const history = useHistory();



  // const [displayPracticePopular, setDisplayPracticePopular] = useState(itemCoaching);
  // const filterChange = (event) =>  {
  //   if(event.target.value){
  //     setDisplayPracticePopular(itemCoaching.filter((item)=>item.coachingMaster.examTypeId == event.target.value));
  //   }else{
  //     setDisplayPracticePopular(itemCoaching);
  //   }
  // }
  console.log('itemCoaching', itemCoaching);
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
    { width: 700, itemsToShow: 3, itemsToScroll: 1 },
    { width: 850, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];
  const countFormat = (countItem) => (
    <h6>{countItem < 2 ? countItem : `${countItem - 1}+`}</h6>
  );
  return (
    <>
   { itemCoaching && itemCoaching.length > 0 &&  <div className="poplar-coaching">
      <div className="a-wrapper">
        <div className="a-container">
          <div className="header-filter">
            <div className="left-content">
              <h2>{title}</h2>
            </div>
          </div>
          <Carousel heading={''}>
            <ReactCarousel
              itemsToShow={4}
              itemsToScroll={1}
              breakPoints={breakPoints}
              renderArrow={myArrow}>
              {itemCoaching && itemCoaching.map((item, idx) => (
                <div className="a-carousel-item" key={idx} onClick={() => history.push('/coaching/' + item.coachingMaster.id)}>

                  {item.coachingMaster.coachingBanner !== null ? (
                    <span
                      style={{
                        backgroundImage: `url(${item.coachingMaster.coachingBanner})`,
                      }}></span>
                  ) : (
                      <span
                        style={{
                          backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.coachingMaster.coachingName}')`,
                        }}>
                      </span>
                    )}
                  <div className="a-listItem">
                    <div className="a-listTop">
                      <div className="a-itemHead">
                        <h4>
                          {item.coachingMaster.coachingName.length > 36
                            ? `${item.coachingMaster.coachingName.substring(0, 36)} ...`
                            : item.coachingMaster.coachingName}
                        </h4>
                        <div className="a-ratingandstars">
                          <div className="a-avatarProfile">
                            <span style={{ backgroundImage: `url(${item.coachingMaster.logoUrl})` }}></span>
                          </div>
                          <b>
                            <span>
                              <Star />
                            </span>{' '}
                            {(item.coachingMaster.rating &&
                              item.coachingMaster.totalRatingCount.toFixed(1) > 2 &&
                              item.coachingMaster.rating.toFixed(1)) ||
                              `-`}
                          </b>

                          <b>
                            (
                          {item.coachingMaster.totalRatingCount.toFixed(1) > 2
                              ? `${item.coachingMaster.totalRatingCount} Ratings`
                              : `Not Rated`}
                          )
                        </b>
                        </div>
                      </div>
                      <p className="a-location">
                        <span>
                          <Location />
                        </span>
                        {item.coachingMaster?.city?.city}, {item.coachingMaster?.state?.name}
                      </p>
                      <p className="a-typeExam">
                        {item.coachingMaster.examTypes.length <= 3 ? (
                          item.coachingMaster.examTypes.map((i, idx) => (
                            <React.Fragment key={idx}>
                              {i.examType}{' '}
                              {idx !== item.coachingMaster.examTypes.length - 1 ? ', ' : ''}{' '}
                            </React.Fragment>
                          ))
                        ) : (
                            <div>
                              {item.coachingMaster.examTypes.slice(0, 3).map((i, idx) => (
                                <React.Fragment key={idx}>
                                  {i.examType}{' '}
                                  {idx !== item.coachingMaster.examTypes.slice(0, 3).length - 1
                                    ? ', '
                                    : ''}{' '}
                                </React.Fragment>
                              ))}

                              <ToolTip
                                message={`${item.coachingMaster.examTypes
                                  .slice(3)
                                  .map((el) => el.examType)} `}
                                position={'top'}>
                                <p>
                                  {'+'}
                                  {item.coachingMaster.examTypes
                                    .slice(3)
                                    .reduce((acc, current) => acc + 1, 0)}
                                </p>
                              </ToolTip>
                            </div>
                          )}
                      </p>
                    </div>
                    <div className="a-itemGroup">
                      <div className="a-itemsGp">
                        {countFormat(item.coachingMaster.totalTest || 0)}
                        <p>Test</p>
                      </div>
                      <div className="a-itemsGp">
                        {countFormat(item.coachingMaster.totalStudents || 0)}
                        <p>Students</p>
                      </div>
                      <div className="a-itemsGp">
                        {countFormat(item.coachingMaster.totalFollowers || 0)}
                        <p>Followers</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
              }
            </ReactCarousel>
          </Carousel>
        </div>
      </div>
    </div>

  }
   </>
  )
}
