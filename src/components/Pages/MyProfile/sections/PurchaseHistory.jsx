import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDown } from '../../../Core/Layout/Icon';
import { createStructuredSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { selectPurchaseHistory } from './../../../../redux/MyProfile/profile.selectors';
import { fetchPurchaseHistory } from '../../../../redux/MyProfile/profile.actions';
import PurchaseHistoryItem from './../components/PurchaseHistoryItem';

const PurchaseHistory = ({ purchaseHistory }) => {
  console.log(`purchaseHistory`, purchaseHistory)
  const [productCount, setProductCount] = useState(0);
  const [data, setData] = useState({
    page: 1,
    per_page: 1,
  });

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPurchaseHistory(data));
  }, [data]);

  //   For view more
  const handleViewMoreClick = () => {
    setData((data) => ({ ...data, per_page: data.per_page + 1 }));
  };

  //   For getting sum of total products to show below
  useEffect(() => {
    if (purchaseHistory !== null) {
      let count = purchaseHistory.order_data.reduce(
        (acc, cur) => acc + cur.cart_data.length,
        0
      );

      setProductCount(count);
    }
  }, [purchaseHistory]);

  return (
    <div className="purchase-history">
      <div className="header-filter">
        <div className="left-content">
          <h3>Products ({productCount})</h3>
        </div>
      </div>
      {purchaseHistory !== null && purchaseHistory.total_count >= 1 ? (
        purchaseHistory.order_data.filter(el=>el.payment_status ==1).map((item) => (
          <PurchaseHistoryItem item={item} />
        ))
      ) : (
        <h1>Nothing in your purchase history!</h1>
      )}
      {purchaseHistory !== null &&
        purchaseHistory.order_data.length !== purchaseHistory.total_count && (
          <div className="viewmore" onClick={handleViewMoreClick}>
            <div>
              View More <ArrowDown />
            </div>
          </div>
        )}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  purchaseHistory: selectPurchaseHistory,
});

export default connect(mapStateToProps)(PurchaseHistory);
