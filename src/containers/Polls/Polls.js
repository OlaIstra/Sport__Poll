import React, { useEffect, useCallback } from 'react'

import { useDispatch, useSelector } from 'react-redux'

import axios from '../../axios'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import Spinner from '../../components/UI/Spinner/Spinner'
import Poll from './Poll/Poll'

import * as actions from '../../store/actions/index'
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles({
    cards: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gridGap: '10px'
    },
});

const Polls = props => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const toGetPolls = useCallback((userId) => dispatch(actions.fetchPolls(userId)), [dispatch])

    const userId = useSelector(state => {
        return state.auth.userId
    })
    const loading = useSelector(state => {
        return state.polls.loading
    })
    const polls = useSelector(state => {
        return state.polls.polls
    })

    useEffect(() => {
        toGetPolls(userId)
    }, [toGetPolls, userId])

    let pollsDisplay = <Spinner />

    if (!loading) {
        if (polls.length > 0) {
            pollsDisplay = (
                <div  className={classes.cards}>
                    {polls.map(poll => (
                        <Poll key={poll.id} name={poll.winnerData.teams} winnerOfGame={poll.winnerData.winnerOfGame} sport={poll.winnerData.sport}/>
                    ))}
                </div>
            )
        } else {
            pollsDisplay = (
                <h3>
                    You have not polls yet!
                </h3>
            )
        }
    }
    return pollsDisplay
}


export default withErrorHandler(Polls, axios)
