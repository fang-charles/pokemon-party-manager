import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, Party } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';
import Grid, { GridSpacing } from '@material-ui/core/Grid';

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

const PartyScreen: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();
    let members: Pokemon[] = props.party.member;
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {members.map((pokemon) => (
                        <PokemonCard pkmn={pokemon}> </PokemonCard>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartyScreen;
