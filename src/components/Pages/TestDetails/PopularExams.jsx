import React from 'react';

const PopularExams = ({ data }) => {
  return (
    <div className="a-coaching-popular-list">
      <div className="a-container">
        {data.examPagePopularCoachingCategory.map((item, idx) => (
          <div className="a-wrapper a-topFooter" key={idx}>
            <h4>{item.catName}</h4>
            <ul>
              {item.examPagePopularCoachingSubCategories.map((i, idx) =>
                item.examPagePopularCoachingSubCategories.length - 1 === idx ? (
                  <React.Fragment key={idx}>
                    <li>
                      <a href={i.targetUrl}>{i.subCatName}</a>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment key={idx}>
                    <li>
                      <a href={i.targetUrl}>{i.subCatName}</a>
                    </li>
                  </React.Fragment>
                )
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularExams;
