import React, {useState, useEffect, useReducer} from 'react'
import { ExamTypeIcon, ModalClose, Subject } from '../../Core/Layout/Icon';
import CustomDropdownRadio from '../../Pages/Elements/CustomDropdownRadio';
import CustomDropdownCheckbox from '../../Pages/Elements/CustomDropdownCheckbox';
import { Filter, Search } from '../../Core/Layout/Icon';
import CustomRating from '../../Pages/Elements/CustomRating';
import { SortByCoaching, RatingStar } from '../../Pages/Global/Constant';
import useFetchSearch from '../../../Hooks/useFetchSearch';
import {DebounceInput} from 'react-debounce-input';
//import Layout from '../../Core/Layout/Layout';

const QUIZATTEMTEDCOACHING = '/dashboard/dashboard/attempted_quizze_coaching_search';
export default function QuizFilter({ 
  attemptedQuizExamType, 
  filterExamType, 
  respondCoachingRating, 
  respondCoachingSortBy,
  filterCoaching,
  filetrQuiz,
  resetQuizCoaching,
  resetFilter,
  examType,
  headerExam
}) {
  const [searchValue, setSearchValue] = useState('');
  const [showCoachingList, setShowCoachingList] = useState(false);
  const [isActive, setActive] = useState(false);
  const [showCoachingName, setShowCoachingName] = useState('');
  const { searchData, loading, error } = useFetchSearch(searchValue, QUIZATTEMTEDCOACHING, false);
  const findCoaching = (fiterData) => {
    setSearchValue(fiterData)
  }


  const [isTrue, setIsTrue] = useState(false)

  const [ratingFilter, setRatingFilter] = useState(false);

  useEffect(() => {
    if (searchData.length > 0) {
      setShowCoachingList(true);
    }
  }, [searchData]);

  const showToggleCoaching = () => {
    setActive(!isActive);
  };


  const handleSearchClick = (el) => {
    //setSearchCoaching(el);
    setShowCoachingName(el.coachingName);
    setShowCoachingList(false);
    filterCoaching(el.id);
  };

  useEffect(() => {
    console.log('resetFilter', resetFilter);
    if (resetFilter) {
      setShowCoachingList('');
      filterCoaching('');
      //setSearchCoaching('');
      setShowCoachingName('');
    }
  }, [resetFilter]);




  return (
    <React.Fragment>
      <div className="card quiz-dash-filter">
        <div className="top">
          <div className="form-group preferred_exam">
            <label htmlFor="">Your Preferred Exam {isTrue}</label>
            <div className="custom-dropdown filter-group">
              <CustomDropdownCheckbox
                itemList={attemptedQuizExamType}
                respondSelectedItem={filterExamType}
                keyItem={'examType'}
                type={'examType'}
                multi={true}
                reset={isTrue}
                // selectFisrtItem={true}
              />
            </div>
          </div>
          <div className="form-group filter">
            <label htmlFor="">Selected Coaching</label>
            <div className="filter-input-group" className={isActive ? 'filter-input-group ': 'filter-input-group greyFilter' }>
              <span className="search-icon"><Search /></span>
              <DebounceInput
                  debounceTimeout={500}
                  placeholder="Select and search coaching"
                  onChange={(event) => findCoaching(event.target.value)} 
                  value={showCoachingName}
                />
              {/* <input type="text" placeholder="Select and search coaching" value={showCoachingName}
                onChange={(e) => setShowCoachingName(e.target.value)}/> */}
              <span className="filter"  onClick={showToggleCoaching}>
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
          </div>
        </div>
        <div className="bottom" className={isActive ? 'bottom ': 'bottom toggleClass' } >
          <div className="form-group-inline">
            <span className="label">Ratings</span>
            <div className="custom-dropdown rating">
              <CustomRating
                ratingItem={false}
                ratingStar={RatingStar}
                respondRating={respondCoachingRating}
                reset={ratingFilter}
              />
            </div>
          </div>
          <div className="form-group-inline">
            <span className="label">Sort by</span>
            <div className="custom-dropdown">
            <CustomDropdownRadio
              itemList={SortByCoaching}
              respondSelectedItem={respondCoachingSortBy}
              keyItem={'label'}
              type={'sortBy'}
              reset={resetFilter}
            />
            </div>
          </div>
          <div className="form-group-inline">
            <button className="btn-primary" onClick={()=>filetrQuiz()}>Apply</button>
          </div>
          <div className="form-group-inline">
            <button className="btn-primary-pill" onClick={()=>resetQuizCoaching()}>Reset</button>
          </div>
        </div>
      </div>
    </React.Fragment>

  )
}
