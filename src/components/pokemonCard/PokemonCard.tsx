import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, PokemonPacket } from '../../types/types';
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
    deletePokemon,
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
import DeleteIcon from '@material-ui/icons/Delete';
import GetAppIcon from '@material-ui/icons/GetApp';

interface WelcomeProps {
    pk_id: number;
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
    }),
);

const PokemonCard: React.FC<WelcomeProps> = (props) => {
    let pk_id = props.pk_id;

    let emptyMoves: Move[] = [
        {
            move_name: 'm0',
            power: 40,
            accuracy: 100,
            type: 'Poison',
            pp: 30,
            effect: 'e0',
        },
        {
            move_name: 'm1',
            power: 40,
            accuracy: 100,
            type: 'Poison',
            pp: 30,
            effect: 'e1',
        },
        {
            move_name: 'm2',
            power: 40,
            accuracy: 100,
            type: 'Poison',
            pp: 30,
            effect: 'e2',
        },
        {
            move_name: 'm3',
            power: 40,
            accuracy: 100,
            type: 'Poison',
            pp: 30,
            effect: 'e3',
        },
    ];

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [allMoves, setAllMoves] = React.useState<Move[]>([]);
    const [allItems, setAllItems] = React.useState<Item[]>([]);
    const [pkmn, setPkmn] = React.useState<PokemonPacket>({
        pkID: 1,
        nickname: 'Loading',
        level: 0,
        pokedex_number: 1,
        name: '',
        type1: '',
        type2: '',
        hp: 0,
        attack: 0,
        defense: 0,
        special_attack: 0,
        special_defense: 0,
        speed: 0,
        sprite_data: '',
        moves: emptyMoves,
    });
    const [item, setItem] = React.useState<Item>();
    const [learnedMoves, setLearnedMoves] = React.useState<Move[]>([]);

    React.useEffect(() => {
        getAllMoves().then((res) => {
            setAllMoves(res.data);
        });
    }, []);

    React.useEffect(() => {
        getAllItems().then((res) => {
            setAllItems(res.data);
        });
    }, []);

    React.useEffect(() => {
        getSpecificPokemon(pk_id).then((res) => {
            setPkmn(res.data);
        });
        getHeldItem(pk_id).then((res) => {
            setItem(res.data);
        });
        getLearnedMoves(pk_id)
            .then((res) => {
                setLearnedMoves(res.data);
            })
            .then(() => {
                console.log(learnedMoves);
            });
    }, [pk_id]);

    React.useEffect(() => {
        setPkmn({ ...pkmn, holding: item });
    }, [item]);

    React.useEffect(() => {
        setPkmn({ ...pkmn, moves: learnedMoves });
    }, [learnedMoves]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleSave = () => {
        if (pkmn.holding) {
            gainItem(pk_id, pkmn.holding.item_name);
        }
        if (pkmn.moves.length == 4) {
            learnMove(
                pk_id,
                pkmn.moves[0].move_name,
                pkmn.moves[1].move_name,
                pkmn.moves[2].move_name,
                pkmn.moves[3].move_name,
            );
            alert('Saved!');
        } else {
            alert('You must have four moves!');
        }
    };

    const handleSetItem = (item: Item) => {
        setItem(item);
    };

    const handleSetLearnedMoves = (moves: Move[]) => {
        setLearnedMoves(moves);
    };

    const handleDelete = () => {
        deletePokemon(pk_id).then(() => {
            alert('deleted');
        });
    };

    return (
        <>
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
                    title={pkmn ? pkmn.name : ''}
                    subheader={pkmn ? pkmn.nickname + ' PK_ID: ' + pk_id : ''}
                />
                <CardMedia className={classes.media} image={pkmn.sprite_data} title={pkmn.name} />
                <CardContent>
                    {pkmn && (
                        <Typography variant="body2" color="textSecondary" component="p" align="right">
                            HP: {pkmn.hp} <br />
                            Attack: {pkmn.attack} <br />
                            Defense: {pkmn.defense} <br />
                            Special Attack: {pkmn.special_attack} <br />
                            Special Defense: {pkmn.special_defense} <br />
                            Speed: {pkmn.speed} <br />
                        </Typography>
                    )}
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="delete" onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                    <IconButton
                        aria-label="share"
                        onClick={() => {
                            var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(pkmn));
                            var downloadAnchorNode = document.createElement('a');
                            downloadAnchorNode.setAttribute('href', dataStr);
                            downloadAnchorNode.setAttribute('download', 'pkmn.json');
                            document.body.appendChild(downloadAnchorNode); // required for firefox
                            downloadAnchorNode.click();
                            downloadAnchorNode.remove();
                        }}
                    >
                        <GetAppIcon />
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
                    <CardContent>
                        <Typography paragraph>Item:</Typography>
                        <ItemAccordion item={item} allItems={allItems} setItem={handleSetItem} pk_id={pk_id}>
                            {' '}
                        </ItemAccordion>
                        <br></br>
                        <Typography paragraph>Moves:</Typography>
                        <MoveViewer
                            moves={learnedMoves}
                            allMoves={allMoves}
                            setMoves={handleSetLearnedMoves}
                        ></MoveViewer>
                        <Button
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                    </CardContent>
                </Collapse>
            </Card>
        </>
    );
};

export default PokemonCard;
