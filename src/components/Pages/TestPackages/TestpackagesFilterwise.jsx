import React, { useState } from 'react';
import ReactCarousel, { consts } from 'react-elastic-carousel';
import Carousel from '../Elements/Carousel';
import { Arrow, Heart, Star, University } from '../../Core/Layout/Icon';
import { PackageChoiceType } from '../Global/Constant';
import { ToolTip } from '../../Core/Layout/Tooltip/ToolTip';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { useToasts } from "react-toast-notifications";

export default function TestpackagesFilterwise({
  packageAllExamType,
  setPackageExaxType,
  selectedPackageSection,
  packageBySelection,
}) {
  console.log('packageBySelection', packageBySelection);
  const [isSubTab, setIsSubTab] = useState(PackageChoiceType?.[0].sectionName);
  const history = useHistory();
  const myArrow = ({ type, onClick, isEdge }) => {
    const carlPointer = type === consts.PREV ? <Arrow /> : <Arrow />;
    const carlClass = type === consts.PREV ? 'prev' : 'next';
    return (
      <button
        className={`a-btn-arrow ${carlClass}`}
        onClick={onClick}
        disabled={isEdge}>
        {carlPointer}
      </button>
    );
  };

  const { addToast } = useToasts();

  const breakPoints = [
    { width: 2, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 1 },
    { width: 850, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1150, itemsToShow: 4, itemsToScroll: 1 },
    { width: 1450, itemsToShow: 5 },
    { width: 1750, itemsToShow: 6 },
  ];
  const filterChange = (e) => setPackageExaxType(e.target.value);
  const handleSelectedSection = (item) => {
    selectedPackageSection(item.id);
    setIsSubTab(item.sectionName);
  };
  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  const checkValidity = (validity) => {
    let start = moment();
    let end = moment().add(parseInt(validity), 'days');

    let years = end.diff(start, 'year');
    start.add(years, 'years');

    let months = end.diff(start, 'months');
    start.add(months, 'months');

    let days = end.diff(start, 'days');

    if (months === 0 && days === 0) {
      return;
    }
    return (
      <li>
        {'Validity  :'}
        {months ? `${months} months` : ''} {days ? ` ${days} days` : ''}{' '}
      </li>
    );
  };

  const checkValidity2 = (expireDate) => {
    let starts = moment();
    let ends = moment(expireDate);

    let diffHuman = moment.preciseDiff(starts, ends, true);
    return (
      <li>
        {'Validity  :'}
        {diffHuman.months ? `${diffHuman.months} months` : ''}{' '}
        {diffHuman.days ? ` ${diffHuman.days} days` : ''}{' '}
      </li>
    );
  };

  const buyNow = (item) => {
    console.log("item", item);
    if (!!localStorage.getItem("token")) {
      history.push({
        pathname: `/cart`,
        state: { id: item?.coaching?.id, type: 2 },
      });
    } else {
      addToast("Please Login to add product in cart", {
        appearance: "warning",
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };

  console.log(packageBySelection);

  return (
    <div className="testpackages-filterwise grey-bg-box">
      <div className="a-container">
        <div className="header-filter">
          <div className="left-content">
            <ul>
              {PackageChoiceType.map((item, idx) => (
                <li
                  key={idx}
                  className={isSubTab === item.sectionName ? 'active' : ''}
                  onClick={() => handleSelectedSection(item)}>
                  {item.sectionName}
                </li>
              ))}
            </ul>
          </div>
          <div className="filter-group">
            <span>Filter by</span>
            <select name="" id="" onChange={(e) => filterChange(e)}>
              {packageAllExamType.map((el, idx) => (
                <option key={idx} value={el.id}>
                  {el.examType}
                </option>
              ))}
            </select>
          </div>
        </div>
        {packageBySelection.length > 0 && (
          <Carousel heading={''}>
            <ReactCarousel
              itemsToShow={4}
              itemsToScroll={1}
              breakPoints={breakPoints}
              renderArrow={myArrow}>
              {packageBySelection.map((item, idx) => (
                <Link
                  to={`/testdetails/${item.id}`}
                  className={`a-carousel-item2 ${
                    item.status !== 1 && 'card-disabled'
                  }`}
                  key={idx}>
                  <div
                    className="a-carousel-item"
                    key={idx}
                    style={{
                      //   height: '450px',
                      width: '250px',
                      marginRight: '2rem',
                    }}>
                    {/* <div className="a-wishlist">
                    <span>
                      <Heart />
                    </span>
                  </div> */}
                    {item.packageImageUrl !== null ? (
                      <span
                        onClick={() => routerChange(item.id)}
                        style={{
                          backgroundImage: `url(${item.packageImageUrl})`}}></span>
                    ) : (
                      <span
                        onClick={() => routerChange(item.id)}
                        style={{
                          backgroundImage: `url('https://via.placeholder.com/272x150?text=${item.packageName}')`}}></span>
                    )}
                    <div className="a-listItem">
                      <div className="a-listTop">
                        <div className="a-itemHead">
                          <h4>{item.packageName}</h4>
                          <div className="a-ratingandstars">
                            <div className="a-avatarProfile">
                              {item.coachings.logoUrl !== null ? (
                                <span
                                  style={{
                                    backgroundImage: `url(${item.coachings.logoUrl})`,
                                    
                                  }}></span>
                              ) : (
                                <span
                                  style={{
                                    backgroundImage: `url('https://via.placeholder.com/40x40?text=${item.coachings.coachingName}')`,
                                  }}></span>
                              )}
                            </div>
                            <b>
                              <span>
                                <Star />
                              </span>{' '}
                              {item.ratingCount > 2
                                ? item.rating.toFixed(1)
                                : '-'}
                            </b>
                            <b>
                              {item.ratingCount > 2
                                ? `(${item.ratingCount} Ratings)`
                                : 'Not Rated'}
                            </b>
                          </div>
                        </div>
                        <p className="a-university">
                          <span>
                            <University />
                          </span>
                          {item.coachings.coachingName}
                        </p>
                        {/* <p className="a-typeExam">{item.coaching_exam_types}</p> */}
                        <div className="a-typeExam">
                          {/* {item.coaching_exam_types} */}
                          {item.coaching_exam_types.split('&').length > 0 ? (
                            item.coaching_exam_types.split('&').length <= 1 ? (
                              item.coaching_exam_types
                                .split('&')
                                .map((i, idx) => (
                                  <React.Fragment key={idx}>
                                    {i}{' '}
                                    {idx !==
                                    item.coaching_exam_types.split('&').length -
                                      2
                                      ? ', '
                                      : ''}{' '}
                                  </React.Fragment>
                                ))
                            ) : (
                              <div>
                                {item.coaching_exam_types
                                  .split('&')
                                  .slice(0, 2)
                                  .map((i, idx) => (
                                    <React.Fragment key={idx}>
                                      {i}{' '}
                                      {idx !==
                                      item.coaching_exam_types
                                        .split('&')
                                        .slice(0, 2).length -
                                        1
                                        ? ', '
                                        : ''}{' '}
                                    </React.Fragment>
                                  ))}
                                  {
                                    item.coaching_exam_types.split('&').slice(2).length > 0 && (
                                      <ToolTip
                                        message={`${item.coaching_exam_types
                                          .split('&')
                                          .slice(2)
                                          .map((el) => el)} `}
                                        position={'top'}>
                                        <p>
                                          {'+'}
                                          {item.coaching_exam_types
                                            .split('&')
                                            .slice(2)
                                            .reduce((acc, current) => acc + 1, 0)}
                                        </p>
                                      </ToolTip>
                                    )
                                  }
                              </div>
                            )
                          ) : (
                            ``
                          )}
                        </div>
                        <ul className="a-optionDetails">
                          <li>No of Tests: {item.noOfTest || 0}</li>
                         
                            {item.package_test_types && item.package_test_types.length > 0 &&  <li>
                              { item.package_test_types.map((type, id) => {
                                  return (
                                    <React.Fragment key={id}>
                                      {type.test_type_count}{' '}
                                      {type.test_type_name}
                                      {id !==
                                        item.package_test_types.length - 1 && (
                                        <React.Fragment>+</React.Fragment>
                                      )}
                                    </React.Fragment>
                                  );
                                })
                              }
                          </li> }
                          <li>{item.package_languages}</li>
                          {item.validityType === 0 &&
                            checkValidity(item.validity)}

                          {item.validityType === 1 &&
                            checkValidity2(item.expireDate)}
                        </ul>
                        <div
                              className="a-rupeeDetails"
                              onClick={() => routerChange(item.id)}
                            >
                              {(item.onSaleStatus === 0 &&
                                item.saleType === 4 && (
                                  <p>
                                  {' '} <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',paddingRight: '10px',color: '#212121'}}>&#8377;{' '} 0</span>
                                <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',textDecoration: 'line-through'}}>&#8377;{' '} {item.productPrice}</span>
                                /-
                                </p>
                                )) || (
                                  item.discountPrice!==null
                                    ?  <p>
                                    {' '} <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',paddingRight: '10px',color: '#212121'}}>&#8377;{' '} {item.discountPrice}</span>
                                    <span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800',textDecoration: 'line-through'}}>&#8377;{' '} {item.productPrice}</span>
                                   
                                    /-</p> 
                                    :  <p> 
                                    {' '}<span style={{float: 'left',width: 'auto',fontSize: '18px',fontWeight: '800'}}>&#8377;{' '} {item.productPrice}</span>
                                    /-</p> 
                              )}
                            </div>
                        <div className="a-detailsBtn">
                        {item.status === 5 ? (
                          item.onSaleStatus === 0 ? (
                            <div className="a-detailsBtn">
                              {item.saleType === 1 && (
                                <span onClick={() => buyNow(item)}>BUY NOW</span>
                              )}
                              {item.saleType === 2 && <span  onClick={() => routerChange(item.id)}>SHARE & UNLOCK</span>}
                              {item.saleType === 3 && (
                                <span  onClick={() => routerChange(item.id)}>SHARE THROUGH PASS</span>
                              )}
                              {item.saleType === 4 && <span  onClick={() => routerChange(item.id)}>UNLOCK FREE</span>}
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
                  </div>
                </Link>
              ))}
            </ReactCarousel>
          </Carousel>
        )}
        {packageBySelection.length === 0 && <div class="a-nodata-Content"> No Data Available</div>}
      </div>
    </div>
  );
}
