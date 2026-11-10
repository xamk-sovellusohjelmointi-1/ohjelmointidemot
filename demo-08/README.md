# Demo 8: Tietojen tallentaminen localStoragella

## Sisällysluettelo

- [1. Oppimistavoitteet](#1-oppimistavoitteet)
- [2. Kloonaus ja käynnistys](#2-kloonaus-ja-käynnistys)
- [3. Projektin rakenne alussa](#3-projektin-rakenne-alussa)
- [4. Tutoriaali](#4-tutoriaali)
  - [4.1 Projektin kopioiminen demosta 6](#41-projektin-kopioiminen-demosta-6)
  - [4.2 Tehtävien tallentaminen localStorageen](#42-tehtävien-tallentaminen-localstorageen)
  - [4.3 Tehtävien lukeminen käynnistyksessä](#43-tehtävien-lukeminen-käynnistyksessä)
- [5. Projektin rakenne lopussa](#5-projektin-rakenne-lopussa)
- [6. Yhteenveto](#6-yhteenveto)
- [7. Jatka harjoittelua](#7-jatka-harjoittelua)

## 1. Oppimistavoitteet

Tässä demossa jatketaan demon 6 tehtävälistasovellusta. Demossa 6 tehtävät olivat olemassa vain selaimen muistissa, joten sivun päivittäminen palautti listan alkutilaansa. Tässä demossa tehtävälista tallennetaan selaimen tallennustilaan aina, kun se muuttuu, ja luetaan sieltä sovelluksen käynnistyessä. Tehtävät säilyvät siksi, vaikka sivu päivitetään tai selain suljetaan. Kaikki muutokset tehdään `App`-komponenttiin. Demo kattaa seuraavat tekniikat:

- Valmiin projektin kopioiminen uuden demon pohjaksi ja projektikohtaisten asetusten muuttaminen
- Merkkijonon tallentaminen selaimen `localStorage`-tallennustilaan `setItem`-metodilla ja lukeminen `getItem`-metodilla
- Taulukon muuntaminen JSON-merkkijonoksi `JSON.stringify`-metodilla ja takaisin taulukoksi `JSON.parse`-metodilla
- Tilan tallentaminen Reactin ulkopuolelle `useEffect`-hookilla aina, kun tila muuttuu
- Tilan alkuarvon lukeminen tallennustilasta `useState`-hookin alkuarvofunktiolla
- Tallennettujen tietojen tarkasteleminen selaimen kehittäjätyökaluilla

## 2. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-08
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3008`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19, TypeScriptillä 6.x, MUI:n versiolla 9 ja React Routerin versiolla 8. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 3. Projektin rakenne alussa

Demo aloitetaan demon 6 valmiista sovelluksesta. Demo 6 kopioidaan uuteen `demo-08`-kansioon luvussa 4.1, joten projektin rakenne on alussa sama kuin [demon 6 lopussa](../demo-06/README.md#5-projektin-rakenne-lopussa).

```text
demo-08/
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

## 4. Tutoriaali

### 4.1 Projektin kopioiminen demosta 6

Tallentaminen lisätään valmiiseen sovellukseen, joten uutta projektia ei luoda projektipohjasta. Demon 6 kansio kopioidaan, ja kopion nimeksi annetaan `demo-08`. Kopion voi tehdä VS Coden Explorer-näkymässä tai terminaalissa demojen pääkansiossa:

```bash
cp -r demo-06 demo-08
```

Kopiossa on vielä demon 6 asetukset. Ne muutetaan, jotta demo 8 voi olla käynnissä samaan aikaan kuin demo 6 ja jotta selaimen välilehdellä näkyy oikea nimi:

- `package.json`-tiedoston `name`-kentän arvoksi muutetaan `"demo-08"`.
- `index.html`-tiedoston `<title>`-elementin tekstiksi muutetaan `demo-08`.
- `vite.config.ts`-tiedoston porttiasetus muutetaan demon numeron mukaiseksi.

```ts
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3008 // muutettu
  }
})
```

Kopioidut `README.md` ja `REFERENCE.md` ovat demon 6 ohjeita, eikä niitä tarvita sovelluksen toimintaan.

Riippuvuudet asennetaan ja kehityspalvelin käynnistetään `demo-08`-kansiossa:

```bash
npm install
npm run dev
```

`npm install` asentaa paketit `package.json`- ja `package-lock.json`-tiedostojen mukaan, joten kopio saa samat pakettiversiot kuin demo 6. Komento päivittää samalla `package-lock.json`-tiedostoon uuden projektinimen.

Sovellus avautuu osoitteeseen `http://localhost:3008` ja toimii kuten demo 6. Sovelluksen komponentit, reitit ja tila on selitetty [demon 6 README-tiedostossa](../demo-06/README.md). Tässä demossa muutetaan vain tiedostoa `src/App.tsx`, koska tehtävälista on `App`-komponentin tilassa. Näkymät saavat listan propseina ja ilmoittavat muutoksista `App`-komponentille, joten lista on yhdessä paikassa ja sen voi tallentaa sieltä.

Kun sivu päivitetään, lisätyt tehtävät katoavat ja lista palaa kolmeen esimerkkitehtävään. Tila on olemassa vain selaimen muistissa sovelluksen ollessa käynnissä, ja sivun päivittäminen käynnistää sovelluksen alusta.

### 4.2 Tehtävien tallentaminen localStorageen

Jotta tehtävät säilyisivät, ne pitää tallentaa johonkin, joka ei tyhjene sivun päivittyessä. Selain tarjoaa tähän **paikallisen tallennustilan** (local storage), jota käytetään JavaScriptistä `localStorage`-olion kautta. Tallennustila säilyttää tiedot myös selaimen sulkemisen jälkeen, kunnes ne poistetaan. Se on selaimen valmis rajapinta, joten pakettia ei tarvitse asentaa.

Tallennustila sisältää **avain-arvo-pareja** (key-value pairs) samaan tapaan kuin Pythonin sanakirja. Sekä avain että arvo ovat aina merkkijonoja. Arvo tallennetaan `setItem`-metodilla ja luetaan `getItem`-metodilla:

```ts
localStorage.setItem("tervehdys", "Hei");
const arvo = localStorage.getItem("tervehdys");
```

Jos avainta ei ole tallennettu, `getItem` palauttaa `null`. TypeScript tyypittää paluuarvon siksi muotoon `string | null`.

Tehtävälista on taulukko, jossa on olioita, joten sitä ei voi tallentaa sellaisenaan. Taulukko muunnetaan ensin merkkijonoksi **JSON-muotoon** (JavaScript Object Notation). JSON on tekstimuoto, joka näyttää lähes samalta kuin JavaScriptin taulukko- ja oliomerkintä. `JSON.stringify` muuntaa taulukon tai olion JSON-merkkijonoksi, ja `JSON.parse` muuntaa JSON-merkkijonon takaisin taulukoksi tai olioksi. Ne vastaavat Pythonin `json.dumps`- ja `json.loads`-funktioita. Esimerkiksi yhden tehtävän taulukosta tulee merkkijono `[{"id":"3f2a...","nimi":"Siivoa","tehty":false}]`.

Lista tallennetaan aina, kun se muuttuu. Tallennuskutsu voitaisiin kirjoittaa jokaiseen kolmeen tilaa muuttavaan funktioon, mutta silloin jokainen uusi funktio pitäisi muistaa täydentää samalla tavalla. Sen sijaan tallennus tehdään demosta 4 tutulla `useEffect`-hookilla, jonka riippuvuustaulukossa on `tehtavat`. Demossa 4 todettiin, että efektit on tarkoitettu ensisijaisesti synkronointiin Reactin ulkopuolisten järjestelmien kanssa. Selaimen tallennustila on tällainen järjestelmä. Efekti pitää sen sisällön samana kuin `tehtavat`-tilan.

`src/App.tsx`-tiedoston sisältö korvataan seuraavalla. Samalla sovelluksen pääotsikko muutetaan vastaamaan tätä demoa.

```tsx
import { useEffect, useState } from 'react'; // muutettu
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import Otsikko from './components/Otsikko';
import PoistaTehtava from './components/PoistaTehtava';
import Tehtavalista from './components/Tehtavalista';
import UusiTehtava from './components/UusiTehtava';
import type { Tehtava } from './types';

const App = () => {

  const [tehtavat, setTehtavat] = useState<Tehtava[]>([
    { id: crypto.randomUUID(), nimi: "Käy kaupassa", tehty: false },
    { id: crypto.randomUUID(), nimi: "Siivoa", tehty: true },
    { id: crypto.randomUUID(), nimi: "Ulkoiluta koiraa", tehty: false }
  ]);

  useEffect(() => { // uusi
    localStorage.setItem("tehtavalista", JSON.stringify(tehtavat)); // uusi
  }, [tehtavat]); // uusi

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

  const poistaTehtava = (id: string): void => {
    setTehtavat((edelliset: Tehtava[]) =>
      edelliset.filter((tehtava: Tehtava) => tehtava.id !== id)
    );
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">

        {/* muutettu */}
        <Otsikko>Demo 8: Tietojen tallentaminen</Otsikko>

        <Routes>
          <Route
            path="/"
            element={<Tehtavalista tehtavat={tehtavat} onMerkinta={merkitseTehdyksi} />}
          />
          <Route
            path="/uusi"
            element={<UusiTehtava onLisays={lisaaTehtava} />}
          />
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

Efekti suoritetaan ensimmäisen renderöinnin jälkeen ja sen jälkeen aina, kun `tehtavat` on muuttunut. Se muuntaa koko listan JSON-merkkijonoksi ja tallentaa sen avaimella `"tehtavalista"`. Lisäys, merkintä ja poisto tallentuvat siis kaikki samalla efektillä, koska jokainen niistä muuttaa `tehtavat`-tilaa. Aiemmin tallennettu arvo korvautuu aina uudella.

Tallennettua arvoa voi tarkastella selaimen kehittäjätyökaluissa, jotka avataan `F12`-näppäimellä. Chromessa ja Edgessä tallennustila löytyy välilehdeltä "Application" ja Firefoxissa välilehdeltä "Storage" kohdasta "Local Storage" → `http://localhost:3008`. Kun sovellukseen lisätään tehtävä, avaimen `tehtavalista` arvo päivittyy. Saman näkymän kautta arvon voi myös poistaa.

> ⚠️ **FACT-CHECK:** Kehittäjätyökalujen välilehtien nimiä ("Application", "Storage", "Local Storage") ei voi tarkistaa koodista, ja ne voivat vaihdella selainversion ja kieliasetuksen mukaan. Tarkista nykyisillä Chrome-, Edge- ja Firefox-versioilla.

Tässä vaiheessa sivun päivittäminen kadottaa vielä lisätyt tehtävät. Tila alkaa jälleen kolmesta esimerkkitehtävästä, ja efekti tallentaa ne ensimmäisen renderöinnin jälkeen aiemmin tallennettujen tehtävien päälle. Tallennettujen tehtävien lukeminen lisätään seuraavassa vaiheessa.

> [!NOTE]
> Kehitystilassa `StrictMode` suorittaa efektin käynnistyksen yhteydessä kaksi kertaa. Se ei haittaa tässä, koska molemmat suorituskerrat tallentavat saman arvon.

> [!NOTE]
> Tallennustila on erillinen jokaiselle **alkuperälle** (origin), joka muodostuu protokollasta, palvelimen nimestä ja portista. Osoitteet `http://localhost:3006` ja `http://localhost:3008` ovat eri alkuperiä, joten demojen tallennetut tiedot pysyvät erillään.

Aiheesta lisää: [MDN:n `localStorage`-dokumentaatio](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [MDN:n JSON-dokumentaatio](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON) ja [Reactin dokumentaatio efekteistä ja ulkoisista järjestelmistä](https://react.dev/learn/synchronizing-with-effects).

### 4.3 Tehtävien lukeminen käynnistyksessä

Tallennetut tehtävät täytyy lukea tilaan ennen kuin efekti ehtii tallentaa mitään. Siksi lukeminen tehdään tilan alkuarvossa. `useState` hyväksyy alkuarvoksi myös funktion, jota kutsutaan **alkuarvofunktioksi** (initializer function). React kutsuu alkuarvofunktiota vain komponentin ensimmäisellä renderöinnillä ja käyttää sen paluuarvoa tilan alkuarvona.

Tiedostossa `src/App.tsx` kolmen esimerkkitehtävän taulukko korvataan alkuarvofunktiolla:

```tsx
const App = () => {

  const [tehtavat, setTehtavat] = useState<Tehtava[]>(() => { // muutettu
    const tallennetut = localStorage.getItem("tehtavalista"); // uusi
    return tallennetut ? JSON.parse(tallennetut) : []; // uusi
  }); // uusi

  useEffect(() => {
    localStorage.setItem("tehtavalista", JSON.stringify(tehtavat));
  }, [tehtavat]);

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

  const poistaTehtava = (id: string): void => {
    setTehtavat((edelliset: Tehtava[]) =>
      edelliset.filter((tehtava: Tehtava) => tehtava.id !== id)
    );
  };

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">

        <Otsikko>Demo 8: Tietojen tallentaminen</Otsikko>

        <Routes>
          <Route
            path="/"
            element={<Tehtavalista tehtavat={tehtavat} onMerkinta={merkitseTehdyksi} />}
          />
          <Route
            path="/uusi"
            element={<UusiTehtava onLisays={lisaaTehtava} />}
          />
          <Route
            path="/poista/:id"
            element={<PoistaTehtava tehtavat={tehtavat} onPoisto={poistaTehtava} />}
          />
        </Routes>

      </Container>
    </>
  );
};

// ... muu tiedosto ennallaan
```

Alkuarvofunktio lukee avaimen `"tehtavalista"` arvon. Ehdollinen lauseke tarkistaa, löytyikö arvo. Jos löytyi, `JSON.parse` muuntaa merkkijonon takaisin tehtävien taulukoksi. Jos arvoa ei ole, `getItem` palauttaa `null`, ja tila saa alkuarvoksi tyhjän taulukon. Näin käy sovelluksen ensimmäisellä käynnistyskerralla. Esimerkkitehtäviä ei enää tarvita, koska lista koostuu käyttäjän omista tallennetuista tehtävistä.

Alkuarvofunktio annetaan `useState`-hookille funktiona eikä funktion paluuarvona. Komponentti renderöidään uudelleen jokaisen tilamuutoksen jälkeen, mutta React kutsuu alkuarvofunktiota vain ensimmäisellä kerralla. Tallennustilaa ei siis lueta turhaan jokaisella renderöinnillä.

Lukemista ei tehdä efektissä, koska efekti suoritetaan vasta renderöinnin jälkeen. Lista näkyisi silloin ensin tyhjänä, ja komponentti renderöitäisiin heti uudelleen luetuilla tehtävillä. Alkuarvofunktio antaa tallennetut tehtävät tilaan jo ensimmäistä renderöintiä varten. Siksi tallentava efekti tallentaa ensimmäisellä suorituskerrallaan saman listan, joka juuri luettiin.

Sovelluksen toiminta tarkistetaan lisäämällä muutama tehtävä, merkitsemällä jokin niistä tehdyksi ja päivittämällä sivu `F5`-näppäimellä. Tehtävät ja niiden tehty-tila säilyvät. Demossa 6 tehtävät saivat uudet `id`-arvot jokaisella päivityksellä. Nyt `id`-arvot luetaan tallennustilasta, joten poistonäkymän osoite `/poista/<id>` osoittaa samaan tehtävään myös päivityksen jälkeen.

> [!NOTE]
> `JSON.parse` palauttaa TypeScriptissä tyypin `any`, joten TypeScript ei tarkista, että tallennettu tieto on oikeasti `Tehtava`-taulukko. Tila saa tyypin `useState<Tehtava[]>`-määrittelystä. Jos tallennustilassa on virheellistä JSON-tekstiä, `JSON.parse` aiheuttaa virheen, eikä sovellus käynnisty. Kehitystilassa `StrictMode` kutsuu myös alkuarvofunktiota kaksi kertaa, mikä ei haittaa, koska funktio vain lukee tallennustilaa.

Aiheesta lisää: [Reactin `useState`-dokumentaatio alkuarvofunktiosta](https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state).

## 5. Projektin rakenne lopussa

Tiedostorakenne on sama kuin alussa, koska muutokset tehtiin olemassa oleviin tiedostoihin.

```text
demo-08/
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

- Valmiin projektin kopioiminen uuden demon pohjaksi ja sen nimen ja portin muuttaminen
- Merkkijonon tallentaminen selaimen tallennustilaan `localStorage.setItem`-metodilla ja lukeminen `getItem`-metodilla
- Taulukon muuntaminen JSON-merkkijonoksi ja takaisin `JSON.stringify`- ja `JSON.parse`-metodeilla
- Tilan tallentaminen `useEffect`-hookilla aina, kun tila muuttuu
- Tallennettujen tietojen lukeminen tilaan `useState`-hookin alkuarvofunktiolla, ja
- Tallennustilan sisällön tarkasteleminen selaimen kehittäjätyökaluissa.

---

## 7. Jatka harjoittelua

- Lisää aloitusnäkymään painike "Tyhjennä lista", joka poistaa kaikki tehtävät. `App`-komponenttiin riittää uusi funktio, joka asettaa tilaksi tyhjän taulukon. `localStorage`-kutsua ei tarvita, koska efekti tallentaa muuttuneen tilan.
- Kirjoita kehittäjätyökaluissa avaimen `tehtavalista` arvoksi virheellistä JSON-tekstiä, esimerkiksi `abc`, ja päivitä sivu. Korjaa alkuarvofunktio niin, että se palauttaa tyhjän taulukon, jos `JSON.parse` aiheuttaa virheen. JavaScriptin `try...catch` toimii kuten Pythonin `try...except`.
- Näytä alkuarvofunktiossa demon 6 kolme esimerkkitehtävää, jos tallennustilassa ei ole vielä mitään. Ehdollisen lausekkeen jälkimmäiseksi vaihtoehdoksi tyhjän taulukon tilalle käy sama taulukko, joka oli tilan alkuarvona luvussa 4.2.
