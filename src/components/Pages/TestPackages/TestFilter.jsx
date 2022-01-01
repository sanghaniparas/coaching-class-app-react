import React, { useState } from 'react';
import { Search, Filter, ModalClose, FilterResultIcon } from '../../Core/Layout/Icon';
import {
  Language,
  RatingPackageCoaching,
  RatingStar,
  PriceRange,
} from '../Global/Constant';
import CustomRating from '../Elements/CustomRating';
import CustomDropdownRadio from '../Elements/CustomDropdownRadio';
import CustomDropdownCheckbox from '../Elements/CustomDropdownCheckbox';
import { DebounceInput } from 'react-debounce-input';

export default function TestFilter({
  packageAllExamType,
  filterLanguage,
  filterPrice,
  filterExamType,
  respondChoice,
  respondRating,
  searchByKeyword,
  totalTestPackege,
}) {
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
    <div className="filter-input-group search">
        <span className="search-icon">
          <Search />
        </span>
        {/* <input type="text" placeholder="Search by packages, coaching" /> */}
        <DebounceInput
          debounceTimeout={500}
          placeholder="Search by packages, coaching"
          onChange={(event) => searchByKeyword(event.target.value)}
        />
      </div>
      <span className="filter-toggle" onClick={filterToggle}>
        <FilterResultIcon/> Filter
      </span>
    </div>
    <div className={`pass-filter ${filter ? 'open' : ''}`}>
      <span className="close-mobile" onClick={filterClose}>
        <ModalClose />
      </span>
      <div className="a-container">
        <div className="filter-group">
          <CustomDropdownCheckbox
            itemList={packageAllExamType}
            respondSelectedItem={filterExamType}
            keyItem={'examType'}
            type={'examType'}
            multi={true}
            placeholder={'Exam Type'}
          />

          <CustomRating
            defaultSelectedPractice={'package'}
            ratingItem={RatingPackageCoaching}
            ratingStar={RatingStar}
            respondChoice={respondChoice}
            respondRating={respondRating}
            packageBySelectionRating={'package'}
            totalTestPackege={totalTestPackege}
          />

          <CustomDropdownRadio
            itemList={Language}
            respondSelectedItem={filterLanguage}
            keyItem={'label'}
            type={'language'}
            placeholder={'Language'}
          />

          <CustomDropdownRadio
            itemList={PriceRange}
            respondSelectedItem={filterPrice}
            selectFisrtItem="1"
            keyItem={'label'}
            type={'price'}
            placeholder={'Low to High'}
          />

          <div className="filter-input-group search">
            <span className="search-icon">
              <Search />
            </span>
            {/* <input type="text" placeholder="Search by packages, coaching" /> */}
            <DebounceInput
              debounceTimeout={500}
              placeholder="Search by packages, coaching"
              onChange={(event) => searchByKeyword(event.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  </>  
  );
}
