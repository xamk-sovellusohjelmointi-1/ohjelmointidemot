# Demo 2: Lisää React-perusteita - Tehtävälista

## Sisällysluettelo

- [1. Oppimistavoitteet](#1-oppimistavoitteet)
- [2. Kloonaus ja käynnistys](#2-kloonaus-ja-käynnistys)
- [3. Projektin rakenne alussa](#3-projektin-rakenne-alussa)
- [4. Tutoriaali](#4-tutoriaali)
  - [4.1 Tehtävän tietomalli ja alkutila](#41-tehtävän-tietomalli-ja-alkutila)
  - [4.2 Uuden tehtävän lisääminen](#42-uuden-tehtävän-lisääminen)
  - [4.3 Tehtävälistan renderöinti](#43-tehtävälistan-renderöinti)
  - [4.4 Tehtävän merkitseminen tehdyksi](#44-tehtävän-merkitseminen-tehdyksi)
- [5. Projektin rakenne lopussa](#5-projektin-rakenne-lopussa)
- [6. Yhteenveto](#6-yhteenveto)
- [7. Jatka harjoittelua](#7-jatka-harjoittelua)

## 1. Oppimistavoitteet

Tässä demossa laajennetaan komponentin tila yksittäisestä arvosta olioita sisältäväksi taulukoksi ja rakennetaan sen pohjalta yksinkertainen tehtävälista. Demo kattaa seuraavat tekniikat:

- TypeScript-**rajapinnan** (interface) määrittely olion muotoa varten
- Olioita sisältävän taulukon tallentaminen tilaan `useState`-hookilla
- Tilan päivittäminen muuttumattomasti levitysoperaattorilla ja `map()`-metodilla funktiomuotoisen päivityksen avulla
- `useRef`-hookin käyttö syötekentän arvon lukemiseen
- Listan renderöinti `map()`-metodilla ja `key`-propsilla

## 2. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-02
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3002`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19 ja TypeScriptillä 6.x. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 3. Projektin rakenne alussa

Demo aloitetaan uudesta, siivotusta Vite + React + TypeScript -projektipohjasta, jonka portiksi on asetettu `3002`. Projektin luominen ja ylimääräisten tiedostojen siivoaminen on kuvattu [demo 1:n README-tiedostossa](../demo-01/README.md#41-projektin-luominen).

```text
demo-02/
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

### 4.1 Tehtävän tietomalli ja alkutila

Komponentin tila laajenee tässä demossa yksittäisestä merkkijonosta olioiden taulukoksi, joten olion muoto määritellään ensin TypeScriptin **rajapinnalla** (interface). Rajapinta kertoo, mitä kenttiä oliolla on ja minkä tyyppisiä ne ovat, ilman että se itsessään tuottaa suoritettavaa koodia. TypeScriptin kääntäjä käyttää rajapintaa tarkistaakseen, että jokainen `Tehtava`-tyyppinen olio sisältää kentät `id`, `nimi` ja `tehty` oikeilla tyypeillä.

Aiheesta lisää: [TypeScriptin dokumentaatio rajapinnoista](https://www.typescriptlang.org/docs/handbook/2/objects.html).

```tsx
import { useState } from 'react'; // uusi
import './App.css';

// Määritetään Tehtävä-objektin muoto
interface Tehtava { // uusi
  id: string; // uusi
  nimi: string; // uusi
  tehty: boolean; // uusi
} // uusi

const App = () => {

  const [ // uusi
    tehtavat, // uusi
    setTehtavat // uusi
  ] = useState<Tehtava[]>([ // uusi
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false }, // uusi
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true }, // uusi
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false } // uusi
  ]); // uusi

  return (
    <>
      <h1>Demo 2: React-perusteita</h1>
      <h2>Tehtävälista</h2>
    </>
  );
}

export default App;
```

Tilamuuttuja `tehtavat` tyypitetään muotoon `useState<Tehtava[]>(...)`, jolloin se on aina `Tehtava`-olioiden taulukko. Alkuarvoksi annetaan kolme valmista tehtävää, joiden `id`-kentät luodaan `crypto.randomUUID()`-funktiolla.

Demon `App.css` sisältää tehtävälistan, tekstikentän ja painikkeen omat tyylit. Niitä ei käydä tässä läpi, ja tiedoston sisällön voi kopioida valmiista demosta.

> [!NOTE]
> `crypto.randomUUID()` on selaimen oma toiminto, joka luo satunnaisen, uniikin merkkijonotunnisteen. Sitä käytetään tässä jokaisen tehtävän yksilöivänä `id`-arvona.

### 4.2 Uuden tehtävän lisääminen

Tekstikentän arvo voidaan lukea `useRef`-hookilla suoraan DOM-elementistä sen sijaan, että se tallennettaisiin tilaan jokaisen näppäinpainalluksen yhteydessä, kuten demo 1:ssä tehtiin `onChange`-käsittelijällä. `useRef<HTMLInputElement>(null)` luo **viitteen** (ref), jonka `current`-kenttä osoittaa varsinaiseen `<input>`-elementtiin sen jälkeen, kun elementti on liitetty siihen `ref`-propsilla. Viitteen arvon muuttuminen ei aiheuta komponentin uudelleenpiirtoa, joten se sopii tilanteisiin, joissa arvoa tarvitaan vain tietyllä hetkellä, ei jatkuvasti.

Aiheesta lisää: [Reactin dokumentaatio viitteistä](https://react.dev/reference/react/useRef).

```tsx
import { useState, useRef } from 'react'; // muutettu
import './App.css';

interface Tehtava {
  id: string;
  nimi: string;
  tehty: boolean;
}

const App = () => {

  const uusiTehtava = useRef<HTMLInputElement>(null); // uusi

  const [
    tehtavat,
    setTehtavat
  ] = useState<Tehtava[]>([
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false },
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true },
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false }
  ]);

  const lisaaTehtava = (nimi: string): void => { // uusi

    let uusi: Tehtava = { // uusi
      id: crypto.randomUUID(), // uusi
      nimi, // uusi
      tehty: false // uusi
    } // uusi

    setTehtavat((edelliset: Tehtava[]) => { // uusi
      return [...edelliset, uusi]; // uusi
    }) // uusi
  } // uusi

  return (
    <>
      <h1>Demo 2: React-perusteita</h1>
      <h2>Tehtävälista</h2>

      {/* uusi: koko input-elementti */}
      <input
        ref={uusiTehtava}
        type="text"
        placeholder="Kirjoita tehtävä ja paina enter..."
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === "Enter") {
            lisaaTehtava(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />

      {/* uusi: koko button-elementti */}
      <button onClick={() => {
        if (uusiTehtava.current === null) {
          return;
        }
        lisaaTehtava(uusiTehtava.current.value)
        uusiTehtava.current.value = "";
      }}>Lisää</button>
    </>
  );
}

export default App;
```

`lisaaTehtava`-funktio muodostaa uuden `Tehtava`-olion ja lisää sen tilaan. Taulukkoa ei muuteta suoraan, vaan `setTehtavat`-kutsulle annetaan funktio, joka saa parametrinaan tilan edellisen arvon (`edelliset`) ja palauttaa siitä muodostetun uuden taulukon. Tätä kutsutaan **funktiomuotoiseksi päivitykseksi** (functional update), ja se varmistaa, että päivitys perustuu aina tuoreimpaan tilaan. Uusi taulukko muodostetaan levitysoperaattorilla (`...edelliset`), joka kopioi vanhan taulukon alkiot uuteen taulukkoon lisättävän alkion (`uusi`) kanssa.

Aiheesta lisää: [Reactin dokumentaatio tilan päivittämisestä edellisen arvon perusteella](https://react.dev/reference/react/useState#updating-state-based-on-the-previous-state).

Tekstikentän `onKeyDown`-käsittelijä suoritetaan jokaisella näppäinpainalluksella, ja painetun näppäimen nimi luetaan `e.key`-ominaisuudesta. Kun näppäin on Enter, kentän arvo välitetään `lisaaTehtava`-funktiolle ja kenttä tyhjennetään asettamalla sen arvoksi tyhjä merkkijono. Painike kutsuu samaa funktiota lukemalla arvon viitteen kautta (`uusiTehtava.current.value`) ja tyhjentää kentän samalla tavalla.

Tapahtumaolion `e` tyyppiä ei kirjoiteta itse, koska TypeScript päättelee sen siitä, mihin käsittelijä on liitetty. Tätä kutsutaan **tyyppipäättelyksi** (type inference). `<input>`-elementin `onKeyDown`-käsittelijässä `e` on tyyppiä `React.KeyboardEvent<HTMLInputElement>`. Kentän arvo luetaan `e.currentTarget`-ominaisuudesta, joka on aina se elementti, johon käsittelijä on liitetty. Näppäimistötapahtuman `e.target` on tyypiltään yleinen `EventTarget`, jolla ei ole `value`-ominaisuutta. Demo 1:n `onChange`-käsittelijässä `e.target.value` toimi, koska muutostapahtumassa `target` on tyypitetty syötekentäksi. Tyyppi kirjoitetaan itse vasta silloin, kun käsittelijä erotetaan omaksi nimetyksi funktiokseen.

Aiheesta lisää: [Reactin dokumentaatio DOM-tapahtumien tyypittämisestä](https://react.dev/learn/typescript#typing-dom-events).

> [!NOTE]
> `console.log(e.key)`-rivi ei ole toiminnan kannalta välttämätön. Se on jätetty näkyviin, jotta painetun näppäimen tunnisteen voi tarkistaa selaimen kehittäjätyökalujen konsolista.

### 4.3 Tehtävälistan renderöinti

Tehtävät renderöidään listaksi `tehtavat.map()`-kutsulla, joka muodostaa `Tehtava`-taulukosta vastaavan `<li>`-elementtien listan. `map()`-metodi palauttaa aina uuden taulukon, jonka jokainen alkio on muodostettu alkuperäisen taulukon vastaavasta alkiosta annetulla funktiolla.

Jokaiselle listan alkiolle annetaan `key`-props (`key={tehtava.id}`), jonka avulla React tunnistaa, mikä listan alkio vastaa mitäkin taulukon oliota myös silloin, kun taulukko muuttuu. **Avaimen** (key) arvon tulee olla listan sisällä uniikki, minkä vuoksi tehtävän omaa `id`-kenttää käytetään tässä avaimena.

Aiheesta lisää: [Reactin dokumentaatio listojen renderöinnistä](https://react.dev/learn/rendering-lists).

```tsx
import { useState, useRef } from 'react';
import './App.css';

interface Tehtava {
  id: string;
  nimi: string;
  tehty: boolean;
}

const App = () => {

  const uusiTehtava = useRef<HTMLInputElement>(null);

  const [
    tehtavat,
    setTehtavat
  ] = useState<Tehtava[]>([
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false },
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true },
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false }
  ]);

  const lisaaTehtava = (nimi: string): void => {

    let uusi: Tehtava = {
      id: crypto.randomUUID(),
      nimi,
      tehty: false
    }

    setTehtavat((edelliset: Tehtava[]) => {
      return [...edelliset, uusi];
    })
  }

  return (
    <>
      <h1>Demo 2: React-perusteita</h1>
      <h2>Tehtävälista</h2>

      <input
        ref={uusiTehtava}
        type="text"
        placeholder="Kirjoita tehtävä ja paina enter..."
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === "Enter") {
            lisaaTehtava(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />

      <button onClick={() => {
        if (uusiTehtava.current === null) {
          return;
        }
        lisaaTehtava(uusiTehtava.current.value)
        uusiTehtava.current.value = "";
      }}>Lisää</button>

      {/* uusi: koko lista */}
      <ul>
        {tehtavat.map((tehtava: Tehtava) => {

          return (
            <li key={tehtava.id}>
              {tehtava.nimi}
            </li>
          );

        })}
      </ul>
    </>
  );
}

export default App;
```

### 4.4 Tehtävän merkitseminen tehdyksi

Tehtävän merkitseminen tehdyksi toimii samalla periaatteella kuin uuden tehtävän lisääminen. `merkitseTehdyksi`-funktio päivittää tilan funktiomuotoisesti, mutta tällä kertaa `edelliset.map()`-kutsulla. Jokainen taulukon alkio käydään läpi, ja se tehtävä, jonka `id` täsmää annettuun tunnisteeseen, korvataan uudella oliolla, jossa `tehty`-kenttä on käännetty vastakkaiseksi (`!tehtava.tehty`). Uusi olio muodostetaan levitysoperaattorilla (`{ ...tehtava, tehty: !tehtava.tehty }`), jolloin muut kentät pysyvät ennallaan ja vain `tehty` muuttuu. Muut alkiot palautetaan sellaisenaan.

```tsx
import { useState, useRef } from 'react';
import './App.css';

interface Tehtava {
  id: string;
  nimi: string;
  tehty: boolean;
}

const App = () => {

  const uusiTehtava = useRef<HTMLInputElement>(null);

  const [
    tehtavat,
    setTehtavat
  ] = useState<Tehtava[]>([
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false },
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true },
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false }
  ]);

  const lisaaTehtava = (nimi: string): void => {

    let uusi: Tehtava = {
      id: crypto.randomUUID(),
      nimi,
      tehty: false
    }

    setTehtavat((edelliset: Tehtava[]) => {
      return [...edelliset, uusi];
    })
  }

  const merkitseTehdyksi = (id: string): void => { // uusi

    setTehtavat((edelliset: Tehtava[]) => { // uusi
      return edelliset.map((tehtava: Tehtava): Tehtava => { // uusi
        if (tehtava.id === id) { // uusi
          return { ...tehtava, tehty: !tehtava.tehty }; // uusi
        } else { // uusi
          return tehtava; // uusi
        } // uusi
      }); // uusi
    }); // uusi
  } // uusi

  return (
    <>
      <h1>Demo 2: React-perusteita</h1>
      <h2>Tehtävälista</h2>

      <input
        ref={uusiTehtava}
        type="text"
        placeholder="Kirjoita tehtävä ja paina enter..."
        onKeyDown={(e) => {
          console.log(e.key);
          if (e.key === "Enter") {
            lisaaTehtava(e.currentTarget.value);
            e.currentTarget.value = "";
          }
        }}
      />

      <button onClick={() => {
        if (uusiTehtava.current === null) {
          return;
        }
        lisaaTehtava(uusiTehtava.current.value)
        uusiTehtava.current.value = "";
      }}>Lisää</button>

      <ul>

        {tehtavat.map((tehtava: Tehtava) => {

          // muutettu: li-elementtiin lisätty onClick ja ehdollinen renderöinti
          return (
            <li key={tehtava.id} onClick={() => { merkitseTehdyksi(tehtava.id); }}>
              {(tehtava.tehty === true)
                ? <del>{tehtava.nimi}</del>
                : tehtava.nimi
              }
            </li>
          );

        })}

      </ul>

      {/* uusi */}
      <p><small>Klikkaa tehtävän nimeä merkitäksesi sen suoritetuksi.</small></p>

    </>
  );
}

export default App;
```

Funktio kutsutaan `<li>`-elementin `onClick`-käsittelijästä, jolloin tehtävän tekstin klikkaaminen vaihtaa sen tilan. Näytettävä sisältö riippuu `tehty`-kentän arvosta. Valmis tehtävä näytetään `<del>`-elementin sisällä yliviivattuna, muu tehtävä normaalina tekstinä.

## 5. Projektin rakenne lopussa

```text
demo-02/
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
├── REFERENCE.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 6. Yhteenveto

Tässä demossa käytiin läpi:

- Olion muodon määrittely TypeScriptin rajapinnalla
- Olioita sisältävän taulukon tallentaminen tilaan
- Tilan päivittäminen muuttumattomasti levitysoperaattorilla ja `map()`-metodilla funktiomuotoisen päivityksen avulla
- Käyttäjän syötteen lukeminen `useRef`-viitteellä
- Listan renderöinti `map()`-metodilla ja `key`-propsilla, ja
- Yksittäisen listan alkion tilan muuttaminen klikkauksella.

---

## 7. Jatka harjoittelua

- Lisää painike, joka poistaa tehtävän listalta. Käytä `filter()`-metodia palauttamaan taulukko, josta poistettava tehtävä on jätetty pois.
- Estä tyhjän tai pelkkiä välilyöntejä sisältävän tehtävän lisääminen. Merkkijonon reunojen tyhjän tilan voi poistaa `trim()`-metodilla ennen tarkistusta.
- Lisää näkymään laskuri, joka näyttää, kuinka monta tehtävää on vielä tekemättä.
