import React from 'react'
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow, Heart, Star, University } from '../../Core/Layout/Icon';

export default function TestSeriesTest() {
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
  return (
    <div className="grey-bg-box test-series-test">
      <div className="a-container">
        <div className="header-filter">
          <div className="left-content">
            <h2>Test Series</h2>
          </div>
          <div className="filter-group">
            <select name="" id="" className="bd-orange">
              <option value="">Trending</option>
            </select>
          </div>
        </div>
        <Carousel heading={''}>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div className="a-carousel-item" key={item}>
                <div className="a-wishlist">
                  <span>
                    <Heart />
                  </span>
                </div>
                <span
                  style={{
                    backgroundImage: `url('https://via.placeholder.com/272x150')`,
                  }}></span>
                <div className="a-listItem">
                  <div className="a-listTop">
                    <div className="a-itemHead">
                      <h4>Admisure internal Coaching</h4>
                      <div className="a-ratingandstars">
                        <div className="a-avatarProfile">
                          <span
                            style={{
                              backgroundImage: `url('https://via.placeholder.com/40x40')`,
                            }}></span>
                        </div>
                        <b>
                          <span>
                            <Star />
                          </span>{' '}
                          4.25
                        </b>
                        <b>(500 Ratings)</b>
                      </div>
                    </div>
                    <p className="a-university">
                      <span>
                        <University />
                      </span>
                      Sharma Institute
                    </p>
                    <p className="a-typeExam">Railway &amp; Insurance</p>
                    <ul className="a-optionDetails">
                      <li>No of Tests: 30</li>
                      <li>20 Full length + 10 Short length</li>
                      <li>Hindi | English</li>
                      <li>Validity 1 Year</li>
                    </ul>
                    <div className="a-rupeeDetails">
                      <p>
                        {' '}
                        <span>&#8377;</span> 480.50/-
                      </p>
                    </div>
                    <div className="a-detailsBtn">
                      <span>Share &amp; Unlock</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </ReactCarousel>
        </Carousel>
      </div>
    </div>
  )
}
