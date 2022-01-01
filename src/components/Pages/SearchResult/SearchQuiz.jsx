import React, {useState,useEffect}  from 'react';
import { Link , useHistory} from 'react-router-dom';
import {ArrowDown, Heart, HeartFill, Location, QuizClock, Star } from '../../Core/Layout/Icon';
import Pagination from '../Elements/Pagination';
import {searchItemFormat} from '../Global/Formatter';
import {SEARCHCHOICE} from '../Global/Constant';
import axios from "axios";
import { BASE_URL } from "./../../../config";

import { useDispatch } from 'react-redux';
import { toggleSignUp } from '../../../redux/actions/auth';


export default function SearchQuiz({searchQuizData, setViewSection, isSubTab}) {
  //console.log('searchQuizData', searchQuizData);
  const [pagnation, setPagnation] = useState(1);
  const [perPage, setPerPage] = useState(3);
  const segregrateList = searchItemFormat(searchQuizData,3);

  const [data, setData] = useState(searchItemFormat(searchQuizData,perPage));

  const [productCount, setProductCount] = useState(1);

  const handlePageClick=(page)=>{

    setPagnation(pagnation+1);
    
    const segregrateList = searchItemFormat(searchQuizData,perPage*(pagnation+1));
    setData(segregrateList);
  };

  const history = useHistory();
  const dispatch = useDispatch();
  const startQuiz = (id) => {
    if (localStorage.getItem('token') === null || localStorage.getItem('token') === '') {
      return dispatch(toggleSignUp(true));
    }
    history.push(`/quizdetails/${id}`)
  };
 


  useEffect(() => {
    if (searchQuizData !== null) {
      console.log(searchQuizData);
      const segregrateList = searchItemFormat(searchQuizData,perPage);
      setData(segregrateList);
      setProductCount(segregrateList.length-1);
    }
  }, [searchQuizData]);

  const viewSubSection = (e) => {
    e.preventDefault();
    setViewSection({id:'5',label:'Quiz'})
  }

 
  const [inWishList, setInWishList] = useState([]);


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
          console.log(result.data)
          console.log(data[pagnation])
          updatedIndex =  data[pagnation].findIndex((w) => w.id === result.data.data.itemId);
          data[pagnation][updatedIndex].quiz_wish_type = result.data.data.wish_type;
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


          updatedIndex =  data[pagnation].findIndex((w) => w.id === result.data.data.itemId);
          data[pagnation][updatedIndex].quiz_wish_type = result.data.data.wish_type;
         
          setInWishList((item) => [...item, { id, quiz_wish_type: result.data.data.wish_type }]);
        });
       
      }

    
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="search-test-series quiz-wrapper">
      <div className="header-filter">
        <div className="left-content">
          <h2>Quizzes {isSubTab !== SEARCHCHOICE.ALL && data.length > 0 && <span>({searchQuizData.length})</span>}</h2>
        </div>
        {data.length>2 &&<div className="filter-group">
          {/* <Link to="/quiz">View All</Link> */}
          <Link to="" onClick={(e)=>viewSubSection(e)}>View All</Link>
        </div>}
      </div>
      {/* {!searchQuizData && <div>No Data Available</div>}
      {!!searchQuizData && searchQuizData.length===0 &&  <div>No Data Available</div>}
      {!!searchQuizData && searchQuizData.length>0 && searchQuizData.map((item,idx) => ( */}
      {(!data || data.length===0) && <div class="a-nodata-Content"> No Data Available</div>}
      {(!!data && data.length>0) && <React.Fragment>
        {data[1].map((item,idx) => (
          <div className="card" key={idx}>

            <div className="testseries-box quizes" >
              <div className="testseries-img">
                <h2>{item.quizName}</h2>
                  <img src={require('../../../assets/images/search-quiz03.svg')} alt="" />
                  {item?.coachings.logoUrl  !== null ? 
                    <span className="avatar" style={{ backgroundImage: `url(${item?.coachings.logoUrl})` }}></span>:
                    <span className="avatar" style={{ backgroundImage: `url('https://via.placeholder.com/272x150?text=${item?.coachings?.coachingName}')` }}></span>
                  }    
              </div>
              <div className="testseries-info-wrapper">
                <div className="testseries-info">
                  <h3 className="test-name">
                    {item.quizName}
                    {localStorage.token && 
                    <div className="a-wishlist">
                        {item.quiz_wish_type  === 1 ? (
                            <span className="fevourite" onClick={() => handleWishList(item,item.id, item.productType, item.quiz_wish_type)}>
                              <HeartFill />
                            </span>
                          ) : (
                            <span className="fevourite" onClick={() => handleWishList(item,item.id, item.productType, item.quiz_wish_type)}>
                              <Heart />
                            </span>
                          )}
                      </div>
                    }         
                  </h3>
                  <p className="inst-name">  {item?.coachings?.coachingName}</p>
                  <p className="location"><Location /> {item?.coachings?.cityName}, {item?.coachings?.stateName}</p>
                  <p className="test-exam">{item?.examTypeName}</p>
                  <ul>
                    <li>Questions: {item.questionCount||0}</li>
                    <li>Max Marks: {item.totalMarks || 0}</li>
                    <li>Time: {item.duration} Mins</li>
                    <li>{item.languages.languageName}</li>
                  </ul>
                </div>
                <div className="price-info">
                  <p className="rating"><Star />
                    <strong>{item.ratingCount>2?item.ratingCount:'-'}{' '}</strong>
                    {item.ratingCount>2?`(${item?.rating.toFixed(2)} Ratings)`:''}                         
                  </p>
                  <div className="attempted">Attempted by {item.totalAttempt || 0}</div>
                  <button className="btn-primary" onClick={() => startQuiz(item.id)}><QuizClock /> Start Quiz</button>
                </div>
              </div>
            </div>
          </div>
        ))
      }
      <div className="pagination">
        {/* {isSubTab !== SEARCHCHOICE.ALL && <Pagination pageCount={data.length-1} handlePageClick={handlePageClick}/>} */}

        {isSubTab !== SEARCHCHOICE.ALL && data !== null &&
                   pagnation!== productCount && (
          <div className="viewmore" onClick={() => handlePageClick()}>
            <div>
              View More <ArrowDown />
            </div>
          </div>
        )}
      </div>
    </React.Fragment>}
    </div>
  )
}
