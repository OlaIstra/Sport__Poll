import * as actionTypes from '../actions/actionTypes'
import { updateObject } from "../../shared/utility";

const initialState = {
    polls: [],
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch (action.type) {


        case actionTypes.FETCH_POLLS_START:
            return updateObject(state, {
                loading: true,
                error: null
            })
        case actionTypes.FETCH_POLLS_SUCCESS:
            return updateObject(state, {
                loading: false,
                polls: action.polls,
                error: null
            })
        case actionTypes.FETCH_POLLS_FAIL:
            return updateObject(state, {
                loading: false,
                error: action.error
            })
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                polls: [],
                error: null
            })
        default:
            return state
    }
}

export default reducer
