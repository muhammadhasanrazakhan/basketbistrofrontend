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

export const storesReducer = (state = { stores: [] }, action) => {
  switch (action.type) {
    case ALL_STORE_REQUEST:
      return {
        loading: true,
        stores: [],
      };
    case ALL_STORE_SUCCESS:
      return {
        loading: false,
        stores: action.payload,
      };
    case ALL_STORE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newStoreReducer = (state = { store: {} }, action) => {
  switch (action.type) {
    case NEW_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_STORE_SUCCESS:
      return {
        loading: false,
        success: true,
        store: action.payload,
      };
    case NEW_STORE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case NEW_STORE_RESET:
      return {
        ...state,
        success: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const storeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STORE_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_STORE_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case UPDATE_STORE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case UPDATE_STORE_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const storeDetailsReducer = (state = { store: {} }, action) => {
  switch (action.type) {
    case STORE_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case STORE_DETAILS_SUCCESS:
      return {
        loading: false,
        store: action.payload,
      };
    case STORE_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
