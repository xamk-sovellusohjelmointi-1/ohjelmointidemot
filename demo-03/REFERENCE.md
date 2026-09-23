# Demo 3 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Pitää kirjaa kulkuneuvojen yhteismäärästä (`yhteensa`) ja muodostaa laskurinapit `kulkuneuvot`-taulukosta. |
| `Sivu` | `src/components/Sivu.tsx` | `children: React.ReactNode` | Kehys, joka ympäröi sivun koko sisällön `sivu`-luokan `<div>`-elementillä. |
| `Otsikko` | `src/components/Otsikko.tsx` | `children: string`, `taso?: "iso" \| "keski" \| "pieni"` (oletus `"keski"`) | Näyttää otsikon `<h1>`-, `<h2>`- tai `<h3>`-elementtinä tason mukaan. |
| `Yhteenveto` | `src/components/Yhteenveto.tsx` | `yhteensa: number` | Näyttää kulkuneuvojen yhteismäärän. |
| `Laskurinappi` | `src/components/Laskurinappi.tsx` | `children: string`, `onPainallus: () => void` | Painike, jolla on oma `laskuri`-tila. Painallus kasvattaa omaa laskuria ja kutsuu `onPainallus`-funktiota. |

## Tekniikat

**Komponentti omassa tiedostossa (`export` / `import`)**

Komponentti viedään tiedoston lopussa oletusvientinä, ja se tuodaan toiseen tiedostoon suhteellisella polulla ilman tiedostopäätettä.

```tsx
// src/components/Yhteenveto.tsx
const Yhteenveto = ({ yhteensa }: Props) => {
  return <p>Kulkuneuvoja yhteensä: {yhteensa}</p>;
};

export default Yhteenveto;
```

```tsx
// src/App.tsx
import Yhteenveto from './components/Yhteenveto';
```

**Propsien tyypitys ja purkaminen**

Propsien muoto määritellään rajapinnalla, ja propsit puretaan komponentin parametrilistassa omiksi muuttujikseen.

```tsx
interface Props {
  yhteensa: number;
}

const Yhteenveto = ({ yhteensa }: Props) => {
  return <p>Kulkuneuvoja yhteensä: {yhteensa}</p>;
};
```

```tsx
<Yhteenveto yhteensa={yhteensa} />
```

**Valinnainen propsi, unionityyppi ja oletusarvo**

Kysymysmerkki tekee propsista valinnaisen, unionityyppi rajaa sallitut arvot ja oletusarvo annetaan purkamisen yhteydessä.

```tsx
interface Props {
  taso?: "iso" | "keski" | "pieni";
}

const Otsikko = ({ taso = "keski" }: Props) => {
  return <p>Taso: {taso}</p>; // "keski", jos propsia ei annettu
};
```

**`children`-propsi**

Avaavan ja sulkevan tagin väliin kirjoitettu sisältö välittyy komponentille `children`-propsina. Pelkälle tekstille riittää tyyppi `string`, muuten käytetään tyyppiä `React.ReactNode`.

```tsx
interface Props {
  children: React.ReactNode;
}

const Sivu = ({ children }: Props) => {
  return <div className="sivu">{children}</div>;
};
```

```tsx
<Sivu>
  <Otsikko>Liikennelaskuri</Otsikko>
</Sivu>
```

**Funktio propsina (tilan nostaminen)**

Tila on emokomponentissa, ja lapsikomponentti päivittää sitä kutsumalla propsina saatua funktiota. Tapahtumiin reagoivien propsien nimet alkavat `on`-etuliitteellä.

```tsx
// Emokomponentti
const [yhteensa, setYhteensa] = useState<number>(0);

const lisaaYksi = (): void => {
  setYhteensa(yhteensa + 1);
}

<Laskurinappi onPainallus={lisaaYksi}>Henkilöauto</Laskurinappi>
```

```tsx
// Lapsikomponentti
interface Props {
  children: string;
  onPainallus: () => void;
}

const Laskurinappi = ({ children, onPainallus }: Props) => {
  return <button onClick={onPainallus}>{children}</button>;
};
```

**Komponentin oma tila**

Jokainen komponentin ilmentymä saa oman, erillisen tilansa.

```tsx
const Laskurinappi = () => {
  const [laskuri, setLaskuri] = useState<number>(0);

  return (
    <button onClick={() => setLaskuri(laskuri + 1)}>
      Painettu {laskuri} kertaa
    </button>
  );
};
```

**CSS-luokka (`className`)**

JSX:ssä elementin CSS-luokka annetaan `className`-attribuutilla.

```tsx
<p className="yhteenveto">Kulkuneuvoja yhteensä: {yhteensa}</p>
```

## Types & Interfaces

| Nimi | Kentät | Käyttökohde |
|---|---|---|
| `Props` | `children: React.ReactNode` | `Sivu`-komponentin propsit (`src/components/Sivu.tsx`) |
| `Props` | `children: string`, `taso?: "iso" \| "keski" \| "pieni"` | `Otsikko`-komponentin propsit (`src/components/Otsikko.tsx`) |
| `Props` | `yhteensa: number` | `Yhteenveto`-komponentin propsit (`src/components/Yhteenveto.tsx`) |
| `Props` | `children: string`, `onPainallus: () => void` | `Laskurinappi`-komponentin propsit (`src/components/Laskurinappi.tsx`) |
