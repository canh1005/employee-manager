import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actAddImageAPI = (frmData) => {
  return (dispatch) => {
    dispatch(actAddImageRequest());
    api
      .post(`image/upload`,frmData)
      .then((result) => {
        dispatch(actAddImageSuccess(result));
      })
      .catch((err) => {
        dispatch(actAddImageFailed(err));
      });
  };
};
const actAddImageRequest = () => {
  return {
    type: ActionTypes.ADD_IMAGE_REQUEST,
  };
};
const actAddImageSuccess = (data) => {
  return {
    type: ActionTypes.ADD_IMAGE_SUCCESS,
    data
  };
};
const actAddImageFailed = (err) => {
  return {
    type: ActionTypes.ADD_IMAGE_FAILED,
    err,
  };
};
