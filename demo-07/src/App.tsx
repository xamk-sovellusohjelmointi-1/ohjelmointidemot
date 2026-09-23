import { useRef, useState } from 'react';
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import type { ChangeEvent, SubmitEvent } from 'react';

interface Lomaketiedot {
  nimi: string;
  sahkoposti: string;
  jakso: string;
  kayttoehdot: boolean;
}

interface Virheet {
  nimi?: string;
  sahkoposti?: string;
  jakso?: string;
  kayttoehdot?: string;
}

const App = () => {

  const lomaketiedot = useRef<Lomaketiedot>({
    nimi: "",
    sahkoposti: "",
    jakso: "",
    kayttoehdot: false
  });

  const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({});

  const syoteKasittelija = (e: ChangeEvent<HTMLInputElement>): void => {
    lomaketiedot.current = {
      ...lomaketiedot.current,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
  };

  const lomakeKasittelija = (e: SubmitEvent): void => {
    e.preventDefault();

    const virheet: Virheet = {};

    if (!lomaketiedot.current.nimi) {
      virheet.nimi = "Nimi puuttuu.";
    }

    if (!lomaketiedot.current.sahkoposti) {
      virheet.sahkoposti = "Sähköposti puuttuu.";
    } else if (!lomaketiedot.current.sahkoposti.includes("@")) {
      virheet.sahkoposti = "Virheellinen sähköpostiosoite.";
    }

    if (!lomaketiedot.current.jakso) {
      virheet.jakso = "Valitse tilausjakso.";
    }

    if (!lomaketiedot.current.kayttoehdot) {
      virheet.kayttoehdot = "Hyväksy käyttöehdot.";
    }

    setVirheilmoitukset(virheet);

    if (Object.keys(virheet).length === 0) {
      alert("Olet tilannut uutiskirjeemme, kiitos!");
    }
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">

        <Typography variant="h4" sx={{ marginTop: "10px" }}>Demo 7: Lomakkeiden käsittely</Typography>
        <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px" }}>
          Uutiskirjeen tilaus v2.0
        </Typography>

        <form onSubmit={lomakeKasittelija}>

          <TextField
            sx={{ marginBottom: "10px" }}
            name="nimi"
            label="Nimi"
            placeholder="Etunimi Sukunimi"
            fullWidth
            onChange={syoteKasittelija}
            error={Boolean(virheilmoitukset.nimi)}
            helperText={virheilmoitukset.nimi}
          />

          <TextField
            sx={{ marginBottom: "10px" }}
            name="sahkoposti"
            label="Sähköpostiosoite"
            fullWidth
            onChange={syoteKasittelija}
            error={Boolean(virheilmoitukset.sahkoposti)}
            helperText={virheilmoitukset.sahkoposti}
          />

          <FormControl fullWidth error={Boolean(virheilmoitukset.jakso)}>
            <FormLabel id="jakso-otsikko">Haluan uutiskirjeen</FormLabel>
            <RadioGroup name="jakso" aria-labelledby="jakso-otsikko" onChange={syoteKasittelija}>
              <FormControlLabel value="paiva" label="Päivittäin" control={<Radio size="small" />} />
              <FormControlLabel value="viikko" label="Viikoittain" control={<Radio size="small" />} />
              <FormControlLabel value="kuukausi" label="Kuukausittain" control={<Radio size="small" />} />
            </RadioGroup>
            <FormHelperText>{virheilmoitukset.jakso}</FormHelperText>
          </FormControl>

          <FormControl error={Boolean(virheilmoitukset.kayttoehdot)}>
            <FormControlLabel
              label="Hyväksyn käyttöehdot"
              control={<Checkbox name="kayttoehdot" onChange={syoteKasittelija} />}
            />
            <FormHelperText>{virheilmoitukset.kayttoehdot}</FormHelperText>
          </FormControl>

          <Button type="submit" variant="contained" fullWidth size="large">
            Tilaa uutiskirje
          </Button>

        </form>

      </Container>
    </>
  );
};

export default App;
