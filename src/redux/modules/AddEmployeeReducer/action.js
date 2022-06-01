import * as ActionTypes from "./contances";
import { api } from "../../../utils/api";

export const actAddEmployeeAPI = (employee) => {
  return (dispatch) => {
    dispatch(actAddEmployeeRequest());
    api
      .post(`employee/create`,employee)
      .then((result) => {
        dispatch(actAddEmployeeSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actAddEmployeeFailed(err));
      });
  };
};
const actAddEmployeeRequest = () => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_REQUEST,
  };
};
const actAddEmployeeSuccess = (data) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_SUCCESS,
    data: data,
  };
};
const actAddEmployeeFailed = (err) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_FAILED,
    error: err,
  };
};
