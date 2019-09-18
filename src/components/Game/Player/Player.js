import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
    card: {
        width: '85%',
        margin: '0 auto 20px',
        padding: 20,
        boxShadow: '0px 1px 3px 0px rgba(0,0,0,0.2), 0px 10px 10px 0px rgba(24, 118, 210, 0.21), 0px 2px 1px -1px rgba(0,0,0,0.12);'
    },
    p: {
        marginBottom: 10,
        marginTop: 0,
    },
    button: {
        backgroundColor: "#efc22b",
        width: "50%",
    },
});

export const Player = props => {

    const classes = useStyles();

    const winnerData = {
        winnerOfGame: props.player,
        sport: props.sport,
        teams: props.teams
    }


    return (
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Player
            </Typography>
            <p className={classes.p}>{props.player}</p>
            <Button
                variant="contained"
                className={classes.button}
                onClick={(playerName) => props.toWin(winnerData)}
            >
                wins
            </Button>
        </Card>
    )
}

