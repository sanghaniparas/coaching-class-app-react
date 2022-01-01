import React, { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import { Modal } from '../../Core/Layout/Modal/Modal';
import { Link } from 'react-router-dom';
import { Heart, HeartFill, AccuracyIcon, AlarmClock, ArrowDown, CheckCircle, CloseCircle, Filter, FilterResultIcon, Location, ModalClose, Quizz, Search } from '../../Core/Layout/Icon';
import { Layout } from '../Layout/Layout';
import QuizFilter from './QuizFilter';
import QuizHeaderFilter from './QuizHeaderFilter';
import { useDispatch } from 'react-redux';



export const Quizzes = () => {
  const [dropdown, setdropdown] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showListcount, setShowListcount] = useState(1);
  const [attemptedQuizExamType, setAttemptedQuizExamType] = useState();
  const [allAttemptedQuizExamType, setAllAttemptedQuizExamType] = useState();
  const [qiuzSubject, setQiuzSubject] = useState('');
  const [subjectType, setSubjectType] = useState('');
  const [examType, setExamType] = useState('');
  const [coachingRatingSelected, setCoachingRatingSelected] = useState('');
  const [quizRatingSelected, setQuizRatingSelected] = useState('');
  const [coachingSortBy, setcoachingSortBy] = useState('');
  const [quizSortBy, setquizSortBy] = useState('');
  const [filterAttemtedQuiz, setFilterAttemtedQuiz] = useState('');
  const [fillterCoachingID, setFillterCoachingID] =useState('');
  const [headerExam, setHeaderExam] =useState([]);
  const [resetFilter, setResetFilter] = useState(false);

  const [inWishList, setInWishList] = useState([]);


  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };




  useEffect(() => {    
    getQuizOptions();
  }, []);
  useEffect(() => {


    const payload = {
      subject: subjectType != 0 ?subjectType : '',
      exam_type: examType,
      coaching_rating: coachingRatingSelected,
      quiz_rating: quizRatingSelected,
      coaching_sort_by: coachingSortBy,
      quiz_sort_by: quizSortBy,
      coaching_id: fillterCoachingID
    };
    getAttemtedQuizListing(payload);
  }, [subjectType, examType, coachingRatingSelected, quizRatingSelected, coachingSortBy, quizSortBy]);
  //}, [subjectType, quizRatingSelected,  quizSortBy]);


  const getAttemtedQuizListing = async (payload) => {
    console.log('payload', payload);
    const mainapi = `${BASE_URL}/dashboard/dashboard/attempted_quizzes`;    
    try {
      const res = await axios.post(mainapi,payload, config);
      console.log('res-------->', res);
      setFilterAttemtedQuiz(res.data.data.all_quizzes);
      setAllAttemptedQuizExamType(res.data.data.quiz_details_data);
    } catch (error) {
      console.log('Something went wrong. Please try again later !');
    }
  }
  const getQuizOptions = async () => {
    try {
      const mainapi = `${BASE_URL}/dashboard/dashboard/attempted_quizze_examtypes_subjects`;
      const res = await axios.get(mainapi, config);
      setAttemptedQuizExamType(res.data.data.quiz_page_exam_types);

      setAllAttemptedQuizExamType(res.data.data);
      setQiuzSubject(res.data.data.quiz_page_subjects);
   
    } catch (error) {
      console.log('Something went wrong. Please try again later !');
    }
  }
  const dropdownToggleHandler = () => {
    setdropdown(!dropdown);
  }
  // Quiz filter
  const [quizfilter, setquizfilter] = useState(false);


  const quizFilterToggle = () => {
    setquizfilter(!quizfilter)
  }
  const quizCloseFilter = () => {
    setquizfilter(false)
  }
  
  const filterExamType = (selectedValue) => {

    console.log(selectedValue)

    let selectedData = selectedValue==0 ?  '':selectedValue;
    
   // let examTypeArray = testPackage.coaching_exam_types !=='' && testPackage.coaching_exam_types.split(' & ');

    console.log(selectedData)
    setExamType(selectedData);
    // setHeaderExam( attemptedQuizExamType.filter((item)=>item.id==selectedData));
    // const payload = {
    //   subject: subjectType || '',
    //   exam_type: selectedData,
    //   coaching_rating: coachingRatingSelected,
    //   quiz_rating: quizRatingSelected,
    //   coaching_sort_by: coachingSortBy,
    //   quiz_sort_by: quizSortBy,
    //   coaching_id: fillterCoachingID
    // };
    // getAttemtedQuizListing(payload);
  }
  const filterSubjectType = (selectedValue) => {
    let selectedData = selectedValue==0 ?  '':selectedValue;
    setSubjectType(selectedData)
  };


  const respondCoachingRating = (rating) => {
    setCoachingRatingSelected(rating);
   
  }

  const respondCoachingSortBy = (sortBy) => {
    setcoachingSortBy(sortBy);
   
  }


  const respondQuizRating = (rating) => {
    setQuizRatingSelected(rating);
  }

  const respondQuizSortBy = (sortBy) => {
    setquizSortBy(sortBy);
  } 
  
  const showMore = (event) => {
    event.preventDefault();
    setShowListcount(showListcount+1);
  }
  const filterCoaching = (selectedValue) => setFillterCoachingID(selectedValue);
  const filetrQuiz = () => { 

    setTimeout(() => {
      const payload = {
        subject: subjectType || '',
        exam_type: examType,
        coaching_rating: coachingRatingSelected,
        quiz_rating: quizRatingSelected,
        coaching_sort_by: coachingSortBy,
        quiz_sort_by: quizSortBy,
        coaching_id: fillterCoachingID
      };
      getAttemtedQuizListing(payload);
    });

  
  }

  const history = useHistory();
  const resetQuizCoaching = () => {

    
    setTimeout(() => {
      history.replace("/quizzes/1");
      history.push("/quizzes");
    });



  }


  
  const handleWishList = async (item,id, productType,quiz_wish_type) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: productType.toString(),
      itemId: id,
    });



    let updatedIndex;
    try {
      if (quiz_wish_type === 1) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/remove-from-wishlist`,
          body,
          config
        ).then(result => {
         
          updatedIndex = filterAttemtedQuiz.findIndex((w) => w.id === result.data.data.itemId);
         filterAttemtedQuiz[updatedIndex].quiz_wish_type = result.data.data.wish_type;
          setInWishList((item) => [...item, { id, quiz_wish_type: result.data.data.wish_type }]);
         
        });
      
      }
      if (quiz_wish_type === 2 || quiz_wish_type === null) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/add-to-wishlist`,
          body,
          config
        ).then(result => {
          console.log(result.data)
          console.log(result.data.data)
          item.quiz_wish_type =  result.data.data.wish_type;


          updatedIndex = filterAttemtedQuiz.findIndex((w) => w.id === result.data.data.itemId);
         filterAttemtedQuiz[updatedIndex].quiz_wish_type = result.data.data.wish_type;
         
          setInWishList((item) => [...item, { id, quiz_wish_type: result.data.data.wish_type }]);
        });
       
      }

    
    } catch (err) {
      console.log(err);
    }
  };
  const dispatch = useDispatch();


  const startQuiz = quizItem => {
   
    history.push(`/quizdetails/${quizItem.id}`);
  }


  const viewResults = quizItem => {
    let quizResultId = quizItem.quizResult.slice(-1)[0].id;
    history.push(`/quizreport/${quizItem.id}/${quizResultId}`);
  }


  return (
    <Layout>
      <div className="dashboard-card-items quizzes">
        <div className="practice-bottom-filter practice-bottom-filter-new">
          <div className="coaching-info">
            <p>Select Exam</p>
            <h4>{headerExam[0] && headerExam[0].examType || 'All'}</h4>
          </div>
          {allAttemptedQuizExamType && <div className="coaching-filter">
            <div className="item">
              <h4>
                <Quizz /> {allAttemptedQuizExamType.totalAttemptedQuiz}
                            </h4>
              <p>Quiz attempted</p>
            </div>
            <div className="item">
              <h4>
                <CheckCircle /> {allAttemptedQuizExamType.totalCorrectQuestion}
                            </h4>
              <p>Correct Answered</p>
            </div>
            <div className="item">
              <h4>
                <CloseCircle /> {allAttemptedQuizExamType.totalIncorrectQuestion}
                            </h4>
              <p>Incorrect answered</p>
            </div>
            <div className="item">
              <h4>
                <AccuracyIcon /> {((allAttemptedQuizExamType.totalCorrectQuestion/allAttemptedQuizExamType.totalAttemptedQuizQuestion)/100).toFixed(2)}%
                            </h4>
              <p>Accuracy</p>
            </div>
          </div>}
        </div>
      </div>
      {/* FILTER */}
      <QuizFilter 
        attemptedQuizExamType={attemptedQuizExamType}
        filterExamType={filterExamType}
        respondCoachingRating={respondCoachingRating}
        respondCoachingSortBy={respondCoachingSortBy}
        filterCoaching={filterCoaching}
        filetrQuiz={filetrQuiz}
        resetQuizCoaching={resetQuizCoaching}
        resetFilter={resetFilter}
      />
      <QuizHeaderFilter 
        qiuzSubject={qiuzSubject}
        filterSubjectType={filterSubjectType}
        respondQuizRating={respondQuizRating}
        respondQuizSortBy={respondQuizSortBy}
        filterAttemtedQuiz={filterAttemtedQuiz}
      />
      {/* Header filter */}
      
      <div className="quiz-dash-card-wrapper">
        {filterAttemtedQuiz && filterAttemtedQuiz.map((item, idx) => {
           return (
            idx < showListcount*10 && <div className={`qz-card a-bggray`} key={idx} style={{ border: '1px solid #3a466b'}}>
              <div className="qz-card-header" >
                <h3>{item.quizName}
                <div className="a-wishlist">
                        {item.quiz_wish_type  === 1 ? (
                            <span className="fevouriteQuizez" onClick={() => handleWishList(item,item.id, item.productType, item.quiz_wish_type)}>
                              <HeartFill />
                            </span>
                          ) : (
                            <span className="fevouriteQuizez" onClick={() => handleWishList(item,item.id, item.productType, item.quiz_wish_type)}>
                              <Heart />
                            </span>
                          )}
                      </div>
                </h3>
                {/* <h4>Ques. Quiz</h4> */}
                <AlarmClock fill="#fff" />
              </div>
              <div className="qz-card-body qz-card-body-blk" style={{border:'none'}}>
                <h3>{item.coachings.coachingName}</h3>
                <p className="location">
                  <Location /> {item.coachings.cityName}, {item.coachings.stateName}
                        </p>
                <ul className="items">
                  <li>Subject: {item.examTypeName}</li>
                  <li>Questions: {item.questionCount}</li>
                  <li>Total Time: {item.duration} min</li>
                </ul>
                {/* {item.quizResult.length===0&&<button className="btn-primary radius" onClick={() => startQuiz(item)}>
                  <AlarmClock fill="#fff" /> Start Quiz
                </button>} */}
                {
                  //const lastItem = item[item.length - 1]
                item.quizResult.length>0 && item.quizResult.find(x => x.isCompleted === 1) ? <button className="btn-primary radius" onClick={() => viewResults(item)}>
                  View Results
                </button> : <button className="btn-primary radius" onClick={() => startQuiz(item)}>
                  <AlarmClock fill="#fd8041" /> Start Quiz
                </button>
                }
              </div>

            </div>
          )})
        }

      {filterAttemtedQuiz.length === 0 && <div className="a-nodata-Content"> No Data Available</div>}
      </div>
      {filterAttemtedQuiz && filterAttemtedQuiz.length>showListcount*10  && <div className="viewmore">
        <div onClick={(event)=>showMore(event)}>View more <ArrowDown /></div>
      </div>}
      {
        quizfilter &&
        <Modal addClass="quizz-filter-modal">
          <span className="close" onClick={quizCloseFilter}><ModalClose /></span>
          <div className="form-group-inline">
            <span className="label">Subject</span>
            <div className="custom-dropdown">
              <button className="btn" onClick={dropdownToggleHandler}>Physics</button>
              {dropdown &&
                <ul>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="" id="ssc" />
                      <label htmlFor="ssc">SSC</label>
                    </p>
                  </li>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="" id="banking" />
                      <label htmlFor="banking">Banking</label>
                    </p>
                  </li>
                </ul>
              }
            </div>
          </div>
          <div className="form-group-inline">
            <span className="label">Ratings</span>
            <div className="custom-dropdown rating">
              <button className="btn" onClick={dropdownToggleHandler}>Ratings</button>
              {dropdown &&
                <ul>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="star" id="0star" />
                      <label htmlFor="0star">
                        All Ratings
                                        </label>
                    </p>
                  </li>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="star" id="4star" />
                      <label htmlFor="4star">
                        <img src={require('../../../assets/images/4star.svg')} alt="" />
                        <span>4.5 &amp; up <i>360</i></span>
                      </label>
                    </p>
                  </li>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="star" id="3star" />
                      <label htmlFor="3star">
                        <img src={require('../../../assets/images/3star.svg')} alt="" />
                        <span>4.0 &amp; up <i>480</i></span>
                      </label>
                    </p>
                  </li>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="star" id="2star" />
                      <label htmlFor="2star">
                        <img src={require('../../../assets/images/2star.svg')} alt="" />
                        <span>4.0 &amp; up <i>480</i></span>
                      </label>
                    </p>
                  </li>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="star" id="1star" />
                      <label htmlFor="1star">
                        <img src={require('../../../assets/images/1star.svg')} alt="" />
                        <span>4.0 &amp; up <i>480</i></span>
                      </label>
                    </p>
                  </li>
                </ul>
              }
            </div>

          </div>
          <div className="form-group-inline">
            <span className="label">Sort by</span>
            <div className="custom-dropdown">
              <button className="btn" onClick={dropdownToggleHandler}>Highest Rated</button>
              {dropdown &&
                <ul>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="" id="ssc" />
                      <label htmlFor="ssc">SSC</label>
                    </p>
                  </li>
                  <li>
                    <p className="custom-radio">
                      <input type="radio" name="" id="banking" />
                      <label htmlFor="banking">Banking</label>
                    </p>
                  </li>
                </ul>
              }
            </div>
          </div>
        </Modal>
      }
    </Layout>
  )
}
