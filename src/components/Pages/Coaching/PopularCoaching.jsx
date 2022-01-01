import React from 'react';
import PopularCoachingSkeleton from './../../../skeletons/PopularCoachingSkeleton';

export default function PopularCoaching({ popularCoachings, famous = true }) {
  return (
    <div className="a-coaching-popular-list">
      {!famous ? (
        <div className="a-container">
          {popularCoachings === null ? (
            <PopularCoachingSkeleton />
          ) : (
            <div className="a-wrapper a-topFooter">
              <h4>
                {popularCoachings.popularCoachingCategories[0].categoryName +
                  's'}
              </h4>
              <ul>
                {popularCoachings.popularCoachingCategories[0].subCategory.map(
                  (i, idx) =>
                    popularCoachings.popularCoachingCategories[0].subCategory
                      .length -
                      1 ===
                    idx ? (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.subCategoryUrl}>{i.subCategoryName}</a>
                        </li>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.subCategoryUrl}>{i.subCategoryName}</a>
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
            popularCoachings.popularCoachingCategories.map((item, idx) => (
              <div className="a-wrapper a-topFooter" key={idx}>
                <h4>{item.categoryName}</h4>
                <ul>
                  {item && item?.subCategory.map((i, idx) =>
                    item.subCategory.length - 1 === idx ? (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.subCategoryUrl}>{i.subCategoryName}</a>
                        </li>
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={idx}>
                        <li>
                          <a href={i.subCategoryUrl}>{i.subCategoryName}</a>
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
