import API from "../api";
import {
  ALL_STORE_REQUEST,
  ALL_STORE_SUCCESS,
  ALL_STORE_FAIL,
  NEW_STORE_REQUEST,
  NEW_STORE_SUCCESS,
  NEW_STORE_FAIL,
  NEW_STORE_RESET,
  UPDATE_STORE_REQUEST,
  UPDATE_STORE_SUCCESS,
  UPDATE_STORE_FAIL,
  UPDATE_STORE_RESET,
  STORE_DETAILS_REQUEST,
  STORE_DETAILS_SUCCESS,
  STORE_DETAILS_FAIL,
  CLEAR_ERRORS,
} from "../constants/storeConstants";

// Get All Stores
export const getStores = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_STORE_REQUEST });
    const { data } = await API.get("/api/bb/stores");
    dispatch({ type: ALL_STORE_SUCCESS, payload: data.stores });
  } catch (error) {
    dispatch({
      type: ALL_STORE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Create Store
export const createStore = (storeData) => async (dispatch) => {
  try {
    dispatch({ type: NEW_STORE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.post("/api/bb/store/new", storeData, config);
    dispatch({ type: NEW_STORE_SUCCESS, payload: data.store });
  } catch (error) {
    dispatch({
      type: NEW_STORE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Update Store
export const updateStore = (id, storeData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_STORE_REQUEST });
    const config = { headers: { "Content-Type": "application/json" } };
    const { data } = await API.put(`/api/bb/store/${id}`, storeData, config);
    dispatch({ type: UPDATE_STORE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_STORE_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Get Store Details
export const getStoreDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: STORE_DETAILS_REQUEST });
    const { data } = await API.get(`/api/bb/store/${id}`);
    dispatch({ type: STORE_DETAILS_SUCCESS, payload: data.store });
  } catch (error) {
    dispatch({
      type: STORE_DETAILS_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

// Clear Errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
