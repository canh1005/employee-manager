import * as ActionTypes from "./constances";
import { api } from "utils/api";
import { actSearchAPI } from "../SearchEmployeeReducer/action";
import { useNavigate } from "react-router-dom";

//Add
export const actAddEmployeeAPI = (employee, filter) => {
  return (dispatch) => {
    dispatch(actAddEmployeeRequest());
    api
      .post(`employee/create`, employee)
      .then((result) => {
        dispatch(actAddEmployeeSuccess(result.data));
        dispatch(actSearchAPI(filter));
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
    data,
  };
};
const actAddEmployeeFailed = (err) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_FAILED,
    err,
  };
};

//DELETE employee
export const actDeleteEmployeeAPI = (ids, filter) => {
  return (dispatch) => {
    dispatch(actDeleteEmployeeRequest());
    api
      .delete(`employee/delete?${ids}`)
      .then(() => {
        if (filter) {
          dispatch(actSearchAPI(filter));
        } else {
          let navigate = useNavigate();
          navigate("/", { replace: true });
        }
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
const actDeleteEmployeeFailed = (err) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_FAILED,
    err,
  };
};

export const actUpdateEmployeeAPI = (employee, filter) => {
  return (dispatch) => {
    dispatch(actUpdateEmployeeRequest());
    api
      .Update(`employee/update?${employee}`)
      .then(() => {
          dispatch(actSearchAPI(filter));
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
const actUpdateEmployeeFailed = (err) => {
  return {
    type: ActionTypes.UPDATE_EMPLOYEE_FAILED,
    err,
  };
};
