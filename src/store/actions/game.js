import * as actionTypes from './actionTypes'
import axios from '../../axios'
import { keys } from 'lodash'

export const fetchGameStart = () => {
    return {
        type: actionTypes.FETCH_GAME_START,
        loading: true
    }
}

export const fetchGameFailed = () => {
    return {
        type: actionTypes.FETCH_GAME_FAILED,
        error: true,
        loading: false
    }
}

export const setNoMoreGames = () => {
    return {
        type: actionTypes.NO_MORE_GAMES,
        isMoreGames: false
    }
}

export const setGame = (game) => {
    return {
        type: actionTypes.FETCH_GAME_SUCCESS,
        game: game,
        loading: false
    }
}

export const initGame = () => {
    const userId = localStorage.getItem('userId')
    return dispatch => {
        dispatch(fetchGameStart())
        axios.get(`https://sportspoll-aa1e5.firebaseio.com/1/users/${userId}/.json`)
            .then( response => {
                const shownGames = keys(response.data).map(el => +el)
                axios.get(`https://sportspoll-aa1e5.firebaseio.com/1/games.json`)
                    .then(response => {

                        let arrayOfAvailableGames = []
                        if (shownGames.length > 0) {
                            if ( shownGames.length === response.data.length) {
                                return dispatch(setNoMoreGames())
                            }

                            response.data.map( el => {
                                if (shownGames.indexOf(el.id) === -1) {
                                    arrayOfAvailableGames.push(el)
                                }
                                return arrayOfAvailableGames
                            })
                            const getRndGame = Math.floor(Math.random() * arrayOfAvailableGames.length)
                            dispatch(setGame((arrayOfAvailableGames[getRndGame])))
                        } else {
                            arrayOfAvailableGames = response.data
                            const getRndGame = Math.floor(Math.random() * arrayOfAvailableGames.length)
                            dispatch(setGame((arrayOfAvailableGames[getRndGame])))
                        }
                    })
                    .catch(error => {
                        dispatch(fetchGameFailed())
                    })
                }
            ).catch(error => {
            dispatch(fetchGameFailed())
        })
    }
}

export const sendPollSuccess = (id, winnerName, gameId) => {
    return {
        type: actionTypes.SEND_POLL_SUCCESS,
        winnerOfGame: winnerName,
        loading: false,
        gameId: gameId
    }
}

export const sendPollFail = (error) => {
    return {
        type: actionTypes.SEND_POLL_FAIL,
        error: error,
        loading: false
    }
}

export const sendPollStart = () => {
    return {
        type: actionTypes.SEND_POLL_START,
        loading: true
    }
}

export const sendPollInfo = (winnerData, userId, gameId) => {
    return dispatch => {
        dispatch(sendPollStart())
        axios.patch(`https://sportspoll-aa1e5.firebaseio.com/1/users/${userId}/${gameId}.json`, {winnerData})
            .then(response => {
                dispatch(sendPollSuccess(response.data.id, winnerData, gameId))
            })
            .catch(error => {
                dispatch(sendPollFail())
            })
    }
}
