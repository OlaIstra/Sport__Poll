import React, {useCallback} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import * as actions from '../../store/actions/index'

import { Game, TournamentInfo } from './styled__components'
import { Player } from './Player/Player'
import {useDispatch, useSelector} from "react-redux";

import england from '../../assets/img/flags/england.png'
import france from '../../assets/img/flags/france.png'
import sweden from '../../assets/img/flags/sweden.png'

import football from '../../assets/img/sports/football.png'
import snooker from '../../assets/img/sports/snooker.png'
import handball from '../../assets/img/sports/handball.png'
import ice from '../../assets/img/sports/ice.png'
import tennis from '../../assets/img/sports/tennis.png'

const useStyles = makeStyles(() => ({
    button: {
        backgroundColor: "#efc22b",
        width: "50%",
        marginBottom: "20px"
    },
    btnNext: {
        width: "50%",
        marginBottom: "50px"
    },
    card: {
        width: '85%',
        margin: '0 auto 20px',
        padding: 20,
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 10px 10px 0px rgba(24, 118, 210, 0.21), 0px 2px 1px -1px rgba(0,0,0,0.12);'
    },
    bigAvatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    sportAvatar: {
        margin: '10px auto',
        width: 60,
        height: 60,
        borderRadius: '5px'
    },
    customPanel: {
        flexDirection: 'column'
    },
    customBlock: {
        width: '95%',
        margin: '0 auto 20px !important',
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 10px 10px 0px rgba(24, 118, 210, 0.21), 0px 2px 1px -1px rgba(0,0,0,0.12);'
    }
}));

export const GamePreview = props => {

    const classes = useStyles();

    const dispatch = useDispatch()
    const onInitGame = useCallback(() => dispatch(actions.initGame()), [dispatch])

    const userId = useSelector(state => {
        return state.auth.userId
    })
    const gameId = props.game.id

    let flagName
    switch (props.game.country) {
        case 'ENGLAND':
            flagName = england
            break
        case 'FRANCE':
            flagName = france
            break
        case 'SWEDEN':
            flagName = sweden
            break
        default:
            break
    }

    let sportName
    switch (props.game.sport) {
        case 'FOOTBALL':
            sportName = football
            break
        case 'SNOOKER':
            sportName = snooker
            break
        case 'HANDBALL':
            sportName = handball
            break
        case 'ICE_HOCKEY':
            sportName = ice
            break
        case 'TENNIS':
            sportName = tennis
            break
        default:
            break
    }

    let gameState
    switch (props.game.state) {
        case 'STARTED':
            gameState = 'started'
            break
        case 'FINISHED':
            gameState = 'finished'
            break
        case 'NOT_STARTED':
            gameState = 'not started'
            break
        default:
            break
    }

    const dataDraw ={
        winnerOfGame: "DRAW",
        sport: props.game.sport,
        teams: props.game.name
    }

    return (
        <Game>
            <ExpansionPanel className={classes.customBlock}>
                <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Game Info</Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.customPanel}>
                    <TournamentInfo>
                        <Avatar alt={props.game.country} src={flagName} className={classes.bigAvatar} />
                        {props.game.group}
                    </TournamentInfo>
                    <Avatar alt={props.game.sport} src={sportName} className={classes.sportAvatar} />
                    <p>The game is {gameState}</p>
                </ExpansionPanelDetails>
            </ExpansionPanel>


            <Player player={props.game.awayName}
                    sport={props.game.sport}
                    teams={props.game.name}
                    toWin={(winnerData) => props.sendPollInfo(winnerData, userId, gameId)}
            />

            <Player player={props.game.homeName}
                    sport={props.game.sport}
                    teams={props.game.name}
                    toWin={(winnerData) => props.sendPollInfo(winnerData, userId, gameId)}
            />

            <div>
                <Button
                    variant="contained"
                    className={classes.button}
                    sport={props.game.sport}
                    teams={props.game.name}
                    onClick={(winnerData) => props.sendPollInfo(dataDraw, userId, gameId)}
                >
                    Draw
                </Button>
            </div>

            <div>
                <Button
                    variant="contained"
                    color="primary"
                    className={classes.btnNext}
                    onClick={() => onInitGame()}
                >
                    Next
                </Button>
            </div>

        </Game>
    )
}
