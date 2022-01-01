import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

import { LineArrow } from '../../Core/Layout/Icon';


export default function TestBannerBottom({ data }) {
  const [name, setName] = useState('Exam Details');
  const history = useHistory();
  console.log(data);

  const coachingCount = data.examDetails ? data.examDetails.examType.coachingExamType : 0;

  let splitFeaturedCoachingArr = data !== undefined  && coachingCount.length?
  coachingCount.length > 5 ? coachingCount.slice(0, 5) : coachingCount
  :[];

  
  console.log(splitFeaturedCoachingArr);

  const handleClick = (el) => {
    setName(el.id);
    if (el.productType === 1) {
      window.scrollTo({
        top: 700,
        behavior: 'smooth',
      });
    }
    if (el.productType === 2) {
      window.scrollTo({
        top: 1200,
        behavior: 'smooth',
      });
    }
    if (el.productType === 3) {
      window.scrollTo({
        top: 1700,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="banner-bottom-tab">
      <ul className="tab-items">
        <li>
          <div
            className={name === 'Exam Details' && 'activeTab'}
            onClick={() => {
              window.scrollTo({
                top: 200,
                behavior: 'smooth',
              });
              setName('Exam Details');
            }}>
            {' '}
            Exam Details
          </div>
        </li>
        {data.examPageSection.map((el) => (
          <li onClick={() => handleClick(el)}>
            <div className={name === el.id && 'activeTab'}>
              {' '}
              {el.sectionName}
            </div>
          </li>
        ))}
        <li>
          <div
            className={name === 'FAQ' && 'activeTab'}
            onClick={() => {
              window.scrollTo({
                top: 2200,
                behavior: 'smooth',
              });
              setName('FAQ');
            }}>
            {' '}
            FAQs
          </div>
        </li>
        <li>
          <div
            className={name === 'NEWS' && 'activeTab'}
            onClick={() => {
              window.scrollTo({
                top: 3200,
                behavior: 'smooth',
              });
              setName('NEWS');
            }}>
            {' '}
            News &amp; Updates
          </div>
        </li>
      </ul>
      <ul className="avatar-lists">
      
      {data !== undefined &&
         
          splitFeaturedCoachingArr.map((el) => (
            
            <li
              style={{ cursor: 'pointer' }}
              onClick={() => history.push(`/coaching/${el.coachingId}`)}>
                  <span>
                  {el.coaching.logoUrl === null ? (
                <img
                  src={`https://via.placeholder.com/40x40?text=${el.coaching.coachingName}`}
                  alt="profile pic"
                />
              ) : (
                <img src={`${el.coaching.logoUrl}`} alt="profile pic" />
              )}
                  </span>
           
            </li>
          ))}

         <a
        className="viewall"
        style={{ cursor: 'pointer' }}
        onClick={() => history.push('/coaching')}>
        View All <LineArrow fill="#000000" />{' '}
      </a>
      
      </ul>
    </div>
  );
}
