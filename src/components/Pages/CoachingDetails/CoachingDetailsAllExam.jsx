import React, { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router-dom";
import ReactCarousel, { consts } from "react-elastic-carousel";
import { useToasts } from "react-toast-notifications";
import Carousel from "../Elements/Carousel";
import {
  Arrow,
  Heart,
  Star,
  University,
  Location,
  HeartFill,
} from "../../Core/Layout/Icon";
import axios from "axios";
import { BASE_URL } from "./../../../config";

const CoachingDetailsAllExam = ({
  dataPage,
  handleWishlist,
  wishList,
  match,
  pageDetails,
}) => {
  const [inWishList, setInWishList] = useState([]);
  const { addToast } = useToasts();
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

  const history = useHistory();

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  const routerQuizPageChange = (id) => {
    let path = `/quizdetails/${id}`;
    history.push(path);
  };

  const routerPracticePageChange = (id) => {
    let path = `/practice-details/${id}`;
    history.push(path);
  };

  localStorage.setItem("coachingId", match.params.id);

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" ||
      localStorage.getItem("token") !== null
    ) {
      dataPage.map((el) =>
        el.objectList.map((el) => checkInWishList(el.id, el.productType))
      );
    }
  }, []);

  //   To check which test package is in whishlist and storing it
  const checkInWishList = async (id, productType) => {
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
    try {
      const {
        data: { data, message },
      } = await axios.post(`${BASE_URL}/wishlist/checkWishList`, body, config);

      if (message !== "Invalid auth token") {
        setInWishList((inWishList) => [...inWishList, { id, have: data.have }]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for changing
  const handleWishList = async (id, productType) => {
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
    let selected = inWishList.find((w) => w.id === id).have;
    console.log(id, selected, inWishList);
    let updatedIndex;
    try {
      if (selected === 1) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/remove-from-wishlist`,
          body,
          config
        );
        updatedIndex = inWishList.findIndex((w) => w.id === id);
        inWishList[updatedIndex].have = 0;
      }
      if (selected === 0) {
        const response = await axios.post(
          `${BASE_URL}/wishlist/add-to-wishlist`,
          body,
          config
        );
        updatedIndex = inWishList.findIndex((w) => w.id === id);
        inWishList[updatedIndex].have = 1;
      }

      setInWishList([...inWishList]);
    } catch (err) {
      console.log(err);
    }
  };

  const buyNow = (innerItem) => {
    if (!!localStorage.getItem("token")) {
      history.push({
        pathname: `/cart`,
        state: { id: innerItem.id, type: 2 },
      });
    } else {
      addToast("Please Login to add product in cart", {
        appearance: "warning",
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="a-wrapping-Content details-area similar-coaching-details">
      {dataPage &&
        dataPage.map((item, idx) => (
          <React.Fragment key={idx}>
            {item.productType === 1 && (
              <div className="a-wrapper">
                <div className="a-container">
                  <Carousel heading={item.sectionName}>
                    <ReactCarousel
                      itemsToShow={4}
                      itemsToScroll={1}
                      breakPoints={breakPoints}
                      renderArrow={myArrow}
                    >
                      {item &&
                        item.objectList.map((innerItem, ids) => (
                          <div className="a-carousel-item" key={ids}>
                            {localStorage.getItem("token") !== "" &&
                              localStorage.getItem("token") !== null && (
                                <div className="a-wishlist">
                                  {inWishList.length &&
                                  inWishList.find((w) => w.id === innerItem.id)
                                    ?.have === 1 ? (
                                    <span
                                      onClick={() =>
                                        handleWishList(
                                          innerItem.id,
                                          innerItem.productType
                                        )
                                      }
                                    >
                                      <HeartFill />
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleWishList(
                                          innerItem.id,
                                          innerItem.productType
                                        )
                                      }
                                    >
                                      <Heart />
                                    </span>
                                  )}
                                </div>
                              )}
                            {innerItem.packageImageUrl !== null ? (
                              <span
                                onClick={() => routerChange(innerItem.id)}
                                style={{
                                  backgroundImage: `url(${innerItem.packageImageUrl})`,
                                }}
                              ></span>
                            ) : (
                              <span
                                onClick={() => routerChange(innerItem.id)}
                                style={{
                                  backgroundImage: `url('https://via.placeholder.com/272x150?text=${innerItem.packageName}')`,
                                }}
                              ></span>
                            )}
                            <div className="a-listItem">
                              <div className="a-listTop">
                                <div
                                  className="a-itemHead"
                                  onClick={() => routerChange(innerItem.id)}
                                >
                                  <h4>
                                    {innerItem.packageName.length > 36
                                      ? `${innerItem.packageName.substring(
                                          0,
                                          36
                                        )} ...`
                                      : innerItem.packageName}
                                  </h4>
                                  <div className="a-ratingandstars">
                                    <div className="a-avatarProfile">
                                      {innerItem.coaching.logoUrl !== null ? (
                                        <span
                                          style={{
                                            backgroundImage: `url(${innerItem?.coaching?.logoUrl})`,
                                          }}
                                        ></span>
                                      ) : (
                                        <span
                                          style={{
                                            backgroundImage: `url('https://via.placeholder.com/40x40?text=${innerItem.coaching.coachingName}')`,
                                          }}
                                        ></span>
                                      )}
                                    </div>

                                    {!innerItem.rating ? (
                                      <b>
                                        <span>
                                          <Star />
                                        </span>{" "}
                                        -
                                      </b>
                                    ) : (
                                      <b>
                                        <span>
                                          <Star />
                                        </span>
                                      
                                        {(innerItem.rating &&
                                          innerItem.ratingCount.toFixed(1) >
                                            2 &&
                                          innerItem.rating.toFixed(1)) ||
                                          `-`}
                                      </b>
                                    )}

                                    {/* <b>({innerItem.ratingCount} Ratings)</b> */}
                                    <b>
                                      (
                                      {innerItem.ratingCount.toFixed(1) > 2
                                        ? `${innerItem.ratingCount} Ratings`
                                        : `Not Rated`}
                                      )
                                    </b>
                                  </div>
                                </div>
                                <p className="a-location">
                                  <span>
                                    <University />
                                  </span>{" "}
                                  {pageDetails?.coachingName}
                                </p>
                                <p
                                  className="a-typeExam"
                                  onClick={() => routerChange(innerItem.id)}
                                >
                                  {innerItem &&
                                    innerItem.examTypes.map((i, idx) =>
                                      idx < innerItem.examTypes.length - 1 ? (
                                        <b key={idx}>{i.examType}, </b>
                                      ) : (
                                        <b key={idx}>{i.examType}</b>
                                      )
                                    )}
                                </p>
                                <ul
                                  className="a-optionDetails"
                                  onClick={() => routerChange(innerItem.id)}
                                >
                                  <li>No of Tests: {innerItem.noOfTest}</li>
                                  
                                    {innerItem.testTypes && innerItem.testTypes.length > 0  &&  innerItem.testTypes[0].testTypeName!=='' && <li>
                                      { innerItem.testTypes.map((el, i) =>
                                          i === innerItem.testTypes.length - 1
                                            ? `${el.testTypeCount} ${el.testTypeName}`
                                            : `${el.testTypeCount} ${el.testTypeName} + `
                                        )
                                      }
                                  </li> }
                                  <li>
                                    {innerItem &&
                                      innerItem.languages.map((i, idx) => (
                                        <span key={idx}>
                                          {i.languageName} <b>|</b>{" "}
                                        </span>
                                      ))}
                                  </li>
                                  <li>Validity {innerItem.validity}</li>
                                </ul>
                                <div
                                  className="a-rupeeDetails"
                                  onClick={() => routerChange(innerItem.id)}
                                >
                                  {(innerItem.onSaleStatus === 0 &&
                                    innerItem.saleType === 4 && (
                                      <p>
                                        <span>&#8377;</span> 0 /-
                                      </p>
                                    )) || (
                                    <p>
                                      <span>&#8377;</span>{" "}
                                      {innerItem.discountPrice
                                        ? innerItem.discountPrice
                                        : innerItem.productPrice}{" "}
                                      /-
                                    </p>
                                  )}
                                </div>

                                {innerItem.status === 5 ? (
                                  innerItem.onSaleStatus === 0 ? (
                                    <div className="a-detailsBtn">
                                      {innerItem.saleType === 1 && (
                                        <span onClick={() => buyNow(innerItem)}>
                                          BUY NOW
                                        </span>
                                      )}
                                      {innerItem.saleType === 2 && (
                                        <span onClick={() => routerChange(innerItem.id)}>SHARE & UNLOCK</span>
                                      )}
                                      {innerItem.saleType === 3 && (
                                        <span onClick={() => routerChange(innerItem.id)}>SHARE THROUGH PASS</span>
                                      )}
                                      {innerItem.saleType === 4 && (
                                        <span onClick={() => routerChange(innerItem.id)}>UNLOCK FREE</span>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="a-detailsBtn">
                                      <button
                                        className="disabled btn-primary radius btn-block"
                                        type="button"
                                        disabled
                                      >
                                        UNAVAILABLE
                                      </button>
                                    </div>
                                  )
                                ) : (
                                  <div className="a-detailsBtn">
                                    <button
                                      className="disabled btn-primary radius btn-block"
                                      type="button"
                                      disabled
                                    >
                                      UNAVAILABLE
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </ReactCarousel>
                  </Carousel>
                </div>
              </div>
            )}
            {item.productType === 2 && (
              <div className={`a-wrapper ${item.productType === 2 ? 'practice-slider-wrap' : ''}`}>
                <div className="a-container">
                  <Carousel heading={item.sectionName}>
                    <ReactCarousel
                      itemsToShow={4}
                      itemsToScroll={1}
                      breakPoints={breakPoints}
                      renderArrow={myArrow}
                    >
                      {item &&
                        item.objectList.map((innerItem, ids) => (
                          <div className="a-carousel-item" key={ids}>
                            {localStorage.getItem("token") !== "" &&
                              localStorage.getItem("token") !== null && (
                                <div className="a-wishlist">
                                  {inWishList.length &&
                                  inWishList.find((w) => w.id === innerItem.id)
                                    ?.have === 1 ? (
                                    <span
                                      onClick={() =>
                                        handleWishList(
                                          innerItem.id,
                                          innerItem.productType
                                        )
                                      }
                                    >
                                      <HeartFill />
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleWishList(
                                          innerItem.id,
                                          innerItem.productType
                                        )
                                      }
                                    >
                                      <Heart />
                                    </span>
                                  )}
                                </div>
                              )}
                            <span className="a-bggray">
                              <h4>{innerItem.setName}</h4>
                              <p>Attempted by {innerItem.totalAttempt}</p>
                            </span>
                            <div className="a-listItem">
                              <div className="a-listTop">
                                <div className="a-itemHead">
                                  <h4>{innerItem.coaching.coachingName}</h4>
                                  <div className="a-ratingandstars">
                                    <div className="a-avatarProfile">
                                      {innerItem.coaching.logoUrl !== null ? (
                                        <span
                                          style={{
                                            backgroundImage: `url(${innerItem.coaching.logoUrl})`,
                                          }}
                                        ></span>
                                      ) : (
                                        <span
                                          style={{
                                            backgroundImage: `url('https://via.placeholder.com/40x40?text=${innerItem.coaching.coachingName}')`,
                                          }}
                                        ></span>
                                      )}
                                    </div>

                                    {!item.rating ? (
                                      <b>
                                        <span>
                                          <Star />
                                        </span>{" "}
                                        -
                                      </b>
                                    ) : (
                                      <b>
                                        <span>
                                          <Star />
                                        </span>
                                        {item.rating.toFixed(1)}
                                      </b>
                                    )}

                                    <b>({innerItem.ratingCount} Ratings)</b>
                                  </div>
                                </div>
                                <p className="a-location">
                                  <span>
                                    <Location />
                                  </span>{" "}
                                  {pageDetails?.city?.city},{" "}
                                  {pageDetails?.state?.name}
                                </p>
                                <p className="a-typeExam">
                                  {innerItem?.examType?.examType}
                                </p>
                                <ul className="a-optionDetails">
                                  <li>
                                    Total Chapter: {innerItem.chapterCount}
                                  </li>
                                  <li>
                                    Total Questions: {innerItem.questionCount}
                                  </li>
                                  <li>{innerItem.language.languageName}</li>
                                </ul>

                                {innerItem.isPublished === 1 &&
                                innerItem.status === 5 ? (
                                  <>
                                    <div
                                      className="a-detailsBtn"
                                      onClick={() =>
                                        routerPracticePageChange(innerItem.id)
                                      }
                                    >
                                      <span>Start Practice</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="a-detailsBtn">
                                      <button
                                        className="disabled btn-primary radius btn-block"
                                        type="button"
                                        disabled
                                      >
                                        UNAVAILABLE
                                      </button>
                                    </div>
                                  </>
                                )}

                                {/* <div className="a-detailsBtn">
                                  <span>Start Practice</span>
                                </div> */}
                              </div>
                            </div>
                          </div>
                        ))}
                    </ReactCarousel>
                  </Carousel>
                </div>
              </div>
            )}
            {item.productType === 3 && (
              <div className={`a-wrapper ${item.productType === 3 ? 'quiz-slider-wrap' : ''}`}>
                <div className="a-container">
                  <Carousel heading={item.sectionName}>
                    <ReactCarousel
                      itemsToShow={4}
                      itemsToScroll={1}
                      breakPoints={breakPoints}
                      renderArrow={myArrow}
                    >
                      {item &&
                        item.objectList.map((innerItem, ids) => (
                          <div className="a-carousel-item" key={ids}>
                            {localStorage.getItem("token") !== "" &&
                              localStorage.getItem("token") !== null && (
                                <div className="a-wishlist">
                                  {inWishList.length &&
                                  inWishList.find((w) => w.id === innerItem.id)
                                    ?.have === 1 ? (
                                    <span
                                      onClick={() =>
                                        handleWishList(
                                          innerItem.id,
                                          innerItem.productType
                                        )
                                      }
                                    >
                                      <HeartFill />
                                    </span>
                                  ) : (
                                    <span
                                      onClick={() =>
                                        handleWishList(
                                          innerItem.id,
                                          innerItem.productType
                                        )
                                      }
                                    >
                                      <Heart />
                                    </span>
                                  )}
                                </div>
                              )}
                            <span className="a-bggray">
                              <h4>{innerItem.quizName}</h4>
                              <p>Attempted by {innerItem.totalAttempt}</p>
                            </span>
                            <div className="a-listItem">
                              <div className="a-listTop">
                                <div className="a-itemHead">
                                  <h4>{innerItem.coaching.coachingName}</h4>
                                  <div className="a-ratingandstars">
                                    <div className="a-avatarProfile">
                                      {innerItem.coaching.logoUrl !== null ? (
                                        <span
                                          style={{
                                            backgroundImage: `url(${innerItem.coaching.logoUrl})`,
                                          }}
                                        ></span>
                                      ) : (
                                        <span
                                          style={{
                                            backgroundImage: `url('https://via.placeholder.com/40x40?text=${innerItem.coaching.coachingName}')`,
                                          }}
                                        ></span>
                                      )}
                                    </div>

                                    {!item.rating ? (
                                      <b>
                                        <span>
                                          <Star />
                                        </span>{" "}
                                        -
                                      </b>
                                    ) : (
                                      <b>
                                        <span>
                                          <Star />
                                        </span>
                                        {(item.rating &&
                                          item.ratingCount.toFixed(1) > 2 &&
                                          item.rating.toFixed(1)) ||
                                          `-`}
                                        {/* {item.rating.toFixed(1)} */}
                                      </b>
                                    )}

                                    {/* <b>({innerItem.ratingCount} Ratings)</b> */}
                                    <b>
                                      (
                                      {innerItem.ratingCount.toFixed(1) > 2
                                        ? `${innerItem.ratingCount} Ratings`
                                        : `Not Rated`}
                                      )
                                    </b>
                                  </div>
                                </div>
                                <p className="a-location">
                                  <span>
                                    <Location />
                                  </span>{" "}
                                  {pageDetails?.city?.city},{" "}
                                  {pageDetails?.state?.name}
                                </p>
                                <p className="a-typeExam">
                                  {innerItem.examType.examType}
                                </p>
                                <ul className="a-optionDetails">
                                  <li>
                                    Total Questions : {innerItem.questionCount}
                                  </li>
                                  <li>{innerItem.language.languageName}</li>
                                  <li>Duration {innerItem.duration}</li>
                                </ul>

                                {innerItem.isPublished === 1 &&
                                innerItem.status === 5 ? (
                                  <>
                                    <div
                                      className="a-detailsBtn"
                                      onClick={() =>
                                        routerQuizPageChange(innerItem.id)
                                      }
                                    >
                                      <span>Start Quiz</span>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div className="a-detailsBtn">
                                      <button
                                        className="disabled btn-primary radius btn-block"
                                        type="button"
                                        disabled
                                      >
                                        UNAVAILABLE
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                    </ReactCarousel>
                  </Carousel>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
    </div>
  );
};

export default withRouter(CoachingDetailsAllExam);
