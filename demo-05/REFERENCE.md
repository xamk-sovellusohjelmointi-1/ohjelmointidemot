# Demo 5 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Lisää MUI:n `CssBaseline`-perustyylit, näyttää `Valikko`-yläpalkin ja määrittelee reitit `/` ja `/info`. |
| `Valikko` | `src/components/Valikko.tsx` | – (ei propseja) | Yläpalkki (`AppBar`), jonka valikkopainike avaa sivuvalikon (`Drawer`). Sivuvalikon auki-tila on `valikkoAuki`-tilassa, ja sen rivit ovat linkkejä näkymiin. |
| `Aloitus` | `src/components/Aloitus.tsx` | – (ei propseja) | Aloitusnäkymä polussa `/`. Sisältää painikkeen infonäkymään. |
| `Info` | `src/components/Info.tsx` | – (ei propseja) | Infonäkymä polussa `/info`. Sisältää paluupainikkeen aloitusnäkymään sekä paluupainikkeen, joka kysyy vahvistuksen `window.confirm`-ikkunalla ennen siirtymistä. |

## Tekniikat

**React Routerin käyttöönotto (`BrowserRouter`)**

Koko sovellus ympäröidään `BrowserRouter`-komponentilla tiedostossa `src/main.tsx`, jotta reitityksen komponentit ja hookit toimivat kaikkialla sovelluksessa.

```tsx
import { BrowserRouter } from 'react-router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
```

**Reittien määrittely (`Routes` ja `Route`)**

Jokainen `Route` yhdistää polun (`path`) ja näytettävän elementin (`element`). `Routes` näyttää reitin, jonka polku vastaa selaimen osoitetta.

```tsx
import { Route, Routes } from 'react-router';

<Routes>
  <Route path="/" element={<Aloitus />} />
  <Route path="/info" element={<Info />} />
</Routes>
```

**Navigointi linkillä (`Link`)**

`Link` vaihtaa näkymän ilman sivun uudelleenlatausta. Kohdepolku annetaan `to`-propsina.

```tsx
import { Link } from 'react-router';

<Link to="/info">Siirry info-näkymään</Link>
```

**MUI-komponentti linkkinä (`component`-propsi)**

`component={Link}` saa MUI:n komponentin toimimaan React Routerin linkkinä, ja `to`-propsi välitetään `Link`-komponentille. Sama toimii sekä `Button`- että `ListItemButton`-komponentilla.

```tsx
<Button component={Link} to="/info">
  Siirry info-näkymään
</Button>
```

**Ohjelmallinen navigointi (`useNavigate`)**

`useNavigate` palauttaa funktion, jolla näkymä vaihdetaan koodista. Demossa siirtyminen tehdään vasta, kun käyttäjä hyväksyy `window.confirm`-kysymyksen.

```tsx
import { useNavigate } from 'react-router';

const navigate = useNavigate();

const vahvistaPaluu = (): void => {
  if (window.confirm("Haluatko varmasti palata aloitukseen?")) {
    navigate("/");
  }
};
```

**Yläpalkki ja ikonipainike (`AppBar`, `Toolbar`, `IconButton`)**

Ikonit tuodaan kukin omasta polustaan `@mui/icons-material`-paketista. `position="static"` asettaa yläpalkin osaksi sivun tavallista asettelua.

```tsx
import MenuIcon from '@mui/icons-material/Menu';

<AppBar position="static">
  <Toolbar>
    <IconButton color="inherit" edge="start" aria-label="Avaa valikko">
      <MenuIcon />
    </IconButton>
    <Typography component="div" sx={{ fontSize: "16pt", flexGrow: 1 }}>
      Demo 5: Reititys (React Router)
    </Typography>
  </Toolbar>
</AppBar>
```

**Sivuvalikko (`Drawer`)**

`Drawer` näytetään, kun `open` on `true`. `onClose` kutsutaan, kun käyttäjä painaa valikon ulkopuolelta tai Esc-näppäintä.

```tsx
const [valikkoAuki, setValikkoAuki] = useState<boolean>(false);

<IconButton onClick={() => setValikkoAuki(true)}>
  <MenuIcon />
</IconButton>

<Drawer open={valikkoAuki} onClose={() => setValikkoAuki(false)}>
  {/* valikon sisältö */}
</Drawer>
```

**Valikon rivit (`List`, `ListItemButton`, `ListItemIcon`, `ListItemText`)**

Rivin painallus kuplii `List`-komponentille, jonka `onClick` sulkee valikon.

```tsx
<List onClick={() => setValikkoAuki(false)}>
  <ListItemButton component={Link} to="/">
    <ListItemIcon>
      <HomeIcon />
    </ListItemIcon>
    <ListItemText primary="Aloitus" />
  </ListItemButton>
</List>
```

**Selaimen oletustyylien yhtenäistäminen (`CssBaseline`)**

`CssBaseline` lisätään kerran sovelluksen juureen. Se poistaa muun muassa `body`-elementin reunuksen ja asettaa fontiksi MUI:n leipätekstin fontin.

```tsx
import { CssBaseline } from '@mui/material';

<>
  <CssBaseline />
  <Valikko />
</>
```

## Reitit

| Polku | Komponentti | Parametrit |
|---|---|---|
| `/` | `Aloitus` | – |
| `/info` | `Info` | – |
