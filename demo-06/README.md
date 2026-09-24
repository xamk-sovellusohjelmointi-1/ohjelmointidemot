# Demo 6: Reititysparametrit - Tehtävälista v2

## Sisällysluettelo

- [1. Oppimistavoitteet](#1-oppimistavoitteet)
- [2. Kloonaus ja käynnistys](#2-kloonaus-ja-käynnistys)
- [3. Projektin rakenne alussa](#3-projektin-rakenne-alussa)
- [4. Tutoriaali](#4-tutoriaali)
  - [4.1 Kirjastojen asentaminen](#41-kirjastojen-asentaminen)
  - [4.2 Käynnistystiedosto ja perustyylit](#42-käynnistystiedosto-ja-perustyylit)
  - [4.3 Jaettu Tehtava-tyyppi](#43-jaettu-tehtava-tyyppi)
  - [4.4 Otsikko-komponentti](#44-otsikko-komponentti)
  - [4.5 Tehtävälistanäkymä](#45-tehtävälistanäkymä)
  - [4.6 Lisäysnäkymä](#46-lisäysnäkymä)
  - [4.7 Tila ja reitit App-komponentissa](#47-tila-ja-reitit-app-komponentissa)
  - [4.8 Poistonäkymä ja useParams-hook](#48-poistonäkymä-ja-useparams-hook)
  - [4.9 Dynaaminen reitti ja poistolinkki](#49-dynaaminen-reitti-ja-poistolinkki)
- [5. Projektin rakenne lopussa](#5-projektin-rakenne-lopussa)
- [6. Yhteenveto](#6-yhteenveto)
- [7. Jatka harjoittelua](#7-jatka-harjoittelua)

## 1. Oppimistavoitteet

Tässä demossa rakennetaan tehtävälistasovellus, jossa on kolme näkymää. Tehtäviä voi merkitä tehdyiksi, lisätä ja poistaa. Poistonäkymän osoitteessa on poistettavan tehtävän tunniste, ja näkymä lukee sen osoitteesta React Routerin avulla. Demo kattaa seuraavat tekniikat:

- Yhteisen tietotyypin sijoittaminen omaan tiedostoonsa ja sen tuominen `import type` -lauseella
- Tilan sijoittaminen `App`-komponenttiin ja sen jakaminen näkymille propseina
- Tilaa muuttavien funktioiden välittäminen näkymille `on`-alkuisina propseina
- Reititysparametrin määrittely reitin polkuun kaksoispisteellä (`/poista/:id`)
- Reititysparametrin lukeminen `useParams`-hookilla
- Parametrin mukaisen tehtävän hakeminen `find`-metodilla ja poistaminen `filter`-metodilla
- Syötekentän arvon lukeminen `useRef`-hookilla MUI:n `TextField`-komponentista
- Listarivin toimintopainikkeet MUI:n `ListItem`-, `ListItemIcon`- ja `IconButton`-komponenteilla

## 2. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-06
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3006`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19, TypeScriptillä 6.x, MUI:n versiolla 9 ja React Routerin versiolla 8. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 3. Projektin rakenne alussa

Demo aloitetaan uudesta, siivotusta Vite + React + TypeScript -projektipohjasta, jonka portiksi on asetettu `3006`. Projektin luominen ja ylimääräisten tiedostojen siivoaminen on kuvattu [demo 1:n README-tiedostossa](../demo-01/README.md#41-projektin-luominen).

```text
demo-06/
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
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @fontsource/roboto
npm install react-router
```

Paketit ovat samat kuin demossa 5. MUI tuo käyttöliittymäkomponentit, `@mui/icons-material` ikonit, `@fontsource/roboto` MUI:n käyttämän Roboto-fontin ja `react-router` reitityksen.

Tiedosto `src/App.css` poistetaan, koska tässäkin demossa komponenttien ulkoasu määritellään MUI:n omilla keinoilla.

### 4.2 Käynnistystiedosto ja perustyylit

Reititys ja Roboto-fontti otetaan käyttöön tiedostossa `src/main.tsx` samalla tavalla kuin demossa 5.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router' // uusi
import '@fontsource/roboto/300.css' // uusi
import '@fontsource/roboto/400.css' // uusi
import '@fontsource/roboto/500.css' // uusi
import '@fontsource/roboto/700.css' // uusi
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* uusi */}
      <App />
    </BrowserRouter> {/* uusi */}
  </StrictMode>,
)
```

Tiedostosta poistetaan rivi `import './index.css'`, ja samalla poistetaan tiedosto `src/index.css`. Sovellukseen lisätään vaiheessa 4.7 MUI:n `CssBaseline`-komponentti, joka asettaa `body`-elementin reunukseksi nollan ja fontiksi Roboton. Demossa 5 nähtiin, että nämä tyylit korvaavat `index.css`-tiedoston `margin: 50px`-reunuksen ja Arial-fontin. Kun tiedoston jokainen tyyli korvautuu, tiedostolla ei ole enää vaikutusta, joten se poistetaan kokonaan.

### 4.3 Jaettu Tehtava-tyyppi

Sovelluksen tieto on tehtävien taulukko. Tehtävän muoto määritellään ensimmäisenä, koska kaikki myöhemmät vaiheet käyttävät sitä. Demossa 2 `Tehtava`-rajapinta määriteltiin `App.tsx`-tiedostossa, koska sitä käytti vain yksi komponentti. Tässä demossa samaa tyyppiä käyttävät `App`, `Tehtavalista` ja `PoistaTehtava`. Jos rajapinta kopioitaisiin jokaiseen tiedostoon, jokainen kopio pitäisi muistaa päivittää, kun tehtävään lisätään uusi kenttä. Tästä syystä tyyppi kirjoitetaan yhteen paikkaan, josta kaikki tiedostot tuovat sen.

Luodaan tiedosto `src/types.ts`:

```ts
export interface Tehtava {
  id: string;
  nimi: string;
  tehty: boolean;
}
```

Tiedoston pääte on `.ts` eikä `.tsx`, koska tiedostossa ei ole JSX:ää. `export` rajapinnan edessä on **nimetty vienti** (named export). Komponenttitiedostojen `export default` vie tiedostosta yhden oletusarvon, mutta nimettyjä vientejä voi olla samassa tiedostossa useita, ja ne tuodaan toiseen tiedostoon nimellä aaltosulkeiden sisällä.

Tyyppi tuodaan komponenttiin näin:

```tsx
import type { Tehtava } from './types';
```

Tuontilauseen `type`-sana tekee siitä **tyyppituonnin** (type-only import). TypeScript-tyypit ovat olemassa vain kehityksen aikana, ja ne poistetaan, kun koodi käännetään selaimessa ajettavaksi JavaScriptiksi. Tyyppituonti ilmaisee, että rivin voi poistaa kokonaan käännöksen yhteydessä. Projektin `tsconfig.app.json`-tiedostossa on asetus `"verbatimModuleSyntax": true`, jonka vuoksi pelkän tyypin tuonti ilman `type`-sanaa aiheuttaa käännösvirheen. Polku kirjoitetaan ilman tiedostopäätettä samoin kuin komponenttien tuonneissa.

Aiheesta lisää: [TypeScriptin dokumentaatio moduuleista](https://www.typescriptlang.org/docs/handbook/2/modules.html).

### 4.4 Otsikko-komponentti

Kaikissa näkymissä on otsikko, joten sen ulkoasu kootaan yhteen komponenttiin ennen näkymiä. Luodaan tiedosto `src/components/Otsikko.tsx`:

```tsx
import { Typography } from '@mui/material';

interface Props {
  children: string;
  tyyli?: "iso" | "pieni";
}

const Otsikko = ({ children, tyyli = "iso" }: Props) => {
  return (
    <Typography
      sx={{
        fontSize: tyyli === "pieni" ? "18px" : "22px",
        marginTop: "10px",
        marginBottom: "10px"
      }}
    >
      {children}
    </Typography>
  );
};

export default Otsikko;
```

Komponentti on rakenteeltaan sama kuin demon 3 `Otsikko`. Otsikon teksti annetaan `children`-propsina, ja valinnainen `tyyli`-propsi saa oletusarvon `"iso"`. Demon 3 versio valitsi `switch`-rakenteella HTML-otsikkoelementin, mutta tämä versio vaihtaa MUI:n `Typography`-komponentin fonttikokoa ehdollisella lausekkeella. Sovelluksen pääotsikko käyttää oletuskokoa, ja näkymien otsikot saavat propsin `tyyli="pieni"`.

### 4.5 Tehtävälistanäkymä

Sovelluksessa on kolme näkymää, ja jokainen niistä on oma komponenttinsa `src/components`-kansiossa kuten demossa 5. Näkymät tehdään ennen reittejä, koska reitin määrittelyssä kerrotaan, mikä komponentti kyseisessä osoitteessa näytetään. Ensimmäisenä tehdään aloitusnäkymä, joka listaa tehtävät.

Luodaan tiedosto `src/components/Tehtavalista.tsx`:

```tsx
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
      <Otsikko tyyli="pieni">Tehtävälista</Otsikko>

      <Button variant="contained" fullWidth component={Link} to="/uusi">
        Lisää uusi tehtävä
      </Button>

      <List>
        {tehtavat.map((tehtava: Tehtava) => (
          <ListItem key={tehtava.id}>

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
```

Komponentti tuo `Tehtava`-tyypin polusta `'../types'`, koska `types.ts` on `src`-kansiossa yhden tason ylempänä kuin `components`-kansio.

Tehtävälista ei ole tämän komponentin tilassa. Komponentti saa tehtävät `tehtavat`-propsina ja näyttää ne. Tehtävän merkitseminen tehdyksi muuttaa listaa, joten sekään ei tapahdu tässä komponentissa. Näkymä kutsuu propsina saamaansa `onMerkinta`-funktiota ja antaa sille painetun tehtävän `id`-arvon. Propsin tyyppi `(id: string) => void` tarkoittaa funktiota, joka ottaa yhden merkkijonoparametrin eikä palauta mitään. Demon 3 `onPainallus`-propsi oli samanlainen, mutta ilman parametria.

Tehtävät näytetään `map`-metodilla ja `key={tehtava.id}`-avaimella samoin kuin demossa 2. Rivi rakennetaan demosta 5 tutuilla MUI:n listakomponenteilla. Tässä demossa rivi on `ListItem`, koska koko rivi ei ole yksi painike. Rivin painettava osa on `IconButton`, jonka sisältö valitaan ehdollisesti tehtävän `tehty`-kentän mukaan. Tehdyn tehtävän kohdalla näytetään rastitettu `CheckBoxIcon` MUI:n toissijaisella teemavärillä (`color="secondary"`), ja muiden kohdalla tyhjä `CheckBoxOutlineBlankIcon`.

Lisäyspainike on linkki polkuun `/uusi`, ja se tehdään `component={Link}`-propsilla kuten demossa 5.

Aiheesta lisää: [Reactin dokumentaatio tapahtumien käsittelystä](https://react.dev/learn/responding-to-events#passing-event-handlers-as-props).

### 4.6 Lisäysnäkymä

Luodaan tiedosto `src/components/UusiTehtava.tsx`:

```tsx
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
```

Tekstikentän arvo luetaan `useRef`-hookilla samalla tavalla kuin demossa 2. MUI:n `TextField` on useammasta elementistä koottu komponentti, joten viite annetaan sille `inputRef`-propsina eikä `ref`-propsina. Näin viite osoittaa kentän sisällä olevaan `<input>`-elementtiin.

`tallenna`-funktio antaa tehtävän nimen `onLisays`-propsille ja siirtyy sen jälkeen `navigate("/")`-kutsulla takaisin listaan. Ohjelmallinen siirtyminen tehdään demosta 5 tutulla `useNavigate`-hookilla. `Link` ei sovi tähän, koska tehtävä pitää lisätä ennen siirtymistä.

Lausekkeessa `uusiTehtavaRef.current?.value` on **valinnainen ketjutus** (optional chaining). Viitteen `current` on `null`, kunnes elementti on liitetty siihen, ja `?.` palauttaa `undefined` eikä kaada ohjelmaa, jos `current` on `null`. Operaattori `||` toimii kuten Pythonin `or`, joten tyhjän kentän tai puuttuvan arvon tilalle tulee nimi `"Nimetön tehtävä"`.

Aiheesta lisää: [MUI:n TextField-dokumentaatio](https://mui.com/material-ui/react-text-field/).

### 4.7 Tila ja reitit App-komponentissa

Kumpikin näkymä tarvitsee samaa tehtävälistaa. `Tehtavalista` näyttää sen, ja `UusiTehtava` lisää siihen. Jos kummallakin näkymällä olisi oma `useState`-tilansa, lisätty tehtävä ei näkyisi listassa. Siksi tila sijoitetaan lähimpään yhteiseen yläkomponenttiin, joka tässä on `App`. Tätä kutsutaan **tilan nostamiseksi** (lifting state up). `App` antaa listan näkymille propseina, ja näkymät muuttavat sitä vain `App`-komponentin funktioiden kautta.

`src/App.tsx`-tiedoston sisältö korvataan seuraavalla:

```tsx
import { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import Otsikko from './components/Otsikko';
import Tehtavalista from './components/Tehtavalista';
import UusiTehtava from './components/UusiTehtava';
import type { Tehtava } from './types';

const App = () => {

  const [tehtavat, setTehtavat] = useState<Tehtava[]>([
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false },
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true },
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false }
  ]);

  const lisaaTehtava = (nimi: string): void => {
    const uusi: Tehtava = { id: crypto.randomUUID(), nimi, tehty: false };
    setTehtavat((edelliset: Tehtava[]) => [...edelliset, uusi]);
  };

  const merkitseTehdyksi = (id: string): void => {
    setTehtavat((edelliset: Tehtava[]) =>
      edelliset.map((tehtava: Tehtava): Tehtava =>
        tehtava.id === id ? { ...tehtava, tehty: !tehtava.tehty } : tehtava
      )
    );
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">

        <Otsikko>Demo 6: Reititysparametrit</Otsikko>

        <Routes>
          <Route
            path="/"
            element={<Tehtavalista tehtavat={tehtavat} onMerkinta={merkitseTehdyksi} />}
          />
          <Route
            path="/uusi"
            element={<UusiTehtava onLisays={lisaaTehtava} />}
          />
        </Routes>

      </Container>
    </>
  );
};

export default App;
```

Tila, alkuarvot ja `crypto.randomUUID()`-tunnisteet ovat samat kuin demossa 2. Myös `lisaaTehtava` ja `merkitseTehdyksi` toimivat kuten demossa 2, koska ne päivittävät tilaa funktiomuotoisesti ja muodostavat uuden taulukon levitysoperaattorilla ja `map`-metodilla. Funktiot annetaan näkymille propseina `onLisays` ja `onMerkinta`. Propsin nimi kertoo, mihin tapahtumaan se liittyy, ja funktion nimi kertoo, mitä se tekee.

Otsikko ja `Container` ovat `Routes`-komponentin ulkopuolella, joten ne näkyvät kaikissa näkymissä. `Routes` vaihtaa niiden alla olevan sisällön osoitteen mukaan. `CssBaseline` lisätään sovelluksen juureen kuten demossa 5.

Näkymien välillä siirtyminen ei tyhjennä listaa, koska `App` pysyy näytöllä koko ajan ja vain `Routes`-komponentin sisältö vaihtuu. Lisätty tehtävä näkyy siksi listassa, kun lisäysnäkymästä palataan aloitusnäkymään.

> [!NOTE]
> Tila on olemassa vain selaimen muistissa. Sivun päivittäminen käynnistää sovelluksen alusta, jolloin lista palaa kolmeen alkuperäiseen tehtävään ja tehtävät saavat uudet `id`-arvot.

Aiheesta lisää: [Reactin dokumentaatio tilan jakamisesta komponenttien välillä](https://react.dev/learn/sharing-state-between-components).

### 4.8 Poistonäkymä ja useParams-hook

Sovellukseen lisätään poistonäkymä, joka kysyy vahvistuksen ennen tehtävän poistamista. Näkymän täytyy tietää, mikä tehtävä poistetaan. Tieto kulkee näkymään selaimen osoitteessa, esimerkiksi `/poista/3f2a...`, jossa osoitteen loppuosa on tehtävän `id`. Osoitteen muuttuvaa osaa kutsutaan **reititysparametriksi** (route parameter). React Routerin dokumentaatiossa sitä kutsutaan myös dynaamiseksi segmentiksi.

Reititysparametrin ansiosta yksi reitti ja yksi komponentti riittävät kaikille tehtäville. Komponentti lukee parametrin arvon osoitteesta ja näyttää sen perusteella oikean tehtävän.

Luodaan tiedosto `src/components/PoistaTehtava.tsx`:

```tsx
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
```

`useParams`-hook palauttaa olion, jossa on nykyisen reitin kaikki parametrit. Olion kentän nimi on sama kuin reitin polkuun kirjoitettu parametrin nimi. Kun reitti määritellään seuraavassa vaiheessa muodossa `/poista/:id`, parametri löytyy kentästä `id`, ja se puretaan muuttujaksi aaltosulkeilla samoin kuin propsit.

Parametrin arvo on aina merkkijono, koska se luetaan osoitteesta. Tehtävien `id`-arvot ovat myös merkkijonoja, joten niitä voi verrata parametriin suoraan. TypeScript tyypittää parametrin muotoon `string | undefined`, koska samaa hookia voi kutsua myös komponentissa, jonka reitillä parametria ei ole. `onPoisto` hyväksyy vain merkkijonon, ja siksi `vahvistaPoisto` tarkistaa ensin, että `id` ei ole `undefined`.

Taulukon `find`-metodi palauttaa ensimmäisen alkion, jolle annettu funktio palauttaa `true`. Jos yksikään alkio ei täsmää, se palauttaa `undefined`. Tästä syystä vahvistusteksti käyttää valinnaista ketjutusta `poistettava?.nimi`, joka näyttää tyhjän nimen, jos osoitteen `id` ei vastaa yhtäkään tehtävää.

Poistonäkymä noudattaa samaa mallia kuin lisäysnäkymä. Tieto annetaan `App`-komponentille `onPoisto`-propsin kautta, ja sen jälkeen `navigate("/")` palauttaa käyttäjän listaan. "Peruuta"-painike on tavallinen linkki, joka palaa listaan poistamatta mitään.

Aiheesta lisää: [React Routerin `useParams`-dokumentaatio](https://reactrouter.com/api/hooks/useParams).

### 4.9 Dynaaminen reitti ja poistolinkki

Poistonäkymä tarvitsee vielä reitin, tehtävän poistavan funktion ja linkin, joka vie näkymään oikealla `id`-arvolla. Ensin `App`-komponenttiin lisätään `poistaTehtava`-funktio ja poistonäkymän reitti.

```tsx
import { useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import Otsikko from './components/Otsikko';
import PoistaTehtava from './components/PoistaTehtava'; // uusi
import Tehtavalista from './components/Tehtavalista';
import UusiTehtava from './components/UusiTehtava';
import type { Tehtava } from './types';

const App = () => {

  const [tehtavat, setTehtavat] = useState<Tehtava[]>([
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false },
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true },
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false }
  ]);

  const lisaaTehtava = (nimi: string): void => {
    const uusi: Tehtava = { id: crypto.randomUUID(), nimi, tehty: false };
    setTehtavat((edelliset: Tehtava[]) => [...edelliset, uusi]);
  };

  const merkitseTehdyksi = (id: string): void => {
    setTehtavat((edelliset: Tehtava[]) =>
      edelliset.map((tehtava: Tehtava): Tehtava =>
        tehtava.id === id ? { ...tehtava, tehty: !tehtava.tehty } : tehtava
      )
    );
  };

  const poistaTehtava = (id: string): void => { // uusi
    setTehtavat((edelliset: Tehtava[]) => // uusi
      edelliset.filter((tehtava: Tehtava) => tehtava.id !== id) // uusi
    ); // uusi
  }; // uusi

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">

        <Otsikko>Demo 6: Reititysparametrit</Otsikko>

        <Routes>
          <Route
            path="/"
            element={<Tehtavalista tehtavat={tehtavat} onMerkinta={merkitseTehdyksi} />}
          />
          <Route
            path="/uusi"
            element={<UusiTehtava onLisays={lisaaTehtava} />}
          />
          {/* uusi */}
          <Route
            path="/poista/:id"
            element={<PoistaTehtava tehtavat={tehtavat} onPoisto={poistaTehtava} />}
          />
        </Routes>

      </Container>
    </>
  );
};

export default App;
```

Polussa `/poista/:id` kaksoispisteellä alkava osa on reititysparametri. Reitti vastaa kaikkia osoitteita, joissa `/poista/`-osan jälkeen on jokin arvo, ja arvo on luettavissa `useParams`-hookilla nimellä `id`. Kiinteät polut `/` ja `/uusi` toimivat kuten demossa 5.

`poistaTehtava` muodostaa uuden taulukon `filter`-metodilla. `filter` palauttaa uuden taulukon, jossa ovat vain ne alkiot, joille annettu funktio palauttaa `true`. Ehto `tehtava.id !== id` säilyttää kaikki muut tehtävät paitsi poistettavan. Alkuperäistä taulukkoa ei muuteta, joten päivitys noudattaa samaa periaatetta kuin `map`-metodilla tehty merkintä.

Lopuksi `Tehtavalista`-näkymän jokaiselle riville lisätään poistopainike, joka vie poistonäkymään.

```tsx
const Tehtavalista = ({ tehtavat, onMerkinta }: Props) => {
  return (
    <>
      <Otsikko tyyli="pieni">Tehtävälista</Otsikko>

      <Button variant="contained" fullWidth component={Link} to="/uusi">
        Lisää uusi tehtävä
      </Button>

      <List>
        {tehtavat.map((tehtava: Tehtava) => (
          <ListItem
            key={tehtava.id}
            secondaryAction={ // uusi
              <IconButton // uusi
                component={Link} // uusi
                to={`/poista/${tehtava.id}`} // uusi
                edge="end" // uusi
                aria-label="Poista tehtävä" // uusi
              > {/* uusi */}
                <DeleteIcon /> {/* uusi */}
              </IconButton> // uusi
            } // uusi
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

// ... muu tiedosto ennallaan
```

Tiedoston alkuun lisätään myös ikonin tuonti `import DeleteIcon from '@mui/icons-material/Delete';` muiden ikonien tuontien viereen.

Poistopainikkeen kohdepolku muodostetaan demosta 1 tutulla template literalilla, joka upottaa tehtävän `id`-arvon osoitteeseen. Esimerkiksi tehtävä, jonka `id` on `"3f2a..."`, saa linkin `/poista/3f2a...`. Painettaessa React Router vertaa osoitetta reitteihin, näyttää `PoistaTehtava`-näkymän ja antaa `useParams`-hookille arvon `"3f2a..."`.

`ListItem`-komponentin `secondaryAction`-propsi sijoittaa annetun elementin rivin oikeaan reunaan. `IconButton` toimii linkkinä `component={Link}`-propsilla samalla tavalla kuin `Button` ja `ListItemButton` demossa 5, ja `edge="end"` tasaa ikonin rivin reunaan. `aria-label` antaa pelkän ikonin sisältävälle painikkeelle nimen ruudunlukuohjelmia varten.

Sovelluksen kaikki kolme näkymää toimivat nyt. Tehtäviä voi merkitä tehdyiksi, lisätä ja poistaa.

Aiheesta lisää: [React Routerin dokumentaatio dynaamisista segmenteistä](https://reactrouter.com/start/declarative/routing#dynamic-segments) ja [MUI:n List-dokumentaatio](https://mui.com/material-ui/react-list/).

## 5. Projektin rakenne lopussa

```text
demo-06/
├── src/
│   ├── components/
│   │   ├── Otsikko.tsx
│   │   ├── PoistaTehtava.tsx
│   │   ├── Tehtavalista.tsx
│   │   └── UusiTehtava.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── types.ts
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

- Yhteisen tietotyypin sijoittaminen omaan `types.ts`-tiedostoonsa ja sen tuominen tyyppituonnilla
- Tilan nostaminen `App`-komponenttiin ja tilaa muuttavien funktioiden välittäminen näkymille propseina
- Reititysparametrin määrittely reitin polkuun ja sen lukeminen `useParams`-hookilla
- Tehtävän hakeminen `find`-metodilla ja poistaminen `filter`-metodilla, ja
- Linkin kohdepolun muodostaminen template literalilla listan jokaiselle riville.

---

## 7. Jatka harjoittelua

- Näytä poistonäkymässä ilmoitus "Tehtävää ei löytynyt", jos osoitteen `id` ei vastaa yhtäkään tehtävää. Muuttuja `poistettava` on silloin `undefined`, joten ehdollisella renderöinnillä voi näyttää ilmoituksen ja paluulinkin poistopainikkeen sijaan.
- Tee muokkausnäkymä reitille `/muokkaa/:id`, jossa tehtävän nimeä voi muuttaa. Näkymä voi lukea parametrin samalla tavalla kuin `PoistaTehtava`, ja `App`-komponentin uusi funktio voi päivittää nimen `map`-metodilla samaan tapaan kuin `merkitseTehdyksi`.
- Lisää `Tehtava`-tyyppiin uusi kenttä, esimerkiksi `lisatty: Date`. Kun kenttä lisätään `types.ts`-tiedostoon, TypeScript näyttää virheen jokaisessa kohdassa, jossa tehtävä luodaan ilman uutta kenttää.
