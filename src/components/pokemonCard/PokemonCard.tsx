import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
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
    pkmn: Pokemon;
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
    let pkmn = props.pkmn;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {pkmn.level}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
                        <MoreVertIcon />
                    </IconButton>
                }
                title={pkmn.baseInfo.name}
                subheader={pkmn.nickname ? pkmn.nickname : ''}
            />
            <CardMedia className={classes.media} image={pkmn.baseInfo.sprite_data} title={pkmn.baseInfo.name} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" align="right">
                    HP: {pkmn.baseInfo.hp} <br />
                    Attack: {pkmn.baseInfo.attack} <br />
                    Defense: {pkmn.baseInfo.defense} <br />
                    Special Attack: {pkmn.baseInfo.special_attack} <br />
                    Special Defense: {pkmn.baseInfo.special_defense} <br />
                    Speed: {pkmn.baseInfo.speed} <br />
                </Typography>
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
                    <Typography paragraph>
                        {JSON.stringify(pkmn.holding)}
                    </Typography>
                    <Typography paragraph>Move 1:</Typography>
                    <Typography paragraph>
                        {JSON.stringify(pkmn.moves[0])}
                    </Typography>
					<Typography paragraph>Move 2:</Typography>
                    <Typography paragraph>
                        {JSON.stringify(pkmn.moves[1])}
                    </Typography>
                </CardContent>
            </Collapse>
        </Card>
    );
};

export default PokemonCard;
