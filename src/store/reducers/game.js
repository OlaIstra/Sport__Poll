import * as actionTypes from '../actions/actionTypes'
import  { updateObject } from "../../shared/utility";

const initialState = {
    game: null,
    error: null,
    isMoreGames: true,
    loading: false
}

const game = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.FETCH_GAME_START:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.FETCH_GAME_SUCCESS:
            return updateObject(state, {
                game: {
                    awayName: action.game.awayName,
                    country: action.game.country,
                    group: action.game.group,
                    homeName: action.game.homeName,
                    id: action.game.id,
                    name: action.game.name,
                    sport: action.game.sport,
                    state: action.game.state,
                },
                error: null,
                loading: false
            })

        case actionTypes.FETCH_GAME_FAILED:
            return updateObject(state, {
                error: true,
                loading: false
            })

        case actionTypes.NO_MORE_GAMES:
            return updateObject(state, {
                isMoreGames: false,
                error: null,
                loading: false
            })

        case actionTypes.SEND_POLL_START:
            return updateObject(state, {
                loading: true,
                error: null
            })

        case actionTypes.SEND_POLL_SUCCESS:
            return updateObject(state, {
                winnerOfGame: action.winnerOfGame,
                loading: false,
                error: null
            })

        case actionTypes.SEND_POLL_FAIL:
            return updateObject(state, {
                error: true,
                loading: false
            })


        default:
            return state

    }
}

export default game



