import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actGetImageAPI = (id) => {
  return (dispatch) => {
    dispatch(actGetImageRequest());
    api
      .get(`image/${id}`)
      .then((result) => {
        dispatch(actGetImageSuccess(result));
      })
      .catch((err) => {
        dispatch(actGetImageFailed(err));
      });
  };
};
const actGetImageRequest = () => {
  return {
    type: ActionTypes.GET_IMAGE_REQUEST,
  };
};
const actGetImageSuccess = (data) => {
  return {
    type: ActionTypes.GET_IMAGE_SUCCESS,
    data: data,
  };
};
const actGetImageFailed = (err) => {
  return {
    type: ActionTypes.GET_IMAGE_FAILED,
    error: err,
  };
};
