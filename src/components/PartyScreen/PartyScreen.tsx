import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, Party, pkids } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { getPartyIDs} from '../../axios/api';
import AddPokemon from '../addPokemon/AddPokemon';

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
    //party: Party;
    pkids: number[];
    partyID: number;
}

const PartyScreen: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();

    //pk_id array
    let pkids: number[] = props.pkids;

    //partyID
    let partyID: number = props.partyID;

    //Grid Spacing
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    //partyID
    const [thispartyID, setPartyID] = React.useState<number>(partyID);

    //pk_id of pokemon in Party
    const [partyIDs, setPartyIDs] = React.useState<pkids[]>([]);
    
    React.useEffect(() => {
            getPartyIDs(thispartyID).then((res) => {
                setPartyIDs(res.data);
                console.log("PartyIDs: "+res.data);
        })
    }, [thispartyID]);

    /*Party Screen given pkid's
    {pkids.map((pkid, index) => {
        return <PokemonCard pk_id={pkid}> </PokemonCard>
    })}
    */

    /*Party Screen given partyid
    {partyIDs.map((res) => (
        <PokemonCard pk_id={res.pk_id}> </PokemonCard>
    ))}
    */

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {partyIDs.map((res) => (
                        <PokemonCard pk_id={res.pk_id}> </PokemonCard>
                    ))}
                    <Grid item>
                    <AddPokemon party_id = {partyID}></AddPokemon >
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartyScreen;
