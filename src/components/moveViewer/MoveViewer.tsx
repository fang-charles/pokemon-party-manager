import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import { Move } from '../../types/types';
import MoveAccordion from './MoveAccordion';

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
    moves: Move[];
    allMoves: Move[];
    setMoves: (moves: Move[]) => void;
}

const MoveViewer: React.FC<WelcomeProps> = (props) => {
    let moves: Move[] = props.moves;
    let allMoves: Move[] = props.allMoves;
    let setMoves = props.setMoves;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            <MoveAccordion learnedMoves={moves} index={0} allMoves={allMoves} setLearnedMoves={setMoves}>
                {' '}
            </MoveAccordion>
            <MoveAccordion learnedMoves={moves} index={1} allMoves={allMoves} setLearnedMoves={setMoves}>
                {' '}
            </MoveAccordion>
            <MoveAccordion learnedMoves={moves} index={2} allMoves={allMoves} setLearnedMoves={setMoves}>
                {' '}
            </MoveAccordion>
            <MoveAccordion learnedMoves={moves} index={3} allMoves={allMoves} setLearnedMoves={setMoves}>
                {' '}
            </MoveAccordion>
        </div>
    );
};

export default MoveViewer;
