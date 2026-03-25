import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createStore, updateStore, clearErrors, getStoreDetails } from '../../actions/storeAction';
import { useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import styles from './CreateStore.module.css';

const categoriesList = [
  'Chicken & Meat', 'Fruits & Vegetable', 'Milk & Dairy', 'Grocery', 'Soup & Detergents',
  'Baby Care & Beauty', 'Pharmacy', 'Confectionary'
  // , 'Decor', 'Cosmetics', 'Pet Care',
  // 'Stationery', 'Toys', 'Instruments and Parts', 'Home Appliances', 'Fashion',
  // 'Sports & Outdoors', 'Jewelry & Accessories'
];

const CreateStore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  // 1. In teeno states ko alag alag ya sahi reducer se nikaalein
  const { user } = useSelector((state) => state.user);

  // Naya store banane ki success state yahan se aayegi
  const { success, error: createError, loading: createLoading } = useSelector((state) => state.newStore);

  // Update karne ki success state yahan se aayegi
  const { isUpdated, error: updateError, loading: updateLoading } = useSelector((state) => state.store);

  // Store ki details yahan se aayengi
  const { store, error: detailsError } = useSelector((state) => state.storeDetails);

  // loading ko combine kar lein
  const loading = createLoading || updateLoading;
  const error = createError || updateError || detailsError;

  // If user already has a store, fetch details
  useEffect(() => {
    if (user && user.store) {
      dispatch(getStoreDetails(user.store));
    }
  }, [user, dispatch]);

  const [storeName, setStoreName] = useState(location.state?.storeName || '');
  const [storeAddress, setStoreAddress] = useState(location.state?.storeAddress || '');
  const [selectedCategories, setSelectedCategories] = useState(location.state?.selectedCategories || []);
  const [storeLocation, setStoreLocation] = useState(
    (location.state?.lat && location.state?.lng)
      ? { lat: location.state.lat, lng: location.state.lng }
      : null
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      toast.success('Store created successfully!');
      // navigate('/dashboard');
    }
    if (isUpdated) {
      toast.success('Store updated successfully!');
      // navigate('/dashboard');
    }
    // Prefill if store changes
    if (store && store._id && !location.state) {
      setStoreName(store.name || '');
      setStoreAddress(store.address || '');
      setSelectedCategories(store.categories || []);
      if (store.location) setStoreLocation(store.location);
    }
  }, [error, success, isUpdated, store, dispatch, navigate, location.state]);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const storeData = {
      name: storeName,
      address: storeAddress,
      categories: selectedCategories,
      ...(storeLocation && { location: storeLocation }),
    };
    if (store && store._id) {
      dispatch(updateStore(store._id, storeData));
    } else {
      dispatch(createStore(storeData));
    }
  };

  return (
    <div className={styles.createStoreContainer}>
      <form className={styles.storeForm} onSubmit={handleSubmit}>
        <h2>{store && store._id ? 'Update Store' : 'Create Store'}</h2>
        <div className={styles.inputGroup}>
          <label>Store Name</label>
          <input
            type="text"
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            required
            placeholder="Enter store name"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Store Address</label>
          <input
            type="text"
            value={storeAddress}
            onChange={(e) => setStoreAddress(e.target.value)}
            required
            placeholder="Enter store address"
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Store Location</label>
          <div className={styles.locationContainer}>
            <button
              type="button"
              className={styles.locationBtn}
              onClick={(e) => {
                e.preventDefault();
                navigate('/map', {
                  state: { storeName, storeAddress, selectedCategories, ...storeLocation }
                });
              }}
            >
              {storeLocation ? 'Update Location' : 'Add Location'}
            </button>
            {storeLocation && (
              <span className={styles.locationText}>
                Lat: {storeLocation.lat.toFixed(4)}, Lng: {storeLocation.lng.toFixed(4)}
              </span>
            )}
          </div>
        </div>
        <div className={styles.inputGroup}>
          <label>Categories in Store</label>
          <div className={styles.categoriesDropdown}>
            <div className={styles.categoriesList}>
              {categoriesList.map((cat, idx) => (
                <div key={cat} className={styles.categoryItem}>
                  <input
                    type="checkbox"
                    id={`cat-${idx}`}
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                  />
                  <label htmlFor={`cat-${idx}`}>{cat}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {store && store._id ? 'Update Store' : 'Create Store'}
        </button>
      </form>
    </div>
  );
};

export default CreateStore;
