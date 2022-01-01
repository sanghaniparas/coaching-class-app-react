import React, { useState, useEffect } from 'react';
import { BASE_URL } from './../config';
import axios from 'axios';

const useReviewSchema = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      (async function getProduct() {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/googleSchema/package/${id}`
          );
          let schema;
          if (data.message === 'Google schema package data') {
            schema = {
              '@context': 'https://schema.org/',
              '@type': 'Review',
              itemReviewed: {
                '@type': 'Restaurant',
                image: data.data[0].packageImageUrl,
                name: data.data[0].packageName,
                priceRange:
                  data.data[0].discountPrice === null
                    ? data.data[0].productPrice
                    : data.data[0].discountPrice,
              },
              reviewRating: {
                '@type': 'Rating',
                ratingValue: data.data[0].rating,
              },
              name: data.data[0].maxRatingData?.review,
              author: {
                '@type': 'Person',
                name: data.data[0].maxRatingData?.student?.name,
              },
              reviewBody: data.data[0].maxRatingData?.review,
              publisher: {
                '@type': 'Organization',
                name: data.data[0].coachings.coachingName,
              },
            };
          }

          console.log(schema);
          setData(schema);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  return data;
};

export default useReviewSchema;
