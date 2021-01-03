import { GET_DATA, GET_DATA_SUCCESS } from '../constants/ActionTypes';

export const fetchData = (id) => {
  return {
    type: GET_DATA,
    payload: id
  };
};

export const fetchDataSuccess = (data) => {
  return {
    type: GET_DATA_SUCCESS,
    payload: data
  }
};

