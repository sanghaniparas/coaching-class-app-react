import React, { useState, useEffect } from 'react';
import { BASE_URL } from './../config';
import axios from 'axios';

const useQuizSchema = (id) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (id) {
      (async function getProduct() {
        try {
          const { data } = await axios.get(
            `${BASE_URL}/googleSchema/quiz/${id}`
          );
          let schema;
          if (data.message === 'Google schema quiz data') {
            schema = {
              '@context': 'https://schema.org/',
              '@type': 'Product',
              name: data.data[0].quizName,
              image: [''],
              description: data.data[0].seoDesc,
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

export default useQuizSchema;
