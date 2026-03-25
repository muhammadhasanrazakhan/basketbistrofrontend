import { faChevronDown, faClipboardList, faMap, faStore } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { Col, Container, Offcanvas, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import aboutUsIcon from '../../../assets/images/aboutUs.svg';
import cartIcon from '../../../assets/images/cart.svg';
import apple from '../../../assets/images/categories/apple.webp';
import baby from '../../../assets/images/categories/baby.webp';
import beauty from '../../../assets/images/categories/beauty.webp';
import breakfast from '../../../assets/images/categories/Breakfast.webp';
import fruits from '../../../assets/images/categories/cabbage.webp';
import fish from '../../../assets/images/categories/carp-fish.webp';
import cat from '../../../assets/images/categories/cat.webp';
import chili from '../../../assets/images/categories/chili-sauce.webp';
import chips from '../../../assets/images/categories/chips.webp';
import cleaner from '../../../assets/images/categories/cleaner.webp';
import cookie from '../../../assets/images/categories/cookie.webp';
import cooking from '../../../assets/images/categories/Cooking.webp';
import dumbbell from '../../../assets/images/categories/dumbbell.webp';
import honey from '../../../assets/images/categories/honey.webp';
import milk from '../../../assets/images/categories/milk.webp';
import drink from '../../../assets/images/categories/soft-drink.webp';
import jam from '../../../assets/images/categories/strawberry-jam.webp';
import checkoutIcon from '../../../assets/images/checkout.svg';
import contactUsIcon from '../../../assets/images/contactUs.svg';
import errorIcon from '../../../assets/images/error.svg';
import faqIcon from '../../../assets/images/faq.svg';
import footerLogo from '../../../assets/images/footerLogo.svg';
import offerIcon from '../../../assets/images/gift.svg';
import headerLogo from '../../../assets/images/headerLogo.svg';
import Logo from '../../../assets/images/Logo.png';
import HeaderLogo from '../../../assets/images/HeaderLogo.png';
import menuBarIcon from '../../../assets/images/menuBar.svg';
import notifyIcon from '../../../assets/images/notifyIcon.svg';
import homeIcon from '../../../assets/images/homeIcon.svg';
import privacyIcon from '../../../assets/images/privacy.svg';
import searchIcon from '../../../assets/images/search.svg';
import termsIcon from '../../../assets/images/terms.svg';
import userIcon from '../../../assets/images/user.svg';
import { useDispatch } from 'react-redux';
//import useAuth from '../../../hooks/useAuth';
//import useRedux from '../../../hooks/useRedux';
//import { addItemsToCart, removeItemsFromCart } from "../../../actions/cartAction";
import Cart from '../Cart/Cart';
import ProfileDetails from '../ProfileDetails/ProfileDetails';
import styles from './TopNavigation.module.css';

const TopNavigation = () => {
  const [menuShow, setMenuShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //const { loggedInUser } = useAuth();
  //const { show, handleClose, handleShow } = useRedux();
  //const cart = useSelector((state) => state.products.cart);

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [keyword, setKeyword] = useState("");
  const { isAuthenticated } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  // const deleteCartItems = (id) => {
  //   dispatch(removeItemsFromCart(id));
  // };

  let total = 0;
  for (const pd of cartItems) {
    total = total + Number(pd.quantity)
  }
  // for (const pd of cart) {
  //   total = total + Number(pd.quantity);
  // }

  let totalPrice = 0;
  for (const pd of cartItems) {
    totalPrice = totalPrice + (Number(pd.price) * Number(pd.quantity))
  }
  // for (const pd of cart) {
  //   totalPrice = totalPrice + Number(pd.totalPrice);
  // }

  const handleMenuShow = () => setMenuShow(true);
  const handleMenuClose = () => setMenuShow(false);
  const handelClick = () => {
    navigate('/checkout');
    handleClose();
  };

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/categories/${keyword}`);
    } else {
      navigate("/categories");
    }
  };

  const categories = [
    {
      id: 1,
      name: 'Chicken & Meat',
      linkName: 'ChickenandMeat',
      icon: '🍗',
    },
    {
      id: 2,
      name: 'Fruits & Vegetable',
      linkName: 'FruitsandVegetable',
      icon: '🥦',
    },
    {
      id: 3,
      name: 'Milk & Dairy',
      linkName: 'MilkandDairy',
      icon: '🥛',
    },
    {
      id: 4,
      name: 'Grocery',
      linkName: 'Grocery',
      icon: '🛒',
    },
    {
      id: 5,
      name: 'Soup & Detergents',
      linkName: 'SoupandDetergents',
      icon: '🧼',
    },
    {
      id: 6,
      name: 'Baby Care & Beauty',
      linkName: 'BabyCareandBeauty',
      icon: '👶',
    },
    {
      id: 7,
      name: 'Pharmacy',
      linkName: 'Pharmacy',
      icon: '💊',
    },
    {
      id: 8,
      name: 'Confectionary',
      linkName: 'Confectionary',
      icon: '🍬',
    },
    // {
    //   id: 9,
    //   name: 'Decor',
    //   linkName: 'Decor',
    //   icon: '🏺',
    // },
    // {
    //   id: 10,
    //   name: 'Cosmetics',
    //   linkName: 'Cosmetics',
    //   icon: '💄',
    // },
    // {
    //   id: 11,
    //   name: 'Pet Care',
    //   linkName: 'PetCare',
    //   icon: '🐾',
    // },
    // {
    //   id: 12,
    //   name: 'Stationery',
    //   linkName: 'Stationery',
    //   icon: '✏️',
    // },
    // {
    //   id: 13,
    //   name: 'Toys',
    //   linkName: 'Toys',
    //   icon: '🧸',
    // },
    // {
    //   id: 14,
    //   name: 'Instruments and Parts',
    //   linkName: 'InstrumentsandParts',
    //   icon: '⚙️',
    // },
    // {
    //   id: 15,
    //   name: 'Home Appliances',
    //   linkName: 'HomeAppliances',
    //   icon: '🔌',
    // },
    // {
    //   id: 16,
    //   name: 'Fashion',
    //   linkName: 'Fashion',
    //   icon: '👗',
    // },
    // {
    //   id: 17,
    //   name: 'Sports & Outdoors',
    //   linkName: 'SportsandOutdoors',
    //   icon: '⚽',
    // },
    // {
    //   id: 18,
    //   name: 'Jewelry & Accessories',
    //   linkName: 'JewelryandAccessories',
    //   icon: '💍',
    // },
  ];

  return (
    <>
      <header id={styles.header__top}>
        <Container>
          <Row>
            <Col lg={2} md={2} className='d-flex align-self-center'>
              <NavLink to='/' className={styles.logo}>
                <img src={HeaderLogo} alt='headerLogo' />
              </NavLink>
            </Col>
            {/* <Col lg={7} md={7} sm={12} xs={12}>
              <form onSubmit={searchSubmitHandler} className={styles.input}>
                <input type='text' placeholder='Search for products (e.g. fish, apple, oil)' autoComplete='off' spellCheck='false' onChange={(e) => setKeyword(e.target.value)}/>
                <button type='submit'>
                  <img src={searchIcon} alt='searchIcon' />
                </button>
              </form>
            </Col> */}
            <Col lg={7} md={7} sm={12} xs={12}>
              <form onSubmit={searchSubmitHandler} className={styles.input}>
                <input
                  type='text'
                  placeholder='Search for products (e.g. fish, apple, oil)'
                  autoComplete='off'
                  spellCheck='false'
                  onChange={(e) => setKeyword(e.target.value)}
                />
                {/* Search Button */}
                <button type='submit' className={styles.search__btn}>
                  <img src={searchIcon} alt='searchIcon' />
                </button>
                {/* Compare Button */}
                <button type='button' className={styles.compare__btn} onClick={() => navigate('/compare')} title="Compare Products">
                  <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M6.99 11L3 15l3.99 4v-3H14v-2H6.99v-3zM21 9l-3.99-4v3H10v2h7.01v3L21 9z"></path></svg>
                </button>
              </form>
            </Col>
            <Col lg={3} md={3} className='d-flex justify-content-end align-self-center'>
              <div className='d-none d-md-block'>
                <ul className={styles.top__nav__icon}>
                  {/* <li>
                    <img src={notifyIcon} alt='notifyIcon' />
                  </li> */}

                  <li className={styles.cart__icon}>
                    <img src={cartIcon} alt='cartIcon' onClick={handleShow} />
                    <span>{cartItems.length}</span>
                  </li>
                  <li>{!isAuthenticated ? <img src={userIcon} alt='userIcon' onClick={() => navigate('/login')} /> : <ProfileDetails comefrom={"pc"} />}</li>
                  <Offcanvas show={show} onHide={handleClose} placement='end' scroll={true} style={{ zIndex: 10000000 }}>
                    <Offcanvas.Header closeButton className='offCanvas__header'>
                      <Offcanvas.Title>
                        <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                          <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 264l-89.6 112-38.4-44.88'></path>
                          <path
                            fill='none'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='32'
                            d='M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32'
                          ></path>
                        </svg>
                        Shopping Cart
                      </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                      {!cartItems.length && (
                        <div className={styles.placeholder__text}>
                          <span className={styles.placeholder__image}>
                            <svg stroke='currentColor' fill='#10b981 ' strokeWidth='0' viewBox='0 0 512 512' height='30px' width='30px' xmlns='http://www.w3.org/2000/svg'>
                              <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                            </svg>
                          </span>
                          <h6>Your cart is empty</h6>
                          <p>No items added in your cart. Please add product to your cart list.</p>
                        </div>
                      )}

                      <div className={styles.cart__item__container}>
                        {cartItems.map((pd) => (
                          <Cart key={pd.product} pd={pd} />
                        ))}
                      </div>

                      <button className={styles.cart__button} onClick={handelClick} disabled={totalPrice ? false : true}>
                        Proceed To Checkout
                        <span>Rs. {totalPrice}.00</span>
                      </button>
                    </Offcanvas.Body>
                  </Offcanvas>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>
      </header>
      <nav className={styles.nav__items}>
        <Container>
          <div className='d-none d-md-block'>
            <Row className={styles.nav__links}>
              <Col lg={8} md={7} sm={12} className='p-0'>
                <ul className={styles.left__item}>
                  <li>
                    <span className={styles.category}>
                      All Categories
                      <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '10px', margin: '0 0 0 8px' }} />
                      <ul>
                        {categories.map((category) => (
                          // <NavLink to={!category.link ? '/' : category.link} key={category.id}>
                          <NavLink>
                            <div className={styles.iconWrapper}>
                              {category.icon}
                            </div>
                            {category.name}
                          </NavLink>
                        ))}
                      </ul>
                    </span>
                    <NavLink to='/about-us' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      About Us
                    </NavLink>
                    <NavLink to='/contact-us' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      Contact Us
                    </NavLink>
                    <span className={styles.dropdown}>
                      Pages
                      <FontAwesomeIcon icon={faChevronDown} style={{ fontSize: '10px', marginLeft: '8px' }} />
                      <ul>
                        <li>
                          <NavLink to='/offer' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={offerIcon} alt='offerIcon' /> Offer
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/checkout' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={checkoutIcon} alt='checkoutIcon' />
                            Checkout
                          </NavLink>
                        </li>

                        {/* <li>
                          <NavLink to='/faq' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={faqIcon} alt='faqIcon' /> FAQ
                          </NavLink>
                        </li> */}

                        <li>
                          <NavLink to='/dashboard' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <span style={{ marginRight: "15px", marginLeft: "0px" }}>
                              <FontAwesomeIcon icon={faClipboardList} />
                            </span>
                            Dashboard
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/map' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <span style={{ marginRight: "15px", marginLeft: "0px" }}>
                              <FontAwesomeIcon icon={faMap} />
                            </span>
                            Map
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/create-store' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <span style={{ marginRight: "15px", marginLeft: "0px" }}>
                              <FontAwesomeIcon icon={faStore} />
                            </span>
                            Set your Store
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/about-us' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={aboutUsIcon} alt='aboutUsIcon' /> About Us
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/contact-us' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={contactUsIcon} alt='contactUsIcon' />
                            Contact Us
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/privacy-policy' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={privacyIcon} alt='privacyIcon' />
                            Privacy Policy
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/terms-and-conditions' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={termsIcon} alt='termsIcon' />
                            Terms & Conditions
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to='/not-found' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                            <img src={errorIcon} alt='errorIcon' /> 404
                          </NavLink>
                        </li>
                      </ul>
                    </span>
                    {/* <NavLink to='/offers' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      Offers
                    </NavLink> */}

                    <NavLink to='/dashboard' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      Dashboard
                    </NavLink>
                  </li>
                </ul>
              </Col>
              <Col lg={4} md={5} sm={12} className='p-0'>
                <ul className={styles.right__item}>
                  <li>
                    <NavLink to='/privacy-policy' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      Privacy Policy
                    </NavLink>
                    <NavLink to='/terms-and-conditions' className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      Terms & Conditions
                    </NavLink>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </Container>
        <div id={styles.mobile__menu} className='d-block d-md-none'>
          <Container className='d-flex justify-content-between align-self-center'>
            <span onClick={handleMenuShow} className={styles.mobile__menu__icons}>
              <img src={menuBarIcon} alt='menuBarIcon' />
            </span>

            <span className={styles.mobile__menu__icons}>
              <img src={homeIcon} alt='homeIcon' onClick={() => navigate('/main-home')} />
            </span>

            <span className={styles.mobile__menu__icons} id={styles.mobile__cart}>
              <img src={cartIcon} alt='cartIcon' onClick={handleShow} />
              <span>{cartItems.length}</span>
            </span>

            <span className={styles.mobile__menu__icons} style={isAuthenticated ? { transform: 'translateY(-7px)' } : { marginBottom: '14px' }}>
              {!isAuthenticated ? <img src={userIcon} alt='userIcon' onClick={() => navigate('/login')} /> : <ProfileDetails comefrom={"mobile"} />}
            </span>
            <Offcanvas show={show} onHide={handleClose} placement='end' scroll={true}>
              <Offcanvas.Header closeButton className='offCanvas__header'>
                <Offcanvas.Title>
                  <svg stroke='currentColor' fill='currentColor' strokeWidth='0' viewBox='0 0 512 512' height='1em' width='1em' xmlns='http://www.w3.org/2000/svg'>
                    <path fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='32' d='M320 264l-89.6 112-38.4-44.88'></path>
                    <path
                      fill='none'
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='32'
                      d='M80 176a16 16 0 00-16 16v216c0 30.24 25.76 56 56 56h272c30.24 0 56-24.51 56-54.75V192a16 16 0 00-16-16zm80 0v-32a96 96 0 0196-96h0a96 96 0 0196 96v32'
                    ></path>
                  </svg>
                  Shopping Cart
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!cartItems.length && (
                  <div className={styles.placeholder__text}>
                    <span className={styles.placeholder__image}>
                      <svg stroke='currentColor' fill='#10b981 ' strokeWidth='0' viewBox='0 0 512 512' height='30px' width='30px' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M454.65 169.4A31.82 31.82 0 00432 160h-64v-16a112 112 0 00-224 0v16H80a32 32 0 00-32 32v216c0 39 33 72 72 72h272a72.22 72.22 0 0050.48-20.55 69.48 69.48 0 0021.52-50.2V192a31.75 31.75 0 00-9.35-22.6zM176 144a80 80 0 01160 0v16H176zm192 96a112 112 0 01-224 0v-16a16 16 0 0132 0v16a80 80 0 00160 0v-16a16 16 0 0132 0z'></path>
                      </svg>
                    </span>
                    <h6>Your cart is empty</h6>
                    <p>No items added in your cart. Please add product to your cart list.</p>
                  </div>
                )}

                <div className={styles.cart__item__container}>
                  {cartItems.map((pd) => (
                    <Cart key={pd.product} pd={pd} />
                  ))}
                </div>

                <button className={styles.cart__button} onClick={handelClick} disabled={totalPrice ? false : true}>
                  Proceed To Checkout
                  <span>Rs. {totalPrice}.00</span>
                </button>
              </Offcanvas.Body>
            </Offcanvas>
            <Offcanvas show={menuShow} onHide={handleMenuClose} className={styles.offCanvas__mobile__menu}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                  <NavLink to='/' onClick={handleMenuClose}>
                    <img src={Logo} alt='footerLogo' height="100px" />
                  </NavLink>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className={styles.mobile__offCanvas__body}>
                <ul>
                  <li>
                    <NavLink to='/offer' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={offerIcon} alt='offerIcon' /> Offer
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/checkout' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={checkoutIcon} alt='checkoutIcon' />
                      Checkout
                    </NavLink>
                  </li>

                  {/* <li>
                    <NavLink to='/faq' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={faqIcon} alt='faqIcon' /> FAQ
                    </NavLink>
                  </li> */}

                  <li>
                    <NavLink to='/dashboard' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span style={{ marginRight: "15px", marginLeft: "0px" }}>
                        <FontAwesomeIcon icon={faClipboardList} />
                      </span>
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/map' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span style={{ marginRight: "15px", marginLeft: "0px" }}>
                        <FontAwesomeIcon icon={faMap} />
                      </span>
                      Map
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/create-store' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <span style={{ marginRight: "15px", marginLeft: "0px" }}>
                        <FontAwesomeIcon icon={faStore} />
                      </span>
                      Set your Store
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to='/about-us' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={aboutUsIcon} alt='aboutUsIcon' /> About Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/contact-us' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={contactUsIcon} alt='contactUsIcon' />
                      Contact Us
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/privacy-policy' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={privacyIcon} alt='privacyIcon' />
                      Privacy Policy
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/terms-and-conditions' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={termsIcon} alt='termsIcon' />
                      Terms & Conditions
                    </NavLink>
                  </li>

                  <li>
                    <NavLink to='/not-found' onClick={handleMenuClose} className={(navInfo) => (navInfo.isActive ? styles.active : '')}>
                      <img src={errorIcon} alt='errorIcon' /> 404
                    </NavLink>
                  </li>
                </ul>
              </Offcanvas.Body>
            </Offcanvas>
          </Container>
        </div>
      </nav>
    </>
  );
};

export default TopNavigation;
