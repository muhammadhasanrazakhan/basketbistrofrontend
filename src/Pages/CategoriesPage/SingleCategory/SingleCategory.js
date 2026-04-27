import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useMatch, useLocation } from 'react-router-dom';
import { clearErrors, getProduct } from "../../../actions/productAction";
//import { emptyPrev, loadQueryProductsAsync, productSorting } from '../../../redux/feathers/productsSlice';
import ProductCard from '../../HomePage/ProductCard/ProductCard';
import LoadingSpinner from '../../SharedComponents/LoadingSpinner/LoadingSpinner';
import styles from './SingleCategory.module.css';

const categorylist = ['ChickenandMeat', 'FruitsandVegetable', 'MilkandDairy', 'Grocery', 'SoupandDetergents', 'BabyCareandBeauty', 'Pharmacy', 'Confectionary'];

const SingleCategory = () => {
  const dispatch = useDispatch();
  const { error, loading, products } = useSelector((state) => state.products);

  const match = useMatch('/categories/:searchString');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const storeID = searchParams.get('store');

  const { keyword, category } = React.useMemo(() => {
    const searchString = match?.params?.searchString;
    if (categorylist.includes(searchString)) {
      return { category: searchString, keyword: "" };
    }
    return { category: "", keyword: searchString };
  }, [match]);

  const filtered_Products = React.useMemo(() => {
    let fp = [...(products || [])];
    
    if (keyword) {
      const kw = keyword.toLowerCase();
      fp = fp.filter((product) =>
        product.name.toLowerCase().includes(kw)
      );
    }
    
    if (category) {
      fp = fp.filter((product) => product.category === category);
    }
    
    if (storeID) {
      fp = fp.filter((product) => product.store === storeID);
    }
    
    return fp;
  }, [products, keyword, category, storeID]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        duration: 2000,
      });
      dispatch(clearErrors());
    }

    if (!loading && (!products || products.length === 0)) {
      dispatch(getProduct());
    }
  }, [dispatch, error, products, loading]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  return (
    <Container>
      {loading ? (
        <div className='mt-5 pt-5'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {error && toast.error(error)}
          <div className='d-flex justify-content-between mb-4'>
            <h6>
              Total <strong>{filtered_Products.length}</strong> items Found
            </h6>
          </div>

          <div className={styles.category__container}>
            {filtered_Products.map((product) => (
              <ProductCard product={product} key={product._id} />
            ))}
          </div>
        </>
      )}
    </Container>
  );
};

export default SingleCategory;
