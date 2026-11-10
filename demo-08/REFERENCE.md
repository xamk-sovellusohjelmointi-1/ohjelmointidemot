# Demo 8 - Referenssi

## Komponentit

Komponentit ovat samat kuin demossa 6. Tässä demossa muuttui vain `App`.

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Lukee `tehtavat`-tilan alkuarvon `localStorage`-avaimesta `"tehtavalista"` ja tallentaa tilan samaan avaimeen `useEffect`-hookilla aina, kun tila muuttuu. Sisältää tilaa muuttavat funktiot `lisaaTehtava`, `merkitseTehdyksi` ja `poistaTehtava`. Lisää `CssBaseline`-perustyylit, näyttää pääotsikon ja määrittelee reitit `/`, `/uusi` ja `/poista/:id`. |
| `Otsikko` | `src/components/Otsikko.tsx` | `children: string`, `tyyli?: "iso" \| "pieni"` (oletus `"iso"`) | Otsikkoteksti MUI:n `Typography`-komponentilla. `tyyli` valitsee fonttikoon (`"iso"` 22px, `"pieni"` 18px). |
| `Tehtavalista` | `src/components/Tehtavalista.tsx` | `tehtavat: Tehtava[]`, `onMerkinta: (id: string) => void` | Aloitusnäkymä polussa `/`. Listaa tehtävät, vaihtaa tehtävän tehty-tilan `onMerkinta`-kutsulla ja sisältää linkit lisäysnäkymään sekä jokaisen tehtävän poistonäkymään. |
| `UusiTehtava` | `src/components/UusiTehtava.tsx` | `onLisays: (nimi: string) => void` | Lisäysnäkymä polussa `/uusi`. Lukee tekstikentän arvon `useRef`-viitteellä, antaa sen `onLisays`-propsille ja palaa listaan. Tyhjä kenttä tuottaa nimen `"Nimetön tehtävä"`. |
| `PoistaTehtava` | `src/components/PoistaTehtava.tsx` | `tehtavat: Tehtava[]`, `onPoisto: (id: string) => void` | Poistonäkymä polussa `/poista/:id`. Lukee `id`-parametrin `useParams`-hookilla, näyttää poistettavan tehtävän nimen ja kutsuu vahvistettaessa `onPoisto`-propsia. |

## Tekniikat

**Arvon tallentaminen ja lukeminen (`localStorage`)**

Avain ja arvo ovat merkkijonoja. `getItem` palauttaa `null`, jos avainta ei ole.

| Metodi | Paluuarvo | Kuvaus |
|---|---|---|
| `localStorage.setItem(avain, arvo)` | – | Tallentaa arvon avaimella ja korvaa aiemman arvon |
| `localStorage.getItem(avain)` | `string \| null` | Lukee avaimen arvon |
| `localStorage.removeItem(avain)` | – | Poistaa avaimen ja sen arvon |
| `localStorage.clear()` | – | Poistaa kaikki saman alkuperän avaimet |

```ts
localStorage.setItem("tervehdys", "Hei");
const arvo = localStorage.getItem("tervehdys");
```

**Taulukon muuntaminen JSON-merkkijonoksi ja takaisin (`JSON.stringify`, `JSON.parse`)**

Taulukko tai olio muunnetaan merkkijonoksi ennen tallentamista ja takaisin lukemisen jälkeen. `JSON.parse` palauttaa tyypin `any`.

```ts
const teksti: string = JSON.stringify([{ id: "abc", nimi: "Siivoa", tehty: false }]);
const tehtavat: Tehtava[] = JSON.parse(teksti);
```

**Tilan tallentaminen efektillä (`useEffect`)**

Efekti suoritetaan ensimmäisen renderöinnin jälkeen ja aina, kun riippuvuustaulukon arvo muuttuu.

```tsx
useEffect(() => {
  localStorage.setItem("tehtavalista", JSON.stringify(tehtavat));
}, [tehtavat]);
```

**Tilan alkuarvon lukeminen alkuarvofunktiolla (`useState(() => ...)`)**

React kutsuu `useState`-hookille annettua funktiota vain ensimmäisellä renderöinnillä.

```tsx
const [tehtavat, setTehtavat] = useState<Tehtava[]>(() => {
  const tallennetut = localStorage.getItem("tehtavalista");
  return tallennetut ? JSON.parse(tallennetut) : [];
});
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
