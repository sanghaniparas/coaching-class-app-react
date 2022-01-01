import React, { useState, useEffect } from 'react';
import { BASE_URL } from './../config';
import axios from 'axios';

const useProductSchema = (id) => {
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
              '@type': 'Product',
              name: data.data[0].packageName,
              image: [data.data[0].packageImageUrl],
              description: data.data[0].seoDescriptions,
              brand: {
                '@type': 'Brand',
                name: data.data[0].coachings.coachingName,
              },
              review: {
                '@type': 'Review',
                reviewRating: {
                  '@type': 'Rating',
                  ratingValue: data.data[0].rating,
                  bestRating: data.data[0].maxRating,
                },
                author: {
                  '@type': 'Person',
                  name: data.data[0].maxRatingData?.student?.name,
                },
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: data.data[0].rating,
                reviewCount: data.data[0].ratingCount,
              },
              offers: {
                '@type': 'Offer',
                priceCurrency: 'INR',
                price:
                  data.data[0].discountPrice === null
                    ? data.data[0].productPrice
                    : data.data[0].discountPrice,
                priceValidUntil: data.data[0].expireDate,
                availability: 'https://schema.org/InStock',
              },
            };
          }
          setData(schema);
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [id]);

  return data;
};

export default useProductSchema;
