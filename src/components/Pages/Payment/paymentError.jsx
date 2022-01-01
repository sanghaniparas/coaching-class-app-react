import React, { useEffect, useState } from 'react';
import { useHistory,useLocation } from "react-router-dom";
import {
  CloseCircle,
} from "../../Core/Layout/Icon";
import Layout from "../../Core/Layout/Layout";
import { BASE_URL } from "./../../../config";
import { Link } from 'react-router-dom';

export default function PaymentError(){
  const location = useLocation();
  const history=useHistory()
  // useEffect(() => {
  //   if(location.state == undefined){
  //     return history.push('/')
  //   }
  // }, [])
    return (
      <Layout>
        <div className="payment-container">
           <div className="a-container">
              <div className="payment-blk text-center payment-fail">
                  <CloseCircle />
                  <h2>Oops! Payment Failed</h2>
                  <p>Its seem we have not recevied money.</p>
                  <div className="button-group">
                      <Link to="/cart" className="btn-warning">
                          Try Again
                      </Link>
                  </div>
              </div>
           </div>
        </div>
      </Layout>
  );
}


