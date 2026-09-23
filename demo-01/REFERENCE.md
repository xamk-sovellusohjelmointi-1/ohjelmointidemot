# Demo 1 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Näyttää nimikentän, painikkeen ja tervehdyksen. |

## Tekniikat

**Tila (`useState`)**

Tilamuuttujalle annetaan nimi ja "setteri". TypeScriptillä tilamuuttuja voidaan tyypittää sisällön mukaan `useState<type>()`.

```tsx
const [nimi, setNimi] = useState<string>("");
const [tervehdys, setTervehdys] = useState<string>("");
```

**Tapahtumankäsittely (`onChange`, `onClick`)**

React-elementeissä olevia sisäisiä tapahtumankäsittelijöitä, jotka suoritetaan automaattisesti tapahtuman aikana. Tapahtumaan voidaan liittää toiminnallisuutta funktion viitteellä tai suoraan kirjoittamalla nuolifunktio tapahtuman arvoksi.

Kutsuessa funktiota tapahtumalle sellaisenaan, ei anneta sulkeita funktion nimen perään tai argumentteja. Jos funktio odottaa vastaan argumentteja, pitää funktio kutsua tapahtumassa nuolifunktion avulla.

```tsx
<input
  type="text"
  onChange={(e) => setNimi(e.target.value)}
/>

<button onClick={tervehdi}>Sano heippa!</button>
```

**Ehdollinen renderöinti**

Ehdollisen renderöinnin perusrakenne. `ehto ? kun ehto tosi : kun ehto epätosi`

```tsx
{
  Boolean(tervehdys)
  ? <p>{tervehdys}</p>
  : null
}
```

Kun epätosi-tilalle ei ole vaihtoehtoista tulostusta, voidaan lyhentää `ehto && kun ehto tosi`.

```tsx
{Boolean(tervehdys) && <p>{tervehdys}</p>}
```
