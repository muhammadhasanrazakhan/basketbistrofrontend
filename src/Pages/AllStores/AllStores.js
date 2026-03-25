import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getStores, clearErrors } from '../../actions/storeAction';
import { Container, Row, Col, Card } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import styles from './AllStores.module.css';

const AllStores = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { stores, loading, error } = useSelector((state) => state.stores);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    dispatch(getStores());
  }, [dispatch, error]);

  return (
    <section className={styles.allStoresSection}>
      <Container>
        <h2 className={styles.heading}>All Stores</h2>
        <Row>
          {stores && stores.length > 0 ? (
            stores.map((store) => (
              <Col key={store._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className={styles.storeCard} onClick={() => navigate(`/home/${store._id}`)}>
                  <Card.Body>
                    <Card.Title className={styles.storeName}>{store.name}</Card.Title>
                    <div className={styles.location}>📍 {store.address}</div>
                    <div className={styles.catTitle}>Available Categories:</div>
                    <div className={styles.catNames} title={store.categories?.join(', ')}>
                      {store.categories?.join(', ') || 'N/A'}
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <Col><p>No stores found.</p></Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default AllStores;
