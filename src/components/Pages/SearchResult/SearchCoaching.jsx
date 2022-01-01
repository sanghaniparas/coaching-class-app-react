import React, { useState } from 'react';
import { Link , useHistory} from 'react-router-dom';
import { searchItemFormat } from '../Global/Formatter';

export default function SearchCoaching({
  searchCoachingData,
  setViewSection,
  isSubTab,
}) {
  const [pagnation, setPagnation] = useState(1);
  const segregrateList = searchItemFormat(searchCoachingData, 5);
  console.log('segregrateList', segregrateList);
  const countFormat = (countItem) => (countItem < 2 ? 0 : `${countItem - 1}+`);
  const viewSubSection = (e) => {
    e.preventDefault();
    setViewSection({ id: '2', label: 'Coaching' });
  };

  const history = useHistory();
  const gotToCoaching = (item) => history.push(`/coaching/${item.id}`);


  return (
    <div className="search-test-series coaching-wrapper">
      <div className="header-filter">
        <div className="left-content">
          <h2>Coaching</h2>
        </div>
        {segregrateList.length > 1 && (
          <div className="filter-group">
            <Link to="" onClick={(e) => viewSubSection(e)}>
              View All
            </Link>
          </div>
        )}
      </div>

      {(!segregrateList || segregrateList.length === 0) && (
        // <div>No Data Available</div>
        <div class="a-nodata-Content"> No Data Available</div>
      )}
      <div className="card" >
        {!!segregrateList &&
          segregrateList.length > 0 &&
          segregrateList[pagnation].map((item, idx) => (
            <div className="coaching-box" key={idx} id={item.id} onClick={() => gotToCoaching(item)}>
           
              {!!item.logoUrl && (
                <img
                  className="logo search-results"
                  src={item.logoUrl}
                  alt={item.coachingName}
                />
              )}
              {!item.logoUrl && (
                <img
                  className="logo search-results"
                  src={`https://via.placeholder.com/40x40?text=${item.coachingName}`}
                  alt={item.coachingName}
                />
              )}
              <Link className="inst-name" to={`/coaching/${item.id}`}>  {item.coachingName}</Link>
              
             
              <p className="location">
                {item.cityName}, {item.stateName}
              </p>
              <p className="follower">
                Follower {countFormat(item.totalFollowers)}
              </p>
             
            </div>
          ))}
      </div>
    </div>
  );
}
