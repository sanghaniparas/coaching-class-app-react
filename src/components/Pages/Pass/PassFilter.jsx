import React, { useState, useEffect, useCallback } from 'react';
import {
  Search,
  Filter,
  ModalClose,
  FilterResultIcon,
} from '../../Core/Layout/Icon';
import CustomDropdownRadio from '../Elements/CustomDropdownRadio';
import CustomDropdownCheckbox from '../Elements/CustomDropdownCheckbox';
import CustomRating from '../Elements/CustomRating';
import { AllTest, SortByPass, RatingStar } from '../Global/Constant';
import debounce from 'lodash.debounce';
import useFetchSearch from './../../../Hooks/useFetchSearch';

const PASSCOACHING = '/passPage/coaching_search';

export default function PassFilter({
  examTypeList,
  passTypeList,
  filterExamType,
  filterPassType,
  filterTotalQuestion,
  filterSortBy,
  filterRating,
  filterCoaching,
  filterPass,
  resetFilter,
  resetFilterAll,
}) {
  const [searchValue, setSearchValue] = useState('');
  const [showCoachingList, setShowCoachingList] = useState(false);
  const [searchCoaching, setSearchCoaching] = useState('');
  const [showCoachingName, setShowCoachingName] = useState('');
  const { searchData, loading, error } = useFetchSearch(
    searchValue,
    PASSCOACHING,
    false
  );
  useEffect(() => {
    if (resetFilter) {
      setShowCoachingList('');
      filterCoaching('');
      setSearchCoaching('');
      setShowCoachingName('');
    }
  }, [resetFilter]);

  useEffect(() => {
    if (!showCoachingName.length) filterCoaching('');
  }, [showCoachingName])



  //Debouncing search value



  const debouncedSave = useCallback(
    debounce((value) => setSearchValue(value), 600),
    []
  );
  const findCoaching = () => {
    setSearchValue(showCoachingName);
  };

  useEffect(() => {
    if (searchData.length > 0) {
      setShowCoachingList(true);
    }
  }, [searchData]);

  // const testTotalQuestion = (value) => {
  //   setTotalQuestion(value);
  // }
  // const setSortBy = (value) => {
  //   console.log('value', value);
  // }
  // const setRating = (value) => {
  //   console.log('value', value);
  // }

  const handleSearchClick = (el) => {
    setSearchCoaching(el);
    setShowCoachingName(el.coachingName);
    setShowCoachingList(false);
    filterCoaching(el.id);
  };

  // FILTER TOGGLE
  const [filter, setfilter] = useState(false);
  const filterToggle = () => {
    setfilter(!filter);
  };
  const filterClose = () => {
    setfilter(false);
  };

  return (
    <>
      <div className="filter-mobile">
        <span className="filter-toggle" onClick={filterToggle}>
          <FilterResultIcon /> Filter
        </span>
      </div>
      <div className={`pass-filter ${filter ? 'open' : ''}`}>
        <span className="close-mobile" onClick={filterClose}>
          <ModalClose />
        </span>
        <div className="a-container">
          <p className="label">Choose Your Pass</p>
          <div className="filter-group">
            <CustomDropdownCheckbox
              itemList={examTypeList}
              respondSelectedItem={filterExamType}
              keyItem={'examType'}
              type={'examType'}
              reset={resetFilter}
              placeholder={'All Exam'}
            />
            <div className="filter-input-group">
              <span className="search-icon">
                <Search />
              </span>
              <input
                type="text"
                placeholder="Select and search coaching"
                value={showCoachingName}
                onChange={(e) => {
                  debouncedSave(e.target.value);
                  setShowCoachingName(e.target.value);
                }}
              // onChange={(e) => {
              //   let value = e.target.value;
              //   debouncedSave(value);
              // }}
              />
              <span
                className="filter"
              //   onClick={() => findCoaching()
              //   }
              >
                <Filter />
              </span>
              {showCoachingList > 0 && searchValue.length > 0 && (
                <div className="a-search-dropdown">
                  <ul>
                    {searchData.map((el, i) => (
                      <>
                        <li
                          key={i}
                          onClick={() => handleSearchClick(el)}
                          style={{ cursor: 'pointer' }}>
                          {el.packageImageUrl === undefined &&
                            el.logoUrl !== null && (
                              <span
                                className="item-avt"
                                style={{
                                  backgroundImage: `url(${el.logoUrl})`,
                                }}></span>
                            )}

                          {el.packageImageUrl === undefined &&
                            el.logoUrl === null && (
                              <span
                                className="item-avt"
                                style={{
                                  backgroundImage: `url('https://via.placeholder.com/40x40?text=${el.coachingName}')`,
                                }}></span>
                            )}

                          {el.logoUrl === undefined &&
                            el.packageImageUrl !== null && (
                              <span
                                className="item-avt"
                                style={{
                                  backgroundImage: `url(${el.packageImageUrl})`,
                                }}></span>
                            )}

                          {el.logoUrl === undefined &&
                            el.packageImageUrl === null && (
                              <span
                                className="item-avt"
                                style={{
                                  backgroundImage: `url('https://via.placeholder.com/40x40?text=${el.packageName}')`,
                                }}></span>
                            )}
                          <div className="item-info">
                            <p className="item-name">
                              {!el.coachingName
                                ? el.packageName
                                : el.coachingName}
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
              )}
            </div>
            <CustomDropdownRadio
              itemList={passTypeList}
              respondSelectedItem={filterPassType}
              keyItem={'passTypeName'}
              type={'passType'}
              reset={resetFilter}
            />
          </div>
          <div className="filter-group">
            <CustomDropdownRadio
              itemList={AllTest}
              respondSelectedItem={filterTotalQuestion}
              keyItem={'label'}
              type={'totalQues'}
              reset={resetFilter}
            />
            <CustomRating
              ratingItem={false}
              ratingStar={RatingStar}
              respondRating={filterRating}
              reset={resetFilter}
            />
            <CustomDropdownRadio
              itemList={SortByPass}
              respondSelectedItem={filterSortBy}
              keyItem={'label'}
              type={'sortBy'}
              reset={resetFilter}
            />
            <button className="btn-primary radius" onClick={() => filterPass()}>
              Apply
            </button>
            <span className="clear" onClick={() => resetFilterAll()}>
              <ModalClose /> Clear All{' '}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
