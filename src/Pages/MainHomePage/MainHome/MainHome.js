import React, { useEffect } from 'react';
import DailyNeeds from '../../SharedComponents/DailyNeeds/DailyNeeds';
// import AboutUs from '../AboutUs/AboutUs';
import MainBanner from '../MainBanner/MainBanner';
import StoreSlider from '../StoreSlider/StoreSlider';
// import CartTracker from '../CartTracker/CartTracker';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import Products from '../Products/Products';
// import Testimonials from '../Testimonials/Testimonials';

const Home = () => {
  useEffect(() => {
    document.title = 'Home | Mono Basket';
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <>
      <MainBanner />
      <StoreSlider />
      <FeaturedCategories />
      <Products />
      {/* <AboutUs />
      <CartTracker />
      <Testimonials />
      <DailyNeeds /> */}
    </>
  );
};

export default Home;
