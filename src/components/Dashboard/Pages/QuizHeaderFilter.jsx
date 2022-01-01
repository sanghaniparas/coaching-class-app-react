import React, { useState }  from 'react';
import { ExamTypeIcon, ModalClose, Subject, FilterResultIcon } from '../../Core/Layout/Icon';
import CustomDropdownRadio from '../../Pages/Elements/CustomDropdownRadio';
import CustomDropdownCheckbox from '../../Pages/Elements/CustomDropdownRadio';
import { Filter, Search } from '../../Core/Layout/Icon';
import CustomRating from '../../Pages/Elements/CustomRating';
import { SortByQuiz, SortByPass, RatingStar } from '../../Pages/Global/Constant';
//import Layout from '../../Core/Layout/Layout';


export default function QuizHeaderFilter({ filterAttemtedQuiz, qiuzSubject, filterSubjectType, respondQuizRating, respondQuizSortBy }) {
  const [quizFilter, setquizFilter] = useState(false)
  const quizFilterToggle = () => {
    setquizFilter(!quizFilter);
  }
  const closeQuizFilter = () => {
    setquizFilter(false)
  }
  return (
    <React.Fragment>
      <div className="header-filter quizz">
        <div className="left-content">
          <h2>Banking Quizz</h2>
          <p>Total no of quizzes: {filterAttemtedQuiz.length}</p>
        </div>
        <button className="filter-btn" onClick={quizFilterToggle}><FilterResultIcon />Filter</button>
        <div className={`filter-group ${quizFilter ? 'open' : '' }`}>
        <span className="close" onClick={closeQuizFilter}><ModalClose/></span>
          <div className="form-group-inline subject_filter">
            <span className="label">Subject</span>
            <div className="custom-dropdown">
              <CustomDropdownCheckbox
                itemList={qiuzSubject}
                respondSelectedItem={filterSubjectType}
                keyItem={'subject'}
                type={'subject'}
              />
            </div>
          </div>
          <div className="form-group-inline">
            <span className="label">Ratings</span>
            <div className="custom-dropdown rating">
              <CustomRating
                ratingItem={false}
                ratingStar={RatingStar}
                respondRating={respondQuizRating}
                //reset={resetFilter}
              />
            </div>
          </div>
          <div className="form-group-inline">
            <span className="label">Sort by</span>
            <div className="custom-dropdown">
            <CustomDropdownRadio
              itemList={SortByQuiz }
              respondSelectedItem={respondQuizSortBy}
              keyItem={'label'}
              type={'sortBy'}
            />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}
