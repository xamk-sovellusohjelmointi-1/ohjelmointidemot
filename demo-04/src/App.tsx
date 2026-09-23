import { useEffect, useState } from 'react';
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';

interface Lomaketiedot {
  nimi: string;
  email: string;
  ehdot: boolean;
}

const App = () => {

  const [lomaketiedot, setLomaketiedot] = useState<Lomaketiedot>({
    nimi: "",
    email: "",
    ehdot: false
  });

  const [tiedotOk, setTiedotOk] = useState<boolean>(false);

  // useEffect on mukana opetussyistä: sillä reagoidaan tilan muutokseen.
  // React kuitenkin suosittelee laskemaan tilasta johdetun arvon suoraan renderöinnissä
  // ilman erillistä tilaa ja efektiä: const tiedotOk = Boolean(lomaketiedot.nimi && ...);
  // https://react.dev/learn/you-might-not-need-an-effect
  useEffect((): void => {
    // oxlint-disable-next-line react/set-state-in-effect
    setTiedotOk(Boolean(lomaketiedot.nimi && lomaketiedot.email && lomaketiedot.ehdot));
  }, [lomaketiedot]);

  const tilaaUutiskirje = (): void => {
    alert(`Olet tilannut uutiskirjeemme, kiitos!\nNimi: ${lomaketiedot.nimi}\nSähköposti: ${lomaketiedot.email}\nEhdot: ${lomaketiedot.ehdot ? "Hyväksytty" : "Ei hyväksytty"}`);
  }

  return (
    <Container maxWidth="sm">

      <Typography variant="h4">Demo 4: MUI-komponentit</Typography>
      <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px" }}>
        Uutiskirjeen tilaus
      </Typography>

      <TextField
        sx={{ marginBottom: "10px" }}
        label="Nimi"
        fullWidth
        helperText="Anna etunimesi ja sukunimesi"
        onChange={(e) => {
          setLomaketiedot({ ...lomaketiedot, nimi: e.target.value });
        }}
      />

      <TextField
        sx={{ marginBottom: "10px" }}
        label="Sähköpostiosoite"
        fullWidth
        helperText="Anna sähköpostiosoitteesi"
        onChange={(e) => {
          setLomaketiedot({ ...lomaketiedot, email: e.target.value });
        }}
      />

      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => {
              setLomaketiedot({ ...lomaketiedot, ehdot: e.target.checked });
            }}
          />
        }
        label="Hyväksyn käyttöehdot"
      />

      <Button
        variant="contained"
        fullWidth
        size="large"
        disabled={!tiedotOk}
        onClick={tilaaUutiskirje}
      >
        Tilaa uutiskirje
      </Button>

    </Container>
  );
};

export default App;
