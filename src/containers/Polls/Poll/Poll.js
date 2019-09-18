import React from 'react'

import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        width: '200px',
        margin: '0 auto 20px',
        padding: 20
    },
    p: {
        marginBottom: 10,
        marginTop: 0,
    },
});

const Poll = props => {

    const classes = useStyles();

    const poll = (
        <Card className={classes.card}>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Sport
            </Typography>
            <p className={classes.p}>{props.sport}</p>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Teams
            </Typography>
            <p className={classes.p}>{props.name}</p>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                Your poll
            </Typography>
            <p className={classes.p}>{props.winnerOfGame}</p>
        </Card>
    )

    return poll
}

export default Poll
