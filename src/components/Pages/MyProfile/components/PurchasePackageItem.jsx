import React, { useEffect, useState } from 'react';
import {
  DoubleArrowRight,
  Star,
  Mail,
  OptionDots,
} from '../../../Core/Layout/Icon';
import { ToolTip } from './../../../Core/Layout/Tooltip/ToolTip';
import moment from 'moment';
import { BASE_URL } from './../../../../config';
import axios from 'axios';
import { Modal } from './../../../Core/Layout/Modal/Modal';
import ProductReviewModal from './../../TestSeriesDetails/ProductReviewModal';

const PurchasePackageItem = ({ item, element, extraElementInfo }) => {
  const [modalToggle, setmodalToggle] = useState(false);
  const [testDetails, setTestDetails] = useState(null);

  const [showInvoice, toggleShowInvoice] = useState(false);
  const [id, setId] = useState('');
  const [invoiceLink, setInvoiceLink] = useState('');
  const [validity, setValidity] = useState({});

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


  //   For fetching invoice download link
  useEffect(() => {
    if (showInvoice === true) {
      async function fetchInvoiceLink() {
        const config = {
          headers: {
            'Content-Type': 'Application/json',
            Authorization: `${localStorage.token}`,
          },
        };
        const body = {
          orderId: id,
        };

        try {
          const {
            data: { data },
          } = await axios.post(
            `${BASE_URL}/subscription/generate-invoice`,
            body,
            config
          );
          setInvoiceLink(data.download_link);
        } catch (error) {
          console.log(error);
        }
      }

      fetchInvoiceLink();
    }
  }, [showInvoice, id]);

  const ratingModalHandler = () => {
    setmodalToggle(!modalToggle);
  };
  const ratingModalCloseHandler = () => {
    setmodalToggle(false);
  };

  useEffect(() => {
    (async function fetchTestDetails() {
      const config = {
        headers: {
          'Content-Type': 'Application/json',
          Authorization: `${localStorage.token}`,
        },
      };
      try {
        const {
          data: { data },
        } = await axios.get(
          `${BASE_URL}/testPackage/details/${element.package_id}`,
          config
        );

        setTestDetails(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  console.log(element)

  return (
    <>
      <div className="purchase-box">
        <div className="purchase-header">
          <h3>
            Order ID: <span>{item.order_unique_id}</span>
          </h3>
          <div className="action-group">
            <span className="contact-coaching">
              <Mail fill="#fd8041" /> Contact Coaching
            </span>
            <span
              className="options"
              onClick={() => {
                toggleShowInvoice(!showInvoice);
                setId(item.order_id);
              }}>
              <OptionDots />
              {showInvoice && invoiceLink && (
                <div className="option-dropdown">
                  <ul>
                    <li>
                      <a
                        href={invoiceLink}
                        target="_blank"
                        rel="noopener noreferrer">
                        View Invoice
                      </a>
                    </li>
                    <li>
                      <a
                        href={invoiceLink}
                        target="_blank"
                        rel="noopener noreferrer">
                        Download Invoice
                      </a>
                    </li>
                    {/* <li>Send Email</li> */}
                  </ul>
                </div>
              )}
            </span>
          </div>
        </div>
        <div className="purchase-body">
          <img
            src={`${element.package_image_url}`}
            alt=""
            className="purchasehistory-img"
          />
          <div className="purhistory-info">
            <h3>{element.package_name}</h3>
            <p>
              Package Validity: <strong>
              {element.package_validity_type === 0 && checkValidity(element.package_validity)}
              {element.package_validity_type === 1 && checkValidity2(element.package_expired_date)}
               
                </strong>
            </p>
            <p>
              Exam Type:{' '}
              <strong>
                {element && element.package_test_types.length <= 3 ? (
                  element.package_test_types.map((i, idx) => (
                    <React.Fragment key={idx}>
                      {i.examType}{' '}
                      {idx !== element.package_test_types.length - 1 ? ',' : ''}{' '}
                    </React.Fragment>
                  ))
                ) : (
                  <div>
                    {element.package_test_types.slice(0, 3).map((i, idx) => (
                      <React.Fragment key={idx}>
                        {i.examType}{' '}
                        {idx !==
                        element.package_test_types.slice(0, 3).length - 1
                          ? ','
                          : ''}{' '}
                      </React.Fragment>
                    ))}

                    <ToolTip
                      message={`${element.package_test_types
                        .slice(3)
                        .map((el) => el.examType)}`}
                      position={'top'}>
                      <p>
                        {'+'}
                        {element.package_test_types
                          .slice(3)
                          .reduce((acc, current) => acc + 1, 0)}
                      </p>
                    </ToolTip>
                  </div>
                )}
              </strong>
            </p>
            <p>
              Coaching Name:{' '}
              <strong>{element.package_coachings.coachingName}</strong>
            </p>
          </div>
          <div className="purhistory-priceinfo">
            <p className="label">Product Price</p>
            <p className="price">
              &#8377; <strong>{element.package_discounted_price}</strong>{' '}
              <small>&#8377; {element.package_product_price}</small>
            </p>
            <p className="info">
              Discounted Applied: &#8377;
              <strong>{extraElementInfo.product_redeemed_amount}</strong>
            </p>
            <p className="info">
              Used coupon Code: <strong>{item.order_coupon_code}</strong>
            </p>
            {/* <p className="info">
            Payment Mode: <strong>Paytm Wallet</strong>
          </p> */}
          </div>
          <div className="purhistory-ratinginfo">
            {testDetails !== null && testDetails.existReview === 1 ? (
              <span
                className="rate-lable"
                style={{ pointerEvents: 'none' }}
                onClick={ratingModalHandler}>
                Already Rated <DoubleArrowRight />
              </span>
            ) : (
              <span className="rate-lable" onClick={ratingModalHandler}>
                Rate this Product <DoubleArrowRight />
              </span>
            )}
            <p className="rating">
              <Star /> {element.package_rating.toFixed(2)}{' '}
              <span>({`${element.package_rating_count} Ratings`})</span>
            </p>
            {/* <p className="rated">Rated on 30 Jan 2020</p> */}
          </div>
        </div>
        <div className="purchase-footer">
          <p className="purchase-date">
            Purchase On:{' '}
            <strong>
              {item.payment_date !== null &&
                moment(item.payment_date).format('LLLL')}
            </strong>
          </p>
          <p className="purchase-status">
            Payment status:
            <span className="text-green">
              {item.payment_status === 0 && 'Pending'}{' '}
              {item.payment_status === 1 && 'Success'}{' '}
              {item.payment_status === 2 && 'Failed'}
            </span>
          </p>
          <p className="total">
            Total Amount: &#8377;
            <strong>{extraElementInfo.product_final_amount}</strong>
          </p>
        </div>
      </div>
      {modalToggle && (
        <Modal addClass="package-rating">
          <ProductReviewModal
            testDetails={testDetails}
            modalClose={ratingModalCloseHandler}
          />
        </Modal>
      )}
    </>
  );
};

export default PurchasePackageItem;
