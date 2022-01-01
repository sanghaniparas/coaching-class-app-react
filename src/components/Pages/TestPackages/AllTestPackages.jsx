import React from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Elements/Pagination';
import { LineArrow, Star, University } from '../../Core/Layout/Icon';
import {
  SortByCoaching,
  SortByPractice,
  RATINGCHOICE,
} from '../Global/Constant';
import CustomDropdownRadio from '../Elements/CustomDropdownRadio';
import { ToolTip } from './../../Core/Layout/Tooltip/ToolTip';
import moment from 'moment';
import { useToasts } from 'react-toast-notifications';

import { useHistory } from 'react-router-dom';

export default function AllTestPackages({
  respondSortBy,
  selectedSortBy,
  handlePageClick,
  totalPage,
  packageAllList,
  totalTestPackege,
}) {
  const { addToast } = useToasts();
  const history = useHistory();

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

  const routerChange = (id) => {
    let path = `/testdetails/${id}`;
    history.push(path);
  };

  const buyNow = (item) => {
    if (!!localStorage.getItem('token')) {
      history.push({
        pathname: `/cart`,
        state: { id: item.packageId, type: 2 },
      });
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }
  };

  return (
    <div className="all-test-packages">
      <div className="a-container">
        <div className="header-filter">
          <div className="left-content">
            <h2>All Test Series Packages</h2>
            {packageAllList && packageAllList.length > 0 ? (
              <p>{totalTestPackege} Packages are available</p>
            ) : null}
          </div>
          <div className="filter-group">
            <span>Sort by</span>
            <CustomDropdownRadio
              itemList={
                (selectedSortBy == RATINGCHOICE.PACKAGE && SortByPractice) ||
                SortByCoaching
              }
              respondSelectedItem={respondSortBy}
              selectedSort={
                selectedSortBy == RATINGCHOICE.PACKAGE && SortByPractice
                  ? '2'
                  : '3'
              }
              selectFisrtItem={
                selectedSortBy == RATINGCHOICE.PACKAGE && SortByPractice
                  ? '1'
                  : '2'
              }
              keyItem={'label'}
              type={'sortBy'}
              placeholder={'Highest Rated'}
              total={totalTestPackege}
            />
          </div>
        </div>
        <div className="testpackage-items flex-width new-flex">
          {packageAllList && packageAllList.length > 0 ? null : (
            <div class="a-nodata-Content">No Test Series Available</div>
          )}

          {packageAllList &&
            packageAllList.map((item, idx) => (
              <Link
                to={`/testdetails/${item.id}`}
                className={`a-carousel-item2 ${
                  item.status !== 1 && 'card-disabled'
                }`}
                key={idx}>
                <div
                  className="a-carousel-item"
                  key={idx}
                  style={{ marginRight: '26px',  }}>
                  <span
                    style={{
                      backgroundImage: `url(${item.packageImageUrl})`}}></span>
                  <div className="a-listItem">
                    <div className="a-listTop">
                      <div className="a-itemHead">
                        <h4>{item.packageName.length>30?item.packageName.substring(0, 32) + '...':item.packageName}</h4>
                        <div className="a-ratingandstars">
                          <div className="a-avatarProfile">
                            <span
                              style={{
                                backgroundImage: `url(${item.coachings.logoUrl})`,
                              }}></span>
                          </div>
                          <b>
                            <span>
                              <Star />
                            </span>{' '}
                            {(item.rating &&
                              item.ratingCount.toFixed(1) > 2 &&
                              item.rating.toFixed(1)) ||
                              `-`}
                          </b>
                          <b>
                            (
                            {item.ratingCount.toFixed(1) > 2
                              ? `${item.ratingCount} Ratings`
                              : `Not Rated`}
                            )
                          </b>
                        </div>
                      </div>
                      <p className="a-university" style={{ fontSize: '12px' }}>
                        <span>
                          <University />
                        </span>
                        {item.coachings.coachingName}, {item.coachings.cityName}
                      </p>
                      <p className="a-typeExam">{item.examTypeName}</p>

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
                                  item.coaching_exam_types.split('&').length - 2
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
                            </div>
                          )
                        ) : (
                          ``
                        )}
                      </div>

                      <ul className="a-optionDetails">
                      {item.noOfTest  && <li>No of Tests: {item.noOfTest}</li>}
                       {item.package_test_types.length > 0  && <li>
                          {item.package_test_types.length > 0 ? (
                            item.package_test_types.length <= 1 ? (
                              item.package_test_types.map((i, idx) => (
                                <React.Fragment key={idx}>
                                  {i.test_type_name}{' '}
                                  {idx !== item.package_test_types.length - 1
                                    ? ', '
                                    : ''}{' '}
                                </React.Fragment>
                              ))
                            ) : (
                              <div>
                                {item.package_test_types
                                  .slice(0, 1)
                                  .map((i, idx) => (
                                    <React.Fragment key={idx}>
                                      {i.test_type_name}{' '}
                                      {idx !==
                                      item.package_test_types.slice(0, 1)
                                        .length -
                                        1
                                        ? ', '
                                        : ''}{' '}
                                    </React.Fragment>
                                  ))}

                                <ToolTip
                                  message={`${item.package_test_types
                                    .slice(1)
                                    .map((el) => el.test_type_name)} `}
                                  position={'top'}>
                                  <p>
                                    {'+'}
                                    {item.package_test_types
                                      .slice(1)
                                      .reduce((acc, current) => acc + 1, 0)}
                                  </p>
                                </ToolTip>
                              </div>
                            )
                          ) : (
                            ``
                          )}
                        </li>}
                       {item.package_languages && <li>{item.package_languages}</li>} 

                        {item.validityType === 0 &&
                          checkValidity(item.validity)}

                        {item.validityType === 1 &&
                          checkValidity2(item.expireDate)}
                      </ul>
                      <div className="a-rupeeDetails">
                        
                         
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

                      {item.saleType === 1 && (
                        <div className="a-detailsBtn">
                          <span onClick={() => buyNow(item)}>BUY NOW</span>
                        </div>
                      )}

                      {item.saleType === 2 && (
                        <div
                          className="a-detailsBtn"
                          onClick={() => routerChange(item.id)}>
                          <span>Share &amp; Unlock</span>
                        </div>
                      )}

                      {item.saleType === 3 && (
                        <div
                          className="a-detailsBtn"
                          onClick={() => routerChange(item.id)}>
                          <span>BUY PASS TO UNLOCK</span>
                        </div>
                      )}

                      {item.saleType === 4 && (
                        <div
                          className="a-detailsBtn"
                          onClick={() => routerChange(item.id)}>
                          <span>UNLOCK FREE</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
        </div>
        <div className="pagination">
          <Pagination handlePageClick={handlePageClick} pageCount={totalPage} />
        </div>
      </div>
    </div>
  );
}
