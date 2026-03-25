import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemsToCart } from "../../../actions/cartAction";
import toast from 'react-hot-toast';
import styles from './ProductCard.module.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { name, price, _id, images, Stock, store } = product;
  var quantity = 1;

  const { stores } = useSelector((state) => state.allStores || state.stores);
  const storeInfo = stores && stores.find((s) => s._id === store);
  const storeName = storeInfo ? storeInfo.name : "Unknown Store";

  const addToCartHandler = () => {
    dispatch(addItemsToCart(_id, name, price, images[0].url, Stock, quantity));
    toast.success("Item Added To Cart", {
      duration: 1000,
    });
  };

  return (
    <div className={styles.card}>
      <span className={styles.card__img}>
        <img src={images[0].url} alt={name} />
      </span>
      <div className={styles.card__content}>
        <h5>{name}</h5>
        <h6> Sold by : {storeName}</h6>

        
        {/* Bootstrap classes removed to fix alignment via CSS Module */}
        <div className={styles.priceRow}>
          <h4> Rs. {price}</h4>
          <button className={styles.cartBtn} onClick={addToCartHandler}>
            <svg stroke='currentColor' fill='#10b981' strokeWidth='0' viewBox='0 0 512 512' height='23px' width='23px' xmlns='http://www.w3.org/2000/svg'>
              <path d='M460 160h-88v-12A116.13 116.13 0 00258.89 32h-5.78A116.13 116.13 0 00140 148v12H52a4 4 0 00-4 4v300a16 16 0 0016 16h384a16 16 0 0016-16V164a4 4 0 00-4-4zm-280-11c0-41.84 33.41-76.56 75.25-77A76.08 76.08 0 01332 148v12H180zm156 187h-64v64h-32v-64h-64v-32h64v-64h32v64h64z'></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;