import React, { useState }  from 'react'; // we need this to make JSX compile
import { BasePokemon, imageURL} from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import '../../styles.css';
import { getImagesURLS, addParty } from '../../axios/api';
import SaveIcon from '@material-ui/icons/Save';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import { red } from '@material-ui/core/colors';
import Icon from '@material-ui/core/Icon';

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
        media: {
            height: 0,
            paddingTop: '100.00%', // 16:9
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
        avatar: {
            backgroundColor: red[500],
        },
        button: {
            margin: theme.spacing(1),
        },
    }),
);

interface WelcomeProps {
    userID: number;
}

const AddParty: React.FC<WelcomeProps> = (props) => {
    const classes = useStyles();
    let userID: number = props.userID;

    //partyID
    const [user_ID, setUserID] = React.useState<number>(userID);

    //imagesURL array
    const [imageURLs, setimageURLs] = React.useState<imageURL[]>([]);
    
    React.useEffect(() => {
        getImagesURLS(user_ID).then((res) => {
            setimageURLs(res.data);
            //console.log("ImagesURLS: "+res.data);
        })
    }, [user_ID]);

    let width = 'width: 50px';

   const [expanded, setExpanded] = React.useState(true);
   const [allBasePokemon, setAllBasePokemon] = React.useState<BasePokemon[]>([]);

   const handleExpandClick = () => {
       setExpanded(!expanded);
   };

    const handleSave = () => {
        addParty(user_ID)
            .then((res) => {
                //console.log(user_ID);
                console.log(res.data);
                alert('Successfully Added! party_id: ' + res.data['party_id']);
            })
            .catch(() => {
                alert('Exception Caught');
            });
    };

   return (
       <>
           <br></br>
           <Button
               variant="contained"
               color="primary"
               className={classes.button}
               startIcon={<Icon className="fa fa-plus-circle" style={{ fontSize: 30 }} />}
               onClick={handleSave}
               fullWidth
           >
               Add Party
           </Button>
       </>
    );
};
export default AddParty;
