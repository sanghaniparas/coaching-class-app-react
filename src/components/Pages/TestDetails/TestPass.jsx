import React, { useState, useEffect } from 'react';
import PassCard from '../Pass/PassCard';

import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow } from '../../Core/Layout/Icon';

export default function TestPass({ data }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    let arr = data.examPagePassList
      .filter((el) => el.pass !== null)
      .map((el) => {
        let name;
        if (el.pass.passTypeId === 2) name = 'Plus';
        if (el.pass.passTypeId === 3) name = 'Pro';
        if (el.pass.passTypeId === 4) name = 'Premium';
        return {
          passName: el.pass.passType.passTypeName,
          passImgName: name,
          instName: el.coaching.coachingName,
          price: el.pass.discountedPrice,
          month: el.pass.passType.validity,
          id: el.passId,
          passTypeId: el.pass.passTypeId,
        };
      });

    setItems(arr);
  }, [data]);

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
   
    <div className="a-wrapper pass-slider-wrapper">
      <div className="a-container">
      {items && items.length > 0 ? 
        <Carousel heading={' Pass '}>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {items.map((item) => (
              <PassCard key={item.id} item={item} />
            ))}
          </ReactCarousel>
        </Carousel>
        : null}
      </div>
    </div>
  );
}
