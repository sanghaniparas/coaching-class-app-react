import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Phone,
  Mail,
  ModalClose,
  ArrowDown,
  MobileMenu,
  SearchResultIcon,
} from '../../Layout/Icon';

import {
  Search
} from '../../Layout/Icon';

import {
  fetchSearchData,
  fetchExamTypeData,
  fetchCartItem,
} from '../../../../redux/actions/global';

import useFetchSearch from './../../../../Hooks/useFetchSearch';
import debounce from 'lodash.debounce';
import OutsideClickHandler from 'react-outside-click-handler';

import axios from "axios";
import { BASE_URL } from "./../../../../config";

const GLOBALOACHING = '/search/test_package_coaching_search';
const SearchBar = () => {
  const [searchParam, setSearchParam] = useState({ searchData: '' });
  const [searchValue, setSearchValue] = useState('');
  const [toggleSearch, settoggleSearch] = useState(false);

  const { searchData, searchHistory, examTypeSearch } = useFetchSearch(
    searchValue,
    GLOBALOACHING,
    true
  );
  const debouncedSave = useCallback(
    debounce((value) => setSearchValue(value), 800),
    []
  );
  useEffect(() => {
    if (localStorage.getItem('serachResults')) {
      fetchSearchData(localStorage.getItem('serachResults'));
    } if (window.location.pathname === '/searchpage') {
      setSearchParam({
        'searchData': localStorage.getItem('serachResults') || ''
      });
    }
  }, []);

  const history = useHistory();

  const mobileToggleSearch = () => {
    settoggleSearch(!toggleSearch);
  };
  const closeMobileToggleSearch = () => {
    settoggleSearch(false);
  };

  

  const handleKeyDown = (e) => {
    if (!!e.target.value.trim() && e.key === 'Enter') {
      localStorage.setItem('serachResults', e.target.value);
      setSearchValue(e.target.value)
      fetchSearchData(e.target.value);
      // document.getElementById('global_search').value = '';
      debouncedSave('');
      history.push({
        pathname: `/searchpage`,
        state: {
          searchKeywords: e.target.value,
        },
      });
      // return window.location.reload();
      
    }
  };
 
  const handleExamTypeDetails = (value) => {
    localStorage.setItem('serachResults', value);
    setSearchValue(value)
    fetchSearchData(value);
    // document.getElementById('global_search').value = '';
    debouncedSave('');
    history.push({
      pathname: `/searchpage`,
      state: {
        searchKeywords: value,
        examType: true
      },
    });
  }

  const handleSearchClick = (el) => {
    if (!el.coachingName) {
      history.push(`/testdetails/${el.id}`);
      return window.location.reload();
    }

    history.push(`/coaching/${el.id}`);
    return window.location.reload();
  };
  return (
    <React.Fragment>
      <div className="a-searchwrap">
        <input type="checkbox" name="" id="toggleSearch" />
        <input
          type="text"
          id="global_search"
          placeholder="Search Test series, Coaching name"
          name="searchData"
          value={searchParam.searchData}
          onChange={(e) => {
            let value = e.target.value;
            setSearchParam({
              [e.target.name]: e.target.value,
            });
            debouncedSave(value);
          }}
          onKeyDown={(e) => handleKeyDown(e)}
        />

        <label htmlFor="toggleSearch" onClick={mobileToggleSearch}>
          <i className="mobile-search-icon"><Search/></i>
          {searchParam.searchData !== '' ? (
            <i
              style={{ cursor: 'pointer' }}
              className="search-filter-close"
              onClick={() => {
                setSearchParam({
                  searchData: '',
                });
                debouncedSave('');
              }}>
              <ModalClose />
            </i>
          ) : (
            <i className="desktop-search-icon"><Search /></i>
          )}
        </label>
      </div>

      {((searchHistory && searchHistory.length > 0) || (examTypeSearch && examTypeSearch.length > 0) || (searchData && searchData.length > 0)) && searchValue.length > 0 && (
        <OutsideClickHandler
          onOutsideClick={() => {
            debouncedSave('');
          }}>
          <div className="a-search-dropdown">
            {
              searchHistory && searchHistory.length > 0 && (
                <div className="related">
                  <h3>Trending</h3>
                  <ul>
                    {searchHistory.map((item, i) => (
                      <>
                        <li key={i}>
                          <Link to={`/testdetails/${item.id}`}>
                            <SearchResultIcon /> {item.searchKey}
                          </Link>
                        </li>
                      </>
                    ))}
                  </ul>
                </div>  
              )
            }
            <ul>
              {examTypeSearch && examTypeSearch.map((item, i) => (
                <>
                  <li
                    key={i}
                    // onClick={() => handleSearchClick(item)}
                    onClick={() => handleExamTypeDetails(item.examType)}
                    style={{ cursor: 'pointer' }}>
                    <span
                      className="item-avt"
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.examType}')`,
                      }}></span>
                    <div className="item-info">
                      <p className="item-name">{item.examType}</p>
                      <p className="item-subinfo">
                        {/* {el.exam_types.length ? (
                            <span className="name">
                              <b>{el.exam_types[0].examType}</b>
                            </span>
                          ) : (
                              ''
                            )} */}
                        {item.examNames.length ? (
                          <span className="name">
                            {item.examNames.map((exaxName, examNameKey) => (
                              <b>
                                {exaxName.examName}
                                {examNameKey !== item.examNames.length - 1
                                  ? ', '
                                  : ''}
                              </b>
                            ))}
                          </span>
                        ) : null}
                        <span className="test">{item.testCount} Tests</span>
                        <span className="practice">
                          {item.practiceSetCount} Followers
                        </span>
                      </p>
                    </div>
                  </li>
                </>
              ))}
              {searchData && searchData.map((el, i) => (
                <>
                  <li
                    key={i}
                    onClick={() => handleSearchClick(el)}
                    style={{ cursor: 'pointer' }}>
                    {el.packageImageUrl === undefined && el.logoUrl !== null && (
                      <span
                        className="item-avt"
                        style={{
                          backgroundImage: `url(${el.logoUrl})`,
                        }}></span>
                    )}

                    {el.packageImageUrl === undefined && el.logoUrl === null && (
                      <span
                        className="item-avt"
                        style={{
                          backgroundImage: `url('https://via.placeholder.com/40x40?text=${el.coachingName}')`,
                        }}></span>
                    )}

                    {el.logoUrl === undefined && el.packageImageUrl !== null && (
                      <span
                        className="item-avt"
                        style={{
                          backgroundImage: `url(${el.packageImageUrl})`,
                        }}></span>
                    )}

                    {el.logoUrl === undefined && el.packageImageUrl === null && (
                      <span
                        className="item-avt"
                        style={{
                          backgroundImage: `url('https://via.placeholder.com/40x40?text=${el.packageName}')`,
                        }}></span>
                    )}
                    <div className="item-info">
                      <p className="item-name">
                        {!el.coachingName ? el.packageName : el.coachingName}
                      </p>
                      <p className="item-subinfo">
                        {el.exam_types.length ? (
                          <span className="name">
                            <b>{el.exam_types[0].examType}</b>
                          </span>
                        ) : (
                          ''
                        )}
                        <span className="test">
                          {el.totalTests ? el.totalTests : 0} Tests
                        </span>
                        {!el.totalFollowers ? (
                          ''
                        ) : (
                          <span className="practice">
                            {el.totalFollowers} Followers
                          </span>
                        )}
                      </p>
                    </div>
                  </li>
                </>
              ))}
            </ul>
          </div>
        </OutsideClickHandler>
      )}
      {/* MOBILE GLOBAL SEARCH */}
       <div className={`global-search-mobile ${toggleSearch ? 'open' : ''}`}>
        <div className="search-header">
          <span className="search-back" onClick={closeMobileToggleSearch}>
            <ArrowDown />
            Back
          </span>
          <div className="search-wrap">
            <input 
              type="text" 
              name="searchData"
              value={searchParam.searchData}
              onChange={(e) => {
                let value = e.target.value;
                setSearchParam({
                  [e.target.name]: e.target.value,
                });
                debouncedSave(value);
              }}
              onKeyDown={(e) => handleKeyDown(e)}
            />
            <Search />
          </div>
        </div>
        <div className="search-body">
          {searchParam.searchData !== '' && searchHistory && (
            <div className="related">
              {searchHistory.length > 0 && <h3>Trending</h3>}
              <ul>
                {searchHistory.map((item, i) => (
                  <>
                    <li key={i}>
                      <Link to={`/testdetails/${item.id}`}>
                        <SearchResultIcon /> {item.searchKey}
                      </Link>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          )}
          <ul>
            {searchParam.searchData !== '' && examTypeSearch && examTypeSearch.map((item, i) => (
              <>
                <li
                  key={i}
                  onClick={() => handleSearchClick(item)}
                  style={{ cursor: 'pointer' }}>
                  <span
                    className="item-avt"
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.examType}')`,
                    }}></span>
                  <div className="item-info">
                    <p className="item-name">{item.examType}</p>
                    <p className="item-subinfo">
                      {item.examNames.length ? (
                        <span className="name">
                          {item.examNames.map((exaxName, examNameKey) => (
                            <b>
                              {exaxName.examName}
                              {examNameKey !== item.examNames.length - 1
                                ? ', '
                                : ''}
                            </b>
                          ))}
                        </span>
                      ) : null}
                      <span className="test">{item.testCount} Tests</span>
                      <span className="practice">
                        {item.practiceSetCount} Followers
                      </span>
                    </p>
                  </div>
                </li>
              </>
            ))}
            {searchParam.searchData !== '' && searchData && searchData.map((el, i) => (
              <>
                <li
                  key={i}
                  onClick={() => handleSearchClick(el)}
                  style={{ cursor: 'pointer' }}>
                  {el.packageImageUrl === undefined && el.logoUrl !== null && (
                    <span
                      className="item-avt"
                      style={{
                        backgroundImage: `url(${el.logoUrl})`,
                      }}></span>
                  )}

                  {el.packageImageUrl === undefined && el.logoUrl === null && (
                    <span
                      className="item-avt"
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/40x40?text=${el.coachingName}')`,
                      }}></span>
                  )}

                  {el.logoUrl === undefined && el.packageImageUrl !== null && (
                    <span
                      className="item-avt"
                      style={{
                        backgroundImage: `url(${el.packageImageUrl})`,
                      }}></span>
                  )}

                  {el.logoUrl === undefined && el.packageImageUrl === null && (
                    <span
                      className="item-avt"
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/40x40?text=${el.packageName}')`,
                      }}></span>
                  )}
                  <div className="item-info">
                    <p className="item-name">
                      {!el.coachingName ? el.packageName : el.coachingName}
                    </p>
                    <p className="item-subinfo">
                      {el.exam_types.length ? (
                        <span className="name">
                          <b>{el.exam_types[0].examType}</b>
                        </span>
                      ) : (
                        ''
                      )}
                      <span className="test">
                        {el.totalTests ? el.totalTests : 0} Tests
                      </span>
                      {!el.totalFollowers ? (
                        ''
                      ) : (
                        <span className="practice">
                          {el.totalFollowers} Followers
                        </span>
                      )}
                    </p>
                  </div>
                </li>
              </>
            ))}
          </ul>
        </div>
      </div> 
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchData: (keywords) => dispatch(fetchSearchData(keywords)),
    fetchExamTypeData: (keywords) => dispatch(fetchExamTypeData(keywords)),
    fetchCartItem: () => dispatch(fetchCartItem()),
  };
};

export default connect(null, mapDispatchToProps)(SearchBar);
