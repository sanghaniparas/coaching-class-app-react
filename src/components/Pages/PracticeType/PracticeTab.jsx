import React, { useState, useEffect } from "react";
import ReactCarousel, { consts } from "react-elastic-carousel";
import Carousel from "../Elements/Carousel";
import {
  Arrow,
  Heart,
  HeartFill,
  Location,
  Star,
} from "../../Core/Layout/Icon";
import wishlistApi from "../../../api/wishlist";
import axios from "axios";
import { BASE_URL } from "./../../../config";

export default function PracticeTab({
  practiceExamType,
  practiceSection,
  startPractice,
}) {
  const [filterByType, setFilterType] = useState(null);
  const [inWishList, setInWishList] = useState([]);
  const [isSubTab, setIsSubTab] = useState(
    practiceSection.length && practiceSection[0].sectionName
  );
  const [selectedPracticeList, setSelectedPracticeList] = useState(
    practiceSection.length &&
      practiceSection[0].practice_page_practice_set_lists
  );
  const [displayPracticeList, setDisplayPracticeList] = useState(
    practiceSection.length &&
      practiceSection[0].practice_page_practice_set_lists
  );
  const filterChange = (e) => setFilterType(e.target.value);
  useEffect(() => {
    filterPracticeSection();
  }, [filterByType, selectedPracticeList]);
  const handleSelectedSection = (item) => {
    setSelectedPracticeList(item.practice_page_practice_set_lists);
    setIsSubTab(item.sectionName);
    
  };
  const filterPracticeSection = () => {
    if (filterByType) {
      setDisplayPracticeList(
        selectedPracticeList.filter((item) => item.examTypeId == filterByType)
      );
    } else {
      setDisplayPracticeList(selectedPracticeList);
    }
  };
  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? "prev" : "next";
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}
      >
        {carlPointer}
      </button>
    );
  };

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];


  const handleWishList = async (item, id, productType, practice_wish_type) => {
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

    console.log(id);

    console.log(practiceSection)
   


    let updatedIndex;
    try {
      if (practice_wish_type === 1) {
        const response = await axios
          .post(`${BASE_URL}/wishlist/remove-from-wishlist`, body, config)
          .then((result) => {
            updatedIndex = displayPracticeList.findIndex(
              (w) => w.practiceId === result.data.data.itemId
            );
            displayPracticeList[updatedIndex].practice_wish_type =
              result.data.data.wish_type;
            setInWishList((item) => [
              ...item,
              { id, practice_wish_type: result.data.data.wish_type },
            ]);
            practiceSection.map(ps => ps.practice_page_practice_set_lists.filter(o => {
              if(o.practiceId === id){
                o.practice_wish_type = result.data.data.wish_type;
              }
            }))
          });

          
          
      }
      if (practice_wish_type === 2 || practice_wish_type === null) {
        const response = await axios
          .post(`${BASE_URL}/wishlist/add-to-wishlist`, body, config)
          .then((result) => {
            item.practice_wish_type = result.data.data.wish_type;
            updatedIndex = displayPracticeList.findIndex(
              (w) => w.practiceId === result.data.data.itemId
            );
            displayPracticeList[updatedIndex].practice_wish_type =
              result.data.data.wish_type;
            setInWishList((item) => [
              ...item,
              { id, practice_wish_type: result.data.data.wish_type },
            ]);
            practiceSection.map(ps => ps.practice_page_practice_set_lists.filter(o => {
              if(o.practiceId === id){
                o.practice_wish_type = result.data.data.wish_type;
              }
            }))
          });

         
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="paracticetype-tab-wrapper grey-bg-box">
      <div className="a-wrapper">
        <div className="a-container">
          <div className="header-filter">
            <div className="left-content">
              <ul>
                {practiceSection && practiceSection.map((item, idx) => (
                  <li
                    key={idx}
                    className={isSubTab === item.sectionName ? "active" : ""}
                    onClick={() => handleSelectedSection(item)}
                  >
                    {item.sectionName}
                  </li>
                ))}
              </ul>
            </div>
            <div className="filter-group">
              <span>Filter by</span>
              <select name="" id="" onChange={(e) => filterChange(e)}>
                <option value="">All Exams</option>
                {practiceExamType.map((el, idx) => (
                  <option key={idx} value={el.id}>
                    {el.examType}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {displayPracticeList.length > 0 ? (
            <Carousel heading={""}>
              <ReactCarousel
                itemsToShow={4}
                itemsToScroll={1}
                breakPoints={breakPoints}
                renderArrow={myArrow}
              >
                {displayPracticeList &&
                  displayPracticeList.map((item, idx) => (
                    <div className="a-carousel-item" key={idx}>
                      {localStorage.token && (
                        <div className="a-wishlist">
                          {item?.practice_wish_type === 1 ? (
                            <span
                              className="fevourite"
                              onClick={() =>
                                handleWishList(
                                  item,
                                  item.practiceId,
                                  (item.productType = 2),
                                  item.practice_wish_type
                                )
                              }
                            >
                              <HeartFill />
                            </span>
                          ) : (
                            <span
                              className="fevourite"
                              onClick={() =>
                                handleWishList(
                                  item,
                                  item.practiceId,
                                  (item.productType = 2),
                                  item.practice_wish_type
                                )
                              }
                            >
                              <Heart />
                            </span>
                          )}
                        </div>
                      )}
                      
                      <span className="a-bggray">
                        <h4>{item.practiceSetName}</h4>
                        <p>Attempted by {item.totalAttempt}</p>
                      </span>
                      <div className="a-listItem">
                        <div className="a-listTop">
                          <div className="a-itemHead">
                            <h4>
                              {item.coaching.coachingName > 36
                                ? `${item?.coaching?.coachingName.substring(
                                    0,
                                    36
                                  )} ...`
                                : item?.coaching?.coachingName}
                            </h4>
                            <div className="a-ratingandstars">
                              <div className="a-avatarProfile">
                                <span
                                  style={{
                                    backgroundImage: `url(${item?.coaching?.logoUrl})`,
                                  }}
                                ></span>
                              </div>
                              <b>
                                <span>
                                  <Star />
                                </span>{" "}
                                {item.ratingCount >= 3
                                  ? item.rating.toFixed(1)
                                  : "-"}
                              </b>
                              <b>
                                {item.ratingCount >= 3
                                  ? `${item.ratingCount} Ratings`
                                  : `(Not Rated)`}
                              </b>
                            </div>
                          </div>
                          <p className="a-location">
                            <span>
                              <Location />
                            </span>{" "}
                            {item?.coaching?.cityName}, {item?.coaching?.stateName}
                          </p>
                          <p className="a-typeExam">{item?.examTypeName}</p>
                          <ul className="a-optionDetails">
                            <li>Total Chapters: {item?.chapterCount}</li>
                            <li>Total Questions: {item?.questionCount}</li>
                            <li> {item?.language?.languageName}</li>
                          </ul>
                          <div
                            className="a-detailsBtn"
                            onClick={() => startPractice(item)}
                          >
                            <span>Start Practice</span>
                          </div>
                        
                        </div>
                      </div>
                    </div>
                  ))}
              </ReactCarousel>
            </Carousel>
          ) : (
            <div className="a-nodata-Content">No Practice Set Available</div>
          )}
        </div>
      </div>
    </div>
  );
}
