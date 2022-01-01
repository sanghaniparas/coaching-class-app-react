import React, { useState, useEffect } from 'react';
import { Route, Switch, useLocation ,useHistory } from 'react-router-dom';
import Pagination from '../Elements/Pagination';
import { FilterResultIcon, Heart, HeartFill, Location, ModalClose, Search, Star } from '../../Core/Layout/Icon';
import { Language, RatingQuizCoaching, RatingStar, SortByCoaching, SortByQuiz, RATINGCHOICE } from '../Global/Constant';
import CustomDropdownRadio from '../Elements/CustomDropdownRadio';
import CustomRating from '../Elements/CustomRating';
import { DebounceInput } from 'react-debounce-input';
import { useDispatch } from 'react-redux';
import { toggleSignUp } from '../../../redux/actions/auth';
import wishlistApi from '../../../api/wishlist';


export default function QuizListContainer({
  quizListing,
  filterLanguage,
  handlePageClick,
  totalPage,
  respondRating,
  respondChoice,
  selectedSortBy,
  respondSortBy,
  searchByKeyword,
  filterToggle
}) {
  const history = useHistory();
  const dispatch = useDispatch();
  let location = useLocation();
  const [wishListData, setWishListData] = useState([]);
  const [defaultSelection, setDefaultSelection] = useState([]);
  const allQuiz = quizListing?.all_quizzes;
  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {
      if (allQuiz !== undefined) {
        allQuiz.forEach((x) =>
           
            checkWishlist({ itemType: '3', itemId: x.id })
        );
      }
    }
  }, [allQuiz]);
  const checkWishlist = async (obj) => {
    let val = await wishlistApi.checkWishList(obj);
    if(val) {
      let val2 = wishListData.find((item) => item.itemId === val.itemId);
      if (val2 === undefined) {
        setWishListData((wishListData) => [...wishListData, val]);
      }
    }
  };
  const onWishlistChange = (id) => {
    let arr = [...wishListData];
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].itemId === id) {
        if (arr[i].have === 0) {
          wishlistApi.addToWishList({ itemId: id, itemType: '3' });
        } else {
          wishlistApi.removeFromWishList({ itemId: id, itemType: '3' });
        }
        arr[i] = {
          have: arr[i].have === 0 ? 1 : 0,
          itemId: id,
        };
      }
    }
    setWishListData(arr);
  };
  const startQuiz = quizItem => {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      return dispatch(toggleSignUp(true));
    }
    window.location.href = `/quizdetails/${quizItem.id}`;
  }

  const viewResult=quizItem=>{
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      return dispatch(toggleSignUp(true));
    }
    window.location.href = `/quizreport/${quizItem.id}/${quizItem.quizResultId}`;
  }

  console.log('allQuiz', allQuiz);
  const [quizFilter, setquizFilter] = useState(false)
  const quizFilterToggle = () => {
    setquizFilter(!quizFilter);
  }
  const closeQuizFilter = () => {
    setquizFilter(false)
  }
  return (
    <div className="quiz-right-sidebar">
      <div className="a-container">
        <span className="filterSidebar" onClick={filterToggle}><FilterResultIcon /> Filter</span>
        <div className="search">
          <Search />
          {/* <input type="text" placeholder="Search" /> */}
          <DebounceInput
            debounceTimeout={500}
            placeholder="Search"
            onChange={(event) => searchByKeyword(event.target.value)}
          />
        </div>
        <div className="header-filter">
          <div className="left-content">
            <h2>All Quizzes</h2>
            <p>{quizListing.total_count} Quizzes are available</p>
          </div>
          <span className="filter-toggle" onClick={quizFilterToggle}>
            <FilterResultIcon/> Filter
          </span>
          <div className={`filter-group ${quizFilter ? 'open' : '' }`}>
            <span className="close" onClick={closeQuizFilter}><ModalClose/></span>
            <CustomRating
              defaultSelectedPractice={false}
              ratingItem={RatingQuizCoaching}
              ratingStar={RatingStar}
              respondChoice={respondChoice}
              respondRating={respondRating}
              setDefaultSelection={setDefaultSelection}
            />
            <CustomDropdownRadio
              itemList={Language}
              respondSelectedItem={filterLanguage}
              keyItem={'label'}
              type={'language'}
            />
            <span className="sort-label">Sort by</span>
            <CustomDropdownRadio
              itemList={selectedSortBy == RATINGCHOICE.QUIZ && SortByQuiz || SortByCoaching}
              respondSelectedItem={respondSortBy}
              keyItem={'label'}
              type={'sortBy'}
            />
          </div>
        </div>
        <div className="quiz-card-wrapper flex-width new-flex">
          {allQuiz && allQuiz.length ? allQuiz.map((item, idx) => (
            <div className="a-carousel-item" key={idx}>
              <div className="a-wishlist">
                {wishListData.length !== 0 &&
                  wishListData.map((el) => {
                    if (el?.itemId === item.id) {
                      if (el.have === 0) {
                        return (
                          <span onClick={() => onWishlistChange(el.itemId)}>
                            <Heart />
                          </span>
                        );
                      }
                      if (el.have === 1) {
                        return (
                          <span onClick={() => onWishlistChange(el.itemId)}>
                            <HeartFill />
                          </span>
                        );
                      }
                    }
                })}
                {/* <span>
                  {!item.quiz_wish_type && <Heart />}
                  {!!item.quiz_wish_type && <HeartFill />}
                </span> */}
              </div>
              <span className="a-bggray">
                <h4>{item.quizName}</h4>
                <p>Attempted by {item.totalAttempt}</p>
              </span>
              <div className="a-listItem" style={{cursor:'initial'}}>
                <div className="a-listTop">
                  <div className="a-itemHead">
                    <h4>{item.coachings.coachingName}</h4>
                    <div className="a-ratingandstars">
                      <div className="a-avatarProfile">
                        {
                          item.coachings.logoUrl? (
                            <span style={{ backgroundImage: `url(${item.coachings.logoUrl})` }}></span>
                          ):(
                            <span style={{ backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coachings.coachingName}')`}}></span>
                          )
                        }
                        
                      </div>
                      <b>
                          <span>
                            <Star />
                          </span>{' '}
                          {(item.rating &&
                            // item.rating.toFixed(1) > 2 &&
                            item.rating.toFixed(1)) ||
                            `-`}
                        </b>

                        <b>
                          {/* (
                          {item.ratingCount.toFixed(1) > 2
                            ? `${item.ratingCount} Ratings`
                            : `Not Rated`}
                          ) */}
                          {item.ratingCount>0?
                          item.ratingCount  + " Ratings" :"Not Rated"}
                        </b>
                       
                    </div>
                  </div>
                  <p className="a-location">
                    <span>
                      <Location />
                    </span>{' '}
                    {item.coachings.cityName}, {item.coachings.stateName}
                  </p>
                  <p className="a-typeExam">{item.examTypeName}</p>
                  <ul className="a-optionDetails">
                    <li>Question : {item.questionCount}</li>
                    <li>Max. Marks : {item.totalMarks}</li>
                    <li>Time : {item.duration} Minutes</li>
                    <li>{item.languages.languageName}</li>
                  </ul>{console.log(`itemss`, item)}
                  {item.quizResultCount===0?
                  <div className="a-detailsBtn" onClick={() => startQuiz(item)}>
                    <span>Start Quiz</span>
                  </div>
                  :null}
                  {item.quizResultCount > 0 ?item.quizCompleted===1?
                  <div className="a-detailsBtn" onClick={() => viewResult(item)}>
                    <span>View Result</span>
                  </div>
                  :null:
                  null}
                  {item.quizResultCount > 0 ?item.quizCompleted !==1 ?
                  <div className="a-detailsBtn" onClick={() => startQuiz(item)}>
                    <span>Resume Quiz</span>
                  </div>
                  :null:null}
                </div>
              </div>
            </div>
          )) : <div className="a-nodata-Content">No Quiz Available</div>
          }
        </div>
        {/* Pagination */}
        <div className="pagination">
          <Pagination handlePageClick={handlePageClick} pageCount={totalPage} />
          {/* <ul>
            <li className="active">1</li>
            <li>2</li>
            <li>3</li>
            <li>4</li>
            <li>...</li>
            <li>5</li>
            <li>
              <LineArrow />
            </li>
          </ul> */}
        </div>
      </div>
    </div>
  )
}
