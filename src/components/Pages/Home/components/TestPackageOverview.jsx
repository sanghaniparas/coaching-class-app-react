import React, { useState, useEffect } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../../Elements/Carousel';
import { Arrow, Heart, Star, University } from '../../../Core/Layout/Icon';
import TestPackageItem from './TestPackageItem';
import CardSkeleton from '../../../../skeletons/CardSkeleton';
import { Link } from 'react-router-dom';

const TestPackageOverview = ({ el, idx }) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timing = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timing);
  }, []);

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
    <div
      className={`a-wrapper ${
        idx % 2 ? 'ssc-section' : 'trending-now-section'
      } ${el.home_page_test_package_lists.length<4?'less-four':''}`}>
      <div className="a-container">
        <Link className="viewall" to={`/test-series-packages`}>
          View All
        </Link>
        {loading ? (
          <div style={{ margin: '2rem 0' }}>
            <CardSkeleton />
          </div>
        ) : (
          <Carousel heading={`${el.sectionName}`}>
            <ReactCarousel
              itemsToShow={4}
              itemsToScroll={1}
              breakPoints={breakPoints}
              renderArrow={myArrow}>
              {el.home_page_test_package_lists.map((item) => (
                <TestPackageItem item={item} arr={el} key={item.id}/>
              ))}
            </ReactCarousel>
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default TestPackageOverview;
