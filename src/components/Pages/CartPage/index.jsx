import React, { Fragment, useState, useEffect } from "react";
import { connect } from "react-redux";
import { useLocation, useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import moment from 'moment';
import {
  AddMoreWishlist,
  CartCircle,
  DoubleArrowRight,
  HeartLine,
  Info,
  RemoveIcon,
  RupeeCircle,
} from "../../Core/Layout/Icon";
import Layout from "../../Core/Layout/Layout";
import {
  saveToCart,
  removeItemFromCart,
  addToWishListDB,
  validateCoupon,
  resetCouponErrMsg,
  removeCouponCode,
} from "../../../redux/actions/global";
import { Modal } from "react-responsive-modal";
import { ToolTip } from "../../Core/Layout/Tooltip/ToolTip";
import axios from "axios";
import { BASE_URL } from "./../../../config";

const MyCarts = ({
  cart,
  saveToCart,
  removeItemFromCart,
  addToWishListDB,
  validateCoupon,
  removeCouponCode,
  couponErrorMsg,
  resetCouponErrMsg,
}) => {
  const location = useLocation();
  const history = useHistory();
  const onCloseModal = () => {
    setOpen(false);
    setRemoveItem(null);
  };
  const [open, setOpen] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [removeItem, setRemoveItem] = useState(null);
  const [coupon, setcoupon] = useState(false);
  const { addToast } = useToasts();
  const config = {
    headers: {
      "Content-Type": "Application/json",
      Authorization: `${localStorage.token}`,
    },
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
      <span>
        {months ? `${months} months` : ''} {days ? ` ${days} days` : ''}{' '}
      </span>
    );
  };

  const checkValidity2 = (expireDate) => {
    let starts = moment();
    let ends = moment(expireDate);

    let diffHuman = moment.preciseDiff(starts, ends, true);
    return (
      <span>
        {diffHuman.months ? `${diffHuman.months} months` : ''}{' '}
        {diffHuman.days ? ` ${diffHuman.days} days` : ''}{' '}
      </span>
    );
  };


  useEffect(() => {
    // console.log("location", location);
    if (
      location.state &&
      (location.state.type == 2 || location.state.type == 1)
    ) {
      // console.log("location", location);
      if (!!localStorage.getItem("token")) {
        saveToCart({ id: location.state.id, type: location.state.type });
        history.push({
          pathname: `/cart`,
          state: null,
        });
      } else {
        addToast("Please Login to add product in cart", {
          appearance: "warning",
          autoDismissTimeout: 4000,
          autoDismiss: true,
        });
      }
    }
  }, []);
  useEffect(() => {
    if (cart && cart.order_redem_amount > 0) {
      resetCouponSection();
    }
  }, [cart]);
  const removeCartItem = (item) => {
    setRemoveItem(item);
    setOpen(true);
  };
  const removeItemPermanently = () => {
    removeItemFromCart({ cartId: removeItem.cart_id, couponCode: "" });
    onCloseModal();
  };
  const addToWishList = (item) => {
    // console.log('item', item);
    // console.log('item pack', item.package_data.length);
    // console.log('item pass', item.pass_data.length);
    // const itemType = item.package_data.length == 0 ? 3 : 1;
    addToWishListDB({ cartId: item.cart_id });
  };
  const cartItem = cart?.cart_data;
  const dispalyPackageItem = (item) => {
    // console.log('item-------------------->', item);
    const packageData = item.package_data;
    return (
      <div className="cart-item">
        <div className="cart-top">
          <div className="cart-left">
            {packageData.package_image_url !== null ? (
              <span
                className="cart-img"
                style={{
                  backgroundImage: `url(${packageData.package_image_url})`,
                }}
              ></span>
            ) : (
              <span
                className="cart-img"
                style={{
                  backgroundImage: `url('https://via.placeholder.com/272x150?text=${packageData.package_name}')`,
                }}
              ></span>
            )}
            {/* <span className="cart-img" style={{ backgroundImage: `url(${require('../../../assets/images/test-package.jpg')})` }}></span>  */}
            <div className="cart-info">
              <h3
                style={{ cursor: "pointer" }}
                onClick={() =>
                  history.push(`/testdetails/${packageData.package_id}`)
                }
              >
                {packageData.package_name}
              </h3>
              <p className="subinfo">
                Coaching:{" "}
                <span>
                  {packageData.package_coachings.coachingName},{" "}
                  {packageData.package_coachings.cityName}{" "}
                  {packageData.package_coachings.stateName}
                </span>
              </p>
              <p className="subinfo">
                Exam Type:{" "}
                <span>
                  {packageData.package_coaching_exam_types
                     ||
                    ""}
                </span>
              </p>
              <p className="subinfo">
                Package Validity:{" "}


                {packageData.package_validity_type === 0 &&
                          checkValidity(packageData.package_validity)}

                        {packageData.package_validity_type === 1 &&
                          checkValidity2(packageData.package_validity)}


                {/* <span>{packageData.package_validity} Month</span> */}
              </p>
            </div>
          </div>
          <div className="cart-right">
            <div className="top-info">
              <p className="price-title">Product Price</p>
              {packageData.package_share_unlocked !== 1 && (
                <h4 className="price">
                  &#8377; {packageData.final_amount}
                  {packageData.package_discounted_price && (
                    <strike>
                      &nbsp;&#8377; {packageData.package_product_price}
                    </strike>
                  )}
                </h4>
              )}
              {packageData.package_share_unlocked == 1 && (
                <h4 className="price">
                  &#8377;{" "}
                  {packageData.package_share_unlock_price ||
                    packageData.package_product_price}
                  {packageData.package_share_unlock_price && (
                    <strike>
                      &nbsp;&#8377; {packageData.package_product_price}
                    </strike>
                  )}
                </h4>
              )}
              {packageData.package_discounted_price && (
                <p className="discount">
                  Discount applied:{" "}
                  {(
                    ((packageData.package_product_price -
                      packageData.package_discounted_price) /
                      packageData.package_product_price) *
                    100
                  ).toFixed(2)}
                  %
                </p>
              )}
              {packageData.coupon_applied_amount == 0 &&
                cartItem.order_coupon_code !== null && (
                  <p className="discount">Coupon is not available on this coaching or this product</p>
                )}
              {packageData.coupon_applied_amount > 0 && (
                <p className="discount">
                  Coupon applied: &#8377;{" "}
                  {packageData.coupon_applied_amount.toFixed(2)}
                </p>
              )}
            </div>
            <div className="action">
              <span className="remove" onClick={() => removeCartItem(item)}>
                <RemoveIcon /> Remove
              </span>
              <span className="saveLater" onClick={() => addToWishList(item)}>
                <HeartLine /> Save for Later
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const dispalyPassItem = (item) => {
    // console.log('item', item);
    const passData = item.pass_data;
    return (
      <div className="cart-item">
        <div className="cart-top">
          <div className="cart-left">
            <span
              className="cart-img"
              style={{
                backgroundImage: `url(${require("../../../assets/images/passcart.png")})`,
              }}
            ></span>
            <div className="cart-info">
              <h3>
                {passData.pass_type.passTypeName}{" "}
                <span>(unlock 100+ Test Series)</span>
              </h3>
              <p className="subinfo">
                Coaching:{" "}
                <span>
                  {passData.pass_coachings.coachingName},{" "}
                  {passData.pass_coachings.cityName}{" "}
                  {passData.pass_coachings.stateName}
                </span>
              </p>
              <p className="subinfo">
                Exam Type:{" "}
                <span>
                  {passData && passData.pass_coaching_exam_types.length <= 3 ? (
                    passData.pass_coaching_exam_types.map((i, idx) => (
                      <React.Fragment key={idx}>
                        {i.examType}{" "}
                        {idx !== passData.pass_coaching_exam_types.length - 1
                          ? ","
                          : ""}{" "}
                      </React.Fragment>
                    ))
                  ) : (
                    <div>
                      {passData.pass_coaching_exam_types
                        .slice(0, 3)
                        .map((i, idx) => (
                          <React.Fragment key={idx}>
                            {i.examType}{" "}
                            {idx !==
                            passData.pass_coaching_exam_types.slice(0, 3)
                              .length -
                              1
                              ? ","
                              : ""}{" "}
                          </React.Fragment>
                        ))}

                      <ToolTip
                        message={`${passData.pass_coaching_exam_types
                          .slice(3)
                          .map((el) => el.examType)}`}
                        position={"top"}
                      >
                        <p>
                          {"+"}
                          {passData.pass_coaching_exam_types
                            .slice(3)
                            .reduce((acc, current) => acc + 1, 0)}
                        </p>
                      </ToolTip>
                    </div>
                  )}
                </span>
              </p>
              <p className="subinfo">
                Package Validity:{" "}
                <span>{passData.pass_type.validity} Month</span>
              </p>
            </div>
          </div>
          <div className="cart-right">
            <div className="top-info">
              <p className="price-title">Product Price</p>
              <h4 className="price">
                &#8377; {passData.final_amount}
                {passData.discounted_price && (
                  <strike>&nbsp;&#8377; {passData.product_price}</strike>
                )}
              </h4>
              <p className="discount">
                Discount applied:{" "}
                {(
                  ((passData.product_price - passData.discounted_price) /
                    passData.product_price) *
                  100
                ).toFixed(2)}
                %
              </p>
              {passData.coupon_applied_amount == 0 &&
                cartItem.order_coupon_code != null && (
                  <p className="discount">Coupon is not available on this coaching or this product</p>
                )}
              {passData.coupon_applied_amount > 0 && (
                <p className="discount">
                  Coupon applied: &#8377;{" "}
                  {passData.coupon_applied_amount.toFixed(2)}
                </p>
              )}
            </div>
            <div className="action">
              <span className="remove" onClick={() => removeCartItem(item)}>
                <RemoveIcon /> Remove
              </span>
              {/* <span className="saveLater" onClick={()=>addToWishList(item)}>
                <HeartLine /> Save for Later
              </span> */}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const validateCouponCode = () => {
    validateCoupon({ orderId: cart.order_id, couponCode: couponCode });
  };
  const couponToggle = () => {
    setcoupon(!coupon);
    resetCouponErrorMsg();
  };

  const resetCouponSection = () => {
    setcoupon(false);
    setCouponCode("");
  };

  const resetCouponErrorMsg = () => !!couponErrorMsg && resetCouponErrMsg();
  const removeCoupon = () => {
    const removeCouponObj = {
      orderId: cart.order_id,
      couponCode: cart.order_coupon_code,
    };
    removeCouponCode(removeCouponObj);
  };

  const razorPayPaymentHandler = async () => {
    const orderUrl = `${BASE_URL}/subscription/order-payment`;
    const payload = { orderId: cart.order_id };
    const responseBackend = await axios.post(orderUrl, payload, config);
    console.log(`responseBackend `, responseBackend )
    const options = {
      // key: "rzp_test_1tGSQrCuspbZE1",
      key:"rzp_live_yEnZxTUhfY9bth",
      // order_id: responseBackend.data.data.order_payment_data.id,
      name: "Admisure",
      description: "",
      amount:responseBackend.data.data.order_payment_data.amount,
      currency: "INR",
      handler: async (response) => {
        try {
          console.log("response", response);
          const paymentId = response.razorpay_payment_id;
          const payloadSuccess = {
            orderId: cart.order_id,
            transactionId: paymentId,
          };
          const url = `${BASE_URL}/subscription/order-payment-success`;
          const captureResponse = await axios.post(url, payloadSuccess, config);
          console.log("captureResponse", captureResponse);
          // const successObj = JSON.parse(captureResponse.data)
          // const captured = successObj.captured;
          if (captureResponse.data.message == "Order payment success") {
            // history.push({
            //   pathname: `/profile`,
            //   state: { orderedSuccess: true },
            // });
            history.push({
              pathname: `/payment-success`,
              state: { orderedata: captureResponse.data.data },
            });
          }
          else{
            history.push('/payment-error')
          }
        } catch (err) {
          if(err){
            history.push('/payment-error')
          }
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const goToWishlist = () => {
    localStorage.setItem("myprofileSelect", 5);
    history.push(`/profile`);
  };
  return (
    <Layout>
      <div className="cart-wrapper">
        <div className="a-container">
        {cart && cart?.order_quantity > 0 && <h3>My Cart</h3> }
          {cart && cart?.order_quantity > 0 && (
            <div className="cart-container">
              <div className="cart-box">
                <div className="box-header">
                  <h2>
                    <CartCircle /> {cart?.order_quantity || 0} Products{" "}
                    <span> in your Cart</span>
                  </h2>
                </div>
                <div className="box-body">
                  {cartItem &&
                    cartItem.map((item, idx) => (
                      <React.Fragment key={idx}>
                        {!!item.package_data && dispalyPackageItem(item)}
                        {!!item.pass_data && dispalyPassItem(item)}
                      </React.Fragment>
                    ))}
                  <div className="addmoreItem">
                    <span onClick={() => goToWishlist()}>
                      <AddMoreWishlist /> Add More from Wishlist
                    </span>
                  </div>
                </div>
              </div>
              {cartItem && cartItem.length > 0 && (
                <div className="payment-box">
                  <div className="box-header">
                    <h2>
                      <RupeeCircle /> Payment Summary
                    </h2>
                  </div>
                  <div className="box-body">
                    <div className="payment-details">
                      <ul>
                        <li>
                          <div className="label">
                            <p>Total Price</p>
                          </div>
                          <div className="price">
                            <p>&#8377; {cart.order_original_amount || 0}</p>{" "}
                          </div>
                        </li>
                        {!!cart.order_discounted_amount && (
                          <li>
                            <div className="label">
                              <p>Product Discount</p>
                            </div>
                            <div className="price">
                              <p className="text-red">
                                - &#8377; {cart.order_discounted_amount}
                              </p>{" "}
                            </div>
                          </li>
                        )}
                        <li>
                          <div className="label">
                            <p>Coupon Discount</p>
                            {cart.order_redem_amount > 0 && (
                              <p>
                                {cart.order_coupon_code}
                                <span
                                  className="text-red remove"
                                  onClick={() => removeCoupon()}
                                >
                                  <RemoveIcon fill="#e4556c" /> Remove{" "}
                                </span>
                              </p>
                            )}
                          </div>
                          <div className="price">
                            {!!cart.order_redem_amount && (
                              <p className="text-green">
                                - &#8377; {cart.order_redem_amount}
                              </p>
                            )}
                            {!cart.order_redem_amount && (
                              <p
                                className="apply-coupon"
                                onClick={couponToggle}
                              >
                                Apply Coupon
                              </p>
                            )}
                            {coupon && (
                              <div className="coupon-dropdown">
                                <input
                                  type="text"
                                  placeholder="Enter Coupon Code"
                                  value={couponCode}
                                  onFocus={() => resetCouponErrorMsg()}
                                  onChange={(e) =>
                                    setCouponCode(e.target.value)
                                  }
                                />
                                {!!couponErrorMsg && (
                                  <p className="error">{couponErrorMsg}</p>
                                )}
                                <div className="button-group">
                                  <button
                                    className="btn-transparent"
                                    onClick={() => resetCouponSection()}
                                  >
                                    Cancel
                                  </button>
                                  <button
                                    className="btn-primary radius"
                                    disabled={
                                      couponCode.trim() !== "" ? false : true
                                    }
                                    onClick={() => validateCouponCode()}
                                  >
                                    Apply
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </li>
                        {/* <li>
                      <div className="label"><p>Tax</p></div>
                      <div className="price"><p>&#8377; {cart.order_tax_amount|| 0}</p> </div>
                    </li> */}
                        <li>
                          <div className="label">
                            <p>Order Total</p>
                          </div>
                          <div className="price">
                            <p>&#8377; {cart.order_final_amount || 0}</p>{" "}
                          </div>
                        </li>
                        {/* <li>
                      <div className="label">
                        <p className="custom-checkbox">
                          <input type="checkbox" name="" id="useCash" />
                          <label htmlFor="useCash">Use Admisure Cash <Info /></label>
                        </p>
                        <small>Your Available balance is &#8377; 2260</small>
                      </div>
                      <div className="price"><p className="text-red">- &#8377; 145</p> </div>
                    </li> */}
                        <li>
                          <div className="label total">
                            <p>Total Amount Payble</p>
                          </div>
                          <div className="price">
                            <p>&#8377; {cart.order_final_amount || 0}</p>{" "}
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="payment-btn-group">
                      <button
                        className="btn-primary radius btn-block"
                        onClick={() => razorPayPaymentHandler()}
                      >
                        Proceed to pay &#8377; {cart.order_final_amount || 0}
                      </button>
                      <span
                        className="add-product"
                        onClick={() => history.push(`/`)}
                      >
                        Add More Product <DoubleArrowRight />{" "}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {cart && cart?.order_quantity == 0 && (
            <div className="cart-container cart-empty" >
              <div className="cart-box" style={{width:'100%'}}>
                <div className="box-header box-cart">
                  
                    <CartCircle /> 
                    <h2><span> Oops! Your Cart is Empty</span></h2>
                    <a href="/test-series-packages">Continue exploring</a>
                </div>
                <div className="box-body">
                  
                  <div className="addmoreItem">
                    <span onClick={() => goToWishlist()}>
                      <AddMoreWishlist /> Add More from Wishlist
                    </span>
                  </div>
                </div>
               
              </div>
            </div>
          )}
        </div>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="language-modal">
          <p> Do you want to remove it? </p>
          <div className="language-btn">
            <button className="btn-no radius" onClick={() => onCloseModal()}>
              No
            </button>
            <button
              className="btn-primary radius"
              onClick={() => removeItemPermanently()}
            >
              Yes
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.global.loading,
    cart: state.global.cart,
    couponErrorMsg: state.global.couponErrorMsg,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveToCart: (item) => dispatch(saveToCart(item)),
    removeItemFromCart: (item) => dispatch(removeItemFromCart(item)),
    addToWishListDB: (item) => dispatch(addToWishListDB(item)),
    validateCoupon: (item) => dispatch(validateCoupon(item)),
    resetCouponErrMsg: () => dispatch(resetCouponErrMsg()),
    removeCouponCode: (item) => dispatch(removeCouponCode(item)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyCarts);
