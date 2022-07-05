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
        dispatch(actAddEmployeeFailed(err.response));
      });
  };
};
const actAddEmployeeRequest = () => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_REQUEST,
  };
};
const actAddEmployeeSuccess = () => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_SUCCESS,
  };
};
const actAddEmployeeFailed = (err) => {
  return {
    type: ActionTypes.ADD_EMPLOYEE_FAILED,
    err,
  };
};

//DELETE employee
export const actDeleteEmployeeAPI = (ids) => {
  return (dispatch) => {
    dispatch(actDeleteEmployeeRequest());
    api
      .delete(`employee/delete?${ids}`)
      .then((result) => {
        dispatch(actDeleteEmployeeSuccess(ids));
        
      })
      .catch((err) => {
        dispatch(actDeleteEmployeeFailed(err.response));
      });
  };
};
// export const actDeleteEmployeeSingleAPI = (id) => {
//   return (dispatch) => {
//     dispatch(actDeleteEmployeeRequest());
//     api
//       .delete(`employee/delete-by-id?employee_id=${id}`)
//       .then((result) => {
//         console.log("Delete success");
//         dispatch(actDeleteEmployeeSuccess(id))
//       })
//       .catch((error) => {
//         dispatch(actDeleteEmployeeFailed(error.response))
//       });
//   };
// };
const actDeleteEmployeeRequest = () => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_REQUEST,
  };
};
const actDeleteEmployeeSuccess = (data) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_SUCCESS,
    payload: data,
  };
};
const actDeleteEmployeeFailed = (err) => {
  return {
    type: ActionTypes.DELETE_EMPLOYEE_FAILED,
    err,
  };
};

//Get list employee
export const actListPageEmployeeAPI = (filter) => {
  return (dispatch) => {
    dispatch(actSearchRequest());
    api
      .get(`employee/findByNameWithPage?${filter}`)
      .then((result) => {
        dispatch(actSearchSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actSearchFailed(err.response));
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
    data,
  };
};
const actSearchFailed = (err) => {
  return {
    type: ActionTypes.SEARCH_FAILED,
    err,
  };
};

//Clear employee data
export const actClearData = () => {
  return {
    type: ActionTypes.CLEAR_DATA,
  };
};
