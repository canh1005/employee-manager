import * as ActionTypes from "./constances";

let initialState = {
  loading: false,
  data: null,
  error: null,
  employee_filter: "",
};

export const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get list employee
    case ActionTypes.GET_LIST_EMPLOYEE_REQUEST:
      state.loading = true;
      return { ...state };
    case ActionTypes.GET_LIST_EMPLOYEE_SUCCESS:
      state.loading = false;
      state.data = action.data;
      return { ...state };
    case ActionTypes.GET_LIST_EMPLOYEE_FAILED:
      state.loading = false;
      state.error = action.err;
      return { ...state };
    //Add employee
    case ActionTypes.ADD_EMPLOYEE_REQUEST:
      return { ...state };
    case ActionTypes.ADD_EMPLOYEE_SUCCESS:
      state.error = { status: 200, message: "Add employee success!" };
      return { ...state };
    case ActionTypes.ADD_EMPLOYEE_FAILED:
      state.error = action.err;
      return { ...state };
    //Delete employee
    case ActionTypes.DELETE_EMPLOYEE_REQUEST:
      return { ...state };
    case ActionTypes.DELETE_EMPLOYEE_SUCCESS:
      // console.log("delete Success", state.data.content.filter(item => !queryString.parse(action.payload).ids.includes(JSON.stringify(item.id))));
      state.loading = false;
      // state.data.content = state.data.content.filter(
      //   (item) =>
      //     !queryString
      //       .parse(action.payload)
      //       .ids.includes(JSON.stringify(item.id))
      // );
      state.error = { status: 200, message: "Delete employee success!" };
      return { ...state };
    case ActionTypes.DELETE_EMPLOYEE_FAILED:
      state.error = action.err;
      return { ...state };
    //Clear data
    case ActionTypes.CLEAR_DATA:
      state.data = null;
      state.error = null;
      return { ...state };
    case ActionTypes.EMPLOYEE_FILTER:
      state.employee_filter = action.payload;
      return { ...state };
    default:
      return { ...state };
  }
};
