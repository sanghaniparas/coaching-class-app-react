import React from 'react';
import { connect } from 'react-redux';

const SearchSidebar = ({searchHistoryData, getRelatedResult}) => {
  //console.log('searchHistoryData', searchHistoryData);
  
  return (
    <div className="search-sidebar">
      {/* <div className="search-box">
        <h3>Trending</h3>
        <ul className="search-items">
          {
            [1, 2, 3, 4, 5, 6, 7, 8].map(item => (
              <li key={item}><span>Cat 2017 answer key</span></li>
            ))
          }
        </ul>
      </div> */}

      <div className="search-box">
        <h3>Related Search</h3>
        <ul className="search-items">
          {
            searchHistoryData && searchHistoryData.map((item,idx) => (
              <li key={idx} data-rel={item.searchKey} onClick={(event)=>getRelatedResult(event)}><span id={item.searchKey}>{item.searchKey}</span></li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
export default SearchSidebar;