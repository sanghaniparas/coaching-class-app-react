import React, {useState, useEffect}  from 'react';
import { Link , useHistory} from 'react-router-dom';
import {ArrowDown, Heart, HeartFill, Location, Star, University } from '../../Core/Layout/Icon';
import Pagination from '../Elements/Pagination';
import {searchItemFormat} from '../Global/Formatter';
import {SEARCHCHOICE} from '../Global/Constant';
import axios from "axios";
import { BASE_URL } from "./../../../config";

export default function SearchPractice({searchPracticeData, setViewSection, isSubTab}) {
  //console.log('searchPracticeData', searchPracticeData);
  const [pagnation, setPagnation] = useState(1);
  const [perPage, setPerPage] = useState(5);


  const segregrateList = searchItemFormat(searchPracticeData,5);


  const [data, setData] = useState(searchItemFormat(searchPracticeData,perPage));

  const [productCount, setProductCount] = useState(1);

  const handlePageClick=(page)=>{

    setPagnation(pagnation+1);
    
    const segregrateList = searchItemFormat(searchPracticeData,perPage*(pagnation+1));
    setData(segregrateList);
  };

  useEffect(() => {
    if (searchPracticeData !== null) {
      console.log(searchPracticeData);
      const segregrateList = searchItemFormat(searchPracticeData,perPage);
      setData(segregrateList);
      setProductCount(segregrateList.length-1);
    }
  }, [searchPracticeData]);


 
  const viewSubSection = (e) => {
    e.preventDefault();
    setViewSection({id:'4',label:'Practice'})
  }
  const history = useHistory();
  const startPractice = (item) => history.push(`/practice-details/${item.id}`);


  const [inWishList, setInWishList] = useState([]);


  const handleWishList = async (item,id, productType,practice_wish_type) => {
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
      if (practice_wish_type === 1) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/remove-from-wishlist`,
          body,
          config
        ).then(result => {
          console.log(result.data)
          console.log(segregrateList[pagnation])
          updatedIndex =  segregrateList[pagnation].findIndex((w) => w.id === result.data.data.itemId);
          segregrateList[pagnation][updatedIndex].practice_wish_type = result.data.data.wish_type;
          setInWishList((item) => [...item, { id, practice_wish_type: result.data.data.wish_type }]);
         
        });
      
      }
      if (practice_wish_type === 2 || practice_wish_type === null) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/add-to-wishlist`,
          body,
          config
        ).then(result => {
          console.log(result.data)
          console.log(result.data.data)
          item.practice_wish_type =  result.data.data.wish_type;
          updatedIndex =  segregrateList[pagnation].findIndex((w) => w.id === result.data.data.itemId);
          segregrateList[pagnation][updatedIndex].practice_wish_type = result.data.data.wish_type;
          setInWishList((item) => [...item, { id, practice_wish_type: result.data.data.wish_type }]);
        });
       
      }

    
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="search-test-series practice-wrapper">
      <div className="header-filter">
        <div className="left-content">
          <h2>Practice {isSubTab !== SEARCHCHOICE.ALL && data.length > 0 && <span>({searchPracticeData.length})</span>}</h2>
        </div> 
        {data.length>2 && <div className="filter-group">
          {/* <Link to="/test-series-packages">View All</Link> */}
          <Link to="" onClick={(e)=>viewSubSection(e)}>View All</Link>
        </div>}
      </div>
      {(!data || data.length===0) && <div class="a-nodata-Content"> No Data Available</div>}
      {(!!data && data.length>0) && <React.Fragment>
        {data[1].map((item,idx) => (        
          <div className="card" key={idx}>
            <div className="testseries-box practice" >
              <div className="testseries-img">
                <h2>{item.setName}</h2>
                <img src={require('../../../assets/images/search-practice01.svg')} alt="" />
                {item?.coachings.logoUrl  !== null ? 
                  <span className="avatar" style={{ backgroundImage: `url(${item?.coachings.logoUrl})` }}></span>:
                  <span className="avatar" style={{ backgroundImage: `url('https://via.placeholder.com/272x150?text=${item?.coachings?.coachingName}')` }}></span>
                }  
                {/* <img src={require('../../../assets/images/search-practice01.svg')} alt="" /> */}
                {/* <span className="avatar" style={{ backgroundImage: `url(${require('../../../assets/images/about-04.jpg')})` }}></span> */}
              </div>
              <div className="testseries-info-wrapper">
                <div className="testseries-info">
                  <h3 className="test-name">
                    {item.setName}
                    {localStorage.token && 
                    <div className="a-wishlist">
                        {item.practice_wish_type  === 1 ? (
                            <span className="fevourite" onClick={() => handleWishList(item,item.id, item.productType, item.practice_wish_type)}>
                              <HeartFill />
                            </span>
                          ) : (
                            <span className="fevourite" onClick={() => handleWishList(item,item.id, item.productType, item.practice_wish_type)}>
                              <Heart />
                            </span>
                          )}
                      </div>
                     }
                  </h3>
                  <p className="inst-name">{item?.coachings?.coachingName}</p>
                  <p className="location"><Location /> {item?.coachings?.cityName}, {item?.coachings?.stateName}</p>
                  <p className="test-exam">{item?.examTypeName}</p>
                  <ul>
                    <li>Total Chapter: {item.subjectCount || 0}</li>
                    <li>Total questions: {item.questionCount || 0}</li>
                    {item.languages.length>0 && <li>
                      {item.languages.map((i, idx) => (
                        <span key={idx}>
                          {i.languageName} {item.languages.length!==(idx+1)&& <b>| </b>}
                        </span>
                      ))}
                    </li>}
                  </ul>
                </div>
                <div className="price-info">
                  <p className="rating"><Star />
                    <strong>{item.ratingCount>2?item.ratingCount:'-'}{' '}</strong>
                    {item.ratingCount>2?`(${item?.rating.toFixed(2)} Ratings)`:''}                         
                  </p>
                 <div className="attempted">Attempted by {item.totalAttempt || 0}</div>

                  <button className="btn-primary" onClick={() => startPractice(item)}>Start Practice</button>

                  
                </div>
              </div>
            </div>
          </div>        
          ))        
        }
        <div className="pagination">
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
       
      {/* {!!searchPracticeData && <Pagination pageCount={10}/>} */}
    </div>
  )
}
