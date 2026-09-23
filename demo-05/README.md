# Demo 5: Reititys (React Router)

## 2. Sisällysluettelo

- [3. Oppimistavoitteet](#3-oppimistavoitteet)
- [4. Kloonaus ja käynnistys](#4-kloonaus-ja-käynnistys)
- [5. Projektin rakenne alussa](#5-projektin-rakenne-alussa)
- [6. Tutoriaali](#6-tutoriaali)
  - [6.1 Kirjastojen asentaminen](#61-kirjastojen-asentaminen)
  - [6.2 Reitityksen käyttöönotto BrowserRouterilla](#62-reitityksen-käyttöönotto-browserrouterilla)
  - [6.3 Näkymäkomponentit](#63-näkymäkomponentit)
  - [6.4 Reittien määrittely](#64-reittien-määrittely)
  - [6.5 Navigointi Link-komponentilla](#65-navigointi-link-komponentilla)
  - [6.6 Ohjelmallinen navigointi useNavigate-hookilla](#66-ohjelmallinen-navigointi-usenavigate-hookilla)
  - [6.7 Yläpalkki ja CssBaseline](#67-yläpalkki-ja-cssbaseline)
  - [6.8 Sivuvalikko Drawer-komponentilla](#68-sivuvalikko-drawer-komponentilla)
- [7. Projektin rakenne lopussa](#7-projektin-rakenne-lopussa)
- [8. Yhteenveto](#8-yhteenveto)
- [10. Jatka harjoittelua](#10-jatka-harjoittelua)

## 3. Oppimistavoitteet

Tässä demossa rakennetaan kahden näkymän sovellus, jossa näkymästä toiseen siirrytään React Router -kirjaston avulla ilman sivun uudelleenlatausta. Näkymien välillä liikutaan painikkeilla ja MUI:n komponenteista rakennetulla sivuvalikolla. Demo kattaa seuraavat tekniikat:

- React Router -kirjaston asentaminen ja käyttöönotto `BrowserRouter`-komponentilla
- Reittien määrittely `Routes`- ja `Route`-komponenteilla
- Näkymien jakaminen omiksi komponenteikseen `src/components`-kansioon
- Navigointi `Link`-komponentilla ja MUI:n `component`-propsilla
- Ohjelmallinen navigointi `useNavigate`-hookilla ja `window.confirm`-vahvistuksella
- Yläpalkin rakentaminen MUI:n `AppBar`-, `Toolbar`- ja `IconButton`-komponenteilla sekä MUI-ikoneilla
- Sivuvalikon avaaminen ja sulkeminen `Drawer`-komponentilla ja totuusarvotilalla
- Selaimen oletustyylien yhtenäistäminen `CssBaseline`-komponentilla

## 4. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-05
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3005`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19, TypeScriptillä 6.x, MUI:n versiolla 9 ja React Routerin versiolla 8. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 5. Projektin rakenne alussa

Demo aloitetaan uudesta, siivotusta Vite + React + TypeScript -projektipohjasta, jonka portiksi on asetettu `3005`. Projektin luominen ja ylimääräisten tiedostojen siivoaminen on kuvattu [demo 1:n README-tiedostossa](../demo-01/README.md#61-projektin-luominen).

```text
demo-05/
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

### 6.1 Kirjastojen asentaminen

Kaikki kirjastot asennetaan ensin, koska jokainen myöhempi vaihe käyttää niitä.

```bash
npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
npm install @fontsource/roboto
npm install react-router
```

MUI, Emotion ja Roboto-fontti asennetaan samalla tavalla kuin demossa 4. Uusi paketti `@mui/icons-material` sisältää Material Design -ikonit valmiina React-komponentteina, ja se toimii `@mui/material`-paketin rinnalla.

**Reititys** (routing) tarkoittaa, että sovellus näyttää eri **näkymän** (view) selaimen osoitteen perusteella. React-sovellus on **yksisivuinen sovellus** (single-page application, SPA), jossa selain lataa vain yhden HTML-sivun, `index.html`-tiedoston. Kaikki näkymät ovat React-komponentteja saman sivun sisällä. React Router on kirjasto, joka vaihtaa näytettävän komponentin, kun selaimen osoite muuttuu, eikä selain lataa sivua uudelleen palvelimelta.

Tiedosto `src/App.css` poistetaan, koska tässäkin demossa komponenttien ulkoasu määritellään MUI:n omilla keinoilla.

Aiheesta lisää: [React Routerin asennusohje](https://reactrouter.com/start/declarative/installation).

> [!NOTE]
> Monissa verkosta löytyvissä ohjeissa React Router tuodaan paketista `react-router-dom`. Versiosta 8 alkaen tätä pakettia ei enää käytetä, ja kaikki tämän demon tuonnit tehdään paketista `react-router`. Muutos on kuvattu [React Routerin päivitysohjeessa](https://reactrouter.com/upgrading/v7).

### 6.2 Reitityksen käyttöönotto BrowserRouterilla

Reititys otetaan käyttöön sovelluksen käynnistystiedostossa `src/main.tsx`. Samaan tiedostoon lisätään Roboto-fontin painot kuten demossa 4.

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router' // uusi
import '@fontsource/roboto/300.css' // uusi
import '@fontsource/roboto/400.css' // uusi
import '@fontsource/roboto/500.css' // uusi
import '@fontsource/roboto/700.css' // uusi
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter> {/* uusi */}
      <App />
    </BrowserRouter> {/* uusi */}
  </StrictMode>,
)
```

`BrowserRouter` lukee selaimen osoiterivin osoitteen ja päivittää sitä navigoinnin yhteydessä. Reitityksen komponentit ja hookit, kuten `Routes`, `Link` ja `useNavigate`, toimivat vain `BrowserRouter`-komponentin sisällä. Tästä syystä se sijoitetaan koko sovelluksen ympärille, jolloin mikä tahansa `App`-komponentin sisällä oleva komponentti voi käyttää reititystä.

Aiheesta lisää: [React Routerin dokumentaatio reitityksestä](https://reactrouter.com/start/declarative/routing).

### 6.3 Näkymäkomponentit

Sovelluksessa on kaksi näkymää, aloitusnäkymä ja infonäkymä. Näkymät tehdään ennen reittejä, koska reitin määrittelyssä kerrotaan, mikä komponentti kyseisessä osoitteessa näytetään. Kumpikin näkymä on oma komponenttinsa, ja ne sijoitetaan `src/components`-kansioon samalla tavalla kuin demon 3 komponentit.

Luodaan tiedosto `src/components/Aloitus.tsx`:

```tsx
import { Container, Typography } from '@mui/material';

const Aloitus = () => {
  return (
    <Container>

      <Typography variant="h6" sx={{ marginTop: "10px" }}>
        Aloitusnäkymä
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        Tämä on demo Reactin reitityksestä. Nyt olemme aloitusnäkymässä.
      </Typography>

    </Container>
  );
};

export default Aloitus;
```

Luodaan tiedosto `src/components/Info.tsx`:

```tsx
import { Container, Typography } from '@mui/material';

const Info = () => {
  return (
    <Container>

      <Typography variant="h6" sx={{ marginTop: "10px" }}>
        Infonäkymä
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        Nyt olemme infonäkymässä.
      </Typography>

    </Container>
  );
};

export default Info;
```

Molemmat komponentit käyttävät demosta 4 tuttuja `Container`- ja `Typography`-komponentteja. `variant="h6"` näyttää näkymän otsikon pienenä otsikkona, ja `variant="body1"` on MUI:n tavallisen leipätekstin tyyli. `Container` jätetään ilman `maxWidth`-propsia, jolloin se käyttää MUI:n oletusleveyttä.

Jokainen komponenttitiedosto päättyy oletusvientiin `export default`, jotta komponentti voidaan tuoda toiseen tiedostoon ilman aaltosulkeita.

### 6.4 Reittien määrittely

Kun näkymät ovat olemassa, `App.tsx`-tiedostossa määritellään, missä osoitteessa kukin näkymä näytetään. `App.tsx`-tiedoston sisältö korvataan seuraavalla:

```tsx
import { Route, Routes } from 'react-router'; // uusi
import Aloitus from './components/Aloitus'; // uusi
import Info from './components/Info'; // uusi

const App = () => {
  return (
    <Routes> {/* uusi */}
      <Route path="/" element={<Aloitus />} /> {/* uusi */}
      <Route path="/info" element={<Info />} /> {/* uusi */}
    </Routes> // uusi
  );
};

export default App;
```

**Reitti** (route) yhdistää osoitteen polun ja komponentin. `Route`-komponentin `path`-propsi on polku, ja `element`-propsi on JSX-elementti, joka näytetään, kun selaimen osoite vastaa polkua. `Routes`-komponentti ympäröi kaikki reitit ja näyttää niistä sen, jonka polku vastaa nykyistä osoitetta. Polku `/` on sovelluksen juuriosoite `http://localhost:3005/`, ja polku `/info` vastaa osoitetta `http://localhost:3005/info`.

`element`-propsille annetaan valmis elementti `<Aloitus />` eikä pelkkää komponentin nimeä `Aloitus`. Aaltosulkeet tarvitaan, koska propsin arvo on JSX-lauseke eikä merkkijono.

Reitit voi nyt kokeilla kirjoittamalla selaimen osoiteriville `http://localhost:3005/info`, jolloin näkyviin tulee infonäkymä.

> [!NOTE]
> Viten kehityspalvelin palauttaa `index.html`-tiedoston myös osoitteelle `/info`, vaikka projektissa ei ole sen nimistä tiedostoa. Tästä syystä infonäkymä avautuu myös silloin, kun osoite kirjoitetaan suoraan osoiteriville tai sivu päivitetään infonäkymässä.

### 6.5 Navigointi Link-komponentilla

Käyttäjä ei yleensä kirjoita osoitteita itse, joten näkymiin lisätään painikkeet toiseen näkymään siirtymistä varten. Tavallinen HTML-linkki `<a href="/info">` lataisi koko sivun uudelleen palvelimelta, jolloin React-sovellus käynnistyisi alusta ja sen tila katoaisi. React Routerin `Link`-komponentti tuottaa sivulle `<a>`-elementin, mutta sitä painettaessa React Router vaihtaa osoitteen ja näkymän ilman uudelleenlatausta. `Link`-komponentille kohdepolku annetaan `to`-propsina.

Painikkeet halutaan näyttää MUI:n `Button`-komponentteina. MUI:n komponenteilla on `component`-propsi, joka vaihtaa komponentin taustalla renderöitävän elementin. Kun `Button`-komponentille annetaan `component={Link}`, painike näyttää MUI:n painikkeelta mutta toimii React Routerin linkkinä. Samalle komponentille annettu `to`-propsi välitetään `Link`-komponentille.

`src/components/Aloitus.tsx`:

```tsx
import { Button, Container, Typography } from '@mui/material'; // muutettu
import { Link } from 'react-router'; // uusi

const Aloitus = () => {
  return (
    <Container>

      <Typography variant="h6" sx={{ marginTop: "10px" }}>
        Aloitusnäkymä
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        Tämä on demo Reactin reitityksestä. Nyt olemme aloitusnäkymässä.
      </Typography>

      {/* uusi */}
      <Button component={Link} to="/info">
        Siirry info-näkymään
      </Button>

    </Container>
  );
};

export default Aloitus;
```

`src/components/Info.tsx`:

```tsx
import { Button, Container, Typography } from '@mui/material'; // muutettu
import { Link } from 'react-router'; // uusi

const Info = () => {
  return (
    <Container>

      <Typography variant="h6" sx={{ marginTop: "10px" }}>
        Infonäkymä
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        Nyt olemme infonäkymässä.
      </Typography>

      {/* uusi */}
      <Button component={Link} to="/">
        Palaa aloitusnäkymään
      </Button>

    </Container>
  );
};

export default Info;
```

Koska `Link` tuottaa tavallisen `<a>`-elementin, selaimen omat linkkitoiminnot, kuten linkin avaaminen uuteen välilehteen hiiren oikealla painikkeella, toimivat myös näissä painikkeissa.

Aiheesta lisää: [React Routerin dokumentaatio navigoinnista](https://reactrouter.com/start/declarative/navigating) ja [MUI:n ohje reitityskirjastojen käytöstä](https://mui.com/material-ui/integrations/routing/).

### 6.6 Ohjelmallinen navigointi useNavigate-hookilla

Infonäkymään lisätään toinen paluupainike, joka kysyy ennen siirtymistä vahvistuksen käyttäjältä. `Link` siirtyy aina, kun sitä painetaan, joten tähän tarvitaan **ohjelmallista navigointia** (programmatic navigation), jossa siirtyminen tehdään koodista vasta ehdon täytyttyä.

```tsx
import { Button, Container, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router'; // muutettu

const Info = () => {

  const navigate = useNavigate(); // uusi

  const vahvistaPaluu = (): void => { // uusi
    if (window.confirm("Haluatko varmasti palata aloitukseen?")) { // uusi
      navigate("/"); // uusi
    } // uusi
  }; // uusi

  return (
    <Container>

      <Typography variant="h6" sx={{ marginTop: "10px" }}>
        Infonäkymä
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "10px" }}>
        Nyt olemme infonäkymässä.
      </Typography>

      <Button component={Link} to="/">
        Palaa aloitusnäkymään
      </Button>

      {/* uusi */}
      <Button onClick={vahvistaPaluu}>
        Palaa aloitusnäkymään (vahvistuksella)
      </Button>

    </Container>
  );
};

export default Info;
```

`useNavigate`-hook palauttaa funktion, joka tallennetaan `navigate`-muuttujaan. Funktiolle annetaan kohdepolku, ja kutsu vaihtaa näkymän samalla tavalla kuin `Link`-komponentin painaminen. Hookia kutsutaan komponentin rungossa ennen `return`-lausetta samoin kuin `useState`-hookia.

`window.confirm` avaa selaimen oman vahvistusikkunan, jossa on hyväksymis- ja peruutuspainike. Se palauttaa `true`, jos käyttäjä hyväksyy, ja `false`, jos käyttäjä peruuttaa. Näin `navigate("/")` suoritetaan vain vahvistuksen jälkeen. Vahvistusikkuna toimii samalla tavalla kuin demossa 4 käytetty `alert`-ikkuna, mutta siihen voi vastata.

React Router suosittelee tavalliseen navigointiin `Link`-komponenttia, koska se tuottaa oikean linkin selaimen linkkitoimintoineen. `useNavigate` on tarkoitettu tilanteisiin, joissa siirtyminen riippuu koodin suorituksesta, kuten tässä käyttäjän vastauksesta.

Aiheesta lisää: [React Routerin dokumentaatio navigoinnista](https://reactrouter.com/start/declarative/navigating) ja [MDN:n dokumentaatio `window.confirm`-metodista](https://developer.mozilla.org/en-US/docs/Web/API/Window/confirm).

### 6.7 Yläpalkki ja CssBaseline

Näkymien välillä voi nyt liikkua painikkeilla. Seuraavaksi sovellukseen tehdään yläpalkki, joka näkyy kaikissa näkymissä ja johon sivuvalikko lisätään seuraavassa vaiheessa. Yläpalkki tehdään omaksi `Valikko`-komponentikseen. Luodaan tiedosto `src/components/Valikko.tsx`:

```tsx
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Valikko = () => {
  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton
          color="inherit"
          edge="start"
          aria-label="Avaa valikko"
        >
          <MenuIcon />
        </IconButton>

        <Typography component="div" sx={{ fontSize: "16pt", flexGrow: 1 }}>
          Demo 5: Reititys (React Router)
        </Typography>

      </Toolbar>
    </AppBar>
  );
};

export default Valikko;
```

`AppBar` on sovelluksen yläpalkki, ja `Toolbar` asettelee sen sisällön vaakasuoraan riviin. `AppBar` on oletuksena kiinnitetty näkymän yläreunaan sisällön päälle, joten `position="static"` asettaa sen tavalliseksi osaksi sivun asettelua. Näin näkymien sisältö alkaa palkin alapuolelta.

MUI:n ikonit tuodaan kukin omasta tiedostostaan oletustuontina, kuten `MenuIcon` polusta `@mui/icons-material/Menu`. `IconButton` on painike, jonka sisältönä on ikoni. `color="inherit"` antaa ikonille yläpalkin tekstin värin, ja `edge="start"` siirtää painiketta vasemmalle niin, että ikoni asettuu linjaan palkin reunan kanssa. Pelkän ikonin sisältävässä painikkeessa ei ole luettavaa tekstiä, joten ruudunlukuohjelma lukee painikkeen nimen `aria-label`-attribuutista.

Ilman `variant`-propsia `Typography` käyttää `body1`-tyyliä ja tuottaa `<p>`-elementin. `component="div"` vaihtaa elementin `<div>`-elementiksi, koska yläpalkin otsikko ei ole tekstikappale. `flexGrow: 1` venyttää otsikon täyttämään palkin jäljelle jäävän tilan.

Aiheesta lisää: [MUI:n App Bar -dokumentaatio](https://mui.com/material-ui/react-app-bar/) ja [MUI:n ikonien hakutyökalu](https://mui.com/material-ui/material-icons/).

`Valikko` lisätään `App`-komponenttiin ennen reittejä, jolloin se näkyy näkymästä riippumatta. Samalla lisätään MUI:n `CssBaseline`-komponentti.

```tsx
import { CssBaseline } from '@mui/material'; // uusi
import { Route, Routes } from 'react-router';
import Aloitus from './components/Aloitus';
import Info from './components/Info';
import Valikko from './components/Valikko'; // uusi

const App = () => {
  return (
    <> {/* uusi */}
      <CssBaseline /> {/* uusi */}
      <Valikko /> {/* uusi */}
      <Routes>
        <Route path="/" element={<Aloitus />} />
        <Route path="/info" element={<Info />} />
      </Routes>
    </> // uusi
  );
};

export default App;
```

Komponentti palauttaa nyt useamman elementin, joten ne ympäröidään fragmentilla `<>...</>`.

`CssBaseline` ei näytä sivulla mitään. Se lisää sivulle MUI:n perustyylit, jotka yhtenäistävät selainten oletustyylit. Muun muassa `body`-elementin reunus poistetaan ja sen fontiksi asetetaan MUI:n leipätekstin fontti Roboto. Nämä tyylit korvaavat `src/index.css`-tiedostossa asetetun `margin: 50px`-reunuksen ja Arial-fontin, joten yläpalkki ulottuu selainikkunan reunasta reunaan.

Aiheesta lisää: [MUI:n CssBaseline-dokumentaatio](https://mui.com/material-ui/react-css-baseline/).

### 6.8 Sivuvalikko Drawer-komponentilla

Viimeisenä yläpalkin valikkopainikkeelle lisätään toiminto, joka avaa sivun vasemmasta reunasta liukuvan valikon. Valikko on joko auki tai kiinni, joten sen tila tallennetaan totuusarvona `valikkoAuki`-tilaan samalla tavalla kuin demon 4 `tiedotOk`-tila.

```tsx
import { useState } from 'react'; // uusi
import {
  AppBar,
  Drawer, // uusi
  IconButton,
  List, // uusi
  ListItemButton, // uusi
  ListItemIcon, // uusi
  ListItemText, // uusi
  Toolbar,
  Typography,
} from '@mui/material'; // muutettu
import HomeIcon from '@mui/icons-material/Home'; // uusi
import InfoIcon from '@mui/icons-material/Info'; // uusi
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router'; // uusi

const Valikko = () => {

  const [valikkoAuki, setValikkoAuki] = useState<boolean>(false); // uusi

  return (
    <AppBar position="static">
      <Toolbar>

        <IconButton
          color="inherit"
          edge="start"
          aria-label="Avaa valikko"
          onClick={() => setValikkoAuki(true)} // uusi
        >
          <MenuIcon />
        </IconButton>

        <Typography component="div" sx={{ fontSize: "16pt", flexGrow: 1 }}>
          Demo 5: Reititys (React Router)
        </Typography>

      </Toolbar>

      {/* uusi: Drawer-komponentti sisältöineen */}
      <Drawer open={valikkoAuki} onClose={() => setValikkoAuki(false)}>
        <List
          sx={{ width: "220px", marginTop: "50px" }}
          onClick={() => setValikkoAuki(false)}
        >

          <ListItemButton component={Link} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Aloitus" />
          </ListItemButton>

          <ListItemButton component={Link} to="/info">
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Info" />
          </ListItemButton>

        </List>
      </Drawer>
    </AppBar>
  );
};

export default Valikko;
```

`Drawer` on reunasta avautuva paneeli, jonka näkyvyyttä ohjataan `open`-propsilla. Kun `valikkoAuki` on `true`, valikko näytetään muun sivun päällä, ja muu sivu tummennetaan. `onClose`-propsin funktiota kutsutaan, kun käyttäjä painaa tummennettua aluetta valikon ulkopuolella tai näppäimistön Esc-näppäintä. Tässä funktio asettaa tilan takaisin arvoon `false`, jolloin valikko sulkeutuu. Valikkopainikkeen `onClick` puolestaan asettaa tilan arvoon `true`.

Valikon sisältö rakennetaan MUI:n listakomponenteista. `List` on lista, ja jokainen `ListItemButton` on sen painettava rivi. `ListItemIcon` sisältää rivin ikonin ja `ListItemText` rivin tekstin, joka annetaan `primary`-propsina. Valikon rivit ovat linkkejä samalla tavalla kuin näkymien painikkeet, koska myös `ListItemButton` saa `component={Link}`- ja `to`-propsit.

Valikko halutaan sulkea, kun jotain sen riviä painetaan. Tätä varten `onClick`-käsittelijä annetaan koko `List`-komponentille eikä jokaiselle riville erikseen. Rivin painallus välittyy DOM:ssa myös rivin ympäröiville elementeille, jolloin `List`-komponentin käsittelijä suoritetaan rivin linkin lisäksi. Tätä kutsutaan **tapahtuman kuplimiseksi** (event bubbling).

`Drawer` sijoitetaan `AppBar`-komponentin sisälle `Toolbar`-komponentin jälkeen, jotta koko valikon koodi on samassa komponentissa. Auki ollessaan valikko näytetään silti sivun päällä eikä yläpalkin sisällä.

Aiheesta lisää: [MUI:n Drawer-dokumentaatio](https://mui.com/material-ui/react-drawer/), [MUI:n List-dokumentaatio](https://mui.com/material-ui/react-list/) ja [MDN:n ohje tapahtuman kuplimisesta](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling).

## 7. Projektin rakenne lopussa

```text
demo-05/
├── src/
│   ├── components/
│   │   ├── Aloitus.tsx
│   │   ├── Info.tsx
│   │   └── Valikko.tsx
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

- React Routerin asentaminen ja käyttöönotto `BrowserRouter`-komponentilla
- Reittien määrittely `Routes`- ja `Route`-komponenteilla
- Navigointi `Link`-komponentilla sekä MUI:n painikkeiden liittäminen reititykseen `component`-propsilla
- Ohjelmallinen navigointi `useNavigate`-hookilla käyttäjän vahvistuksen jälkeen
- Yläpalkin ja sivuvalikon rakentaminen MUI:n `AppBar`- ja `Drawer`-komponenteilla, ja
- Selaimen oletustyylien yhtenäistäminen `CssBaseline`-komponentilla.

---

## 10. Jatka harjoittelua

- Lisää sovellukseen kolmas näkymä, esimerkiksi `Yhteystiedot`. Tee näkymälle oma komponentti `src/components`-kansioon, lisää sille `Route` `App.tsx`-tiedostoon ja lisää sivuvalikkoon uusi `ListItemButton` sopivalla ikonilla. Ikonin voi etsiä MUI:n ikonien hakutyökalusta.
- Tee sovellukseen näkymä, joka näytetään, jos osoite ei vastaa yhtäkään reittiä. Reitti, jonka polku on `path="*"`, näytetään silloin, kun mikään muu reitti ei vastaa osoitetta.
- Korosta sivuvalikossa nykyisen näkymän rivi. React Routerin `useLocation`-hook palauttaa olion, jonka `pathname`-kentässä on nykyinen polku, ja `ListItemButton`-komponentin `selected`-propsi korostaa rivin, kun sen arvo on `true`.
