# Demo 4 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Näyttää MUI-komponenteista rakennetun uutiskirjeen tilauslomakkeen, tallentaa lomakkeen tiedot `lomaketiedot`-tilaan ja pitää tilauspainikkeen pois käytöstä, kunnes `tiedotOk` on `true`. |

## Tekniikat

**MUI-komponenttien tuonti ja käyttö**

Komponentit tuodaan `@mui/material`-paketista nimettyinä tuonteina, ja niiden toimintaa ja ulkoasua ohjataan propseilla.

```tsx
import { Button, Container, TextField } from '@mui/material';

const App = () => {
  return (
    <Container maxWidth="sm">
      <TextField label="Nimi" fullWidth helperText="Anna etunimesi ja sukunimesi" />
      <Button variant="contained" size="large">Tilaa uutiskirje</Button>
    </Container>
  );
};
```

**Roboto-fontin käyttöönotto**

Fontin painot tuodaan sovelluksen käynnistystiedostoon `src/main.tsx`.

```tsx
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
```

**Ulkoasun muokkaaminen `sx`-propsilla**

`sx`-propsille annetaan olio, jonka CSS-ominaisuudet kirjoitetaan camelCase-muodossa.

```tsx
<Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px" }}>
  Uutiskirjeen tilaus
</Typography>
```

**Valintaruutu tekstin kanssa**

`Checkbox` sijoitetaan `FormControlLabel`-komponentin `control`-propsiksi, ja teksti annetaan `label`-propsina.

```tsx
<FormControlLabel
  control={<Checkbox />}
  label="Hyväksyn käyttöehdot"
/>
```

**Lomakkeen tiedot yhdessä olion muotoisessa tilassa**

Tila alustetaan olioksi, jossa on jokainen kenttä. Käsittelijä kopioi nykyiset kentät levitysoperaattorilla ja korvaa niistä yhden. Tekstikentän arvo luetaan `e.target.value`-ominaisuudesta ja valintaruudun tila `e.target.checked`-ominaisuudesta.

```tsx
const [lomaketiedot, setLomaketiedot] = useState<Lomaketiedot>({
  nimi: "",
  email: "",
  ehdot: false
});
```

```tsx
<TextField
  label="Nimi"
  onChange={(e) => {
    setLomaketiedot({ ...lomaketiedot, nimi: e.target.value });
  }}
/>

<Checkbox
  onChange={(e) => {
    setLomaketiedot({ ...lomaketiedot, ehdot: e.target.checked });
  }}
/>
```

**Painikkeen poistaminen käytöstä (`disabled`)**

Painike on pois käytöstä, kun `disabled`-propsin arvo on `true`.

```tsx
<Button variant="contained" disabled={!tiedotOk} onClick={tilaaUutiskirje}>
  Tilaa uutiskirje
</Button>
```

**Tilan muutokseen reagoiminen (`useEffect`)**

Efekti suoritetaan renderöinnin jälkeen ensimmäisellä kerralla ja aina, kun jokin riippuvuustaulukon arvo muuttuu. Demossa tämä ratkaisu on mukana opetussyistä.

```tsx
const [tiedotOk, setTiedotOk] = useState<boolean>(false);

useEffect((): void => {
  setTiedotOk(Boolean(lomaketiedot.nimi && lomaketiedot.email && lomaketiedot.ehdot));
}, [lomaketiedot]);
```

**Johdettu arvo renderöinnissä (Reactin suositus)**

Arvo, joka voidaan laskea tilasta, lasketaan suoraan komponentin rungossa ilman erillistä tilaa ja efektiä. Tämä korvaa yllä olevan `tiedotOk`-tilan ja `useEffect`-kutsun. Lisätietoa: [You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).

```tsx
const tiedotOk: boolean = Boolean(lomaketiedot.nimi && lomaketiedot.email && lomaketiedot.ehdot);
```

## Types & Interfaces

| Nimi | Kentät | Käyttökohde |
|---|---|---|
| `Lomaketiedot` | `nimi: string`, `email: string`, `ehdot: boolean` | `App`-komponentin `lomaketiedot`-tilan tyyppi (`src/App.tsx`) |
