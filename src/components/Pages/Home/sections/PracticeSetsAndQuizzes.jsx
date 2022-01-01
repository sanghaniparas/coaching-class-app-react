import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import ReactCarousel, { consts } from 'react-elastic-carousel';

import Carousel from '../../Elements/Carousel';
import { Star, Location, Arrow } from '../../../Core/Layout/Icon.jsx';
import WideRange from './../../../../skeletons/WideRange';
import CardSkeleton from '../../../../skeletons/CardSkeleton';
import WideRangeItems from './../components/WideRangeItems';
import {
  selectPracticeTagList,
  selectQuizTagList,
  selectAllQuizList,
  selectAllPracticeList,
  selectPracticeSections,
  selectQuizSections,
} from './../../../../redux/homepage/homepage.selectors';

const PracticeSetsAndQuizzes = ({
  practiceTagList,
  quizTagList,
  practiceAllList,
  quizAllList,
  practiceSections,
  quizSections,
}) => {
  const [toggleTabs, setToggleTabs] = useState(false);
  const [data, setData] = useState([]);
  const [cardList, setCardList] = useState([]);
  const [selectType, setSelectType] = useState('');

  const [tagListId, setTagListId] = useState(-1);

  // monitoring toggletabs
  useEffect(() => {
    if (
      practiceAllList !== undefined &&
      practiceSections !== undefined &&
      quizAllList !== undefined &&
      quizSections !== undefined
    ) {
      if (toggleTabs === false) {
        let allList = {
          All: practiceAllList.map((el) => el),
        };
        let sectionList = practiceSections.map((el) => {
          return {
            [el.sectionName]: el.home_page_wide_range_practice_lists.map(
              (el) => el
            ),
          };
        });

        let arr = [allList, ...sectionList];
        setData(arr);
      } else {
        let allList = {
          All: quizAllList.map((el) => el),
        };

        let sectionList = quizSections.map((el) => {
          return {
            [el.sectionName]: el.home_page_wide_range_quiz_lists.map(
              (el) => el
            ),
          };
        });

        let arr = [allList, ...sectionList];
        setData(arr);
      }
    }
  }, [
    toggleTabs,
    practiceAllList,
    practiceSections,
    quizAllList,
    quizSections,
  ]);

  //   By default calling all
  useEffect(() => {
    if (data.length) {
      handleTypeClick('All');
    }
  }, [data, toggleTabs]);

  const handleTabClick = (val) => {
    setToggleTabs(val);
    setTagListId(-1);
  };

  const handleTypeClick = (el) => {
    setSelectType(el);
    let value = data.find((x) => Object.keys(x)[0] === el);
    setCardList(Object.values(value)[0]);
  };

  const handleTagListChange = (e) => {
    setTagListId(Number(e.target.value));
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
    { width: 850, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 3, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 3 },
    { width: 1750, itemsToShow: 3 },
  ];

  return (
    <>
      <div className="quizzes-section">
        <div className="a-container">
          <h2 className="text-center">
          Free to Appear Comprehensive Practice Chapters and Quizzes
          </h2>
          <p className="text-center">
          Apart from Test Series, you can avail our numerous Practice Sets and Quizzes to perform better in your final examination.          </p>
          <div className="quizzes-row">
            <div className="leftbar-list">
              {!data.length ? (
                <WideRange />
              ) : (
                  <>
                    <button
                      className={
                        !toggleTabs
                          ? 'btn-primary radius'
                          : 'btn-secondary-pill radius quiz-btn'
                      }
                      onClick={() => handleTabClick(false)}>
                      PRACTICE
                  </button>
                    <button
                      className={
                        toggleTabs
                          ? 'btn-primary radius'
                          : 'btn-secondary-pill radius quiz-btn'
                      }
                      onClick={() => handleTabClick(true)}>
                      QUIZ
                  </button>
                    <div className="quiz-lists">
                      <ul>
                        {data.length &&
                          data
                            .map((x) => Object.keys(x)[0])
                            .map((el) => (
                              <li onClick={() => handleTypeClick(el)} key={el}>
                                <a className={selectType === el && 'active'}>
                                  {el}
                                </a>
                              </li>
                            ))}
                      </ul>
                    </div>
                  </>
                )}
            </div>
            <div className="quizzes-slide">
              <div className="wide-range-select-wrap" style={{ cursor: 'pointer' }}>
                {practiceTagList !== undefined && quizTagList !== undefined && (
                  <select onChange={handleTagListChange} value={tagListId} style={{ cursor: 'pointer' }}>
                    <option selected disabled value={-1} >
                      Select
                    </option>
                    {!toggleTabs
                      ? practiceTagList.map((el) => (
                        <option value={el.practiceTagId} >
                          {el.practiceTagName}
                        </option>
                      ))
                      : quizTagList.map((el) => (
                        <option value={el.quizTagId}>{el.quizTagName}</option>
                      ))}
                  </select>
                )}
              </div>
              {!data.length ? (
                <CardSkeleton />
              ) : (
                  cardList.length === 0 ? <div className="a-nodata-Content">No Data Found </div> :
                  <Carousel heading={''}>
                    <ReactCarousel
                      itemsToShow={4}
                      itemsToScroll={1}
                      breakPoints={breakPoints}
                      renderArrow={myArrow}>
                      {tagListId === -1
                        ? 
                       
                        cardList.map((item, idx) => (
                         
                          <WideRangeItems item={item} idx={idx} key={idx}/>
                        ))
                        : 
                        cardList
                          .filter((el) => {
                            if (el.practiceTagId) {
                              return el.practiceTagId === tagListId;
                            }

                            if (el.quizTagId) {
                              return el.quizTagId === tagListId;
                            }
                          })
                          .map((item, idx) => (
                           
                            <WideRangeItems item={item} idx={idx} key={idx}/>

                          ))}
                    </ReactCarousel>
                  </Carousel>
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  practiceTagList: selectPracticeTagList,
  quizTagList: selectQuizTagList,
  practiceAllList: selectAllPracticeList,
  quizAllList: selectAllQuizList,
  practiceSections: selectPracticeSections,
  quizSections: selectQuizSections,
});

export default connect(mapStateToProps)(PracticeSetsAndQuizzes);
