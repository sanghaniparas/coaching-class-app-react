import React, { useState, Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useToasts } from 'react-toast-notifications';
import { BASE_URL } from './../../../config';
import Toast from '../Elements/Toast';

const PassCard = ({ item, hideBuyBtn }) => {

 

  
  const history = useHistory();
  const [toastMessage, setToastMessage] = useState(null);
  const [isVisible, toggleIsVisible] = useState(false);
  const { addToast } = useToasts();
  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: `${localStorage.token}`,
    },
  };
  const buyPass = async (item) => {
    if (!!localStorage.token) {
      try {
        const response = await axios.post(
          `${BASE_URL}/subscription/add-to-cart`,
          { itemId: item.id, itemType: item.passTypeId },
          config
        );
        console.log('response', response);
        if (response.data.code == 300) {
          toggleIsVisible(true);
          setToastMessage(response.data.message);
          setTimeout(() => toggleIsVisible(false), 5000);
        } else {
          history.push({
            pathname: `/cart`,
          });
        }
        //dispatch(fetchCartItem());
      } catch (err) {
        console.log('err', err);
      }
    } else {
      addToast('Please Login to add product in cart', {
        appearance: 'warning',
        autoDismissTimeout: 4000,
        autoDismiss: true,
      });
    }

    // history.push({
    //   pathname: `/cart`,
    //   state: { id: item.id, type: item.passTypeId },
    // });
  };

 

  return (
    <Fragment>
      <div
        className="pass-card"
        style={{
          backgroundImage: `url(${require(`../../../assets/images/sure-${item?.passImgName?.toLowerCase() ||
            item?.passType?.passTypeName.split(' ')[1].toLowerCase()
            }.svg`)})`,
        }}>
        <div className="card-left">
          <div className="pass-header">
            <h3>{item.passName || item?.passType?.passTypeName}</h3>
            <p>
              {item?.coachingName ||
                item?.instName ||
                item?.coachings?.coachingName}
            </p>
          </div>
          <div className="pass-body">
            <p className="pass-info">Unlock all test series </p>
            <div className="pass-price-info">
              <div className="price">
                <p>Price</p>
                <h4>
                  &#8377; {item.discountedPrice || item.price}{' '}
                  <span>
                    - {`${item.month || item?.passType?.validity} Months`}
                  </span>
                </h4>
              </div>
              {!hideBuyBtn && (
                <button
                  className="btn-white radius-30"
                  onClick={() => buyPass(item)}>
                  Buy Pass
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="card-right">
          <h5>validity</h5>
          <div className="validity-info">
            <p>Get unlimited Tests</p>
            <p>
              <strong>For {item.month || item?.passType?.validity} Months</strong>
            </p>
          </div>
        </div>
      </div>
      <Toast isVisible={isVisible} toastMessage={toastMessage} />
    </Fragment>
  );
};

export default PassCard;
