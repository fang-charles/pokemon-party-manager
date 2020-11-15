import React from 'react'; // we need this to make JSX compile
import {
    BasePokemon,
    Item,
    Move,
    Pokemon,
    PokemonPacket,
    AddPokemonPacket,
    defaultBasePokemon,
} from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MoveViewer from '../moveViewer/MoveViewer';
import ItemAccordion from '../itemAccordion/ItemAccordion';
import {
    getAllMoves,
    getAllItems,
    getSpecificPokemon,
    getHeldItem,
    getLearnedMoves,
    gainItem,
    loseItem,
    learnMove,
    addPokemon,
    getAllBasePokemon,
    getBasePokemon,
} from '../../axios/api';

import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import { TextField, Grid } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

interface WelcomeProps {
    party_id: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {},
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
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: '25ch',
        },
    }),
);

const AddPokemon: React.FC<WelcomeProps> = (props) => {
    let party_Id = props.party_id;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(true);
    const [pkmn, setPkmn] = React.useState<AddPokemonPacket>({
        nickname: '',
        level: 100,
        pokedex_number: 151,
        baseInfo: defaultBasePokemon(),
    });
    const [allBasePokemon, setAllBasePokemon] = React.useState<BasePokemon[]>([]);

    React.useEffect(() => {
        getAllBasePokemon().then((res) => {
            setAllBasePokemon(res.data);
        });
        getBasePokemon(151).then((res) => {
            setPkmn({ ...pkmn, baseInfo: res.data });
        });
    }, []);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSave = () => {
        addPokemon(pkmn.pokedex_number, pkmn.level, pkmn.nickname, party_Id)
            .then((res) => {
                console.log(res.data);
                alert('Successfully Added! PK_ID: ' + res.data['pk_id']);
            })
            .catch(() => {
                alert('Exception Caught');
            });
    };

    function handleInputChangeBasePokemon(event, value) {
        setPkmn({ ...pkmn, baseInfo: value });
    }

    function handleInputChangeNickname(event) {
        setPkmn({ ...pkmn, nickname: event.target.value });
    }

    function handleInputChangeLevel(event) {
        console.log(event);
        setPkmn({ ...pkmn, level: event.target.value });
    }

    return (
        <>
            <br></br>
            <div>
                <Autocomplete
                    id="combo-box-item"
                    options={allBasePokemon}
                    getOptionLabel={(option) => option.name}
                    onChange={handleInputChangeBasePokemon}
                    style={{ width: 300 }}
                    renderInput={(params) => (
                        <TextField {...params} fullWidth label="Pokemon Selection" variant="outlined" />
                    )}
                />
            </div>
            <br></br>
            <div>
                {' '}
                <TextField
                    id="standard-full-width"
                    label="Nickname"
                    style={{ margin: 8 }}
                    fullWidth
                    margin="normal"
                    value={pkmn.nickname}
                    onChange={handleInputChangeNickname}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div>
                {' '}
                <TextField
                    id="standard-full-width"
                    label="Level"
                    style={{ margin: 8 }}
                    helperText="Level is between 1 and 100"
                    fullWidth
                    margin="normal"
                    value={pkmn.level}
                    onChange={handleInputChangeLevel}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {pkmn ? pkmn.level : 0}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={pkmn ? pkmn.baseInfo.name : ''}
                    subheader={pkmn ? pkmn.nickname : ''}
                />
                <CardMedia className={classes.media} image={pkmn.baseInfo.sprite_data} title={pkmn.baseInfo.name} />
                <CardContent>
                    {pkmn.baseInfo && (
                        <Typography variant="body2" color="textSecondary" component="p" align="right">
                            HP: {pkmn.baseInfo.hp} <br />
                            Attack: {pkmn.baseInfo.attack} <br />
                            Defense: {pkmn.baseInfo.defense} <br />
                            Special Attack: {pkmn.baseInfo.special_attack} <br />
                            Special Defense: {pkmn.baseInfo.special_defense} <br />
                            Speed: {pkmn.baseInfo.speed} <br />
                        </Typography>
                    )}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx(classes.expand, {
                            [classes.expandOpen]: expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent></CardContent>
                </Collapse>
            </Card>
            <Button
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={handleSave}
                fullWidth
            >
                Save
            </Button>
            <p>{JSON.stringify(pkmn)} </p>
        </>
    );
};

export default AddPokemon;