import * as actionTypes from './actionTypes'
import axios from "../../axios";
import { mapKeys } from 'lodash'

export const fetchPollsSuccess = (polls) => {
    return {
        type: actionTypes.FETCH_POLLS_SUCCESS,
        polls: polls
    }
}

export const fetchPollsFail = (error) => {
    return {
        type: actionTypes.FETCH_POLLS_FAIL,
        error: error
    }
}

export const fetchPollsStart = () => {
    return {
        type: actionTypes.FETCH_POLLS_START
    }
}

export const fetchPolls = (userId) => {
    return dispatch => {
        dispatch(fetchPollsStart())
        axios.get(`https://sportspoll-aa1e5.firebaseio.com/1/users/${userId}.json`)
            .then(res => {
                const pollsToShow = []

                mapKeys((res.data), function(val, key) {
                    pollsToShow.push({
                        ...res.data[key],
                        id: key
                    })
                })
                dispatch(fetchPollsSuccess(pollsToShow))
            })
            .catch(
                error => {
                    dispatch(fetchPollsFail(error))
                }
            )
    }
}


