import { api } from "../../../utils/api";
import * as ActionTypes from "./contances";

export const actUpdateEmployee = (userID, user) => {
  return (dispatch) => {
    dispatch(actUpdateEmployeeRequest());
    api
      .put(`employee/update/${userID}`, user)
      .then((result) => {
        dispatch(actUpdateEmployeeSuccess(result.data));
      })
      .catch((err) => {
        dispatch(actUpdateEmployeeFailed(err));
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
    data: data,
  };
};
const actUpdateEmployeeFailed = (err) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_FAILED,
    err: err,
  };
};
export const actEmployeeEdited = (employeeEdited) => {
  return {
    type: ActionTypes.EMPLOYEE_EDITED,
    data: employeeEdited,
  };
};
