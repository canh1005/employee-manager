import * as ActionTypes from './contances'
import {api} from '../../../utils/api'

export const actListTeamAPI = () => {
    return dispatch => {
        dispatch(actListTeamRequest());
        api.get('team/get-all')
        .then(result => {
            dispatch(actListTeamSuccess(result.data))
        })
        .catch(err => {
          dispatch(actListTeamFailed(err))
      })
    }
};
const actListTeamRequest = () => {
  return {
    type: ActionTypes.LIST_TEAM_REQUEST,
  };
};
const actListTeamSuccess = (data) => {
  return {
    type: ActionTypes.LIST_TEAM_SUCCESS,
    data: data,
  };
};
const actListTeamFailed = (err) => {
  return {
    type: ActionTypes.LIST_TEAM_FAILED,
    error: err 
  };
};