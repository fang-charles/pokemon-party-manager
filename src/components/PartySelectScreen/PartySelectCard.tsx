import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, Party } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import '../../styles.css';

//IGNORE  THIS FILE!!!!!!!!

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(1),
            textAlign: 'center',
            color: theme.palette.text.secondary,
        },
    }),
);

interface WelcomeProps {
    party: Party;
}

const PartySelectCard: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();
    let party: Party = props.party;
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    <h1>{party.party_id}</h1>
                    {party.member.map((pokemon) => (
                        <img src={pokemon.baseInfo.sprite_data} className="photo"></img>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default PartySelectCard;
