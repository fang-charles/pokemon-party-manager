import React, { useState }  from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Party, Pokemon, User, PokemonPacket, imageURL} from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import '../../styles.css';
import { getAllMoves, getAllItems, getSpecificPokemon, getPartyGivenUsername, getParty, getImagesURLS } from '../../axios/api';

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
    partyID: number;
}

const PartySelectScreen: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();
    let partyID: number = props.partyID;
    /*
    let partiesIDs: numbers[] = []];
    getPartyGivenUsername(props.username).then((res2)=>{
        partiesIDs = res2.data;
    })
    */
    function makeImage(sprite: string){
        return (<img src ={sprite} className="photo"></img>);
    }

    /*
    function getMembers(partyID: number[]){
        return 
        (partyID.map((pkid) => {
            {getSpecificPokemon(pkid).then((res2)=>{
                makeImage(res2.data.sprite_data);
            })}
        }));
    }
    */

    /*
    const [party, setParty] = useState<number[]>([1]);
    React.useEffect(() => {
        ParseIDArray(party).then((res) => {
            setParty(res.data);
        });
    }, []);
    */
    
    //return (<img src ={sprite} className="photo"></img>);

    

    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    //const [party, setParty] = React.useState<number[]>([]);
    const [partID, setPartID] = React.useState<number>(partyID);
    const [party, setParty] = React.useState<any[]>([105]);
    const [pkid, setID] = React.useState<number>();
    const [pokemon, setPokemon] = React.useState<PokemonPacket>();
    const [partyPokemon, setPartyPokemon] = React.useState<Pokemon[]>([]);
    const [imageURLs, setimageURLs] = React.useState<imageURL[]>([]);
    
    React.useEffect(() => {
        getImagesURLS(partID).then((res) => {
            setimageURLs(res.data);
            //console.log("ImagesURLS: "+res.data);
        })
    }, [partID]);

/*
    function modifyImageURLs(URLs: string[]) {
        let imgs = '';
        for(let i=0; i<URLs.length; i++){
            //console.log("URLs: "+URLs[i]);
            //imgs = imgs + '<img src ={'+URLs[i]+'} className="photo"></img>';
        }
        return (<div innerHtml={{imgs}}></div>);
    }
    
    React.useEffect(() => {
        modifyImageURLs(imageURLs).then((res) => {
            //setimageURLs(res.data);
            //console.log("ImagesURLS: "+res.data);
        })
    }, [imageURLs]);
*/
    /*
    function modifyImageURLs(index: number, url: string) {
        console.log("imageURLs: "+imageURLs);
        let newImageURLs: string[] = [];
        imageURLs.forEach((val) => newImageURLs.push(val));
        newImageURLs[index] = url;
        console.log(newImageURLs);
        setimageURLs(newImageURLs);
    }

    React.useEffect(() => {
        for(let i=0; i<party.length; i++){
            console.log(party[i]);
            getSpecificPokemon(party[i]).then((res) => {
                //console.log(party[i]);
                //return res.data.sprite_data;
                modifyImageURLs(i, res.data.sprite_data);
            })
        }
    }, [party]);
*/
    let width = 'width: 50px';

    /*
        {imageURLs.map((url) => (
                        <div className="party">
                        <p>{JSON.stringify(url)}</p>
                        </div>
                    ))}
    */

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                    <div className="party">
                        <h1 className="inLine">{partyID}</h1>
                        {imageURLs.map((url) => (
                        <img src ={url.sprite_data} className="photo"></img>
                    ))}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartySelectScreen;
