import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
  ArrowDown,
  Heart,
  HeartFill,
  Star,
  University,
  Location,
} from '../../Core/Layout/Icon';
import { ToolTip } from '../../Core/Layout/Tooltip/ToolTip';
import Pagination from '../Elements/Pagination';
import { searchItemFormat } from '../Global/Formatter';
import { SEARCHCHOICE } from '../Global/Constant';
import moment from 'moment';
import axios from 'axios';
import { BASE_URL } from './../../../config';
import { useToasts } from 'react-toast-notifications';
export default function SearchTestSeries({
  searchTestPackageData,
  setViewSection,
  isSubTab,
}) {
  //console.log('searchTestPackageData', searchTestPackageData);
  const [pagnation, setPagnation] = useState(1);
  //const segregrateList = searchItemFormat(searchTestPackageData,5);

  const [inWishList, setInWishList] = useState([]);

  // const [perPage, setPerPage] = useState(5);
  const [perPage, setPerPage] = useState(5);
  const [data, setData] = useState(
    searchItemFormat(searchTestPackageData, perPage)
  );


  const [productCount, setProductCount] = useState(1);

  const handlePageClick = () => {
    setPagnation(pagnation + 1);

    const segregrateList = searchItemFormat(
      searchTestPackageData,
      perPage * (pagnation + 1)
    );
    setData(segregrateList);
  };

  const config = {
    headers: {
      Authorization: `${localStorage.token ? localStorage.token : null}`,
    },
  };

  useEffect(() => {
    if (searchTestPackageData !== null) {
     
      const segregrateList = searchItemFormat(searchTestPackageData, perPage);
      //segregrateList.map(el => getSharedCount(el.id))
      setData(segregrateList);
      setProductCount(segregrateList.length - 1);
    }
  }, [searchTestPackageData]);

  const { addToast } = useToasts();

  const history = useHistory();

  console.log(productCount);
  console.log(data[pagnation]);

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
        {'Validity  : '}
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
        {'Validity  : '}
        {diffHuman.months ? `${diffHuman.months} months` : ''}{' '}
        {diffHuman.days ? ` ${diffHuman.days} days` : ''}{' '}
      </li>
    );
  };

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };


  


  //for changing
  const handleWishList = async (item, id, productType, package_wish_type) => {
    const config = {
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `${localStorage.token}`,
      },
    };

    const body = JSON.stringify({
      itemType: productType.toString(),
      itemId: id,
    });

    let updatedIndex;
    try {
      if (package_wish_type === 1) {
        const response = await axios
          .post(`${BASE_URL}/wishlist/remove-from-wishlist`, body, config)
          .then((result) => {
            console.log(result.data);

            updatedIndex = data[pagnation].findIndex(
              (w) => w.id === result.data.data.itemId
            );
            data[pagnation][updatedIndex].package_wish_type =
              result.data.data.wish_type;
            setInWishList((item) => [
              ...item,
              { id, package_wish_type: result.data.data.wish_type },
            ]);
          });
      }
      if (package_wish_type === 2 || package_wish_type === null) {
        const response = await axios
          .post(`${BASE_URL}/wishlist/add-to-wishlist`, body, config)
          .then((result) => {
            console.log(result.data);
            console.log(result.data.data);
            item.package_wish_type = result.data.data.wish_type;

            updatedIndex = data[pagnation].findIndex(
              (w) => w.id === result.data.data.itemId
            );
            data[pagnation][updatedIndex].package_wish_type =
              result.data.data.wish_type;

            setInWishList((item) => [
              ...item,
              { id, package_wish_type: result.data.data.wish_type },
            ]);
          });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const buyNow = (innerItem) => {
    if (!!localStorage.getItem('token')) {
      history.push({
        pathname: `/cart`,
        state: { id: innerItem.id, type: 2 },
      });
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };

  const viewSubSection = (e) => {
    e.preventDefault();
    setViewSection({ id: '3', label: 'Test Series' });
  };
  return (
    <div className="search-test-series">
      <div className="header-filter">
        <div className="left-content">
          <h2>
            Test Series{' '}
            {isSubTab !== SEARCHCHOICE.ALL && data.length > 0 && (
              <span>({searchTestPackageData.length})</span>
            )}
          </h2>
        </div>
        {data.length > 0 && data[1].length < searchTestPackageData.length && isSubTab === SEARCHCHOICE.ALL && (
          <div className="filter-group">
            <Link to="" onClick={(e) => viewSubSection(e)}>
              View All
            </Link>
          </div>
        )}
      </div>
      {(!data || data.length === 0) && <div class="a-nodata-Content"> No Data Available</div>}
      {!!data && data.length > 0 && (
        <React.Fragment>
          {data[1].map((item, idx) => (
            <div className="card" key={idx}>
              <div className="testseries-box">
                <div className="testseries-img">
                  <h2>{item.packageName}</h2>
                  {item.packageImageUrl !== null ? (
                    <img src={item.packageImageUrl} alt={item?.packageName} />
                  ) : (
                    <img
                      src={`https://via.placeholder.com/272x150?text=${item.packageName}`}
                      alt={item?.packageName}
                    />
                  )}
                  {item?.coachings.logoUrl !== null ? (
                    <span
                      className="avatar"
                      style={{
                        backgroundImage: `url(${item?.coachings.logoUrl})`,
                      }}></span>
                  ) : (
                    <span
                      className="avatar"
                      style={{
                        backgroundImage: `url('https://via.placeholder.com/272x150?text=${item?.coachings?.coachingName}')`,
                      }}></span>
                  )}
                  {/* <span className="avatar" style={{ backgroundImage: `url(${require('../../../assets/images/about-04.jpg')})` }}></span> */}
                </div>
                <div className="testseries-info-wrapper">
                  <div className="testseries-info">
                    <h3 className="test-name">
                      <Link to={`/testdetails/${item.id}`}>
                        {item.packageName}
                      </Link>
                     {localStorage.token && 
                      <div className="a-wishlist">
                        {item.package_wish_type === 1 ? (
                          <span
                            className="fevourite"
                            onClick={() =>
                              handleWishList(
                                item,
                                item.id,
                                item.productType,
                                item.package_wish_type
                              )
                            }>
                            <HeartFill />
                          </span>
                        ) : (
                          <span
                            className="fevourite"
                            onClick={() =>
                              handleWishList(
                                item,
                                item.id,
                                item.productType,
                                item.package_wish_type
                              )
                            }>
                            <Heart />
                          </span>
                        )}
                      </div>
                    }
                    </h3>
                    <p className="location">
                      <University /> {item?.coachings?.coachingName} {''}
                      {item?.coachings?.city}
                    </p>
                    {/* <p className="location"><Location /> {item?.coachings?.cityName}, {item?.coachings?.stateName}</p> */}
                    <p className="test-exam">
                      {item.exam_types.length <= 3 ? (
                        item.exam_types.map((i, idx) => (
                          <React.Fragment key={idx}>
                            {i.examType}{' '}
                            {idx !== item.exam_types.length - 1 ? '& ' : ''}{' '}
                          </React.Fragment>
                        ))
                      ) : (
                        <div>
                          {item.exam_types.slice(0, 3).map((i, idx) => (
                            <React.Fragment key={idx}>
                              {i.examType}{' '}
                              {idx !== item.exam_types.slice(0, 3).length - 1
                                ? '& '
                                : ''}{' '}
                            </React.Fragment>
                          ))}

                          <ToolTip
                            message={`${item.exam_types
                              .slice(3)
                              .map((el) => el.examType)}`}
                            position={'top'}>
                            <p>
                              {'+'}
                              {item.exam_types
                                .slice(3)
                                .reduce((acc, current) => acc + 1, 0)}
                            </p>
                          </ToolTip>
                        </div>
                      )}
                    </p>
                    <ul>
                      <li>No of Tests: {item.totalTests || 0}</li>
                      {item.testTypes.length > 0 && item.testTypes[0].testTypeName!=='' && (
                        <li>
                          {item.testTypes.map((type, id) => {
                            return (
                              <div key={id}>
                                {type.testTypeCount} {type.testTypeName}
                                {id !== item.testTypes.length - 1 && (
                                  <React.Fragment>+</React.Fragment>
                                )}
                              </div>
                            );
                          })}
                        </li>
                      )}
                      {item.languages.length > 0 && (
                        <li>
                          {item.languages.map((i, idx) => (
                            <span key={idx}>
                              {i.languageName}{' '}
                              {item.languages.length !== idx + 1 && <b>| </b>}
                            </span>
                          ))}
                        </li>
                      )}
                      {item.validityType === 0 && checkValidity(item.validity)}

                      {item.validityType === 1 &&
                        checkValidity2(item.expireDate)}
                    </ul>
                  </div>
                  <div className="price-info">
                    {/* <p className="rating"><Star /><strong>4.5</strong> (450 Ratings)</p> */}
                    <p className="rating">
                      <Star />
                      <strong>
                        {item.ratingCount > 2 ? item.ratingCount : '-'} {' '}
                      </strong>
                      {item.ratingCount > 2 ? `(${item?.rating.toFixed(2)} Ratings)` : ''}
                    </p>
                    <div
                      className="price"
                      onClick={() => routerChange(item.id)}>
                      {/* {(item.onSaleStatus === 0 &&
                                    item.saleTypes.id === 4 && (
                                      <React.Fragment>&#8377; 0 /-</React.Fragment>
                                        
                                     
                                    )) || (
                                    <React.Fragment>
                                      &#8377;{" "}
                                      {item.discountPrice
                                        ? item.discountPrice
                                        : item.productPrice}{" "}
                                      /-
                                      </React.Fragment>
                                  )}  */}
                      <span className="top-group-container">
                        {item.saleTypes.id === 1 ? (
                          <>
                            <p className="p-price">
                              {/* <span className="price-tag">Price</span>  */}
                              {item.discountPrice !== 0 ? (
                                <>
                                  &#8377; {item.discountPrice}
                                  <span style={{ margin: '10px' }}>
                                    &#8377; <strike>{item.productPrice}</strike>
                                  </span>
                                </>
                              ) : (
                                <>
                                  &#8377; {item.productPrice}
                                  <span style={{ margin: '10px' }}>
                                    &#8377;{' '}
                                    <strike>{item.discountPrice}</strike>
                                  </span>
                                </>
                              )}
                            </p>
                          </>
                        ) : null}

                        {item.saleTypes.id === 3 ? (
                          <>
                            <p className="p-price">
                              {/* <span className="price-tag">Price </span>  */}
                              {item.discountPrice !== 0 ? (
                                item.discountPrice != null ? (
                                  <>
                                    &#8377; {item.discountPrice}
                                    <span style={{ margin: '10px' }}>
                                      &#8377;{' '}
                                      <strike>{item.productPrice}</strike>
                                    </span>
                                  </>
                                ) : (
                                  <>&#8377; {item.productPrice}</>
                                )
                              ) : (
                                <>
                                  &#8377; {item.productPrice}
                                  <span style={{ margin: '10px' }}>
                                    &#8377;{' '}
                                    <strike>{item.discountPrice}</strike>
                                  </span>
                                </>
                              )}
                            </p>
                            <p className="p-exp-label">
                              {item.discountPrice === null ||
                              item.discountPrice === 0 || item.discountPrice === item.productPrice
                                ? ''
                                : Math.round(
                                    ((item.productPrice - item.discountPrice) /
                                      item.productPrice) *
                                      100
                                  ) + '% Discount'}
                            </p>
                          </>
                        ) : null}

                        {item.saleTypes.id === 2 ? (
                          <>
                            <p className="p-price">
                              {/* <span className="price-tag">Price</span> */}
                              {item.discountPrice !== 0 ||
                              item.shareUnlockDiscountPrice !== null ? (
                                <>
                                  &#8377;{' '}
                                  {item.shareCount >= 5
                                    ? item.shareUnlockDiscountPrice
                                    : item.discountPrice}
                                  <span style={{ margin: '10px' }}>
                                    &#8377; <strike>{item.productPrice}</strike>
                                  </span>
                                </>
                              ) : (
                                <>&#8377; {item.productPrice}</>
                              )}
                            </p>
                          </>
                        ) : null}

                        {item.saleTypes.id === 4 ? (
                          <>
                            <p className="p-price">
                              {/* <span className="price-tag">Price</span>  */}
                              &#8377; <s>{item.productPrice}</s>
                              <span className="free-tag">
                                FREE
                              </span>
                            </p>
                          </>
                        ) : null}
                      </span>
                    </div>

                    {item.status === 5 ? (
                      item.onSaleStatus === 0 ? (
                        <div className="a-detailsBtn">
                          {item.saleTypes.id === 1 && (
                            <button
                              className="btn-primary"
                              onClick={() => buyNow(item)}>
                              BUY NOW
                            </button>
                          )}
                          {item.saleTypes.id === 2 && (
                            <button className="btn-primary"  onClick={() => routerChange(item.id)}>
                              SHARE & UNLOCK
                            </button>
                          )}
                          {item.saleTypes.id === 3 && (
                            <button className="btn-primary" onClick={() => routerChange(item.id)}>
                              SHARE THROUGH PASS
                            </button>
                          )}
                          {item.saleTypes.id === 4 && (
                            <button className="btn-primary" onClick={() => routerChange(item.id)}>UNLOCK FREE</button>
                          )}
                        </div>
                      ) : (
                        <div className="a-detailsBtn">
                          <button
                            className="disabled btn-primary radius btn-block"
                            type="button"
                            disabled>
                            UNAVAILABLE
                          </button>
                        </div>
                      )
                    ) : (
                      <div className="a-detailsBtn">
                        <button
                          className="disabled btn-primary radius btn-block"
                          type="button"
                          disabled>
                          UNAVAILABLE
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className="pagination">
            {/* {isSubTab !== SEARCHCHOICE.ALL && <Pagination pageCount={data.length-1} handlePageClick={handlePageClick}/>}  */}

            {isSubTab !== SEARCHCHOICE.ALL &&
              data !== null &&
              pagnation !== productCount && (
                <div className="viewmore" onClick={() => handlePageClick()}>
                  <div>
                    View More <ArrowDown />
                  </div>
                </div>
              )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
}
