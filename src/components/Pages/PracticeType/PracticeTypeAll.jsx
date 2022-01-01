import React, { useState, useEffect } from 'react';
import Pagination from '../Elements/Pagination';
import {
  FilterResultIcon,
  Heart,
  HeartFill,
  Location,
  ModalClose,
  Search,
  Star,
} from '../../Core/Layout/Icon';
import {
  Language,
  RatingPracticeCoaching,
  RatingStar,
  SortByCoaching,
  SortByPractice,
  RATINGCHOICE,
} from '../Global/Constant';
import wishlistApi from '../../../api/wishlist';

import CustomRating from '../Elements/CustomRating';
import CustomDropdownRadio from '../Elements/CustomDropdownRadio';
import CustomDropdownCheckbox from '../Elements/CustomDropdownCheckbox';
import { DebounceInput } from 'react-debounce-input';
import axios from 'axios';
import { BASE_URL } from './../../../config';

export default function PracticeTypeAll({
  practiceAllList,
  handlePageClick,
  totalPage,
  practiceAllExamType,
  filterExamType,
  filterLanguage,
  respondChoice,
  respondRating,
  selectedSortBy,
  respondSortBy,
  searchByKeyword,
  startPractice,
  startPracticeAll
}) {
  const [inWishList, setInWishList] = useState([]);

  const [defaultSelection, setDefaultSelection] = useState([]);

  const allPractice = practiceAllList?.all_practices;

  useEffect(() => {
    if (
      localStorage.getItem('token') !== '' ||
      localStorage.getItem('token') !== null
    ) {

    }

  }, [allPractice]);



  const handleWishList = async (item, id, productType = 2, practice_wish_type) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: productType.toString(),
      itemId: id,
    });

    let updatedIndex;
    try {
      if (practice_wish_type === 1) {
        const response = await axios
          .post(`${BASE_URL}/wishlist/remove-from-wishlist`, body, config)
          .then((result) => {
            console.log(result.data);

            updatedIndex = allPractice.findIndex(
              (w) => w.id === result.data.data.itemId
            );
            allPractice[updatedIndex].practice_wish_type =
              result.data.data.wish_type;
            setInWishList((item) => [
              ...item,
              { id, practice_wish_type: result.data.data.wish_type },
            ]);
          });
      }
      if (practice_wish_type === 2 || practice_wish_type === null) {
        const response = await axios
          .post(`${BASE_URL}/wishlist/add-to-wishlist`, body, config)
          .then((result) => {
            console.log(result.data);
            console.log(result.data.data);
            item.practice_wish_type = result.data.data.wish_type;

            updatedIndex = allPractice.findIndex(
              (w) => w.id === result.data.data.itemId
            );
            allPractice[updatedIndex].practice_wish_type =
              result.data.data.wish_type;

            setInWishList((item) => [
              ...item,
              { id, practice_wish_type: result.data.data.wish_type },
            ]);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };


  // FILTER TOGGLE
  const [filter, setfilter] = useState(false);
  const filterToggle = () => {
    setfilter(!filter);
  };
  const filterClose = () => {
    setfilter(false);
  };

  console.log(defaultSelection)

  return (
    <div className="all-practice-sets grey-bg-box">
      <div className="a-wrapper">
        <div className="a-container">
          <div className="header-filter">
            <div className="left-content">
              <h2>All Practice Sets</h2>
              <p>
                {practiceAllList?.total_count} Practice & Packages are available
              </p>
            </div>
            <div className="filter-group">
              <span className="filter-toggle" onClick={filterToggle}>
                <FilterResultIcon /> Filter
            </span>
              <div className="search">
                <Search />
                {/* <input type="text" placeholder="Search by packages, coaching" /> */}
                <DebounceInput
                  debounceTimeout={500}
                  placeholder="Search by packages, coaching"
                  onChange={(event) => searchByKeyword(event.target.value)}
                />
              </div>
            </div>
          </div>
          <div className={`all-filter-wrapper ${filter ? 'open' : ''}`}>
            <span className="close-mobile" onClick={filterClose}>
              <ModalClose/>
            </span>
            <h3 className="filter-title">Practice Sets Filter</h3>
            <div className="left">
              <CustomDropdownCheckbox
                itemList={practiceAllExamType}
                respondSelectedItem={filterExamType}
                keyItem={'examType'}
                type={'examType'}
              />
              <CustomRating
                defaultSelectedPractice={true}
                ratingItem={RatingPracticeCoaching}
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
            </div>
            <div className="right">
              <div className="group">
                <p>Sort by</p>
                <CustomDropdownRadio
                  isDefault={true}
                  itemList={
                    (selectedSortBy == RATINGCHOICE.PRACTICE &&
                      SortByPractice) ||
                    SortByCoaching
                  }
                  respondSelectedItem={respondSortBy}
                  keyItem={'label'}
                  type={'sortBy'}
                />
              </div>
            </div>
            <div className="action-group">
              <button className="btn-primary">Submit</button>
            </div>
          </div>
          <div className="flex-width new-flex practicetype-flex">
            {allPractice !== undefined && allPractice.length !== 0 ? (
              allPractice.map((item, idx) => (
                <div className="a-carousel-item" key={idx}>
                  {localStorage.token &&
                    <div className="a-wishlist">
                      {item?.practice_wish_type === 1 ? (
                        <span
                          className="fevourite"
                          onClick={() =>
                            handleWishList(
                              item,
                              item.id,
                              item.productType,
                              item.practice_wish_type
                            )
                          }>
                          <HeartFill />
                        </span>
                      ) : (
                          <span
                            className="fevourite"
                            onClick={() =>
                              handleWishList(
                                item,
                                item.id,
                                item.productType,
                                item.practice_wish_type
                              )
                            }>
                            <Heart />
                          </span>
                        )}
                    </div>
                  }

                  <span className="a-bggray">
                    <h4>{item.setName}</h4>
                    <p>Attempted by {item?.totalAttempt}</p>
                  </span>
                  <div className="a-listItem">
                    <div className="a-listTop">
                      <div className="a-itemHead">
                        <h4>{item?.coachings?.coachingName}</h4>
                        <div className="a-ratingandstars">
                          <div className="a-avatarProfile">
                            <span
                              style={{
                                backgroundImage: `url(${item?.coachings?.logoUrl})`,
                              }}></span>
                          </div>
                          <b>
                            <span>
                              <Star />
                            </span>{' '}
                            {defaultSelection === 'coaching' ? item?.coachings?.ratingCount >= 3
                              ? item?.coachings?.rating.toFixed(1)
                              : '-'
                              : item?.ratingCount >= 3
                                ? item?.rating.toFixed(1)
                                : '-'
                            }
                            
                          </b>
                          <b>
                            {defaultSelection === 'coaching' ? item?.coachings?.ratingCount >= 3
                              ? `${item?.coachings?.ratingCount} Ratings`
                              : `(Not Rated)`
                              : item.ratingCount >= 3
                                ? `${item?.ratingCount} Ratings`
                                : `(Not Rated)`
                            }
                          </b>
                        </div>
                      </div>
                      <p className="a-location">
                        <span>
                          <Location />
                        </span>{' '}
                        {item?.coachings?.cityName}, {item?.coachings?.stateName}
                      </p>
                      <p className="a-typeExam">{item.examTypeName}</p>
                      <ul className="a-optionDetails">
                        <li>Total Chapter: {item?.chapterCount}</li>
                        <li>Total Question: {item?.questionCount}</li>
                        <li>{item?.languages?.languageName}</li>
                      </ul>
                      <div
                        className="a-detailsBtn"
                        onClick={() => startPracticeAll(item)}>
                        <span>Start Practice</span>
                      </div>

                    </div>
                  </div>
                </div>
              ))
            ) : (
                <div className="a-nodata-Content">No Practice Set Available</div>
              )}
          </div>
          {/* Pagination */}
          <div className="pagination">
            <Pagination
              handlePageClick={handlePageClick}
              pageCount={totalPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
