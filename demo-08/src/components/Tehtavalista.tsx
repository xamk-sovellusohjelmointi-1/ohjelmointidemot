import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router';
import Otsikko from './Otsikko';
import type { Tehtava } from '../types';

interface Props {
  tehtavat: Tehtava[];
  onMerkinta: (id: string) => void;
}

const Tehtavalista = ({ tehtavat, onMerkinta }: Props) => {
  return (
    <>
      <Otsikko tyyli="pieni">Tehtävälista v2</Otsikko>

      <Button variant="contained" fullWidth component={Link} to="/uusi">
        Lisää uusi tehtävä
      </Button>

      <List>
        {tehtavat.map((tehtava: Tehtava) => (
          <ListItem
            key={tehtava.id}
            secondaryAction={
              <IconButton
                component={Link}
                to={`/poista/${tehtava.id}`}
                edge="end"
                aria-label="Poista tehtävä"
              >
                <DeleteIcon />
              </IconButton>
            }
          >

            <ListItemIcon>
              <IconButton
                aria-label="Merkitse tehdyksi"
                onClick={() => onMerkinta(tehtava.id)}
              >
                {tehtava.tehty
                  ? <CheckBoxIcon color="secondary" />
                  : <CheckBoxOutlineBlankIcon />
                }
              </IconButton>
            </ListItemIcon>

            <ListItemText primary={tehtava.nimi} />

          </ListItem>
        ))}
      </List>
    </>
  );
};

export default Tehtavalista;
