# Demo 2 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Sovelluksen pääkomponentti. Näyttää tehtävälistan, syötekentän uuden tehtävän lisäämiseen ja mahdollisuuden merkitä tehtäviä tehdyiksi. |

## Tekniikat

**TypeScript-rajapinta (`interface`)**

Määrittelee olion muodon: mitä kenttiä oliolla on ja minkä tyyppisiä ne ovat.

```tsx
interface Tehtava {
  id: string;
  nimi : string;
  tehty : boolean;
}
```

**Olioita sisältävä taulukkotila (`useState<T[]>`)**

Tilamuuttuja tyypitetään olion muotoisten alkioiden taulukoksi.

```tsx
const [tehtavat, setTehtavat] = useState<Tehtava[]>([
  { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false }
]);
```

**Funktiomuotoinen tilan päivitys ja levitysoperaattori**

`setTehtavat`-kutsulle annetaan funktio, joka saa parametrinaan tilan edellisen arvon ja palauttaa siitä muodostetun uuden taulukon. Levitysoperaattori (`...`) kopioi vanhan taulukon alkiot uuteen taulukkoon.

```tsx
setTehtavat((edelliset: Tehtava[]) => {
  return [...edelliset, uusi];
});
```

**Olion päivittäminen muuttumattomasti (`map` + levitysoperaattori)**

Taulukon yksittäinen olio korvataan uudella, muokatulla oliolla ilman että alkuperäistä oliota tai taulukkoa muutetaan suoraan.

```tsx
setTehtavat((edelliset: Tehtava[]) => {
  return edelliset.map((tehtava: Tehtava) => {
    if (tehtava.id === id) {
      return { ...tehtava, tehty: !tehtava.tehty };
    }
    return tehtava;
  });
});
```

**`useRef` syötekentän arvon lukemiseen**

Viite osoittaa suoraan DOM-elementtiin. Arvo luetaan `current`-kentän kautta silloin, kun sitä tarvitaan, ilman että jokainen näppäinpainallus päivittää tilaa.

```tsx
const uusiTehtava = useRef<HTMLInputElement>(null);

<input ref={uusiTehtava} type="text" />

if (uusiTehtava.current !== null) {
  console.log(uusiTehtava.current.value);
}
```

**Listan renderöinti (`map` + `key`)**

Taulukosta muodostetaan JSX-elementtien lista. Jokaiselle alkiolle annetaan uniikki `key`-props.

```tsx
<ul>
  {tehtavat.map((tehtava: Tehtava) => (
    <li key={tehtava.id}>{tehtava.nimi}</li>
  ))}
</ul>
```

## Types & Interfaces

| Nimi | Kentät | Käyttökohde |
|---|---|---|
| `Tehtava` | `id: string`, `nimi: string`, `tehty: boolean` | `App`-komponentin tilan (`tehtavat`) alkioiden tyyppi |
