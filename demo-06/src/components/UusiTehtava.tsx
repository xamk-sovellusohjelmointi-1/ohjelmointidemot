import { useRef } from 'react';
import { Button, TextField } from '@mui/material';
import { Link, useNavigate } from 'react-router';
import Otsikko from './Otsikko';

interface Props {
  onLisays: (nimi: string) => void;
}

const UusiTehtava = ({ onLisays }: Props) => {

  const navigate = useNavigate();
  const uusiTehtavaRef = useRef<HTMLInputElement>(null);

  const tallenna = (): void => {
    onLisays(uusiTehtavaRef.current?.value || "Nimetön tehtävä");
    navigate("/");
  };

  return (
    <>
      <Otsikko tyyli="pieni">Lisää uusi tehtävä</Otsikko>

      <TextField
        inputRef={uusiTehtavaRef}
        variant="outlined"
        fullWidth
        placeholder="Kirjoita tehtävä..."
        sx={{ marginBottom: "10px" }}
      />

      <Button variant="contained" fullWidth onClick={tallenna}>
        Tallenna
      </Button>

      <Button fullWidth component={Link} to="/">
        Peruuta
      </Button>
    </>
  );
};

export default UusiTehtava;
