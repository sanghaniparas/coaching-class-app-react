import React, { useState, useEffect } from 'react';
import PassCard from './PassCard';
import { filterPassType } from '../Global/Formatter';

import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow } from '../../Core/Layout/Icon';

const items = [
  {
    id: 1,
    passName: 'Sure Plus',
    passImgName: 'plus',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
  {
    id: 2,
    passName: 'Sure Pro',
    passImgName: 'pro',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
  {
    id: 3,
    passName: 'Sure Premium',
    passImgName: 'premium',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
  {
    id: 4,
    passName: 'Sure Plus 2',
    passImgName: 'plus',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
];

export default function PassSlider({
  recommendedPass,
  searchPassList,
  toggleSection,
  toggle,
}) {
  const [passItems, setPassItems] = useState('');
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

  useEffect(() => {
    console.log(recommendedPass);
    let itemList = [];
    if (searchPassList && searchPassList.length > 0) {
      searchPassList.map((item) => {
        item?.passType?.passTypeName &&
          itemList.push({
            id: item.passId,
            passName: item?.passType?.passTypeName,
            passImgName: filterPassType(item?.passType?.passTypeName),
            instName: item?.coachings?.coachingName,
            price: item?.discountedPrice,

            month: item?.passType?.validity,
            passTypeId: 3,
          });
      });
    }
    if (!searchPassList && recommendedPass !== undefined) {
      recommendedPass.map((item) => {
        item?.pass?.passType?.passTypeName &&
          itemList.push({
            id: item.passId,
            passName: item?.pass?.passType?.passTypeName,
            passImgName: filterPassType(item?.pass?.passType?.passTypeName),
            instName: item?.coachingMaster?.coachingName,
            price: item?.pass?.discountedPrice
              ? item?.pass?.discountedPrice
              : item?.pass?.productPrice,
            month: item?.pass?.passType?.validity,
            passTypeId: 3,
          });
      });
    }

    setPassItems(itemList);
  }, [recommendedPass, searchPassList]);
  return (
    <div className="a-wrapper pass-slider-wrapper">
      {passItems && (
        <div className="a-container">
          <Carousel
            heading={`Recommened Pass (or based on search: ${
              passItems ? passItems.length : 0
            } Results)`}>
            {passItems.length === 0 ? (
              <div className="a-nodata-Content" style={{ height: '180px' }}>
                No Passes Available
              </div>
            ) : (
              <ReactCarousel
                itemsToShow={4}
                itemsToScroll={1}
                breakPoints={breakPoints}
                renderArrow={myArrow}>
                {passItems.map((item, idx) => {
                  return <PassCard key={item.id} item={item} key={idx} />;
                })}
              </ReactCarousel>
            )}
          </Carousel>
          <span className="toggleSimilarPass" onClick={toggleSection}>
            Similar passes from different coaching{' '}
            {toggle ? (
              <i class="fas fa-chevron-up"></i>
            ) : (
              <i class="fas fa-chevron-down"></i>
            )}
          </span>
        </div>
      )}
    </div>
  );
}
