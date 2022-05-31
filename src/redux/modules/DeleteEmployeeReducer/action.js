import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actDeleteEmployeeAPI = (id) => {
  return (dispatch) => {
    dispatch(actDeleteEmployeeRequest());
    api
      .get(`employee/delete/${id}`)
      .then((result) => {
        dispatch(actDeleteEmployeeSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actDeleteEmployeeFailed(err));
      });
  };
};
const actDeleteEmployeeRequest = () => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_REQUEST,
  };
};
const actDeleteEmployeeSuccess = (data) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_SUCCESS,
    data: data,
  };
};
const actDeleteEmployeeFailed = (err) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_FAILED,
    error: err,
  };
};
