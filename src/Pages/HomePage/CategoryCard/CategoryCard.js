import React from 'react';
import { Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import styles from './CategoryCard.module.css';

const CategoryCard = ({ category: { name, linkName, icon } }) => {
  const Navigate = useNavigate();
  const { storeID } = useParams();

  const handleNavigation = () => {
    if (storeID) {
      Navigate(`/categories/${linkName}?store=${storeID}`);
    } else {
      Navigate(`/categories/${linkName}`);
    }
  };

  return (
    <Col lg={2} md={3} sm={4} xs={6}>
      <div className={styles.card} onClick={handleNavigation}>
        <div className={styles.iconWrapper}>
          {icon}
        </div>
        <h6>{name}</h6>
      </div>
    </Col>
  );
};

export default CategoryCard;
