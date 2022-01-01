import React, { Fragment, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown, HeartFill, Location, Star } from '../../Core/Layout/Icon';
import { searchItemFormat } from '../Global/Formatter';
import SearchSubMenu from './SearchSubMenu';
import Pagination from '../Elements/Pagination';
import { useHistory } from 'react-router-dom';

export default function SearchCoachingDetails({
  searchCoachingData,
  isSubTab,
  handleSelectedSection,
}) {
  const history = useHistory();

  const [pagnation, setPagnation] = useState(1);
  const segregrateList = searchItemFormat(searchCoachingData, 10);
  const handlePageClick = (page) => setPagnation(page.selected + 1);
  // const handleViewMore=(e)=>{
  //   e.preventDefault();
  //   console.log('segregrateList', segregrateList.length);
  //   console.log('pagnation', pagnation);
  //   if(pagnation<segregrateList.length-1){
  //     // setPagnation(pagnation+1);
  //     console.log('showCoachingList', showCoachingList);
  //     console.log('next', segregrateList[pagnation+1]);
  //     const next = showCoachingList.push(segregrateList[pagnation+1])
  //     setShowCoachingList(next);
  //   }

  // }
  const countFormat = (countItem) => (countItem < 2 ? 0 : `${countItem - 1}+`);
  return (
    <Fragment>
      {/* <div className="searchcoaching-header">
        <div className="top">
          <div className="info-box">
            <h2>SSC Exams</h2>
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero deserunt, harum ducimus ut perspiciatis porro voluptas commodi dicta dignissimos aspernatur exercitationem, quo consequatur cumque facilis tempora. Alias earum maxime aperiam.</p>
          </div>
          <button className="btn-primary">Follow</button>
        </div>
        <div className="bottom">
        <SearchSubMenu isSubTab={isSubTab} handleSelectedSection={handleSelectedSection}/>
        </div>
      </div> */}
      <div className="search-test-series coaching-wrapper">
        <div className="card">
          {(!segregrateList || segregrateList.length === 0) && (
            <div>No Data Available</div>
          )}
          {!!segregrateList && segregrateList.length > 0 && (
            <React.Fragment>
              {segregrateList[pagnation].map((item, idx) => (
                <div className="coaching-box" key={item.id}>
                  {/* <img className="logo" src={require('../../../assets/images/search-coaching.png')} alt="" /> */}
                  {!!item.logoUrl && (
                    <img
                      className="logo"
                      src={item.logoUrl}
                      alt={item.coachingName}
                    />
                  )}
                  {!item.logoUrl && (
                    <img
                      className="logo"
                      src={`https://via.placeholder.com/40x40?text=${item.coachingName}`}
                      alt={item.coachingName}
                    />
                  )}
                  <Link className="inst-name">{item.coachingName}</Link>
                  <p className="location">
                    {item.cityName}, {item.stateName}
                  </p>
                  <p className="follower">
                    Follower {countFormat(item.totalFollowers)}
                  </p>
                  <button className="btn-warning-line">Follow</button>
                </div>
              ))}
              <div className="viewmore">
                {/* <Link to="0" onClick={(e)=>handleViewMore(e)}>View More <ArrowDown /> </Link> */}
                <div className="pagination">
                  <Pagination
                    pageCount={segregrateList.length - 1}
                    handlePageClick={handlePageClick}
                  />
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
