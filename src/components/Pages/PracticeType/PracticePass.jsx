import React, { useState, useEffect } from 'react';
import PassCard from '../Pass/PassCard';
import { filterPassType } from '../Global/Formatter';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow } from '../../Core/Layout/Icon';

export default function PracticePass({ practicePassList }) {
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
    let i = [];
    practicePassList.map((item) => {
      i.push({
        id: item.passes.passId,
        passName: item.passes.passTypeName,
        passImgName: filterPassType(item.passes.passTypeName),
        instName: item.examTypeName,
        price: item.passes.passDiscountedPrice
          ? item.passes.passDiscountedPrice
          : item.passes.passPrice,
        month: item.passes.passTypeValidity,
        passTypeId: 3,
        coachingName: item.coachings.coachingName,
      });
    });
    setPassItems(i);

    console.log(passItems)
  }, []);

  useEffect(() => {
    console.log(practicePassList);
  }, [practicePassList]);
  return (
    passItems || passItems!=="" && (
    <div className="a-wrapper pass-slider-wrapper">
     
        <div className="a-container">
          <Carousel
            heading={'Pass'}
            subheader={'How share to unlocks works?'}>
            <ReactCarousel
              itemsToShow={4}
              itemsToScroll={1}
              breakPoints={breakPoints}
              renderArrow={myArrow}>
              {passItems.map((item) => (
                <PassCard key={item.id} item={item} />
              ))}
            </ReactCarousel>
          </Carousel>
        </div>
     
    </div>
    )
  );
}
