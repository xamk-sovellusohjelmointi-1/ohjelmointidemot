import { Button, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router';
import Otsikko from './Otsikko';
import type { Tehtava } from '../types';

interface Props {
  tehtavat: Tehtava[];
  onPoisto: (id: string) => void;
}

const PoistaTehtava = ({ tehtavat, onPoisto }: Props) => {

  const navigate = useNavigate();
  const { id } = useParams();

  const poistettava = tehtavat.find((tehtava: Tehtava) => tehtava.id === id);

  const vahvistaPoisto = (): void => {
    if (id !== undefined) {
      onPoisto(id);
    }
    navigate("/");
  };

  return (
    <>
      <Otsikko tyyli="pieni">Poista tehtävä</Otsikko>

      <Typography sx={{ marginBottom: "20px" }}>
        Haluatko varmasti poistaa tehtävän "{poistettava?.nimi}"?
      </Typography>

      <Button variant="contained" fullWidth onClick={vahvistaPoisto}>
        Poista tehtävä
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
  );
};

export default PoistaTehtava;
