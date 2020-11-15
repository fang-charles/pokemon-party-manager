import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

import { Item } from '../../types/types';
import { loseItem } from '../../axios/api';

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
        button: {
            margin: theme.spacing(1),
        },
    }),
);

interface WelcomeProps {
    item: Item;
    allItems: Item[];
    setItem: (item: Item) => void;
    pk_id: number;
}

const ItemAccordion: React.FC<WelcomeProps> = (props) => {
    let item: Item = props.item;
    let allItems: Item[] = props.allItems;
    let setItem = props.setItem;
    let pk_id = props.pk_id;

    const classes = useStyles();
    const [expanded, setExpanded] = React.useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    function handleInputChange(event, value) {
        setItem(value);
    }

    const handleDrop = () => {
        loseItem(pk_id, item.item_name);
        setItem(null);
    };

    return (
        <>
            <Accordion expanded={expanded === 'itemPanel1'} onChange={handleChange('itemPanel1')}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="itemPanel1bh-content"
                    id="itemPanel1bh-header"
                >
                    <Typography className={classes.heading}>{item ? item.item_name : 'Empty'}</Typography>
                    <Typography className={classes.secondaryHeading}>{item ? item.item_description : ''}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Autocomplete
                        id="combo-box-item"
                        options={allItems}
                        getOptionLabel={(option) => option.item_name}
                        onChange={handleInputChange}
                        style={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Item Selection" variant="outlined" />}
                    />

                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<DeleteIcon />}
                        onClick={handleDrop}
                    ></Button>
                </AccordionDetails>
            </Accordion>
        </>
    );
};

export default ItemAccordion;
