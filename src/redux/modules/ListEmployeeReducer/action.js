import * as ActionTypes from "./contances";
import {api} from '../../../utils/api'

export const actListEmpAPI = (page) => {
    return dispatch => {
        dispatch(actListEmpRequest());
        api.get(`employee/get-page?page=${page}`)
        .then(result => {
            dispatch(actListEmpSuccess(result.data))
        })
        .catch(err => {
          dispatch(actListEmpFailed(err))
      })
    }
};
const actListEmpRequest = () => {
  return {
    type: ActionTypes.LIST_EMPLOYEE_REQUEST,
  };
};
const actListEmpSuccess = (data) => {
  return {
    type: ActionTypes.LIST_EMPLOYEE_SUCCESS,
    data: data,
  };
};
const actListEmpFailed = (err) => {
  return {
    type: ActionTypes.LIST_EMPLOYEE_FAILED,
    error: err 
  };
};
