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
  {
    id: 5,
    passName: 'Sure Pro',
    passImgName: 'pro',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
  {
    id: 6,
    passName: 'Sure Premium',
    passImgName: 'premium',
    instName: 'Akash Institute, New Delhi',
    price: '450',
    month: '12 Months',
  },
];

export default function PassBodyContent({ searchSimilarPassList }) {
  const [passSimilarItems, setSimilarPassItems] = useState('');
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
    let itemList = [];
    if (searchSimilarPassList && searchSimilarPassList.length > 0) {
      searchSimilarPassList.map((item) => {
        itemList.push({
          id: item.passId,
          passName: item?.passType?.passTypeName,
          passImgName: filterPassType(item?.passType?.passTypeName),
          instName: item?.coachings?.coachingName,
          price: item?.discountedPrice,
          //   ?  item?.pass?.discountedPrice : item?.pass?.productPrice,
          month: item?.passType?.validity,
          passTypeId: 3,
        });
      });
    }
    setSimilarPassItems(itemList);
  }, [searchSimilarPassList]);
  return (
    <div className="pass-body light-grey-bg ">
      <div className="a-container">
        {passSimilarItems &&
          passSimilarItems.map((item) => (
            <PassCard key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
}
