import React, {
  Fragment,
  useState,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import { useToasts } from 'react-toast-notifications';
import { Link, NavLink, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  Phone,
  Mail,
  ModalClose,
  ArrowDown,
  MobileMenu,
  SearchResultIcon,
} from '../Layout/Icon';

import debounce from 'lodash.debounce';

import {
  Category,
  Search,
  Cart,
  Heart,
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
} from '../Layout/Icon';
import {
  fetchSearchData,
  fetchExamTypeData,
  fetchCartItem,
} from '../../../redux/actions/global';
import SignUp from './../../Pages/SignUp/SignUp';
import Login from './../../Pages/Login/Login';
import useFetchSearch from './../../../Hooks/useFetchSearch';
import { createStructuredSelector } from 'reselect';
import { selectMainProfile } from './../../../redux/MyProfile/profile.selectors';
import CategoryList from './CategoryList';
import Logo from './Logo';
import useProfile from './../../../Hooks/useProfile';
import OutsideClickHandler from 'react-outside-click-handler';
import CategoryMobileList from './CategoryMobileList';
import SearchBar from './SearchBar/SearchBar';
import ProfileMenu from './ProfileMenu/ProfileMenu';
import AddToCart from './AddToCart/AddToCart';
import slug from '../../../utils/slug';


const GLOBALOACHING = '/search/test_package_coaching_search';

const NavBar = ({
  openPopup,
  openLoginPopup,
  fetchSearchData,
  fetchCartItem,
  cart,
  profile,
  fetchExamTypeData,
}) => {
  const [toggleProfile, settoggleProfile] = useState(false);
  const wrapperRef = useRef(null);
  const wrapperEmptyRef = useRef(null);


  const { addToast } = useToasts();
  //For fetch search results
  const [searchValue, setSearchValue] = useState('');
  const [showChart, setcart] = useState(false);
  const [showEmptyChart, setEmptyCart] = useState(false);
  const {
    searchData,
    searchHistory,
    examTypeSearch,
    loading,
    error,
  } = useFetchSearch(searchValue, GLOBALOACHING, true);

  //delete
  const [searchParam, setSearchParam] = useState({
    searchData: '',
  });

  // Category Toggle
  const [category, setcategory] = useState(false);
  const [flag, setFlag] = useState(false);
  const [change, setafterChange] = useState(false);

  const [getToken, setToken] = useState(false);

  const categoryToggle = () => {
    console.log("category toggle",category);
    setFlag(!flag);
    setcategory(!category);
  };

  useEffect(()=>{
    if(!!localStorage.getItem('token')
    ){
      setToken(true);
    }else{
      setToken(false);
    }
   })

  console.log(localStorage.getItem('token') === 'undefined')

  useEffect(()=>{
   console.log("after category toggle",category);
  },[category])

  // Mobile Search panel
  const [toggleSearch, settoggleSearch] = useState(false);

  const mobileToggleSearch = () => {
    settoggleSearch(!toggleSearch);
  };
  const closeMobileToggleSearch = () => {
    settoggleSearch(false);
  };

  //Debouncing search value
  const debouncedSave = useCallback(
    debounce((value) => setSearchValue(value), 800),
    []
  );

  useEffect(() => {
    if (getToken) {
      fetchCartItem();
    }
    if (localStorage.getItem('serachResults')) {
      fetchSearchData(localStorage.getItem('serachResults'));
    }
  }, []);

  const toggleProfileHandler = () => {
    settoggleProfile(!toggleProfile);
  };

  // MOBILE MENU TOGGLE
  const [mobilemenu, setmobilemenu] = useState(false);
  const mobileMenuToggle = () => {
    setmobilemenu(!mobilemenu);
  };
  const MobileMenuClose = () => {
    setmobilemenu(false);
  };

  const MyWishList = () => {
    //alert("okay")
    localStorage.setItem('myprofileSelect', 5);

    history.push(`/profile`);
  };

  // Mobile Category sidebar
  const [categorybar, setcategorybar] = useState(false);
  const mobileCategoryToggle = () => {
    setcategorybar(!categorybar);
  };
  const mobileCategoryClose = () => {
    setcategorybar(false);
  };

  // Mobile sub category sidebar
  const [subcategory, setsubcategory] = useState(false);
  const subCategoryToggle = () => {
    setsubcategory(!subcategory);
  };
  const subCategoryClose = () => {
    setsubcategory(false);
  };

  //   Search result click functionality
  const history = useHistory();
  const handleSearchClick = (el) => {
    if (!el.coachingName) {
      history.push(`/testdetails/${el.id}`);
      return window.location.reload();
    }

    history.push(`/coaching/${el.id}`);
    return window.location.reload();
  };

  const handleSidebarClick = (selected, path) => {
    localStorage.setItem('myprofileSelect', selected);
    history.push(path);
  };

  const redirectSearch = (event) => {
    event.preventDefault();
    //alert()
    fetchExamTypeData(event.target.id);
    history.push({
      pathname: `/searchpage`,
      state: {
        searchKeywords: event.target.id,
        examType: true,
      },
    });
    document.getElementById('global_search').value = '';
    debouncedSave('');
  };

  //delete
  const handleKeyDown = (e) => {
    if (!!e.target.value.trim() && e.key === 'Enter') {
      fetchSearchData(e.target.value);
      localStorage.setItem('serachResults', e.target.value);
      history.push({
        pathname: `/searchpage`,
        state: {
          searchKeywords: e.target.value,
        },
      });
      document.getElementById('global_search').value = '';
      debouncedSave('');
    }
  };

  const emptyCartToggle = () => {
    setEmptyCart(!showEmptyChart);
  };
  const cartToggle = () => {
    setcart(!showChart);
  };
  const dispalyPackageItem = (item) => {
    const packageData = item.package_data;
    return (
      <li>
        {packageData.package_image_url !== null ? (
          <span
            className="cart-img"
            onClick={() =>
              history.push(`/testdetails/${packageData.package_id}`)
            }
            style={{
              backgroundImage: `url(${packageData.package_image_url})`,
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
          <h4
            onClick={() =>
              history.push({
                pathname: `/exam/${slug(packageData.package_name)}`,
                state: { examId: packageData.package_id }
              })
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
            backgroundImage: `url(${require('../../../assets/images/passcart.png')})`,
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

  const cartQuantity = cart?.order_quantity;
  const cartItem = cart?.cart_data;

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

  function useOuterClick(callback) {
    const callbackRef = useRef(); // initialize mutable ref, which stores callback
    const innerRef = useRef(); // returned to client, who marks "border" element
  
    // update cb on each render, so second useEffect has access to current value 
    useEffect(() => { callbackRef.current = callback; });
    
    useEffect(() => {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
      function handleClick(e) {
        if (innerRef.current && callbackRef.current && 
          !innerRef.current.contains(e.target)
        ) callbackRef.current(e);
      }
    }, []); // no dependencies -> stable click listener
        
    return innerRef; // convenience for client (doesn't need to init ref himself) 
  }


  const innerRef = useOuterClick(ev => { if(toggleProfile === true) settoggleProfile(false);});
  return (
    <Fragment>
      <div className="a-header">
        <div className="a-container">
          <div className="a-wrapper">
            <div className="a-mobile-menu" onClick={mobileMenuToggle}>
              <MobileMenu />
            </div>
            <Logo />
            <div className="a-header-category" onClick={()=>{
              console.log("click");
                setcategory(!category);
            }}>
              <p onClick={()=>{
                setcategory(!category);
              }}>
                <span className={category ? 'active' : ''} onClick={()=>setafterChange(!change)}>
                  <Category />
                </span>
                <span  onClick={()=>setafterChange(!change)}>Categories</span>
              </p>
              {/* {category  && <OutsideClickHandler
                        onOutsideClick={() => {
                          setcategory(false);
                          setFlag(false)
                         
                        }}><CategoryList setcategory={setcategory} /></OutsideClickHandler>} */}

                      {change && <CategoryList setcategory={setcategory} /> }
            </div>
            <div className="a-header-search">
              <SearchBar />
            </div>

            <div className="a-header-right-info">
              {/* <button onClick={() => history.push(`/myprofile`)}>
                Wishlist
              </button> */}
              {getToken ? (
                <a
                  className="wishlist"
                  onClick={MyWishList}
                  style={{ cursor: 'pointer' }}>
                  <Heart />
                </a>
              ) : (
                ''
              )}
              {getToken ? null : (
                <Fragment>
                  <div className="a-header-register">
                    <a
                      href="https://coaching.admisure.com/coaching-master/login"
                      target="_blank"
                      rel="noopener noreferrer">
                      Login as Coaching
                    </a>
                  </div>
                  <div
                    className={`a-header-cart ${showEmptyChart ? 'show' : ''}`}>
                    <span
                      onClick={emptyCartToggle}
                      style={{ cursor: 'pointer' }}>
                      <Cart />
                    </span>
                    {showEmptyChart && (
                      <OutsideClickHandler
                        onOutsideClick={() => {
                          setEmptyCart(false);
                        }}>
                        <div className="cart-dropdown" ref={wrapperEmptyRef}>
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
                    )}
                  </div>
                </Fragment>
              )}

              <div
                className={`a-header-auth ${
                  getToken && cartQuantity === 0
                    ? 'a-header-loggedin-cart'
                    : ''
                }`}>
                {/* <Login />
               <SignUp /> */}
                {getToken ? (
                  <React.Fragment>
                    <ul className="a-dash-list-header">
                      {/* <li onClick={() => history.push('/dashboard')}>
                        <button className="btn-primary radius">
                          Dashboard
                        </button>
                      </li> */}
                      {/* <li>
                         <WishList />
                         <span></span>
                      </li> */}

                      <li>
                        <AddToCart />
                      </li>

                      {/* <li>
                      <Notification />
                      <span>3</span>
                    </li> */}
                    </ul>
                    <div
                      className="profile-login" 
                      onClick={toggleProfileHandler}>
                      <span className="name">
                        {profile !== null && profile.name}
                      </span>
                      <span className="avatar">
                        {profile !== null && profile.avatarUrl === null && (
                          <img
                            src={require('../../../assets/images/no-image-icon-md.png')}
                            alt="profile pic"
                          />
                        )}
                        {profile !== null && profile.avatarUrl !== null && (
                          <img src={`${profile.avatarUrl}`} alt="profile pic" />
                        )}
                      </span>
                      <span className="dropdown" >
                        <DropDown />
                      </span>

                      {toggleProfile && (
                        <div className="dropdown-menu" ref={innerRef}>
                          <ProfileMenu />
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                ) : (
                  <>
                    <span className="login" onClick={() => openPopup()}>
                      Login
                    </span>
                    <span className="signup" onClick={() => openLoginPopup()}>
                      Sign Up
                    </span>
                  </>
                )}
              </div>
            </div>
            {getToken ? (
              <button
                className="mobile-auth-btn"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  window.location.reload();
                }}>
                {' '}
                Logout
              </button>
            ) : (
              <button
                className="mobile-auth-btn"
                onClick={() => openPopup()}>
                {' '}
                Login
              </button>
            )}
          </div>
        </div>
      </div>
      {/* MOBILE MENU */}
      <aside className={`mobile-sidemenu ${mobilemenu ? ' active' : ''}`}>
        <span className="close" onClick={MobileMenuClose}>
          <ModalClose />{' '}
        </span>
        <div className="sidemenu-wrapper">
          {getToken && (
            <div className="profile" onClick={() => history.push('/profile')}>
              <span className="profile-avt">
                {profile !== null && profile.avatarUrl === null && (
                  <img
                    src={require('../../../assets/images/no-image-icon-md.png')}
                    alt="profile pic"
                  />
                )}
                {profile !== null && profile.avatarUrl !== null && (
                  <img src={`${profile.avatarUrl}`} alt="profile pic" />
                )}
              </span>
              <div className="profile-info">
                <p className="name"> {profile !== null && profile.name}</p>
              </div>
            </div>
          )}
          <ul className={`menu-list-items ${getToken ? 'has-profile' : ''}`}>
            <li onClick={mobileCategoryToggle}>
              <NavLink to="/" className="" activeClassName="a-nav">
                Category
                <ArrowDown />
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <NavLink to="/coaching" activeClassName="a-nav">
                Coaching                
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <NavLink to="/coaching-pass" activeClassName="a-nav">
                Pass                
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <NavLink to="/test-series-packages" activeClassName="a-nav">
                Test Packages                
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <NavLink to="/practice-sets" activeClassName="a-nav">
                Practice                
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <NavLink to="/quiz" activeClassName="a-nav">
                Quiz                
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <NavLink to="/" activeClassName="a-nav">
                Discuss                
              </NavLink>
            </li>
            <li onClick={MobileMenuClose}>
              <a
                href="https://admisure.com/blog"
                activeClassName="a-nav"
                target="_blank">
                Blog                
              </a>
            </li>
            
            
            {/* <li>go
              <NavLink to="/pass" activeClassName="a-nav">
                Pass
                <ArrowDown />
              </NavLink>
            </li>
            <li>
              <NavLink to="/test-series-packages" activeClassName="a-nav">
                Test Packages
                <ArrowDown />
              </NavLink>
            </li>
            <li>
              <NavLink to="/practice" activeClassName="a-nav">
                Practice
                <ArrowDown />
              </NavLink>
            </li>
            <li>
              <NavLink to="/quiz" activeClassName="a-nav">
                Quiz
                <ArrowDown />
              </NavLink>
            </li> */}
            {/*<li>
              <NavLink to="" activeClassName="a-nav">
                Discuss
                <ArrowDown />
              </NavLink>
            </li>
            <li>
              <NavLink to="" activeClassName="a-nav">
                Blog
                <ArrowDown />
              </NavLink>
            </li> */}
            
            <li>
              <a
                href="https://coaching.admisure.com/coaching-master/login"
                target="_blank"
                rel="noopener noreferrer">
                Login as Coaching
              </a>
            </li>
            <li>
              <span>
                <Phone /> +91-8585857237
              </span>
            </li>
            <li>
              <span>
                <Mail /> Support@admisure.com
              </span>
            </li>
          </ul>
          <div className="btn-group">
            {getToken ? (
              <button
                className="btn-primary radius"
                onClick={() => {
                  localStorage.removeItem('token');
                  localStorage.removeItem('username');
                  
                  history.push('/')
                  window.location.reload();
                 
                }}>
                Logout
              </button>
            ) : (
              <>
                <button
                  className="btn-warning-line"
                  onClick={() => openPopup()}>
                  Login
                </button>
                <button
                  className="btn-primary radius"
                  onClick={() => openLoginPopup()}>
                  Signup
                </button>
              </>
            )}
          </div>
          {categorybar && (
            <CategoryMobileList
              subCategoryToggle={subCategoryToggle}
              mobileCategoryClose={mobileCategoryClose}
              subCategoryClose={subCategoryClose}
              subcategory={subcategory}
            />
          )}
        </div>
      </aside>
      {/* MOBILE GLOBAL SEARCH */}
      <div className={`global-search-mobile ${toggleSearch ? 'open' : ''}`}>
        <div className="search-header">
          <span className="search-back" onClick={closeMobileToggleSearch}>
            <ArrowDown />
            Back
          </span>
          <div className="search-wrap">
            <input type="text" />
            <Search />
          </div>
        </div>
        <div className="search-body"></div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.global.loading,
    profile: state.profileData.mainProfile,
    cart: state.global.cart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchData: (keywords) => dispatch(fetchSearchData(keywords)),
    fetchExamTypeData: (keywords) => dispatch(fetchExamTypeData(keywords)),
    fetchCartItem: () => dispatch(fetchCartItem()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
