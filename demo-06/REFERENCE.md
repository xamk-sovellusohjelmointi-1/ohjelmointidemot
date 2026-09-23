# Demo 6 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Sisältää `tehtavat`-tilan ja sitä muuttavat funktiot `lisaaTehtava`, `merkitseTehdyksi` ja `poistaTehtava`. Lisää `CssBaseline`-perustyylit, näyttää pääotsikon ja määrittelee reitit `/`, `/uusi` ja `/poista/:id`. |
| `Otsikko` | `src/components/Otsikko.tsx` | `children: string`, `tyyli?: "iso" \| "pieni"` (oletus `"iso"`) | Otsikkoteksti MUI:n `Typography`-komponentilla. `tyyli` valitsee fonttikoon (`"iso"` 22px, `"pieni"` 18px). |
| `Tehtavalista` | `src/components/Tehtavalista.tsx` | `tehtavat: Tehtava[]`, `onMerkinta: (id: string) => void` | Aloitusnäkymä polussa `/`. Listaa tehtävät, vaihtaa tehtävän tehty-tilan `onMerkinta`-kutsulla ja sisältää linkit lisäysnäkymään sekä jokaisen tehtävän poistonäkymään. |
| `UusiTehtava` | `src/components/UusiTehtava.tsx` | `onLisays: (nimi: string) => void` | Lisäysnäkymä polussa `/uusi`. Lukee tekstikentän arvon `useRef`-viitteellä, antaa sen `onLisays`-propsille ja palaa listaan. Tyhjä kenttä tuottaa nimen `"Nimetön tehtävä"`. |
| `PoistaTehtava` | `src/components/PoistaTehtava.tsx` | `tehtavat: Tehtava[]`, `onPoisto: (id: string) => void` | Poistonäkymä polussa `/poista/:id`. Lukee `id`-parametrin `useParams`-hookilla, näyttää poistettavan tehtävän nimen ja kutsuu vahvistettaessa `onPoisto`-propsia. |

## Tekniikat

**Jaetun tyypin vienti ja tyyppituonti (`export interface`, `import type`)**

Tyyppi viedään omasta tiedostostaan nimettynä vientinä. Projektin `verbatimModuleSyntax`-asetuksen vuoksi pelkän tyypin tuonti vaatii `type`-sanan.

```ts
// src/types.ts
export interface Tehtava {
  id: string;
  nimi: string;
  tehty: boolean;
}
```

```tsx
// src/components/Tehtavalista.tsx
import type { Tehtava } from '../types';
```

**Tilaa muuttava funktio propsina (tilan nostaminen)**

Tila on yhteisessä yläkomponentissa. Näkymä saa funktion propsina ja kutsuu sitä tarvittavalla arvolla.

```tsx
// Yläkomponentti
const merkitseTehdyksi = (id: string): void => {
  setTehtavat((edelliset: Tehtava[]) =>
    edelliset.map((tehtava: Tehtava): Tehtava =>
      tehtava.id === id ? { ...tehtava, tehty: !tehtava.tehty } : tehtava
    )
  );
};

<Tehtavalista tehtavat={tehtavat} onMerkinta={merkitseTehdyksi} />
```

```tsx
// Näkymä
interface Props {
  tehtavat: Tehtava[];
  onMerkinta: (id: string) => void;
}

<IconButton onClick={() => onMerkinta(tehtava.id)}>
```

**Reititysparametrin määrittely (`:parametri`)**

Kaksoispisteellä alkava polun osa on reititysparametri. Reitti vastaa kaikkia osoitteita, joissa `/poista/`-osan jälkeen on jokin arvo.

```tsx
<Route
  path="/poista/:id"
  element={<PoistaTehtava tehtavat={tehtavat} onPoisto={poistaTehtava} />}
/>
```

**Linkki reititysparametrin kanssa (template literal)**

Kohdepolku muodostetaan template literalilla, joka upottaa arvon osoitteeseen.

```tsx
<IconButton component={Link} to={`/poista/${tehtava.id}`} aria-label="Poista tehtävä">
  <DeleteIcon />
</IconButton>
```

**Reititysparametrin lukeminen (`useParams`)**

`useParams` palauttaa olion, jonka kentän nimi on sama kuin reitin parametrin nimi. Arvo on merkkijono, ja sen tyyppi on `string | undefined`.

```tsx
import { useParams } from 'react-router';

const { id } = useParams();

if (id !== undefined) {
  onPoisto(id);
}
```

**Alkion hakeminen (`find`)**

`find` palauttaa ensimmäisen ehdon täyttävän alkion tai `undefined`, jos sellaista ei ole.

```tsx
const poistettava = tehtavat.find((tehtava: Tehtava) => tehtava.id === id);

<Typography>
  Haluatko varmasti poistaa tehtävän "{poistettava?.nimi}"?
</Typography>
```

**Alkion poistaminen tilasta (`filter`)**

`filter` palauttaa uuden taulukon, jossa ovat vain ehdon täyttävät alkiot.

```tsx
const poistaTehtava = (id: string): void => {
  setTehtavat((edelliset: Tehtava[]) =>
    edelliset.filter((tehtava: Tehtava) => tehtava.id !== id)
  );
};
```

**Tekstikentän viite (`TextField` ja `inputRef`)**

MUI:n `TextField` saa viitteen `inputRef`-propsina, jolloin viite osoittaa kentän `<input>`-elementtiin.

```tsx
const uusiTehtavaRef = useRef<HTMLInputElement>(null);

<TextField inputRef={uusiTehtavaRef} fullWidth placeholder="Kirjoita tehtävä..." />

const nimi = uusiTehtavaRef.current?.value || "Nimetön tehtävä";
```

**Listarivin toimintopainike (`ListItem` ja `secondaryAction`)**

`secondaryAction` sijoittaa elementin rivin oikeaan reunaan.

```tsx
<ListItem
  key={tehtava.id}
  secondaryAction={
    <IconButton component={Link} to={`/poista/${tehtava.id}`} edge="end" aria-label="Poista tehtävä">
      <DeleteIcon />
    </IconButton>
  }
>
  <ListItemText primary={tehtava.nimi} />
</ListItem>
```

## Tyypit ja rajapinnat

| Nimi | Kentät | Käyttäjät |
|---|---|---|
| `Tehtava` (`src/types.ts`) | `id: string`, `nimi: string`, `tehty: boolean` | `App`, `Tehtavalista`, `PoistaTehtava` |

## Reitit

| Polku | Komponentti | Parametrit |
|---|---|---|
| `/` | `Tehtavalista` | – |
| `/uusi` | `UusiTehtava` | – |
| `/poista/:id` | `PoistaTehtava` | `id`: poistettavan tehtävän `id` (merkkijono) |
