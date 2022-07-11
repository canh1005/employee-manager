import * as ActionTypes from "./constances";
import { api } from "utils/api";
import { actGetEmployeeByTeamAPI } from "../GetEmployeeByTeamReducer/action";

//Get All team
export const actGetTeamAPI = () => {
  return (dispatch) => {
    dispatch(actGetTeamRequest());
    api
      .get(`team/getAll`)
      .then((result) => {
        dispatch(actGetTeamSuccess(result.data.data));
      })
      .catch((err) => {
        dispatch(actGetTeamFailed(err.response));
      });
  };
};
const actGetTeamRequest = () => {
  return {
    type: ActionTypes.GET_TEAM_REQUEST,
  };
};
const actGetTeamSuccess = (data) => {
  return {
    type: ActionTypes.GET_TEAM_SUCCESS,
    data
  };
};
const actGetTeamFailed = (err) => {
  return {
    type: ActionTypes.GET_TEAM_FAILED,
    err
  };
};
//Get team page
export const actGetTeamPageAPI = (page) => {
  return (dispatch) => {
    dispatch(actGetTeamPageRequest());
    api
      .get(`team/getPage?page=${page}`)
      .then((result) => {
        dispatch(actGetTeamPageSuccess(result.data.data));
        dispatch(actGetEmployeeByTeamAPI(result.data.data.content[0].id));
        dispatch(actSelectedTeamData(result.data.data.content[0]))
      })
      .catch((err) => {
        dispatch(actGetTeamPageFailed(err));
      });
  };
};
const actGetTeamPageRequest = () => {
  return {
    type: ActionTypes.GET_TEAM_REQUEST,
  };
};
const actGetTeamPageSuccess = (data) => {
  return {
    type: ActionTypes.GET_TEAM_SUCCESS,
    data,
  };
};
const actGetTeamPageFailed = (err) => {
  return {
    type: ActionTypes.GET_TEAM_FAILED,
    err,
  };
};
//Add team
export const actAddTeamAPI = (teamInfo, page) => {
  return (dispatch) => {
    dispatch(actAddTeamRequest());
    api
      .post("team/create", teamInfo)
      .then((result) => {
        dispatch(actGetTeamPageAPI(page));
        dispatch(actAddTeamSuccess(result.status))
      })
      .catch((err) => {
        dispatch(actAddTeamFailed(err.response));
      });
  };
};
const actAddTeamRequest = () => {
  return {
    type: ActionTypes.ADD_TEAM_REQUEST,
  };
};
const actAddTeamSuccess = (data) => {
  return {
    type: ActionTypes.ADD_TEAM_SUCCESS,
    data
  };
};
const actAddTeamFailed = (err) => {
  return {
    type: ActionTypes.ADD_TEAM_FAILED,
    err,
  };
};

export const actClearTeamData = () => {
  return{
    type: ActionTypes.CLEAR_TEAM_DATA
  }
};
export const actSelectedTeamData = (data) => {
  return{
    type: ActionTypes.SELECTED_TEAM_DATA,
    payload: data,
  }
};
