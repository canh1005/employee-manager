import * as ActionTypes from './constances'

export const actActiveLink = (link) => {
    return dispatch => {
        dispatch(actLink(link));
        localStorage.setItem('indexLink', link)
    }
}

const actLink = link => {
    return {
        type: ActionTypes.ACTIVE_LINK,
        payload: link,
    }
}