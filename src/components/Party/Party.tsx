import React from 'react'; // we need this to make JSX compile
import { BasePokemon, Item, Move, Pokemon, Party } from '../../types/types';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import PokemonCard from '../pokemonCard/PokemonCard';

interface WelcomeProps {
    member: Pokemon[];
    party: Party;
    party_id: Party;
}

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

const Party: React.FC<WelcomeProps> = (props) => {
        let members: Pokemon[] = props.member;

        const classes = useStyles();
        const [expanded, setExpanded] = React.useState<string | false>(false);
      
        const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
          setExpanded(isExpanded ? panel : false);
        };

    return (
        <div className="mbsc-grid">
                <div className="mbsc-row mbsc-justify-content-center mbsc-no-padding" id="target">
                    {members.map((pokemon)=> <PokemonCard pkmn={pokemon}> </PokemonCard> )}
                </div>
            </div>
    );
};
export default Party;
