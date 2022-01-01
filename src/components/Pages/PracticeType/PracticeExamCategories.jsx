import React from 'react';
import { Link } from 'react-router-dom';
import PopularCoachingSkeleton from './../../../skeletons/PopularCoachingSkeleton';
//import PopularCoachingSkeleton from './../../../skeletons/PopularCoachingSkeleton';

export default function PracticeExamCategories({ popularCoachings, famous = true }) {
  console.log(popularCoachings)
  return (
    <div className="a-coaching-popular-list">
      {!famous ? (
        <div className="a-container">
          {popularCoachings === null ? (
            <PopularCoachingSkeleton />
          ) : (
            <div className="a-wrapper a-topFooter">
              <h4 style={{textTransform: 'capitalize'}}>
                {popularCoachings[0].catName +
                  's'}
              </h4>
              <ul>
                {popularCoachings[0].practice_page_popular_exam_sub_categories.map(
                  (i, idx) =>
                    popularCoachings[0].practice_page_popular_exam_sub_categories
                      .length -
                      1 ===
                    idx ? (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.targetUrl} style={{textTransform: 'capitalize'}} target="_blank">{i.subCatName}</a>
                        </li>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.targetUrl} style={{textTransform: 'capitalize'}} target="_blank">{i.subCatName}</a>
                        </li>
                      </React.Fragment>
                    )
                )}
              </ul>
            </div>
          
          )}
        </div>
      ) : (
        <div className="a-container">
          {popularCoachings === null ? (
            <PopularCoachingSkeleton />
          ) : (
            popularCoachings.map((item, idx) => (
              <div className="a-wrapper a-topFooter" key={idx}>
                <h4 style={{textTransform: 'capitalize'}}>{item.catName}</h4>
                <ul>
                  {item.practice_page_popular_exam_sub_categories.map((i, idx) =>
                    item.practice_page_popular_exam_sub_categories.length - 1 === idx ? (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.targetUrl} style={{textTransform: 'capitalize'}} target="_blank">{i.subCatName}</a>
                        </li>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.targetUrl} style={{textTransform: 'capitalize'}} target="_blank">{i.subCatName}</a>
                        </li>
                      </React.Fragment>
                    )
                  )}
                </ul>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}