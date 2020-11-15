import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, Party, pkids } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import { getPartyIDs} from '../../axios/api';

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
    let pkids: number[] = props.pkids;
    let partyID: number = props.partyID;
    const [expanded, setExpanded] = React.useState<string | false>(false);
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    //Party Screen given partyid
    /*
    {partyIDs.map((res) => (
        <PokemonCard pk_id={res.pk_id}> </PokemonCard>
    ))}
    */

   const [thispartyID, setPartyID] = React.useState<number>(partyID);
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

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    {partyIDs.map((res) => (
                        <PokemonCard pk_id={res.pk_id}> </PokemonCard>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartyScreen;
