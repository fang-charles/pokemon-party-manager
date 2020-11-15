import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Party, Pokemon, User } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import '../../styles.css';

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
    user: User;
}

const PartySelectScreen: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();
    let parties: Party[] = props.user.party;
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    const [expanded, setExpanded] = React.useState(false);
    const [allMoves, setAllMoves] = React.useState<Move[]>([]);
    const [allItems, setAllItems] = React.useState<Item[]>([]);
    const [pkmn, setPkmn] = React.useState<User>({
        user_id: 1,
        username: '',
        party: []
    });
    const [item, setItem] = React.useState<Item>();
    const [moves, setMoves] = React.useState<Move[]>([]);

    let width = 'width: 50px';

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {parties.map((party) => (
                        <div className="party">
                            {' '}
                            <h1 className="inLine">{party.party_id}</h1>
                            {party.member.map((pokemon) => (
                                <img src={pokemon.baseInfo.sprite_data} className="photo"></img>
                            ))}
                        </div>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartySelectScreen;
