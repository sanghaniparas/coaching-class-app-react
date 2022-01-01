import React, { useEffect, useState } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { LineArrow } from '../../Core/Layout/Icon';

export default function ExamType({
  examType,
  handleExamType,
  activeTabClass,
  handleAllData,
}) {
  const [filteredData, setFilteredData] = useState([]);
  const all = {
    examTypeId: 0,
    logoUrl: require('../../../assets/images/all.png'),
    sectionName: "All",
    section: examType.coachingPageCoachingSection
  }

  useEffect(() => {
    let value = examType.examTypeSection.map((item, idx) => {
      let result = examType.examTypeWiseCoachings.find(
        (el) => el.sectionName === item.sectionName
      );

      return {
        ...result,
        logoUrl: item.logoUrl,
      };
    });

    let finalData = value.filter((el) => el.sections.length > 0);
    finalData.unshift(all);
    setFilteredData(finalData);
  }, []);

  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <LineArrow /> : <LineArrow />;
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
    { width: 2, itemsToShow: 4, itemsToScroll: 1 },
    { width: 550, itemsToShow: 6, itemsToScroll: 1 },
    { width: 850, itemsToShow: 9, itemsToScroll: 1 },
    { width: 1120, itemsToShow: 11, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 11 },
    { width: 1750, itemsToShow: 11 },
  ];

  return (
    <div className="a-slider">
      <div className="a-listGroup">
        <div className="a-container">
          <div className="a-wrapper">
            <p className="a-exam-nameSlider">Choose Your Exam</p>
            <div className="a-listItemsTab">
              <Carousel heading="">
                <ReactCarousel
                  itemsToShow={11}
                  itemsToScroll={1}
                  breakPoints={breakPoints}
                  renderArrow={myArrow}>
                  {filteredData &&
                    filteredData.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={() => item.examTypeId ? handleExamType(item) : handleAllData(item)}
                        className={
                          activeTabClass === item.sectionName
                            ? 'tbMain activeTb'
                            : 'tbMain'
                        }>
                        {item !== null ? (
                          <img src={item.logoUrl} alt={item.sectionName} />
                        ) : (
                            <img
                              src={`https://via.placeholder.com/1920x340?text=${item.sliderName}`}
                              alt={item.sectionName}
                            />
                          )}
                        <p>{item.sectionName}</p>
                      </div>
                    ))}
                </ReactCarousel>
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
