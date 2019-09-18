import React, { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import * as actions from '../../store/actions/index'
import axios from '../../axios'

import { GamePreview } from '../../components/Game/Game'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import Typography from '@material-ui/core/Typography';

export const MakeBet = props => {

    const dispatch = useDispatch()
    const onInitGame = useCallback((userId) => dispatch(actions.initGame(userId)), [dispatch])
    const onSendPollInfo = (winnerData, userId, gameId) => dispatch(actions.sendPollInfo(winnerData, userId, gameId))
    const onSetAuthRedirectPath = (path) => dispatch(actions.setAuthRedirectPath(path))


    const game = useSelector(state => {
        return state.makeBet.game
    })
    const error = useSelector(state => {
        return state.makeBet.error
    })
    const isAuth = useSelector(state => {
        return state.auth.token !== null
    })
    const isMoreGames = useSelector(state => {
        return state.makeBet.isMoreGames
    })
    const loading = useSelector(state => {
        return state.makeBet.loading
    })

    useEffect(() => {
        onInitGame()
    }, [onInitGame])


    const getNextTournamentHandler = (winnerData, userId, gameId) => {
        if (isAuth) {
            onSendPollInfo(winnerData, userId, gameId)
        } else {
            onSetAuthRedirectPath('/')
            props.history.push('/auth')
        }
    }

    let displayGame = error ? <p>Game was not downloaded. Please try later! </p> : <Spinner />

    if (loading) {
        displayGame = <Spinner />
    }

    if (game) {
        displayGame = (
            <>
                <GamePreview
                    game={game}
                    sendPollInfo={getNextTournamentHandler}
                />
            </>
        )
    }

    if (!isMoreGames) {
        displayGame = (
            <Typography variant="h3" gutterBottom>
                No more games available. Please try later!
            </Typography>
        )
    }

    return displayGame
}


export default withErrorHandler(MakeBet, axios)
