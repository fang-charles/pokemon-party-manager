import React from 'react'; // we need this to make JSX compile
import { Boat } from '../types/types';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

interface WelcomeProps {
    myBoat: Boat;
}

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const ExampleBoatView: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();
    let myBoat: Boat = props.myBoat;

    return (
        <Card>
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Boat Name: {myBoat.bname}
                </Typography>
                <Typography className={classes.pos} color="textSecondary">
                    BID: {myBoat.bid}
                </Typography>
                <Typography variant="body2" component="p">
                    Color: {myBoat.color}
                    <br />
                </Typography>
            </CardContent>
        </Card>
    );
};

export default ExampleBoatView;
