# Demo 1: React ja Vite tutuksi

## 2. Sisällysluettelo

- [3. Oppimistavoitteet](#3-oppimistavoitteet)
- [4. Kloonaus ja käynnistys](#4-kloonaus-ja-käynnistys)
- [5. Projektin rakenne alussa](#5-projektin-rakenne-alussa)
- [6. Tutoriaali](#6-tutoriaali)
  - [6.1 Projektin luominen](#61-projektin-luominen)
  - [6.2 Sovelluksen käynnistäminen](#62-sovelluksen-käynnistäminen)
  - [6.3 Ylimääräisten tiedostojen siivoaminen](#63-ylimääräisten-tiedostojen-siivoaminen)
  - [6.4 Tilan lisääminen komponenttiin](#64-tilan-lisääminen-komponenttiin)
  - [6.5 Käyttäjän syötteen kaappaminen](#65-käyttäjän-syötteen-kaappaminen)
  - [6.6 Tervehdyksen näyttäminen](#66-tervehdyksen-näyttäminen)
- [7. Projektin rakenne lopussa](#7-projektin-rakenne-lopussa)
- [8. Yhteenveto](#8-yhteenveto)
- [10. Jatka harjoittelua](#10-jatka-harjoittelua)

## 3. Oppimistavoitteet

Tässä demossa rakennetaan ensimmäinen "Hello World" -typpinen React-sovellus Viten avulla tyhjästä projektipohjasta valmiiksi, toimivaksi komponentiksi. Demo kattaa seuraavat tekniikat:

- Vite-projektin luominen ja kehityspalvelimen käyttö
- React-komponentin ja JSX:n perusrakenne
- Tilan (state) hallinta `useState`-hookilla
- Käyttäjän syötteen käsittely tapahtumankäsittelijöillä
- Ehdollinen renderöinti JSX:ssä
- TypeScriptin perussyntaksi Reactin kanssa

## 4. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-01
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3001`.

## 5. Projektin rakenne alussa

Demo aloitetaan tyhjästä Vite + React + TypeScript -projektipohjasta:

```text
demo-01/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.css
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 6. Tutoriaali

### 6.1 Projektin luominen

Projektipohja luodaan **npm**:llä (node package manager), joka on JavaScript-projektien paketinhallintatyökalu. Sen avulla asennetaan ja hallitaan **paketteja** (packages) eli valmiita koodikirjastoja, joita projekti tarvitsee. Komento

```bash
# Luodaan Vite-projekti demo-01 -kansioon.
npm create vite@latest demo-01 -- --template react-ts

# Luodaan Vite-projekti pääkansion nimellä ilman erillisen nimen antoa
npm create vite@latest . -- --template react-ts
```

lataa ja ajaa **Viten** (Vite) projektigeneraattorin. Vite on **rakennustyökalu** (build tool), joka kääntää ja paketoi React- ja TypeScript-koodin selaimen ymmärtämään muotoon sekä tarjoaa kehityksen ajaksi nopean **kehityspalvelimen** (development server). `--template react-ts` valitsee pohjaksi Reactin ja TypeScriptin yhdistävän mallin, jolloin lopputuloksena on edellä kuvatun kaltainen valmis projektirunko.

Tämä tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19 ja TypeScriptillä 6.x. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

> [!NOTE]
> Projekti sisältää kaksi TypeScript-asetustiedostoa, `tsconfig.app.json` ja `tsconfig.node.json`. Jako on tehty siksi, että sovelluskoodi (`src`) ja Viten omat asetustiedostot ajetaan eri ympäristöissä, joten niillä on eri käännösasetukset.

### 6.2 Sovelluksen käynnistäminen

Riippuvuudet asennetaan komennolla `npm install`. Se lukee `package.json`-tiedostosta projektin tarvitsemat paketit ja lataa ne `node_modules`-kansioon, jota ei viedä GitHubiin versionhallintaan. Asennetut versiot kirjataan `package-lock.json`-tiedostoon, jotta sama riippuvuuspuu voidaan toistaa myöhemmin täsmälleen samanlaisena.

Kehityspalvelin käynnistetään komennolla `npm run dev`, joka ajaa `package.json`-tiedoston `dev`-skriptin. Selaimessa `http://localhost:5173` (Viten oletusportti) näkyy tässä vaiheessa projektigeneraattorin oma esimerkkisivu laskureineen.

### 6.3 Ylimääräisten tiedostojen siivoaminen

Projektigeneraattorin oletussisältö ei kuulu tähän sovellukseen, joten se siivotaan ennen oman komponentin rakentamista. `public`- ja `src/assets`-kansiot poistetaan kokonaan, koska niiden kuvat ja ikonit liittyvät vain projektigeneraattorin esimerkkisivuun.

`index.html`-tiedoston `<head>`-osiosta poistetaan rivi `<link rel="icon" type="image/svg+xml" href="/favicon.svg" />`. Rivi määrittelee selaimen välilehdessä näkyvän kuvakkeen, joka oli `public`-kansion `favicon.svg`-tiedosto. Kun kansio on poistettu, rivi viittaa tiedostoon, jota ei enää ole.

`src/index.css` korvataan minimaalisella versiolla, joka asettaa vain sivun reunukset ja fontin:

```css
body {
  margin: 50px;
  font-family: "Arial", "Helvetica", "sans-serif";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

Lisäksi Viten oletusportti vaihdetaan `vite.config.ts`-tiedostossa:

```typescript
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001 // uusi
  }
})
```

Jokaisella kurssin demolla on oma porttinsa, jonka numero kasvaa demon numeron mukana. Demo 1 käyttää porttia `3001`, demo 2 porttia `3002`, demo 3 porttia `3003` ja niin edelleen. Näin jokainen demo avautuu aina omasta osoitteestaan, vaikka useampi demo olisi käynnissä samaan aikaan. Kun myöhempien demojen projektipohja luodaan näiden ohjeiden mukaan, `port`-asetukseksi kirjoitetaan kyseisen demon numeroa vastaava portti.

> [!NOTE]
> Kansioiden poistamisen jälkeen selain näyttää virheilmoituksen, koska projektigeneraattorin `App.tsx` tuo vielä `src/assets`-kansiossa olleita kuvia. Ilmoitus on Viten virhenäkymä, ja siinä lukee `Failed to resolve import "./assets/hero.png" from "src/App.tsx". Does the file exist?`. Virhe poistuu seuraavassa vaiheessa, kun `App.tsx`-tiedoston sisältö korvataan. Tilanteessa kannattaa harjoitella virheilmoituksen lukemista suoraan selaimesta, koska ilmoitus kertoo sekä virheen syyn että tiedoston, jossa virhe on.

### 6.4 Tilan lisääminen komponenttiin

`App.tsx` on sovelluksen pääkomponentti. React-sovellus koostuu **komponenteista** (components), jotka ovat funktioita, jotka palauttavat käyttöliittymän rakenteen **JSX**-syntaksilla. JSX muistuttaa HTML:ää, mutta se kirjoitetaan suoraan TypeScript-tiedoston sisään, ja se käännetään selaimen ymmärtämäksi JavaScript-koodiksi.

```tsx
import { useState } from 'react'; // uusi
import './App.css';

const App = () => {

  const [nimi, setNimi] = useState<string>(""); // uusi
  const [tervehdys, setTervehdys] = useState<string>(""); // uusi

  return (
    <>
      <h1>Demo 1: React ja Vite tutuksi</h1>
      <h2>Heippa maailma!</h2>
    </>
  );
};

export default App;
```

`useState` on hook, jonka avulla komponenttiin lisätään **tilaa** (state) eli arvoja, joiden muuttuessa komponentti piirtyy uudelleen. `useState("")` palauttaa parin sisältäen nykyisen arvon (`nimi`) ja funktion sen päivittämiseen (`setNimi`). Pienempi kuin- ja suurempi kuin-merkeissä oleva `<string>` on TypeScriptin **yleistyyppi** (generic type), joka kertoo, että tila voi sisältää vain merkkijonoja. Tässä komponentissa on kaksi erillistä tilaa `nimi` käyttäjän syötteelle ja `tervehdys` näytettävälle tervehdyslauseelle.

Demon `App.css` sisältää painikkeen ja tekstikentän omat tyylit sekä `tervehdysteksti`-luokan, jota käytetään jatkotehtävässä. Tyylejä ei käydä tässä läpi, ja tiedoston sisällön voi kopioida valmiista demosta.

Aiheesta lisää: [Reactin tila-dokumentaatio](https://react.dev/learn/state-a-components-memory) ja [TypeScriptin dokumentaatio](https://www.typescriptlang.org/docs/).

### 6.5 Käyttäjän syötteen kaappaminen

Seuraavaksi lisätään tekstikenttä, johon käyttäjä kirjoittaa nimensä:

```tsx
import { useState } from 'react';
import './App.css';

const App = () => {

  const [nimi, setNimi] = useState<string>("");
  const [tervehdys, setTervehdys] = useState<string>("");

  return (
    <>
      <h1>Demo 1: React ja Vite tutuksi</h1>
      <h2>Heippa maailma!</h2>

      {/* uusi: koko input-elementti */}
      <input
        type="text"
        placeholder='Anna nimesi...'
        onChange={ (e) => {
          console.log(e);
          console.log(e.target);
          console.log(e.target.value);
          setNimi(e.target.value);
        }}
      />
    </>
  );
};

export default App;
```

`onChange` on **tapahtumankäsittelijä** (event handler), joka suoritetaan aina, kun syötekentän arvo muuttuu. Käsittelijä saa parametrina tapahtumaolion `e`, jonka `e.target.value` sisältää kentän senhetkisen tekstin. Arvo tallennetaan tilaan `setNimi`-funktiolla, jolloin komponentti pysyy synkassa käyttöliittymän kanssa.

> [!NOTE]
> `console.log`-kutsut eivät ole toiminnan kannalta välttämättömiä. Ne on jätetty näkyviin, jotta tapahtumaolion (`e`), sen kohteen (`e.target`) ja arvon (`e.target.value`) rakenteen voi tarkistaa selaimen kehittäjätyökalujen konsolista (dev tools, F12).

### 6.6 Tervehdyksen näyttäminen

Viimeisenä lisätään painike, joka muodostaa tervehdyksen, sekä ehto, joka näyttää tervehdyksen vain silloin, kun se on olemassa:

```tsx
import { useState } from 'react';
import './App.css';

const App = () => {

  const [nimi, setNimi] = useState<string>("");
  const [tervehdys, setTervehdys] = useState<string>("");

  const tervehdi = (): void => { // uusi
    if (!nimi) return; // uusi
    setTervehdys(`Heippa maailma, ${nimi} täällä!`); // uusi
  } // uusi

  return (
    <>
      <h1>Demo 1: React ja Vite tutuksi</h1>
      <h2>Heippa maailma!</h2>

      <input
        type="text"
        placeholder='Anna nimesi...'
        onChange={ (e) => {
          console.log(e);
          console.log(e.target);
          console.log(e.target.value);
          setNimi(e.target.value);
        }}
      />

      {/* uusi: koko button-elementti */}
      <button
        onClick={tervehdi}
      >
        Sano heippa!
      </button>

      {/* uusi: ehdollinen renderöinti alla */}
      {
      Boolean(tervehdys)
      && <p style={{ "border": "1px solid black", "padding": "5px"}}>{tervehdys}</p>
      
      }
    </>
  );
};

export default App;
```

`tervehdi`-funktio tarkistaa ensin, onko `nimi` tyhjä, ja keskeyttää suorituksen `return`-lauseella, jos näin on. Muussa tapauksessa se muodostaa **template literalilla** (template literal) eli backtick-merkeillä (\`) kirjoitetulla merkkijonolla tervehdyksen, jossa `${nimi}` korvautuu tilan senhetkisellä arvolla. Painikkeen `onClick`-tapahtumankäsittelijä kutsuu funktiota, kun käyttäjä klikkaa painiketta.

Palautuslauseen lopussa oleva `Boolean(tervehdys) && <p>...</p>` on ehdollinen renderöinti. JSX-elementti `<p>` näytetään vain, jos `tervehdys` ei ole tyhjä merkkijono. Tyhjä merkkijono muunnetaan `Boolean`-funktiolla arvoksi `false`, jolloin `&&`-operaattori ei renderöi mitään.

## 7. Projektin rakenne lopussa

```text
demo-01/
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

## 8. Yhteenveto

Tässä demossa käytiin läpi:

- React-sovelluksen luominen ja ensimmäisen komponentin rakentaminen
- Viten projektigeneraattorin käyttö
- Ylimääräisen oletussisällön siivoaminen
- Tilan lisääminen `useState`-hookilla
- Käyttäjän syötteen kaappaaminen tapahtumankäsittelijällä, ja
- Lopputuloksen näyttäminen ehdollisella renderöinnillä.

---

## 10. Jatka harjoittelua

- Lisää painike, joka tyhjentää sekä `nimi`- että `tervehdys`-tilat takaisin alkuarvoihin.
- Estä tervehdyksen muodostaminen, jos käyttäjä on syöttänyt pelkkiä välilyöntejä. Merkkijonon reunojen tyhjän tilan voi poistaa `trim()`-metodilla ennen tarkistusta.
- Lisää tilamuuttuja, joka laskee, montako kertaa käyttäjä on painanut "Sano heippa!" -painiketta, ja näytä lukema sivulla.
- Siirrä tervehdyksen tyylit `App.css`-tiedoston valmiiseen `tervehdysteksti`-luokkaan. Korvaa `<p>`-elementin `style={{...}}`-attribuutti `className`-attribuutilla, esimerkiksi `<p className="tervehdysteksti">`. JSX:ssä käytetään nimeä `className`, koska `class` on JavaScriptin varattu sana.
