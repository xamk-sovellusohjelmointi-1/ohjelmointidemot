# Demo 4: MUI-komponenttikirjasto

## 2. Sisällysluettelo

- [3. Oppimistavoitteet](#3-oppimistavoitteet)
- [4. Kloonaus ja käynnistys](#4-kloonaus-ja-käynnistys)
- [5. Projektin rakenne alussa](#5-projektin-rakenne-alussa)
- [6. Tutoriaali](#6-tutoriaali)
  - [6.1 MUI:n ja Roboto-fontin asentaminen](#61-muin-ja-roboto-fontin-asentaminen)
  - [6.2 Näkymän kehys ja otsikot](#62-näkymän-kehys-ja-otsikot)
  - [6.3 Lomakkeen kentät ja painike](#63-lomakkeen-kentät-ja-painike)
  - [6.4 Lomakkeen tiedot yhteen tilaan](#64-lomakkeen-tiedot-yhteen-tilaan)
  - [6.5 Tilauksen vahvistaminen](#65-tilauksen-vahvistaminen)
  - [6.6 Painikkeen aktivointi useEffect-hookilla](#66-painikkeen-aktivointi-useeffect-hookilla)
- [7. Projektin rakenne lopussa](#7-projektin-rakenne-lopussa)
- [8. Yhteenveto](#8-yhteenveto)
- [10. Jatka harjoittelua](#10-jatka-harjoittelua)

## 3. Oppimistavoitteet

Tässä demossa otetaan käyttöön ulkoinen komponenttikirjasto MUI (Material UI), ja sen valmiista komponenteista rakennetaan uutiskirjeen tilauslomake. Lomakkeen tiedot kerätään yhteen tilamuuttujaan, ja tilauspainike aktivoituu vasta, kun kaikki tiedot on annettu. Demo kattaa seuraavat tekniikat:

- Komponenttikirjaston ja fontin asentaminen npm:llä ja käyttöönotto sovelluksessa
- MUI:n `Container`-, `Typography`-, `TextField`-, `Checkbox`-, `FormControlLabel`- ja `Button`-komponenttien käyttö
- Komponentin ulkoasun muokkaaminen `sx`-propsilla
- Lomakkeen tietojen tallentaminen yhteen olion muotoiseen tilaan
- Painikkeen ehdollinen poistaminen käytöstä `disabled`-propsilla
- Tilan muutokseen reagoiminen `useEffect`-hookilla ja Reactin suositus laskea johdettu arvo suoraan renderöinnissä

## 4. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-04
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3004`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19, TypeScriptillä 6.x ja MUI:n versiolla 9. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 5. Projektin rakenne alussa

Demo aloitetaan uudesta, siivotusta Vite + React + TypeScript -projektipohjasta, jonka portiksi on asetettu `3004`. Projektin luominen ja ylimääräisten tiedostojen siivoaminen on kuvattu [demo 1:n README-tiedostossa](../demo-01/README.md#61-projektin-luominen).

```text
demo-04/
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

## 6. Tutoriaali

### 6.1 MUI:n ja Roboto-fontin asentaminen

**Komponenttikirjasto** (component library) on paketti, joka sisältää valmiiksi muotoiltuja ja toimivia React-komponentteja, kuten painikkeita, tekstikenttiä ja valintaruutuja. MUI:n komponentit noudattavat Googlen Material Design -suunnittelujärjestelmää. Kirjasto asennetaan ensimmäisenä, koska kaikki myöhemmät vaiheet käyttävät sen komponentteja.

```bash
npm install @mui/material @emotion/react @emotion/styled
npm install @fontsource/roboto
```

Ensimmäinen komento asentaa MUI:n sekä Emotion-kirjaston, jota MUI käyttää komponenttien tyylien muodostamiseen. Toinen komento asentaa Roboto-fontin, jota MUI:n komponentit käyttävät oletuksena. Asennetut paketit lisätään `package.json`-tiedoston `dependencies`-osioon.

Fontti otetaan käyttöön tuomalla sen tyylitiedostot sovelluksen käynnistystiedostoon `main.tsx`. MUI:n oletustyylit käyttävät fontin painoja 300, 400, 500 ja 700, joten ne tuodaan kaikki.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/roboto/300.css' // uusi
import '@fontsource/roboto/400.css' // uusi
import '@fontsource/roboto/500.css' // uusi
import '@fontsource/roboto/700.css' // uusi
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

Tiedosto `src/App.css` poistetaan, koska tässä demossa komponenttien ulkoasu määritellään MUI:n omilla keinoilla.

Aiheesta lisää: [MUI:n asennusohje](https://mui.com/material-ui/getting-started/installation/).

### 6.2 Näkymän kehys ja otsikot

Käyttöliittymä rakennetaan ennen lomakkeen logiikkaa, jotta jokaisen vaiheen tulos näkyy heti selaimessa. `App.tsx`-tiedoston sisältö korvataan seuraavalla:

```tsx
import { Container, Typography } from '@mui/material'; // uusi

const App = () => {

  return (
    <Container maxWidth="sm">

      <Typography variant="h4">Demo 4: MUI-komponentit</Typography>
      <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px" }}>
        Uutiskirjeen tilaus
      </Typography>

    </Container>
  );
};

export default App;
```

MUI:n komponentit tuodaan `@mui/material`-paketista nimettyinä tuonteina aaltosulkeiden sisällä. `Container` on koko näkymän kehys, joka keskittää sisällön vaakasuunnassa. Sen `maxWidth="sm"`-propsi rajaa sisällön enimmäisleveyden, jonka jälkeen kehys ei enää levene selainikkunan mukana. Koska `Container` ympäröi koko sisällön, fragmenttia `<>...</>` ei tarvita.

`Typography` näyttää tekstiä valmiiksi muotoiltuna. Sen `variant`-propsi valitsee tekstityylin, ja `h4`- ja `h5`-tyylit näytetään oletuksena samannimisinä otsikkoelementteinä.

Yksittäisen komponentin ulkoasua muokataan `sx`-propsilla, jolle annetaan olio CSS-ominaisuuksista. Ominaisuuksien nimet kirjoitetaan camelCase-muodossa, kuten `marginTop`. Uloimmat aaltosulkeet upottavat JSX:ään JavaScript-arvon, ja sisemmät aaltosulkeet muodostavat itse olion.

Aiheesta lisää: [MUI:n dokumentaatio `sx`-propsista](https://mui.com/system/getting-started/the-sx-prop/).

### 6.3 Lomakkeen kentät ja painike

Seuraavaksi lisätään lomakkeen kentät ja painike. Ne jätetään vielä ilman toimintoja, jotta lomakkeen rakenne on valmis ennen kuin siihen lisätään tilaa.

```tsx
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material'; // muutettu

const App = () => {

  return (
    <Container maxWidth="sm">

      <Typography variant="h4">Demo 4: MUI-komponentit</Typography>
      <Typography variant="h5" sx={{ marginTop: "10px", marginBottom: "10px" }}>
        Uutiskirjeen tilaus
      </Typography>

      {/* uusi: kaksi TextField-komponenttia */}
      <TextField
        sx={{ marginBottom: "10px" }}
        label="Nimi"
        fullWidth
        helperText="Anna etunimesi ja sukunimesi"
      />

      <TextField
        sx={{ marginBottom: "10px" }}
        label="Sähköpostiosoite"
        fullWidth
        helperText="Anna sähköpostiosoitteesi"
      />

      {/* uusi */}
      <FormControlLabel
        control={<Checkbox />}
        label="Hyväksyn käyttöehdot"
      />

      {/* uusi */}
      <Button
        variant="contained"
        fullWidth
        size="large"
      >
        Tilaa uutiskirje
      </Button>

    </Container>
  );
};

export default App;
```

`TextField` on tekstikenttä, jonka `label`-propsi näyttää kentän nimen ja `helperText`-propsi ohjetekstin kentän alla. `fullWidth` venyttää kentän ympäröivän `Container`-komponentin levyiseksi. Propsi, jolle ei anneta arvoa, saa arvon `true`, joten `fullWidth` tarkoittaa samaa kuin `fullWidth={true}`.

`Checkbox` on valintaruutu. Sen viereen saadaan teksti sijoittamalla se `FormControlLabel`-komponentin `control`-propsiksi ja antamalla teksti `label`-propsina. `Button` on painike, jonka `variant="contained"` antaa sille täytetyn taustavärin ja `size="large"` tavallista suuremman koon.

Aiheesta lisää: [MUI:n komponenttiluettelo](https://mui.com/material-ui/all-components/).

### 6.4 Lomakkeen tiedot yhteen tilaan

Lomakkeen kolme tietoa tallennetaan yhteen tilamuuttujaan, jolloin ne voidaan käsitellä yhtenä kokonaisuutena. Tilan muoto määritellään rajapinnalla samalla tavalla kuin demo 2:ssa määriteltiin `Tehtava`-olion muoto.

```tsx
import { useState } from 'react'; // uusi
import { Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';

interface Lomaketiedot { // uusi
  nimi: string; // uusi
  email: string; // uusi
  ehdot: boolean; // uusi
} // uusi

const App = () => {

  const [lomaketiedot, setLomaketiedot] = useState<Lomaketiedot>({ // uusi
    nimi: "", // uusi
    email: "", // uusi
    ehdot: false // uusi
  }); // uusi

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
        onChange={(e) => { // uusi
          setLomaketiedot({ ...lomaketiedot, nimi: e.target.value }); // uusi
        }} // uusi
      />

      <TextField
        sx={{ marginBottom: "10px" }}
        label="Sähköpostiosoite"
        fullWidth
        helperText="Anna sähköpostiosoitteesi"
        onChange={(e) => { // uusi
          setLomaketiedot({ ...lomaketiedot, email: e.target.value }); // uusi
        }} // uusi
      />

      <FormControlLabel
        control={
          <Checkbox
            onChange={(e) => { // uusi
              setLomaketiedot({ ...lomaketiedot, ehdot: e.target.checked }); // uusi
            }} // uusi
          />
        }
        label="Hyväksyn käyttöehdot"
      />

      <Button
        variant="contained"
        fullWidth
        size="large"
      >
        Tilaa uutiskirje
      </Button>

    </Container>
  );
};

export default App;
```

Tila alustetaan tyhjillä merkkijonoilla ja arvolla `false`, jotta jokainen kenttä on olemassa heti sovelluksen käynnistyessä. Ilman alkuarvoa tila olisi aluksi `undefined`, ja TypeScript ilmoittaisi virheestä sekä levitysoperaattorin kohdalla että tilan kenttiä luettaessa.

MUI:n komponentit käyttävät samaa `onChange`-tapahtumaa kuin HTML:n `<input>`-elementti demossa 1. Tekstikentän arvo luetaan `e.target.value`-ominaisuudesta ja valintaruudun tila `e.target.checked`-ominaisuudesta, joka on `true` tai `false`. Olion muotoista tilaa ei muuteta suoraan, joten jokainen käsittelijä muodostaa uuden olion levitysoperaattorilla samoin kuin demo 2:ssa. `{ ...lomaketiedot, nimi: e.target.value }` kopioi kaikki nykyiset kentät ja korvaa niistä vain `nimi`-kentän.

Aiheesta lisää: [Reactin dokumentaatio olioiden päivittämisestä tilassa](https://react.dev/learn/updating-objects-in-state).

### 6.5 Tilauksen vahvistaminen

Kun tiedot ovat tilassa, painikkeelle voidaan lisätä toiminto. Lomaketta ei lähetetä mihinkään, vaan onnistunutta tilausta simuloidaan selaimen `alert`-ikkunalla. `App`-komponenttiin lisätään `tilaaUutiskirje`-funktio ja painikkeelle `onClick`-käsittelijä:

```tsx
// ... tuonnit ja Lomaketiedot-rajapinta ennallaan

const App = () => {

  const [lomaketiedot, setLomaketiedot] = useState<Lomaketiedot>({
    nimi: "",
    email: "",
    ehdot: false
  });

  const tilaaUutiskirje = (): void => { // uusi
    alert(`Olet tilannut uutiskirjeemme, kiitos!\nNimi: ${lomaketiedot.nimi}\nSähköposti: ${lomaketiedot.email}\nEhdot: ${lomaketiedot.ehdot ? "Hyväksytty" : "Ei hyväksytty"}`); // uusi
  } // uusi

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
        onClick={tilaaUutiskirje} // uusi
      >
        Tilaa uutiskirje
      </Button>

    </Container>
  );
};

export default App;
```

Viestin merkkijonossa `\n` on rivinvaihto, joten jokainen tieto näytetään omalla rivillään. Ehtolauseke `lomaketiedot.ehdot ? "Hyväksytty" : "Ei hyväksytty"` muuttaa totuusarvon luettavaksi tekstiksi.

Lomake toimii nyt, mutta sen voi lähettää tyhjänä tai ilman käyttöehtojen hyväksymistä. Tämä korjataan seuraavassa vaiheessa.

### 6.6 Painikkeen aktivointi useEffect-hookilla

Painike halutaan käyttöön vasta, kun nimi ja sähköpostiosoite on annettu ja käyttöehdot on hyväksytty. MUI:n `Button`-komponentilla on `disabled`-propsi, joka poistaa painikkeen käytöstä, kun sen arvo on `true`. Tieto lomakkeen kelpoisuudesta tallennetaan `tiedotOk`-tilaan, ja sitä päivitetään `useEffect`-hookilla aina, kun lomakkeen tiedot muuttuvat.

```tsx
import { useEffect, useState } from 'react'; // muutettu
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

  const [tiedotOk, setTiedotOk] = useState<boolean>(false); // uusi

  // useEffect on mukana opetussyistä: sillä reagoidaan tilan muutokseen.
  // React kuitenkin suosittelee laskemaan tilasta johdetun arvon suoraan renderöinnissä
  // ilman erillistä tilaa ja efektiä: const tiedotOk = Boolean(lomaketiedot.nimi && ...);
  // https://react.dev/learn/you-might-not-need-an-effect
  useEffect((): void => { // uusi
    // oxlint-disable-next-line react/set-state-in-effect
    setTiedotOk(Boolean(lomaketiedot.nimi && lomaketiedot.email && lomaketiedot.ehdot)); // uusi
  }, [lomaketiedot]); // uusi

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
        disabled={!tiedotOk} // uusi
        onClick={tilaaUutiskirje}
      >
        Tilaa uutiskirje
      </Button>

    </Container>
  );
};

export default App;
```

`tiedotOk` alustetaan arvoon `false`, koska lomake on käynnistyessä tyhjä. Painikkeen `disabled={!tiedotOk}` on tosi silloin, kun `tiedotOk` on epätosi, joten painike on aluksi pois käytöstä.

**Efekti** (effect) on `useEffect`-hookille annettu funktio, jonka React suorittaa komponentin renderöinnin jälkeen. Toinen argumentti on **riippuvuustaulukko** (dependency array), joka rajaa suorituskerrat. Efekti suoritetaan ensimmäisen renderöinnin jälkeen ja sen jälkeen aina, kun jokin taulukon arvoista on muuttunut. Tässä riippuvuutena on `lomaketiedot`, joten jokainen kenttään kirjoitettu merkki ja valintaruudun muutos käynnistää tarkistuksen. Ehto `lomaketiedot.nimi && lomaketiedot.email && lomaketiedot.ehdot` on tosi vain, kun molemmat merkkijonot ovat ei-tyhjiä ja `ehdot` on `true`. `Boolean`-funktio muuntaa tuloksen totuusarvoksi, kuten demossa 1.

Aiheesta lisää: [Reactin `useEffect`-dokumentaatio](https://react.dev/reference/react/useEffect).

Koodissa oleva kommentti kertoo, että tämä ratkaisu on mukana opetussyistä. React suosittelee, että arvo, joka voidaan laskea suoraan tilasta, lasketaan komponentin rungossa renderöinnin aikana eikä tallenneta erilliseen tilaan efektin avulla. Efektin sisällä kutsuttu `setTiedotOk` aiheuttaa ylimääräisen renderöinnin, koska React piirtää komponentin ensin vanhalla `tiedotOk`-arvolla ja vasta sitten uudella. Suositeltu ratkaisu korvaisi `tiedotOk`-tilan ja koko efektin yhdellä rivillä `const tiedotOk: boolean = Boolean(lomaketiedot.nimi && lomaketiedot.email && lomaketiedot.ehdot);`. Efektit on tarkoitettu ensisijaisesti synkronointiin Reactin ulkopuolisten järjestelmien, kuten verkkopyyntöjen tai selaimen rajapintojen, kanssa.

Aiheesta lisää: [Reactin dokumentaatio: You Might Not Need an Effect](https://react.dev/learn/you-might-not-need-an-effect).

> [!NOTE]
> Projektin linter oxlint (`npm run lint`) varoittaa samasta asiasta säännöllä `react/set-state-in-effect`. Varoitus on poistettu käytöstä tältä yhdeltä riviltä kommentilla `// oxlint-disable-next-line react/set-state-in-effect`, koska efekti on koodissa tarkoituksella.

## 7. Projektin rakenne lopussa

```text
demo-04/
├── src/
│   ├── App.tsx
│   ├── index.css
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

## 8. Yhteenveto

Tässä demossa käytiin läpi:

- MUI-komponenttikirjaston ja Roboto-fontin asentaminen ja käyttöönotto
- Käyttöliittymän rakentaminen MUI:n valmiista komponenteista
- Komponenttien muokkaaminen propseilla ja `sx`-propsilla
- Lomakkeen tietojen kerääminen yhteen olion muotoiseen tilaan
- Painikkeen poistaminen käytöstä `disabled`-propsilla, ja
- Tilan muutokseen reagoiminen `useEffect`-hookilla sekä Reactin suosittelema vaihtoehto sille.

---

## 10. Jatka harjoittelua

- Korvaa `tiedotOk`-tila ja `useEffect` Reactin suosittelemalla tavalla. Laske `tiedotOk` suoraan komponentin rungossa `const`-muuttujaan ja poista tarpeettomat tuonnit. Painikkeen pitää toimia täsmälleen kuten ennenkin.
- Tyhjennä lomake onnistuneen tilauksen jälkeen. Palauta `tilaaUutiskirje`-funktiossa tila alkuarvoihinsa. Jotta kentät tyhjenevät myös näkyvistä, anna jokaiselle `TextField`-komponentille `value`-propsi tilasta (`value={lomaketiedot.nimi}`) ja `Checkbox`-komponentille `checked`-propsi.
- Näytä sähköpostikentässä virhe, jos osoitteesta puuttuu `@`-merkki. `TextField`-komponentin `error`-propsi muuttaa kentän punaiseksi, ja `helperText`-propsiin voi vaihtaa virheilmoituksen samalla ehdolla.
