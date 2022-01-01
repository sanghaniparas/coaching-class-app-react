import React from "react";
import { Link } from "react-router-dom";
import ReactCarousel, { consts } from "react-elastic-carousel";
import { withRouter, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import Carousel from "../../Elements/Carousel";
import { Arrow, Heart, Star, Location } from "../../../Core/Layout/Icon";

export default function RecommendeCoaching({ itemCoaching, title }) {
  console.log("itemCoaching", itemCoaching);
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
    console.log(id);
    let path = `/testdetails/${id}`;
    history.push(path);
    window.location.reload();
    window.scrollTo(0, 0);
  };

  const buyNow = (item) => {
    if (!!localStorage.getItem("token")) {
      history.push({
        pathname: `/cart`,
        state: { id: item.id, type: 2 },
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
    <div className="a-wrapper">
      <div className="a-container">
        <Carousel heading={title}>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}
          >
            {itemCoaching.map((item, idx) => (
              <React.Fragment key={idx}>
                <div className="a-carousel-item">
                  {/* <div className="a-wishlist">
                    <span>
                      <Heart />
                    </span>
                  </div> */}
                  {item.packageImageUrl === null ? (
                    <span
                      onClick={() => routerChange(item.id)}
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/272x150')`,
                      }}
                    ></span>
                  ) : (
                    <span
                      onClick={() => routerChange(item.id)}
                      style={{
                        backgroundImage: `url(${item.packageImageUrl})`,
                      }}
                    ></span>
                  )}
                  <div className="a-listItem">
                    <div className="a-listTop">
                      <div
                        className="a-itemHead"
                        onClick={() => routerChange(item.id)}
                      >
                        <h4>
                          {" "}
                          {item.packageName.length > 36
                            ? `${item.packageName.substring(0, 36)} ...`
                            : item.packageName}
                        </h4>
                        <div className="a-ratingandstars">
                          <div className="a-avatarProfile">
                            <span
                              style={{
                                backgroundImage: `url(${item.coaching.logoUrl})`,
                              }}
                            ></span>
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

                          <b>
                            (
                            {item.rating && item.rating.toFixed(1) > 2
                              ? `${item.ratingCount} Ratings`
                              : `Not Rated`}
                            )
                          </b>
                        </div>
                      </div>
                      <p className="a-location">
                        <span>
                          <Location />
                        </span>{" "}
                        {item.coaching.city.city}, {item.coaching.state.name}
                      </p>
                      <p
                        className="a-typeExam"
                        onClick={() => routerChange(item.id)}
                      >
                        {item.examTypes.length === 0
                          ? null
                          : item.examTypes.map((el, id) =>
                              id === item.examTypes.length - 1
                                ? `${el.examType} `
                                : `${el.examType}, `
                            )}
                      </p>
                      <ul
                        className="a-optionDetails"
                        onClick={() => routerChange(item.id)}
                      >
                        <li>No of Tests: 2</li>
                       
                          {item.testTypes && item.testTypes.length > 0 && item.testTypes[0].testTypeName!=='' && <li>
                            {item.testTypes.map((el, i) =>
                                i === item.testTypes.length - 1
                                  ? `${el.testTypeCount} ${el.testTypeName}`
                                  : `${el.testTypeCount} ${el.testTypeName} + `
                              )}
                              </li>}
                        
                        <li>
                          {item.languages.map((el, id) => (
                            <span key={id}>
                              {el.languageName} <b>|</b>{" "}
                            </span>
                          ))}
                        </li>
                        <li>
                          {item.validityType === 0
                            ? item.validity.includes("year")
                              ? "Valid for 365 days"
                              : `Valid for ${item.validity} days`
                            : `Expires In ${item.expireDate}`}
                        </li>
                      </ul>
                      <div
                        className="a-rupeeDetails"
                        onClick={() => routerChange(item.id)}
                      >
                        {(item.onSaleStatus === 0 && item.saleType === 4 && (
                          <p>
                            <span>&#8377;</span> 0 /-
                          </p>
                        )) || (
                          <p>
                            <span>&#8377;</span>{" "}
                            {item.discountPrice
                              ? item.discountPrice
                              : item.productPrice}{" "}
                            /-
                          </p>
                        )}
                      </div>

                      {item.onSaleStatus === 0 ? (
                        <div className="a-detailsBtn">
                          {(item.saleType === 4 && (
                            <span onClick={() => routerChange(item.id)}>UNLOCK FREE</span>
                          )) || (
                            <span onClick={() => buyNow(item)}>BUY NOW</span>
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
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            ))}
          </ReactCarousel>
        </Carousel>
      </div>
    </div>
  );
}
