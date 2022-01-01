import React, { useState, useEffect, useCallback } from 'react';
import { Search, Filter, ModalClose } from '../../../Core/Layout/Icon';
import { Modal } from '../../../Core/Layout/Modal/Modal';
import { BASE_URL } from './../../../../config';
import axios from 'axios';
import debounce from 'lodash.debounce';
import { getPracticeSetData } from './../../../../redux/Dashboard/dashboard.actions';
import { useDispatch } from 'react-redux';
import examTypeApi from '../../../../api/practiceExamType'

const AdvancedSearchModal = ({ setModalToggle }) => {
  const dispatch = useDispatch();

  const [examTypes, setExamTypes] = useState(null);
  const [examIds, setExamIds] = useState([]);
  const [coachingList, setCoachingList] = useState(null);

  const [searchValue, setSearchValue] = useState('');
  const [coachingId, setCoachingId] = useState(null);

  const [dropdownToggle1, setDropDownToggle1] = useState(false);
  const [dropdownToggle2, setDropDownToggle2] = useState(false);
  const [dropdownToggle3, setDropDownToggle3] = useState(false);
  const [dropdownToggle4, setDropDownToggle4] = useState(false);

  const [searchDropdown, setSearchDropdown] = useState(true);

  const [rating, setRating] = useState('');
  const [category, setCategory] = useState('');

  const [practiceSetList, setPracticeSetList] = useState(null);
  const [practiceSetListFilter, setPracticeSetListFilter] = useState(null);
  const [practiceSetId, setPracticeSetId] = useState(null);

  const [practiceSetName, setPracticeSetName] = useState('');

  const [isActive, setActive] = useState(false);

  useEffect(() => {
    fetchExamtype()
  }, []);
  const fetchExamtype = async () => {

    let { attempted_practice_exam_types, attempted_practice_set_list } = await examTypeApi.practiceExamType()
    setExamTypes(attempted_practice_exam_types)
    setPracticeSetList(attempted_practice_set_list)
    setPracticeSetListFilter(attempted_practice_set_list)
  }



  const examIdChange = (elp) => {
    console.log("console", elp);
    let num = Number(elp.id);
    let findElIndex = examIds.findIndex((el) => el === num);
    if (findElIndex === -1) {
      setExamIds((examIds) => [...examIds, num]);
    }

    if (findElIndex !== -1) {
      // examIds.splice(findElIndex, 1);
      setExamIds(examIds.filter((item) => item !== num))
    }
    setDropDownToggle1(!dropdownToggle1)

  };

  //Debouncing search value


  useEffect(() => {

    if (searchValue.length) {
      fetchCoachingList()
      // filterPracticeSetList(searchValue, examIds)
    }

    filterPracticeSetList(searchValue, examIds, rating)
    //setPracticeSetList(filterData)

    //setPracticeSetList(filterPracticeSetList(searchValue, examIds))
  }, [searchValue, examIds, rating]);


  const filterPracticeSetList = (searchValue, examIds, rating) => {
    //console.log("rating", rating);

    let filterData = practiceSetListFilter?.filter((item) => {
      if (!examIds.length && !searchValue.length && !rating) {
        return true
      } else if (examIds.length && !searchValue.length & !rating) {

        return examIds.includes(item.examTypeId)
      } else if (!examIds.length && searchValue.length && !rating) {
        return item.coaching.coachingName.toLowerCase().includes(searchValue.trim().toLowerCase())
      } else if (!examIds.length && !searchValue.length && rating) {
        console.log("rating", rating);
        console.log("rating item", item.rating !== null ? (Number(item.rating) === Number(rating)) : false);
        return item.rating !== null ? (Number(item.rating) >= Number(rating)) : false
      } else {
        let flag = false
        if (item.coaching.coachingName.toLowerCase().includes(searchValue.trim().toLowerCase()) && examIds.includes(item.examTypeId)) {
          flag = true
          return flag
        }

      }
    })


    //return filterData
    setPracticeSetList(filterData)
    //console.log("practiceSetList **", practiceSetList);


  }
  useEffect(() => {
    console.log("filterData", practiceSetList);
  }, [practiceSetList])

  const fetchCoachingList = async () => {
    setCoachingList(await examTypeApi.practiceCoachingSearch(searchValue, examIds))
  }
  // setCoachingList(data);
  // For coaching select
  const selectCoaching = (el) => {
    setCoachingId(el.id);
    setSearchValue(el.coachingName);
    setSearchDropdown(false);
  };
  //   For fetching Coaching 


  //   For fetching practice sets
  const fetchPracticeSets = async () => {
    try {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };

      const body = {
        examTypeId: examIds.join(','),
        coachingId: coachingId.toString(),
        practiceRating: rating,
        practiceSortBy: category,
      };
      const {
        data: { data },
      } = await axios.post(
        `${BASE_URL}/dashboard/dashboard/attempted_practice_set_filter`,
        body,
        config
      );

      setPracticeSetList(data);
    } catch (error) {
      console.log(error);
    }
  };

  //   For setting practice id
  const setPracticeId = () => {
    dispatch(getPracticeSetData(practiceSetId.toString()));
    setModalToggle(false);
  };

  const showToggleCoaching = () => {
    setActive(!isActive);
  };

  return (
    <>
      <Modal addClass="practice-adv-modal">
        <span
          className="close"
          onClick={() => setModalToggle(false)}>
          <ModalClose />
        </span>
        <div className="modal-inner">
          <h2>Practice Advance Search</h2>
          <p>To search exact practice sets type and select form field</p>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="">Your Preferred Exam</label>
                <div className="form-field">
                  <div className="custom-dropdown">
                    <div
                      className="btn"
                      onClick={() => setDropDownToggle1(!dropdownToggle1)}>
                      {examIds.length ? examIds.length > 1 ? examTypes && examTypes.map((el) => {
                        if (examIds.includes(el.id)) return el.examType
                      }).join(' & ') : examTypes && examTypes.map((el) => {
                        if (examIds.includes(el.id)) return el.examType
                      }) : "Select Exam Types"}
                    </div>
                    {dropdownToggle1 && (
                      <ul className="practiceLi">
                        {examTypes &&
                          examTypes.map((el, idx) => (
                            // <li>

                            //   <p className="custom-checkbox">
                            //     <input
                            //       type="checkbox"
                            //       checked={examIds.includes(el.id)}
                            //       value={el.id}
                            //       id={el.examType}
                            //       onChange={(e) => examIdChange(e)}
                            //     />
                            //     <label htmlFor={el.examType}>
                            //       {el.examType}
                            //     </label>
                            //   </p>
                            // </li>

                            <li onClick={() => examIdChange(el)}>


                              <div>
                                {examIds.includes(el.id) ? <i class="fas fa-check-circle"></i> : <i class="far fa-circle"></i>}

                                <span> {el.examType}</span>
                              </div>
                            </li>



                          ))}
                        {/* 
                        {[1, 2, 3, 4].map((el, idx) => {

                          if (idx + 1 / 2 === 0) {
                            return (
                              <li>


                                <div>
                                  <i class="fas fa-check-circle"></i>
                                  <span>ssc</span>
                                </div>
                              </li>)
                          } else {

                            return (<li>


                              <div>
                                <i class="fas fa-check-circle"></i>
                                <span>ssc</span>
                              </div>
                            </li>)
                          }


                        })} */}
                      </ul>

                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Select Coaching</label>
                <div className="form-field">
                  <div className="custom-dropdown">
                    <div className="filter-input-group" className={isActive ? 'filter-input-group ': 'filter-input-group greyFilter' }>
                      <span className="search-icon">
                        <Search />
                      </span>
                      <input
                        type="text"
                        value={searchValue}
                        placeholder="Select and search coaching"
                        onChange={(e) => {
                          setSearchDropdown(true);
                          setSearchValue(e.target.value)
                        }}
                      />
                      <span className="filter" onClick={showToggleCoaching}>
                        <Filter />
                      </span>

                      {searchValue.length > 0 && searchDropdown && (
                        <ul className="coaching-list-modal">
                          {coachingList &&
                            coachingList.map((el) => (
                              <li onClick={() => selectCoaching(el)} className="coaching-item">
                                <div>
                                  <span style={{ backgroundImage: `url(${el.logoUrl})` }}></span>
                                  <span> <p>{el.coachingName}</p>
                                    <small>{el.totalTests} tests | {el.totalFollowers} followers</small>
                                  </span>

                                </div>
                                <div>
                                  <span>
                                    {el.city.city} {','}
                                    {el.state.name}</span>
                                </div>

                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="filterby_block" className={isActive ? 'filterby_block ': 'filterby_block toggleClass' }>
              <div className="form-group filterby" >
                <label htmlFor=""></label>
                <div className="form-field">
                  <div className="custom-dropdown rating rating-new">
                    <label htmlFor="">Filter by Ratings</label>
                    <div
                      className="btn"
                      onClick={() => setDropDownToggle2(!dropdownToggle2)}>
                      Ratings
                    </div>
                    {dropdownToggle2 && (
                      <ul>
                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              name="star"
                              id="4star"
                              value="4"
                              checked={rating === '4'}
                              onChange={(e) => {
                                setDropDownToggle2(!dropdownToggle2)
                                setRating(e.target.value)
                              }}
                            />
                            <label htmlFor="4star">
                              <img
                                src={require('../../../../assets/images/4star.svg')}
                                alt=""
                              />
                              <span>4 &amp; up</span>
                            </label>
                          </p>
                        </li>
                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              name="star"
                              id="3star"
                              value="3"
                              checked={rating === '3'}
                              onChange={(e) => {
                                setRating(e.target.value)
                                setDropDownToggle2(!dropdownToggle2)
                              }}
                            />
                            <label htmlFor="3star">
                              <img
                                src={require('../../../../assets/images/3star.svg')}
                                alt=""
                              />
                              <span>3 &amp; up</span>
                            </label>
                          </p>
                        </li>

                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              name="star"
                              id="1star"
                              value="2"
                              checked={rating === '2'}
                              onChange={(e) => {
                                setDropDownToggle2(!dropdownToggle2)
                                setRating(e.target.value)
                              }}
                            />
                            <label htmlFor="1star">
                              <img
                                src={require('../../../../assets/images/1star.svg')}
                                alt=""
                              />
                              <span>2 &amp; up</span>
                            </label>
                          </p>
                        </li>

                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              name="star"
                              id="2star"
                              value="1"
                              checked={rating === '1'}
                              onChange={(e) => {
                                setDropDownToggle2(!dropdownToggle2)
                                setRating(e.target.value)
                              }}
                            />
                            <label htmlFor="2star">
                              <img
                                src={require('../../../../assets/images/2star.svg')}
                                alt=""
                              />
                              <span>1 &amp; up</span>
                            </label>
                          </p>
                        </li>
                      </ul>
                    )}
                  </div>

                  <div className="custom-dropdown">
                    <label htmlFor="">Sort By</label>
                    <div
                      className="btn"
                      onClick={() => setDropDownToggle3(!dropdownToggle3)}>
                      Select Category
                    </div>
                    {dropdownToggle3 && (
                      <ul>
                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              id="Trending"
                              name="category"
                              value="1"
                              checked={category === '1'}
                              onChange={(e) => {
                                setDropDownToggle3(!dropdownToggle3)
                                setCategory(e.target.value)
                              }}
                            />
                            <label htmlFor="Trending">Trending</label>
                          </p>
                        </li>
                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              id="Popular"
                              name="category"
                              value="2"
                              checked={category === '2'}
                              onChange={(e) => {
                                setCategory(e.target.value)
                                setDropDownToggle3(!dropdownToggle3)
                              }}
                            />
                            <label htmlFor="Popular">Popular</label>
                          </p>
                        </li>

                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              id="Highest"
                              name="category"
                              value="3"
                              checked={category === '3'}
                              onChange={(e) => {
                                setDropDownToggle3(!dropdownToggle3)
                                setCategory(e.target.value)
                              }}
                            />
                            <label htmlFor="Highest">Highest Rated</label>
                          </p>
                        </li>

                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              id="Newly"
                              name="category"
                              value="4"
                              checked={category === '4'}
                              onChange={(e) => {
                                setCategory(e.target.value)
                                setDropDownToggle3(!dropdownToggle3)
                              }}
                            />
                            <label htmlFor="Newly">Newly Added</label>
                          </p>
                        </li>

                        <li>
                          <p className="custom-radio">
                            <input
                              type="radio"
                              id="Featured"
                              name="category"
                              value="5"
                              checked={category === '5'}
                              onChange={(e) => {
                                setCategory(e.target.value)
                                setDropDownToggle3(!dropdownToggle3)
                              }}
                            />
                            <label htmlFor="Featured">Featured</label>
                          </p>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>             
              </div>                  
              

              <div className="form-group">
                <label htmlFor="">Practice Sets</label>
                <div className="form-field">
                  <div className="custom-dropdown">
                    <div
                      className="btn"
                      onClick={() => {
                        // fetchPracticeSets();
                        setDropDownToggle4(!dropdownToggle4);
                      }}>
                      {practiceSetName.length === 0
                        ? 'Select Practice Set'
                        : practiceSetName}
                    </div>
                    {dropdownToggle4 && (
                      <ul>
                        {practiceSetList !== null && practiceSetList !== undefined &&
                          practiceSetList.map((el) => (
                            <li
                              onClick={() => {
                                setPracticeSetId(el.id);
                                setPracticeSetName(el.setName);
                                setDropDownToggle4(!dropdownToggle4)
                              }}>
                              {el.setName}
                            </li>
                          ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              class="btn-primary apply-filter-btn"
              onClick={() => setPracticeId()}
              disabled={
                searchValue.length === 0 || practiceSetId === null
                  ? true
                  : false
              }>
              Apply Filter
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AdvancedSearchModal;
