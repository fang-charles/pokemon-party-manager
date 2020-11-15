import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

import { Item } from '../../types/types';

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
    item: Item;
    allItems: Item[];
}

const ItemAccordion: React.FC<WelcomeProps> = (props) => {
    let item: Item = props.item;
    let allItems: Item[] = props.allItems;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                    <Typography className={classes.heading}>{item ? item.item_name : 'Empty'}</Typography>
                    <Typography className={classes.secondaryHeading}>{item ? item.item_description : ''}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Autocomplete
                        id="combo-box-demo"
                        options={allItems}
                        getOptionLabel={(option) => option.item_name}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Item Selection" variant="outlined" />}
                    />
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default ItemAccordion;
