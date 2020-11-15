import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Party, Pokemon, User } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import '../../styles.css';
import { getAllMoves, getAllItems, getSpecificPokemon, getPartyGivenUsername, getParty } from '../../axios/api';

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
    username: String;
}

const PartySelectScreen: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();

    let partiesID: number[]=[];
    getPartyGivenUsername(props.username).then((res2)=>{
        partiesID = res2.data;
    })

    function makeImage(sprite: string){
        return (<img src ={sprite} className="photo"></img>);
    }
    //return (<img src ={sprite} className="photo"></img>);

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
                    {partiesID.map((partyID) => (
                        <div className="party">
                            {' '}
                            <h1 className="inLine">{partyID}</h1>
                            {getParty(partyID).then((res)=>{
                                {res.data.map((pkid) => {
                                    {getSpecificPokemon(pkid).then((res2)=>{
                                        makeImage(res2.data.sprite_data);
                                    })}
                                })}
                            })}
                        </div>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartySelectScreen;
