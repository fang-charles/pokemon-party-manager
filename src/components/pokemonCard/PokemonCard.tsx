import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, PokemonPacket } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MoveViewer from '../moveViewer/MoveViewer';
import ItemAccordion from '../itemAccordion/ItemAccordion';
import { getAllMoves, getAllItems, getSpecificPokemon } from '../../axios/api';

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

interface WelcomeProps {
    pk_id: number;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            maxWidth: 345,
        },
        media: {
            height: 0,
            paddingTop: '56.25%', // 16:9
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
    }),
);

const PokemonCard: React.FC<WelcomeProps> = (props) => {
    let pk_id = props.pk_id;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [allMoves, setAllMoves] = React.useState<Move[]>([]);
    const [allItems, setAllItems] = React.useState<Item[]>([]);
    const [pkmn, setPkmn] = React.useState<PokemonPacket>({
        pkID: 1,
        nickname: '',
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
    });
    const [item, setItem] = React.useState<Item>();
    const [moves, setMoves] = React.useState<Move[]>([]);

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
    }, [pk_id]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
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
                subheader={pkmn ? pkmn.nickname + 'PK_ID: ' + pk_id : ''}
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
                <CardContent>
                    <Typography paragraph>Item:</Typography>
                    <ItemAccordion item={item} allItems={allItems}>
                        {' '}
                    </ItemAccordion>
                    <br></br>
                    <Typography paragraph>Moves:</Typography>
                    <MoveViewer moves={moves} allMoves={allMoves}></MoveViewer>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PokemonCard;
