import React, { useEffect, useState } from "react";
import ReactCarousel, { consts } from "react-elastic-carousel";
import { useToasts } from "react-toast-notifications";
import Carousel from "../Elements/Carousel";
import {
  Arrow,
  Heart,
  Star,
  University,
  HeartFill,
} from "../../Core/Layout/Icon";
import { useHistory } from "react-router-dom";
import { ToolTip } from "./../../Core/Layout/Tooltip/ToolTip";
import { BASE_URL } from "./../../../config";
import axios from "axios";

export default function TestFreePackages({ data }) {

  console.log("jayanta", data);
  const history = useHistory();
  const [inWishList, setInWishList] = useState([]);
  const [tagId, setTagId] = useState(null);
  const [newData, setNewData] = useState([]);
  const { addToast } = useToasts();

  useEffect(() => {
    setTagId(data.product_lists[0].tagId);
  }, [data]);

  useEffect(() => {
    if (tagId) {
      setNewData(data.product_lists.filter((el) => el.tagId === tagId));
    }
  }, [data, tagId]);

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

  useEffect(() => {
    if (
      localStorage.getItem("token") !== "" ||
      localStorage.getItem("token") !== null
    ) {
      data.product_lists.map((el) => checkInWishList(el.product_data.id));
    }
  }, [data]);

  //   To check which test package is in whishlist and storing it
  const checkInWishList = async (id) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: "1",
      itemId: id,
    });
    try {
      const {
        data: { data, message },
      } = await axios.post(`${BASE_URL}/wishlist/checkWishList`, body, config);

      if (message !== "Invalid auth token") {
        if(data.examPageInfoCategory && data.examPageInfoCategory.length > 0){

        setInWishList((inWishList) => [...inWishList, { id, have: data.have }]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  //for changing
  const handleWishList = async (id) => {
    const config = {
      headers: {
        "Content-Type": "Application/json",
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: "1",
      itemId: id,
    });
    let selected =
      inWishList.length && inWishList.find((w) => w.id === id).have;
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

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  const buyNow = (item) => {
    if (!!localStorage.getItem("token")) {
      history.push({
        pathname: `/cart`,
        state: { id: item.packageId, type: 2 },
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
    <div className="testfree-packages bg-img">
      <div className="a-container">
        <div className="header-filter">
          <div className="left-content">
            <h2>Free Packages</h2>
          </div>
          <div className="filter-group">
            <select
              name=""
              id=""
              className="bd-orange"
              value={tagId}
              onChange={(e) => setTagId(Number(e.target.value))}
            >
              {data.product_lists.map((x) => (
                <option value={x.tag_data.id}>{x.tag_data.tagName}</option>
              ))}
            </select>
          </div>
        </div>
        <Carousel heading={""}>
          <ReactCarousel
            itemsToShow={4}
            itemsToScroll={1}
            breakPoints={breakPoints}
            renderArrow={myArrow}
          >
            {newData.map((item) => (
              <div className="a-carousel-item" key={item}>
                {localStorage.getItem("token") !== "" &&
                  localStorage.getItem("token") !== null && (
                    <div className="a-wishlist">
                      {inWishList.length &&
                        inWishList.find((w) => w.id === item.packageId)?.have ===
                        1 ? (
                          <span onClick={() => handleWishList(item.packageId)}>
                            <HeartFill />
                          </span>
                        ) : (
                          <span onClick={() => handleWishList(item.packageId)}>
                            <Heart />
                          </span>
                        )}
                    </div>
                  )}

                {item.product_data.packageImageUrl === null ? (
                  <span
                    onClick={() => routerChange(item.id)}
                    style={{
                      backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.product_data.coaching.coachingName}')`,
                    }}
                  ></span>
                ) : (
                    <span
                      onClick={() => routerChange(item.id)}
                      style={{
                        backgroundImage: `url(${item.product_data.packageImageUrl})`,
                      }}
                    ></span>
                  )}
                <div className="a-listItem">
                  <div className="a-listTop">
                    <div
                      className="a-itemHead"
                      onClick={() => routerChange(item.product_data.id)}
                    >
                      <h4>{item.product_data.packageName}</h4>
                      <div className="a-ratingandstars">
                        <div className="a-avatarProfile">
                          {item.product_data.coaching.logoUrl === null ? (
                            <span
                              style={{
                                backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.product_data.coaching.coachingName}')`,
                              }}
                            ></span>
                          ) : (
                              <span
                                style={{
                                  backgroundImage: `url(${item.product_data.coaching.logoUrl})`,
                                }}
                              ></span>
                            )}
                        </div>
                        <b>
                          <span>
                            <Star />
                          </span>{" "}
                          {(item.product_data.rating &&
                            item.product_data.ratingCount.toFixed(1) > 2 &&
                            item.product_data.rating.toFixed(1)) ||
                            `-`}
                        </b>
                        <b>
                          (
                          {item.product_data.ratingCount.toFixed(1) > 2
                            ? `${item.product_data.ratingCount} Ratings`
                            : `Not Rated`}
                          )
                        </b>
                      </div>
                    </div>
                    <p
                      className="a-university"
                      onClick={() => routerChange(item.product_data.id)}
                    >
                      <span>
                        <University />
                      </span>
                      {item.product_data.coaching.coachingName}
                    </p>
                    <p
                      className="a-typeExam"
                      onClick={() => routerChange(item.product_data.id)}
                    >
                      {" "}
                      {item.product_data.examType.length <= 3 ? (
                        item.product_data.examType.map((i, idx) => (
                          <React.Fragment key={idx}>
                            {i.examType}{" "}
                            {idx !== item.product_data.examType.length - 1
                              ? "& "
                              : ""}{" "}
                          </React.Fragment>
                        ))
                      ) : (
                          <div>
                            {item.product_data.examType
                              .slice(0, 3)
                              .map((i, idx) => (
                                <React.Fragment key={idx}>
                                  {i.examType}{" "}
                                  {idx !==
                                    item.product_data.examType.slice(0, 3).length -
                                    1
                                    ? "& "
                                    : ""}{" "}
                                </React.Fragment>
                              ))}

                            <ToolTip
                              message={`${item.product_data.examType
                                .slice(3)
                                .map((el) => el.examType)}`}
                              position={"top"}
                            >
                              <p>
                                {"+"}
                                {item.product_data.examType
                                  .slice(3)
                                  .reduce((acc, current) => acc + 1, 0)}
                              </p>
                            </ToolTip>
                          </div>
                        )}
                    </p>
                    <ul
                      className="a-optionDetails"
                      onClick={() => routerChange(item.product_data.id)}
                    >
                      <li>No of Tests: {item.product_data.noOfTest}</li>
                      <li>
                        {item.product_data.testTypes && item.product_data.testTypes && item.product_data[0].testTypeName!=='' && (
                          <li>
                            {item.product_data.testTypes.length > 0
                              ? item.product_data.testTypes.map((el, i) =>
                                i === item.product_data.testTypes.length - 1
                                  ? `${el.testTypeCount} ${el.testTypeName}`
                                  : `${el.testTypeCount} ${el.testTypeName} + `
                              )
                              : ``}
                          </li>
                        )}
                      </li>
                      <li>
                        {item &&
                          item.product_data.language.map((i, idx) => (
                            <span key={idx}>
                              {i.languageName} <b>|</b>{" "}
                            </span>
                          ))}
                      </li>
                      <li>Validity {item.product_data.validity}</li>
                    </ul>
                    <div
                      className="a-rupeeDetails"
                      onClick={() => routerChange(item.product_data.id)}
                    >
                      {item.product_data.discountPrice > 0 &&
                        item.product_data.saleType !== 4 && (
                          <p>
                            {" "}
                            <span>&#8377;</span>{" "}
                            {item.product_data.discountPrice}/- {"    "}
                            <small style={{ fontWeight: "100" }}>
                              <strike>{item.product_data.productPrice}</strike>
                            </small>
                          </p>
                        )}

                      {item.product_data.discountPrice === 0 &&
                        item.product_data.productPrice > 0 && (
                          <p>
                            {" "}
                            <span>&#8377;</span>{" "}
                            {item.product_data.productPrice}/- {"    "}
                          </p>
                        )}

                      {item.product_data.saleType === 4 && (
                        <p>
                          {" "}
                          <span>&#8377;</span> <strike></strike>{" "}
                          {item.product_data.productPrice}/- {"    "}
                        </p>
                      )}
                    </div>
                    {item.product_data.saleType === 1 && (
                      <div className="a-detailsBtn">
                        <span onClick={() => buyNow(item)}>BUY NOW</span>
                      </div>
                    )}

                    {item.product_data.saleType === 2 && (
                      <div className="a-detailsBtn">
                        <span>Share &amp; Unlock</span>
                      </div>
                    )}

                    {item.product_data.saleType === 3 && (
                      <div className="a-detailsBtn">
                        <span>Share through pass</span>
                      </div>
                    )}

                    {item.product_data.saleType === 4 && (
                      <div className="a-detailsBtn">
                        <span>Free</span>
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
  );
}
