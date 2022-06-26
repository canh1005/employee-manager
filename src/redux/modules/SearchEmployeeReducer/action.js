import * as ActionTypes from "./constance";
import { api } from "utils/api";

export const actSearchAPI = (filter) => {
  return (dispatch) => {
    dispatch(actSearchRequest());
    api
      // .get(`employee/find-page-by-name?${filter}`)
      .get(`employee/findByNameWithPage?${filter}`)
      .then((result) => {
        dispatch(actSearchSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actSearchFailed(err));
      });
  };
};
const actSearchRequest = () => {
  return {
    type: ActionTypes.SEARCH_REQUEST,
  };
};
const actSearchSuccess = (data) => {
  return {
    type: ActionTypes.SEARCH_SUCCESS,
    data
  };
};
const actSearchFailed = (err) => {
  return {
    type: ActionTypes.SEARCH_FAILED,
    err
  };
};
