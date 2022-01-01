import React, { useEffect, useState } from 'react';
import { useHistory,useLocation } from "react-router-dom";
import moment from 'moment';
import {
  CheckCircle,
} from "../../Core/Layout/Icon";
import Layout from "../../Core/Layout/Layout";
import { BASE_URL } from "./../../../config";
import { Link } from 'react-router-dom';

export default function Paymentsuccess(){
  const [orderData,setorderData]=useState({});
  const location = useLocation();
  const history=useHistory()
 console.log(`location`,location)

 useEffect(() => {
   if(location.state == undefined){
     return history.push('/')
   }
   setorderData(location.state.orderedata)
   return () => {
    setorderData({})
   }
 }, [])
    return (
      <Layout>
        {orderData && 
        <div className="payment-container">
           <div className="a-container">
              <div className="payment-blk text-center">
                  <CheckCircle />
                  <h2>Payment Successful</h2>
                  <p>Thank you for payment of <strong>Rs.{orderData.order_price}
                  </strong> on { moment(orderData.purchase_date).format('LLLL')} for <strong>{orderData.purchase_item}</strong>.</p>
                  {/* <p>Thank you for purchasing the package</p> */}
                  <div className="button-group">
                      {/* <Link to="/" className="btn-warning">
                          Go to Payment History
                      </Link>
                      <Link to="/dashboard" className="btn-warning-line radius-30">
                          Go to Dashboard
                      </Link> */}
                       <Link to="/" className="btn-warning">
                          Go to Homepage
                      </Link>
                      <Link to={{ pathname: `/profile`,state:"paymentSuccess"}} className="btn-warning">
                           Payment History
                      </Link>
                  </div>
              </div>
           </div>
        </div>}
      </Layout>
  );
}


