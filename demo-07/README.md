# Demo 7: Lomakkeiden käsittely

## Sisällysluettelo

- [1. Oppimistavoitteet](#1-oppimistavoitteet)
- [2. Kloonaus ja käynnistys](#2-kloonaus-ja-käynnistys)
- [3. Projektin rakenne alussa](#3-projektin-rakenne-alussa)
- [4. Tutoriaali](#4-tutoriaali)
  - [4.1 Kirjastojen asentaminen](#41-kirjastojen-asentaminen)
  - [4.2 Käynnistystiedosto ja perustyylit](#42-käynnistystiedosto-ja-perustyylit)
  - [4.3 Lomakkeen runko ja lähetys](#43-lomakkeen-runko-ja-lähetys)
  - [4.4 Lomaketiedot ja useRef-hook](#44-lomaketiedot-ja-useref-hook)
  - [4.5 Valintanapit ja valintaruutu](#45-valintanapit-ja-valintaruutu)
  - [4.6 Validointi ja virheilmoitukset](#46-validointi-ja-virheilmoitukset)
- [5. Projektin rakenne lopussa](#5-projektin-rakenne-lopussa)
- [6. Yhteenveto](#6-yhteenveto)
- [7. Jatka harjoittelua](#7-jatka-harjoittelua)

## 1. Oppimistavoitteet

Tässä demossa rakennetaan uudelleen demon 4 uutiskirjeen tilauslomake. Uudessa versiossa kentät ovat HTML-lomakkeen sisällä, lomakkeella on tekstikenttien lisäksi valintanapit, ja tiedot tarkistetaan lähetyksen yhteydessä. Puuttuvasta tai virheellisestä tiedosta näytetään virheilmoitus kyseisen kentän alla. Demo kattaa seuraavat tekniikat:

- Lomakkeen lähetyksen käsittely `onSubmit`-tapahtumalla ja sivun uudelleenlatauksen estäminen `preventDefault`-kutsulla
- Lomakkeen tietojen tallentaminen `useRef`-viitteeseen ilman uudelleenrenderöintiä
- Yhteinen `onChange`-käsittelijä usealle kentälle `name`-attribuutin avulla
- Tapahtumien tyypittäminen Reactin `SubmitEvent`- ja `ChangeEvent`-tyypeillä
- Valintanappiryhmä MUI:n `RadioGroup`-, `Radio`- ja `FormLabel`-komponenteilla
- Lomakkeen validointi lähetyksen yhteydessä ja kenttäkohtaiset virheilmoitukset MUI:n `error`- ja `helperText`-propseilla sekä `FormHelperText`-komponentilla

## 2. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-07
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3007`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19, TypeScriptillä 6.x ja MUI:n versiolla 9. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 3. Projektin rakenne alussa

Demo aloitetaan uudesta, siivotusta Vite + React + TypeScript -projektipohjasta, jonka portiksi on asetettu `3007`. Projektin luominen ja ylimääräisten tiedostojen siivoaminen on kuvattu [demo 1:n README-tiedostossa](../demo-01/README.md#41-projektin-luominen).

```text
demo-07/
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 4. Tutoriaali

### 4.1 Kirjastojen asentaminen

Kirjastot asennetaan ensin, koska jokainen myöhempi vaihe käyttää niitä.

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
```

Paketit ovat samat kuin demossa 6, mutta ikonipakettia `@mui/icons-material` ja reitityskirjastoa `react-router` ei asenneta. Sovelluksessa on vain yksi näkymä, eikä siinä käytetä ikoneita.

Tiedosto `src/App.css` poistetaan, koska tässäkin demossa komponenttien ulkoasu määritellään MUI:n omilla keinoilla.

### 4.2 Käynnistystiedosto ja perustyylit

Roboto-fontti otetaan käyttöön tiedostossa `src/main.tsx` samalla tavalla kuin demossa 6. Reititystä ei tarvita, joten `App`-komponenttia ei kääritä `BrowserRouter`-komponenttiin.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css' // uusi
import '@fontsource/roboto/400.css' // uusi
import '@fontsource/roboto/500.css' // uusi
import '@fontsource/roboto/700.css' // uusi
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Tiedostosta poistetaan rivi `import './index.css'`, ja samalla poistetaan tiedosto `src/index.css`. Seuraavassa vaiheessa sovellukseen lisätään MUI:n `CssBaseline`-komponentti, jonka tyylit korvaavat kaikki `index.css`-tiedoston tyylit samoin kuin demossa 6.

### 4.3 Lomakkeen runko ja lähetys

Lomakkeen kentät sijoitetaan HTML:n `<form>`-elementin sisään, joten ensin tehdään lomake ja sen lähetyspainike. Kentät lisätään valmiiseen runkoon seuraavissa vaiheissa.

`src/App.tsx`-tiedoston sisältö korvataan seuraavalla:

```tsx
import {
  Button,
  Container,
  CssBaseline,
  Typography,
} from '@mui/material';
import type { SubmitEvent } from 'react';

const App = () => {

  const lomakeKasittelija = (e: SubmitEvent): void => {
    e.preventDefault();
    alert("Olet tilannut uutiskirjeemme, kiitos!");
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

          <Button type="submit" variant="contained" fullWidth size="large">
            Tilaa uutiskirje
          </Button>

        </form>

      </Container>
    </>
  );
};

export default App;
```

Demossa 4 tilaus lähetettiin painikkeen `onClick`-tapahtumalla. Tässä demossa painikkeella on `type="submit"`, jolloin sen painaminen lähettää ympäröivän lomakkeen. Lomakkeen lähetys laukaisee `<form>`-elementin `onSubmit`-tapahtuman, joka käsitellään `lomakeKasittelija`-funktiolla.

Selaimen **oletustoiminto** (default behavior) lomakkeen lähetyksessä on lähettää tiedot palvelimelle ja ladata sivu uudelleen. React-sovelluksessa uudelleenlataus käynnistäisi koko sovelluksen alusta, ja kaikki tila katoaisi. Kutsu `e.preventDefault()` estää oletustoiminnon, jolloin lähetys käsitellään kokonaan funktiossa.

Parametrin `e` tyyppi `SubmitEvent` on Reactin tyyppi lomakkeen lähetystapahtumalle. Se tuodaan `react`-paketista tyyppituonnilla (`import type`) samalla tavalla kuin demossa 6 tuotiin oma `Tehtava`-tyyppi.

`CssBaseline` ja `Container` ovat samat kuin demossa 6. Koska `CssBaseline` asettaa `body`-elementin reunukseksi nollan, pääotsikko saa `marginTop`-välin, jottei se ole kiinni selainikkunan yläreunassa. Demossa 6 sama väli oli `Otsikko`-komponentissa.

Kun tiedosto on tallennettu, painikkeen painaminen näyttää ilmoituksen, eikä sivu lataudu uudelleen.

Aiheesta lisää: [Reactin dokumentaatio oletustoiminnon estämisestä](https://react.dev/learn/responding-to-events#preventing-default-behavior).

### 4.4 Lomaketiedot ja useRef-hook

Ennen kenttiä määritellään, missä muodossa lomakkeen tiedot tallennetaan. `Lomaketiedot`-rajapinnassa on yksi kenttä jokaista lomakkeen syötettä kohden. Myös valintanappien (`jakso`) ja valintaruudun (`kayttoehdot`) kentät määritellään jo nyt, koska tallennettavan olion alkuarvossa on oltava kaikki rajapinnan kentät.

```tsx
import { useRef } from 'react'; // uusi
import {
  Button,
  Container,
  CssBaseline,
  TextField, // uusi
  Typography,
} from '@mui/material';
import type { ChangeEvent, SubmitEvent } from 'react'; // muutettu

interface Lomaketiedot { // uusi
  nimi: string; // uusi
  sahkoposti: string; // uusi
  jakso: string; // uusi
  kayttoehdot: boolean; // uusi
} // uusi

const App = () => {

  const lomaketiedot = useRef<Lomaketiedot>({ // uusi
    nimi: "", // uusi
    sahkoposti: "", // uusi
    jakso: "", // uusi
    kayttoehdot: false // uusi
  }); // uusi

  const syoteKasittelija = (e: ChangeEvent<HTMLInputElement>): void => { // uusi
    lomaketiedot.current = { // uusi
      ...lomaketiedot.current, // uusi
      [e.target.name]: e.target.value // uusi
    }; // uusi
  }; // uusi

  const lomakeKasittelija = (e: SubmitEvent): void => {
    e.preventDefault();
    console.log(lomaketiedot.current); // uusi
    alert("Olet tilannut uutiskirjeemme, kiitos!");
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

          {/* uusi */}
          <TextField
            sx={{ marginBottom: "10px" }}
            name="nimi"
            label="Nimi"
            placeholder="Etunimi Sukunimi"
            fullWidth
            onChange={syoteKasittelija}
          />

          {/* uusi */}
          <TextField
            sx={{ marginBottom: "10px" }}
            name="sahkoposti"
            label="Sähköpostiosoite"
            fullWidth
            onChange={syoteKasittelija}
          />

          <Button type="submit" variant="contained" fullWidth size="large">
            Tilaa uutiskirje
          </Button>

        </form>

      </Container>
    </>
  );
};

export default App;
```

Demossa 4 lomakkeen tiedot tallennettiin `useState`-tilaan, jolloin komponentti renderöitiin uudelleen jokaisen kirjoitetun merkin jälkeen. Tässä demossa tietoja tarvitaan vasta lähetyksen yhteydessä, eikä niitä näytetä sitä ennen missään. Siksi ne tallennetaan `useRef`-viitteeseen. Demoissa 2 ja 6 viite osoitti `<input>`-elementtiin, mutta viitteeseen voi tallentaa minkä tahansa arvon, kuten tässä olion. Arvo on viitteen `current`-kentässä, ja sen muuttaminen ei renderöi komponenttia uudelleen.

Kaikki kentät käyttävät samaa `syoteKasittelija`-funktiota. Kentät erotetaan toisistaan `name`-propsilla, jonka arvon käsittelijä saa lausekkeesta `e.target.name`. `e.target` on se `<input>`-elementti, jonka arvo muuttui. Tapahtuman tyyppi `ChangeEvent<HTMLInputElement>` on Reactin tyyppi syöttökentän muutostapahtumalle.

Käsittelijä luo viitteeseen uuden olion, johon kopioidaan vanhan olion kentät levitysoperaattorilla demon 4 tapaan. Hakasulkeissa oleva `[e.target.name]` on **laskettu ominaisuuden nimi** (computed property name). Kentän nimeksi tulee muuttujan arvo, joten nimikentän muutos päivittää kentän `nimi` ja sähköpostikentän muutos kentän `sahkoposti`. Rakenne vastaa Pythonin sanakirjalauseketta `{**vanha, avain: arvo}`, jossa `avain` on muuttuja.

Suora sijoitus `lomaketiedot.current[e.target.name] = e.target.value` ei kelpaa TypeScriptille. `e.target.name` voi olla mikä tahansa merkkijono, joten TypeScript ei voi tarkistaa, että se on jokin `Lomaketiedot`-rajapinnan kentistä. Uuden olion luominen levitysoperaattorilla hyväksytään.

`console.log`-rivi on väliaikainen, ja se poistetaan vaiheessa 4.6. Kun kenttiin kirjoitetaan tekstiä ja lomake lähetetään, selaimen kehittäjätyökalujen konsoliin (F12) tulostuu olio, jossa on kenttiin kirjoitetut arvot.

Aiheesta lisää: [Reactin dokumentaatio arvojen tallentamisesta viitteisiin](https://react.dev/learn/referencing-values-with-refs).

### 4.5 Valintanapit ja valintaruutu

Lomakkeeseen lisätään tilausjakson valinta ja käyttöehtojen hyväksyntä. Molemmat kootaan `FormControl`-komponentin sisään, koska seuraavassa vaiheessa samaan komponenttiin lisätään virheilmoitus.

```tsx
import { useRef } from 'react';
import {
  Button,
  Checkbox, // uusi
  Container,
  CssBaseline,
  FormControl, // uusi
  FormControlLabel, // uusi
  FormLabel, // uusi
  Radio, // uusi
  RadioGroup, // uusi
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

const App = () => {

  const lomaketiedot = useRef<Lomaketiedot>({
    nimi: "",
    sahkoposti: "",
    jakso: "",
    kayttoehdot: false
  });

  const syoteKasittelija = (e: ChangeEvent<HTMLInputElement>): void => {
    lomaketiedot.current = {
      ...lomaketiedot.current,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value // muutettu
    };
  };

  const lomakeKasittelija = (e: SubmitEvent): void => {
    e.preventDefault();
    console.log(lomaketiedot.current);
    alert("Olet tilannut uutiskirjeemme, kiitos!");
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
          />

          <TextField
            sx={{ marginBottom: "10px" }}
            name="sahkoposti"
            label="Sähköpostiosoite"
            fullWidth
            onChange={syoteKasittelija}
          />

          {/* uusi */}
          <FormControl fullWidth>
            <FormLabel id="jakso-otsikko">Haluan uutiskirjeen</FormLabel>
            <RadioGroup name="jakso" aria-labelledby="jakso-otsikko" onChange={syoteKasittelija}>
              <FormControlLabel value="paiva" label="Päivittäin" control={<Radio size="small" />} />
              <FormControlLabel value="viikko" label="Viikoittain" control={<Radio size="small" />} />
              <FormControlLabel value="kuukausi" label="Kuukausittain" control={<Radio size="small" />} />
            </RadioGroup>
          </FormControl>

          {/* uusi */}
          <FormControl>
            <FormControlLabel
              label="Hyväksyn käyttöehdot"
              control={<Checkbox name="kayttoehdot" onChange={syoteKasittelija} />}
            />
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
```

Valintanapit ovat `RadioGroup`-komponentin sisällä, ja ryhmän napeista voi olla valittuna vain yksi kerrallaan. Ryhmälle annettu `name="jakso"` tulee jokaisen ryhmän valintanapin nimeksi. Myös `onChange` annetaan ryhmälle, jolloin sama käsittelijä tallentaa valitun napin arvon kenttään `jakso`. Jokainen nappi on `FormControlLabel`-komponentti, joka yhdistää `control`-propsina annetun `Radio`-komponentin ja `label`-tekstin. `value` on arvo, joka tallennetaan, kun nappi valitaan.

`FormLabel` on ryhmän otsikko. Otsikon `id` ja ryhmän `aria-labelledby` liittävät otsikon ryhmään, jolloin ruudunlukuohjelma lukee otsikon ryhmän nimenä.

Valintaruudun `Checkbox`-komponentilla on oma `name`-propsinsa. Käyttöehtojen hyväksyntä on kyllä tai ei, joten ruudusta tallennetaan totuusarvo `e.target.checked`. Tekstikentistä ja valintanapeista tallennetaan edelleen `e.target.value`. Käsittelijä tunnistaa valintaruudun sen tyypistä `e.target.type`, ja ehdollinen lauseke valitsee tallennettavan arvon.

Lähetyksen jälkeen konsoliin tulostuvassa oliossa näkyvät nyt myös valittu jakso ja käyttöehtojen hyväksyntä.

Aiheesta lisää: [MUI:n Radio Group -dokumentaatio](https://mui.com/material-ui/react-radio-button/).

### 4.6 Validointi ja virheilmoitukset

Viimeisenä lomakkeeseen lisätään **validointi** (validation), eli tietojen tarkistaminen ennen tilauksen hyväksymistä. Validointi tehdään viimeisenä, koska se tarkistaa kaikkien aiemmissa vaiheissa lisättyjen kenttien arvot.

```tsx
import { useRef, useState } from 'react'; // muutettu
import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  FormHelperText, // uusi
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

interface Virheet { // uusi
  nimi?: string; // uusi
  sahkoposti?: string; // uusi
  jakso?: string; // uusi
  kayttoehdot?: string; // uusi
} // uusi

const App = () => {

  const lomaketiedot = useRef<Lomaketiedot>({
    nimi: "",
    sahkoposti: "",
    jakso: "",
    kayttoehdot: false
  });

  const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({}); // uusi

  const syoteKasittelija = (e: ChangeEvent<HTMLInputElement>): void => {
    lomaketiedot.current = {
      ...lomaketiedot.current,
      [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
    };
  };

  const lomakeKasittelija = (e: SubmitEvent): void => {
    e.preventDefault();

    const virheet: Virheet = {}; // uusi

    if (!lomaketiedot.current.nimi) { // uusi
      virheet.nimi = "Nimi puuttuu."; // uusi
    } // uusi

    if (!lomaketiedot.current.sahkoposti) { // uusi
      virheet.sahkoposti = "Sähköposti puuttuu."; // uusi
    } else if (!lomaketiedot.current.sahkoposti.includes("@")) { // uusi
      virheet.sahkoposti = "Virheellinen sähköpostiosoite."; // uusi
    } // uusi

    if (!lomaketiedot.current.jakso) { // uusi
      virheet.jakso = "Valitse tilausjakso."; // uusi
    } // uusi

    if (!lomaketiedot.current.kayttoehdot) { // uusi
      virheet.kayttoehdot = "Hyväksy käyttöehdot."; // uusi
    } // uusi

    setVirheilmoitukset(virheet); // uusi

    if (Object.keys(virheet).length === 0) { // uusi
      alert("Olet tilannut uutiskirjeemme, kiitos!");
    } // uusi
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
            error={Boolean(virheilmoitukset.nimi)} // uusi
            helperText={virheilmoitukset.nimi} // uusi
          />

          <TextField
            sx={{ marginBottom: "10px" }}
            name="sahkoposti"
            label="Sähköpostiosoite"
            fullWidth
            onChange={syoteKasittelija}
            error={Boolean(virheilmoitukset.sahkoposti)} // uusi
            helperText={virheilmoitukset.sahkoposti} // uusi
          />

          {/* muutettu */}
          <FormControl fullWidth error={Boolean(virheilmoitukset.jakso)}>
            <FormLabel id="jakso-otsikko">Haluan uutiskirjeen</FormLabel>
            <RadioGroup name="jakso" aria-labelledby="jakso-otsikko" onChange={syoteKasittelija}>
              <FormControlLabel value="paiva" label="Päivittäin" control={<Radio size="small" />} />
              <FormControlLabel value="viikko" label="Viikoittain" control={<Radio size="small" />} />
              <FormControlLabel value="kuukausi" label="Kuukausittain" control={<Radio size="small" />} />
            </RadioGroup>
            <FormHelperText>{virheilmoitukset.jakso}</FormHelperText> {/* uusi */}
          </FormControl>

          {/* muutettu */}
          <FormControl error={Boolean(virheilmoitukset.kayttoehdot)}>
            <FormControlLabel
              label="Hyväksyn käyttöehdot"
              control={<Checkbox name="kayttoehdot" onChange={syoteKasittelija} />}
            />
            <FormHelperText>{virheilmoitukset.kayttoehdot}</FormHelperText> {/* uusi */}
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
```

Virheilmoitukset tallennetaan `useState`-tilaan eikä viitteeseen, koska niiden pitää näkyä sivulla heti lähetyksen jälkeen. Tilan muuttaminen renderöi komponentin uudelleen, ja uudelleenrenderöinnissä ilmoitukset piirretään kenttien alle. Lomakkeen tiedot pysyvät viitteessä, koska niitä ei näytetä missään.

`Virheet`-rajapinnan kentät ovat valinnaisia samalla tavalla kuin demon 6 `Otsikko`-komponentin `tyyli`-propsi. Kenttä on olemassa vain, jos siihen liittyvässä syötteessä on virhe, ja sen arvo on näytettävä virheilmoitus.

`lomakeKasittelija` kerää virheet uuteen `virheet`-olioon. Olio on määritelty `const`-sanalla, mutta sen kenttiä voi silti lisätä, koska `const` estää vain muuttujan korvaamisen toisella arvolla. Ehto `!lomaketiedot.current.nimi` on tosi, kun nimi on tyhjä merkkijono. Sähköpostiosoitteesta tarkistetaan ensin, että se on annettu, ja sen jälkeen, että siinä on `@`-merkki. Merkkijonon `includes`-metodi vastaa Pythonin `in`-operaattoria, ja `else if` vastaa Pythonin `elif`-sanaa.

Tarkistusten jälkeen virheet tallennetaan tilaan. `Object.keys` palauttaa taulukon olion kenttien nimistä, joten sen pituus on nolla, kun virheitä ei löytynyt. Silloin näytetään onnistumisilmoitus. Koska tila päivitetään myös onnistuneen lähetyksen yhteydessä, aiemmat virheilmoitukset poistuvat näkyvistä.

Tekstikenttien virheet näytetään `TextField`-komponentin omilla propseilla. `error`-propsi muuttaa kentän reunan ja otsikon punaiseksi, ja `helperText` näyttää virheilmoituksen kentän alla. `error` odottaa totuusarvoa, joten `Boolean`-funktio muuttaa virheilmoituksen totuusarvoksi samalla tavalla kuin Pythonin `bool`. Puuttuva ilmoitus (`undefined`) muuttuu arvoksi `false`, ja ilmoitusteksti arvoksi `true`.

Valintanappien ja valintaruudun virheet näytetään `FormHelperText`-komponentilla. Sen yläpuolella olevan `FormControl`-komponentin `error`-propsi muuttaa `FormHelperText`-tekstin ja valintanappiryhmän `FormLabel`-otsikon punaiseksi.

Virheet tarkistetaan vain lähetyksen yhteydessä. Kun virheellinen kenttä korjataan, sen virheilmoitus näkyy seuraavaan lähetykseen asti.

Aiheesta lisää: [MUI:n dokumentaatio tekstikentän validoinnista](https://mui.com/material-ui/react-text-field/#validation).

## 5. Projektin rakenne lopussa

```text
demo-07/
├── src/
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── REFERENCE.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 6. Yhteenveto

Tässä demossa käytiin läpi:

- Lomakkeen lähetyksen käsittely `onSubmit`-tapahtumalla ja oletustoiminnon estäminen `preventDefault`-kutsulla
- Lomakkeen tietojen tallentaminen `useRef`-viitteeseen, kun tietoja ei tarvitse näyttää ennen lähetystä
- Yhteinen `onChange`-käsittelijä, joka tallentaa kentän arvon `name`-attribuutin mukaiseen kenttään lasketun ominaisuuden nimen avulla
- Valintanappiryhmä ja valintaruutu MUI:n lomakekomponenteilla, ja
- Lomakkeen validointi lähetyksen yhteydessä ja virheilmoitusten näyttäminen `useState`-tilan avulla.

---

## 7. Jatka harjoittelua

- Näytä onnistumisilmoituksessa lähetetyt tiedot samalla tavalla kuin demossa 4. Tiedot löytyvät oliosta `lomaketiedot.current`, ja rivinvaihdot saa template literaliin merkinnällä `\n`.
- Tarkista, että nimessä on vähintään kaksi sanaa. Merkkijonon `split(" ")`-metodi palauttaa taulukon sanoista, ja taulukon pituuden voi tarkistaa `length`-kentästä.
- Lisää lomakkeelle valinnainen puhelinnumerokenttä. Kun kenttä lisätään molempiin rajapintoihin ja lomakkeeseen `name`-propsin kanssa, `syoteKasittelija` tallentaa sen ilman muutoksia. Jos numero on annettu, tarkista lausekkeella `Number.isNaN(Number(...))`, että se koostuu pelkistä numeroista.
