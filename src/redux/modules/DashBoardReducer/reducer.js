import * as  ActionTypes from './constances'

let initialState = {
    activeLink: 0,
}

export const dashBoardReducer = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.ACTIVE_LINK:
            state.activeLink = action.payload;
            return { ...state }
        
        default:
            return { ...state }
    }
}