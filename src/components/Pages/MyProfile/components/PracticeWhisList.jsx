import React, { useEffect, useState } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import { Arrow } from '../../../Core/Layout/Icon';
import Carousel from './../../Elements/Carousel';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import {
  selectWishListPractice,
  selectWishListQuiz,
} from './../../../../redux/MyProfile/profile.selectors';
import PracticeItem from './PracticeItem';
import QuizItem from './QuizItem';

const PracticeWhisList = ({ practiceList, quizList }) => {
  const [combineList, setCombineList] = useState([]);

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

  useEffect(() => {
    if (practiceList !== null && quizList !== null) {
      setCombineList(shuffle([...practiceList.data, ...quizList.data]));
    }
  }, [practiceList, quizList]);

  //   For shuffiling the given array of practice & quiz
  const shuffle = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  useEffect(() => {
    console.log("wishlist ***", combineList);
  }, [combineList]);
  return combineList.length ? (
    <div className="practice-whislist-wrapper">
      <div className="header-filter">
        <div className="left-content">
          <h3>Practice & Quiz</h3>
          <p>You can remove or filter packages by category</p>
        </div>
      </div>
      <div className="testpackages-filterwise ">
        <div className="a-container">
          <Carousel heading={''}>
            <ReactCarousel
              itemsToShow={3}
              itemsToScroll={1}
              breakPoints={breakPoints}
              renderArrow={myArrow}
              style={{ cursor: 'pointer' }}>
              {combineList.map((item) =>
                item.productType === 2 ? (
                  <PracticeItem item={item} />
                ) : (
                    <QuizItem item={item} />
                  )
              )}
            </ReactCarousel>
          </Carousel>
        </div>
      </div>
    </div>
  ) : (
      <div className="practice-whislist-wrapper">
        <div className="header-filter">
          <div className="left-content">
            <h3>Practice & Quiz</h3>
            <div className="a-container">
              <p>No Practice set and quiz found</p>
            </div>

          </div>
        </div>
      </div>


    );
};

const mapStateToProps = createStructuredSelector({
  practiceList: selectWishListPractice,
  quizList: selectWishListQuiz,
});

export default connect(mapStateToProps)(PracticeWhisList);
