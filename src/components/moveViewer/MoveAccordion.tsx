import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { Move } from '../../types/types';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        heading: {
            fontSize: theme.typography.pxToRem(15),
            flexBasis: '33.33%',
            flexShrink: 0,
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary,
        },
    }),
);

interface WelcomeProps {
    learnedMoves: Move[];
    index: number;
    allMoves: Move[];
    setLearnedMoves: (moves: Move[]) => void;
}

const MoveAccordion: React.FC<WelcomeProps> = (props) => {
    let learnedMoves: Move[] = props.learnedMoves;
    let index: number = props.index;
    let move = learnedMoves[index];
    let allMoves = props.allMoves;
    let setLearnedMoves = props.setLearnedMoves;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    function handleInputChange(event, value) {
        let newMoves:Move[] = []
        learnedMoves.forEach(val => newMoves.push(Object.assign({}, val)));
        newMoves[index] = value;
        console.log(newMoves);
        setLearnedMoves(newMoves);
        
      }

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography className={classes.heading}>{move ? move.move_name : 'Empty'}</Typography>
                    <Typography className={classes.secondaryHeading}>{move ? move.effect : ''}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Autocomplete
                        id={"combo-box-demo"}
                        options={allMoves}
                        getOptionLabel={(option) => option.move_name}
                        style={{ width: 300 }}
                        onChange={handleInputChange}
                        renderInput={(params) => <TextField {...params} label="Move Selection" variant="outlined" />}
                    />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default MoveAccordion;
