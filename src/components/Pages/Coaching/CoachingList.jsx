import React, { useEffect, useState } from 'react';
import CoachingItem from './CoachingItem';
import JsonLd from './../../../utils/JsonLd';
import CardSkeleton from './../../../skeletons/CardSkeleton';

export default function CoachingList({ allCoaching }) {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    if (allCoaching) {
      let value = allCoaching.map((item) =>
        item.coachings.map((item) => {
          return {
            '@context': 'https://schema.org/',
            '@type': 'Product',
            name: item.coachingName,
            image: [item.banner === null ? '' : item.banner.bannerUrl],
            description: item.coachingName,
            sku: '0446310786',
            mpn: '925872',
            review: {
              '@type': 'Review',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: item.rating,
                bestRating: '5',
              },
            },
          };
        })
      );

      setDatas([...datas, value]);
    }
  }, [allCoaching]);

  return (
    <div className="a-coaching-list-cover">
      {allCoaching !== null ? (
        allCoaching.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              {item && (
                <CoachingItem
                  itemCoaching={item.coachings}
                  title={item.sectionName}
                />
              )}
            </React.Fragment>
          );
        })
      ) : (
          <div className="a-wrapper">
            <div className="a-container">
              <CardSkeleton />
            </div>
          </div>
        )}

      {/* {datas.length > 0 &&
        datas.map((item) =>
          item.map((el) => <JsonLd data={JSON.stringify(el)} />)
        )} */}
    </div>
  );
}
