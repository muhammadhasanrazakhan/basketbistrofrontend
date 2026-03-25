import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, clearErrors } from '../../../actions/storeAction';
import { useNavigate } from 'react-router-dom';
import { Card, Container } from 'react-bootstrap';
import toast from 'react-hot-toast';
import styles from './StoreSlider.module.css';

const StoreSlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores, error } = useSelector((state) => state.stores);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (!stores || stores.length === 0) {
      dispatch(getStores());
    }
  }, [dispatch, error]);

  return (
    <Container className={styles.sliderContainer}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className={styles.heading}>Shop by Stores</h2>
        <button className={styles.viewAllBtn} onClick={() => navigate('/all-stores')}>View All</button>
      </div>
      <div className={styles.horizontalScroll} style={{overflowX: 'auto'}}>
        {stores && stores.length > 0 ? (
          stores.map((store) => (
            <Card key={store._id} className={styles.storeCard} onClick={() => navigate(`/home/${store._id}`)}>
              <Card.Body>
                <Card.Title className={styles.storeName}>{store.name}</Card.Title>
                <div className={styles.location}>📍 {store.address}</div>
                <div className={styles.catTitle}>Available Categories:</div>
                <div className={styles.catNames} title={store.categories?.join(', ')}>
                  {store.categories?.join(', ') || 'N/A'}
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <div>No stores found.</div>
        )}
      </div>
    </Container>
  );
};

export default StoreSlider;