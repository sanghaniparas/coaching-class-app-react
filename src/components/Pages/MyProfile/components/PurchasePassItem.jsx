import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const PurchasePassItem = ({ item, element, extraElementInfo }) => {
  const [showInvoice, toggleShowInvoice] = useState(false);
  const [id, setId] = useState('');
  const [invoiceLink, setInvoiceLink] = useState('');

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

  return (
    <div className="purchase-box">
      <div className="purchase-header">
        <h3>
          Order ID: <span>{item.order_unique_id}</span>
        </h3>
        <div className="action-group">
          <span className="contact-coaching">
            <Mail fill="#fd8041" /> Contact Coaching
          </span>
          -
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
          src={`${element.pass_coachings.logoUrl}`}
          alt=""
          className="purchasehistory-img"
        />
        <div className="purhistory-info">
          <h3>{element.pass_type.passTypeName}</h3>
          <p>
            Package Validity:{' '}
            <strong>{element.pass_type.validity} Months</strong>
          </p>
          <p>
            Exam Type:{' '}
            <strong>
              {element && element.pass_coaching_exam_types.length <= 3 ? (
                element.pass_coaching_exam_types.map((i, idx) => (
                  <React.Fragment key={idx}>
                    {i.examType}{' '}
                    {idx !== element.pass_coaching_exam_types.length - 1
                      ? ','
                      : ''}{' '}
                  </React.Fragment>
                ))
              ) : (
                <div>
                  {element.pass_coaching_exam_types
                    .slice(0, 3)
                    .map((i, idx) => (
                      <React.Fragment key={idx}>
                        {i.examType}{' '}
                        {idx !==
                        element.pass_coaching_exam_types.slice(0, 3).length - 1
                          ? ','
                          : ''}{' '}
                      </React.Fragment>
                    ))}

                  <ToolTip
                    message={`${element.pass_coaching_exam_types
                      .slice(3)
                      .map((el) => el.examType)}`}
                    position={'top'}>
                    <p>
                      {'+'}
                      {element.pass_coaching_exam_types
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
            <strong>{element.pass_coachings.coachingName}e</strong>
          </p>
        </div>
        <div className="purhistory-priceinfo">
          <p className="label">Product Price</p>
          <p className="price">
            &#8377; <strong>{element.discounted_price}</strong>{' '}
            <small>&#8377; {element.product_price}</small>
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
  );
};

export default PurchasePassItem;
