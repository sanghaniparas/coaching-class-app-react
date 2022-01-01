import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Phone,
  Mail,
  ModalClose,
  ArrowDown,
  MobileMenu,
  SearchResultIcon,
} from '../../Layout/Icon';

import {
  Search,
  Cart,
  Notification,
  WishList,
  DropDown,
  UserSm,
  Dashboard,
  ExamPref,
  Following,
  Purchase,
  MyWishlist,
  Settings,
  Refer,
  HelpCall,
  Logout,
  CloseCircle,
} from '../../Layout/Icon';
import OutsideClickHandler from 'react-outside-click-handler';
import { fetchCartItem } from '../../../../redux/actions/global';

const AddToCart = ({ fetchCartItem, cart }) => {
  //  console.log(cartQuantity)
  //  console.log(cartItem)

  const [cartQuantity, setCartQuantity] = useState(0);
  const [cartItem, setCartItem] = useState([]);

  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const cartQuantity = cart?.order_quantity;
    const cartItem = cart?.cart_data;
    setCartQuantity(cartQuantity);
    setCartItem(cartItem);

    const checkURL = window.location.pathname.substring(1);
    if(checkURL){
      setShowButton(checkURL === 'cart' ?  true : false)
    }
   

    console.log(showButton);

  }, [cart]);

  const dispalyPackageItem = (item) => {
    const packageData = item.package_data;
    return (
      <li >
        {packageData.package_image_url !== null ? (
          <span
            className="cart-img"
            onClick={() =>
              history.push(`/testdetails/${packageData.package_id}`)
            }
            style={{
              backgroundImage: `url(${packageData.package_image_url})`,cursor:'pointer'
            }}></span>
        ) : (
            <span
              className="cart-img"
              onClick={() =>
                history.push(`/testdetails/${packageData.package_id}`)
              }
              style={{
                backgroundImage: `url('https://via.placeholder.com/272x150?text=${packageData.package_name}')`,
              }}></span>
          )}
        <div className="cart-info">
          <h4 style={{cursor:'pointer'}}
            onClick={() =>
              history.push(`/testdetails/${packageData.package_id}`)
            }>
            {packageData.package_name}
          </h4>
          <p className="inst-name">
            {packageData.package_coachings.coachingName},{' '}
            {packageData.package_coachings.cityName}{' '}
            {packageData.package_coachings.stateName}
          </p>
          <p className="price">
            <span>&#8377;</span>{' '}
            {packageData.package_discounted_price ||
              packageData.package_product_price}
            &nbsp;&nbsp;
            {packageData.package_discounted_price && (
              <strike>&#8377;{packageData.package_product_price}</strike>
            )}
          </p>
        </div>
      </li>
    );
  };
  const dispalyPassItem = (item) => {
    const passData = item.pass_data;
    return (
      <li>
        <span
          className="cart-img"
          style={{
            backgroundImage: `url(${require('../../../../assets/images/passcart.png')})`,
          }}></span>
        <div className="cart-info">
          <h4>{passData.pass_type.passTypeName}</h4>
          <p className="inst-name">
            {passData.pass_coachings.coachingName},{' '}
            {passData.pass_coachings.cityName}{' '}
            {passData.pass_coachings.stateName}
          </p>
          <p className="price">
            <span>&#8377;</span>{' '}
            {passData.discounted_price || passData.product_price}
            {passData.discounted_price && (
              <strike>&#8377; {passData.product_price}</strike>
            )}
          </p>
        </div>
      </li>
    );
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCartItem();
    }
  }, []);

  const history = useHistory();
  const wrapperEmptyRef = useRef(null);
  const wrapperRef = useRef(null);

  const [showChart, setcart] = useState(false);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          setcart(false);
        }
      };
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref]);
  };

  useOutsideAlerter(wrapperRef);
  useOutsideAlerter(wrapperEmptyRef);

  const cartToggle = () => {
    setcart(!showChart);
  };

  return (
    <React.Fragment>
      {showButton === false ?
      <i onClick={cartToggle} className={`login-cart ${showChart ? 'show' : ''}`} style={{ cursor: 'pointer' }}>
        <Cart />
      </i>
      : <i  className={`login-cart `} style={{ cursor: 'pointer' }}>
      <Cart />
    </i> }
      {showButton === false ? cartQuantity > 0 && <span onClick={cartToggle}>{cartQuantity}</span> : <span>{cartQuantity}</span>}


      {showChart ? (
        cartQuantity > 0 ? (
          <div className="cart-dropdown" ref={wrapperRef}>
            <div className="cart-item-container">
              <ul>
                {cartItem &&
                  cartItem.map((item, idx) => (
                    <React.Fragment key={idx}>
                      {!!item.package_data && dispalyPackageItem(item)}
                      {!!item.pass_data && dispalyPassItem(item)}
                    </React.Fragment>
                  ))}
              </ul>
            </div>
            <div className="cart-footer">
              <div className="price-footer">
                <p className="price-total">
                  <span>Total:</span> &#8377;
                  {cart?.order_total_amount || 0}
                  {cart?.order_original_amount > 0 && (
                    <strike>&#8377; {cart?.order_original_amount}</strike>
                  )}
                </p>
              </div>
               <button 
                className="btn-primary radius btn-block"
                onClick={() => history.push(`/cart`)}>
                Go to Cart
              </button> 
            </div>
          </div>
        ) : (
            <OutsideClickHandler
              onOutsideClick={() => {
                cartToggle();
              }}>
              <div className="cart-empty-dropdown" ref={wrapperEmptyRef}>
                <p className="empty-cart">Your cart is empty</p>
                <p
                  className="empty-cart-explore-package"
                  onClick={(e) => {
                    history.push(`/test-series-packages`);
                  }}>
                  Explore Test packages
              </p>
              </div>
            </OutsideClickHandler>
          )
      ) : null}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profileData.mainProfile,
    cart: state.global.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCartItem: () => dispatch(fetchCartItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddToCart);

//export default AddToCart;
