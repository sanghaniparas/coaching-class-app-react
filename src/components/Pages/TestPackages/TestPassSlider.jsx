import React, { useState, useEffect }  from 'react';
import PassCard from '../Pass/PassCard';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow } from '../../Core/Layout/Icon';
import {filterPassType} from '../Global/Formatter';

export default function TestPassSlider({packagePassList}) {
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
    let i = []
    packagePassList.map((item)=>{
      item.passType.passTypeName && i.push({
        id: item.id,
        passName: item.passType.passTypeName,// need to clarify
        passImgName: filterPassType(item.passType.passTypeName),
        instName: item.coachings.coachingName,
        price: item.discountedPrice ?  item.discountedPrice : item.productPrice,
        month: item.passType.validity,
        passTypeId: 3
      });
    });
    setPassItems(i)
  }, []);

  console.log(packagePassList)

  return (
    
    <div className="testpass-slider-wrapper">
      {passItems && <div className="a-container"> 
        <Carousel heading={'Pass'} subheader={'Get your Pass today and explore new opportunities to reach at the top.'} title={'View more'}> 
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}>
            {
              passItems.map(item => (
             
                <PassCard key={item.id} item={item} />
              ))
            }
          </ReactCarousel>
        </Carousel>
      </div>}
    </div>
  )
}
