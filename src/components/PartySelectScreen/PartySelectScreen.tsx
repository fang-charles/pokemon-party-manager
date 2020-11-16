import React from 'react'; // we need this to make JSX compile
import { imageURL } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid, { GridSpacing } from '@material-ui/core/Grid';
import '../../styles.css';
import {
    getImagesURLS,
} from '../../axios/api';
import { withRouter } from "react-router-dom";

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
    function makeImage(sprite: string){
        return (<img src ={sprite} className="photo"></img>);
    }
    */

    //Grid spacing
    const [spacing, setSpacing] = React.useState<GridSpacing>(2);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpacing(Number((event.target as HTMLInputElement).value) as GridSpacing);
    };

    //partyID
    const [partID, setPartID] = React.useState<number>(partyID);

    //imagesURL array
    const [imageURLs, setimageURLs] = React.useState<imageURL[]>([]);

    React.useEffect(() => {
        getImagesURLS(partyID).then((res) => {
            setimageURLs(res.data);
            //console.log("ImagesURLS: "+res.data);
        });
    }, [partID, partyID]);

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
                            <img src={url.sprite_data} className="photo"></img>
                        ))}
                    </div>
                </Grid>
            </Grid>
        </Grid>
    );
};
export default PartySelectScreen;
