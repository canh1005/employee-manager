import * as ActionTypes from "./contances";
import { api } from "utils/api";

//GET
export const actEmployeeDetailAPI = (id) => {
  return (dispatch) => {
    dispatch(actEmployeeDetailRequest());
    api
      .get(`employee/find-by-id?employee_id=${id}`)
      .then((result) => {
        dispatch(actEmployeeDetailSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actEmployeeDetailFailed(err));
      });
  };
};
const actEmployeeDetailRequest = () => {
  return {
    type: ActionTypes.EMPLOYEE_DETAIL_REQUEST,
  };
};
const actEmployeeDetailSuccess = (data) => {
  return {
    type: ActionTypes.EMPLOYEE_DETAIL_SUCCESS,
    data,
  };
};
const actEmployeeDetailFailed = (err) => {
  return {
    type: ActionTypes.EMPLOYEE_DETAIL_FAILED,
    err,
  };
};

//Update
export const actUpdateEmployee = (employee, employeeID) => {
  return (dispatch) => {
    dispatch(actUpdateEmployeeRequest());
    api
      .put(`employee/update`, employee)
      .then((result) => {
        dispatch(actUpdateEmployeeSuccess(result.data.data));
        dispatch(actEmployeeDetailAPI(employeeID));
      })
      .catch((err) => {
        dispatch(actUpdateEmployeeFailed(err.response));
      });
  };
};
const actUpdateEmployeeRequest = () => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_REQUEST,
  };
};
const actUpdateEmployeeSuccess = (data) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_SUCCESS,
    data,
  };
};
const actUpdateEmployeeFailed = (err) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_FAILED,
    err,
  };
};
export const actEmployeeEdited = (employeeEdited) => {
  return {
    type: ActionTypes.EMPLOYEE_EDITED,
    payload: employeeEdited,
  };
};

export const actEmployeeDetailClear = () => {
  return{
    type: ActionTypes.EMPLOYEE_DETAIL_CLEAR,
  }
};
