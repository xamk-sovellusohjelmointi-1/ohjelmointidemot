# Demo 3: React-komponentit ja propsit

## 2. Sisällysluettelo

- [3. Oppimistavoitteet](#3-oppimistavoitteet)
- [4. Kloonaus ja käynnistys](#4-kloonaus-ja-käynnistys)
- [5. Projektin rakenne alussa](#5-projektin-rakenne-alussa)
- [6. Tutoriaali](#6-tutoriaali)
  - [6.1 Otsikko-komponentti ja propsit](#61-otsikko-komponentti-ja-propsit)
  - [6.2 Sivu-komponentti ja tyylit](#62-sivu-komponentti-ja-tyylit)
  - [6.3 Yhteenveto-komponentti ja tila](#63-yhteenveto-komponentti-ja-tila)
  - [6.4 Laskurinappi-komponentti](#64-laskurinappi-komponentti)
  - [6.5 Laskurinapit taulukosta](#65-laskurinapit-taulukosta)
- [7. Projektin rakenne lopussa](#7-projektin-rakenne-lopussa)
- [8. Yhteenveto](#8-yhteenveto)
- [10. Jatka harjoittelua](#10-jatka-harjoittelua)

## 3. Oppimistavoitteet

Tässä demossa sovellus jaetaan useaan omaan komponenttiin, ja komponenttien välillä välitetään tietoa propseilla. Esimerkkinä rakennetaan liikennelaskuri, jossa jokaisella kulkuneuvotyypillä on oma laskurinappinsa ja sivulla näytetään kaikkien laskettujen kulkuneuvojen yhteismäärä. Demo kattaa seuraavat tekniikat:

- Komponentin sijoittaminen omaan tiedostoonsa sekä sen vienti (`export`) ja tuonti (`import`)
- Propsien tyypittäminen TypeScript-rajapinnalla ja niiden purkaminen komponentin parametreissa
- Valinnainen propsi, unionityyppi ja propsin oletusarvo
- `children`-propsi, jolla komponentin sisään välitetään tekstiä tai muita elementtejä
- Funktion välittäminen propsina, jolla lapsikomponentti päivittää emokomponentin tilaa
- Komponentin oma tila, joka on jokaisella komponentin ilmentymällä erillinen
- CSS-luokkien käyttö `className`-attribuutilla

## 4. Kloonaus ja käynnistys

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
cd ohjelmointidemot/demo-03
npm install
npm run dev
```

Sovellus käynnistyy osoitteeseen `http://localhost:3003`.

Tutoriaali on kirjoitettu Vite 8:lla, Reactilla 19 ja TypeScriptillä 6.x. TypeScriptistä on julkaistu tämän jälkeen pääversio 7, joten uudemman version asentaneella komennot, asetukset tai tyypitys saattavat poiketa tässä esitetystä.

## 5. Projektin rakenne alussa

Demo aloitetaan uudesta, siivotusta Vite + React + TypeScript -projektipohjasta, jonka portiksi on asetettu `3003`. Projektin luominen ja ylimääräisten tiedostojen siivoaminen on kuvattu [demo 1:n README-tiedostossa](../demo-01/README.md#61-projektin-luominen).

```text
demo-03/
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

### 6.1 Otsikko-komponentti ja propsit

Ensimmäiseksi tehdään otsikoille oma komponentti, koska se on sovelluksen yksinkertaisin osa eikä se tarvitse tilaa. Omat komponentit sijoitetaan `src/components`-kansioon, joka luodaan `src`-kansion sisään. Kansioon lisätään tiedosto `Otsikko.tsx`:

```tsx
// uusi tiedosto: src/components/Otsikko.tsx
interface Props {
  children: string;
  taso?: "iso" | "keski" | "pieni";
}

const Otsikko = ({ children, taso = "keski" }: Props) => {
  switch (taso) {
    case "iso":
      return <h1>{children}</h1>;
    case "keski":
      return <h2>{children}</h2>;
    case "pieni":
      return <h3>{children}</h3>;
  }
};

export default Otsikko;
```

**Propsit** (props) ovat tietoja, jotka komponentille annetaan JSX:ssä attribuutteina samaan tapaan kuin HTML-elementille annetaan attribuutteja. Propsien muoto määritellään TypeScript-rajapinnalla `Props`, kuten demo 2:ssa määriteltiin `Tehtava`-olion muoto. Komponentti saa propsit yhtenä oliona, joka puretaan parametrilistassa muuttujiksi `children` ja `taso`. Parametrin aaltosulkeet ovat olion **purkamista** (destructuring), joka on lyhyempi tapa kirjoittaa `props.children` ja `props.taso`.

`children` on Reactin erityinen propsi, joka sisältää komponentin avaavan ja sulkevan tagin väliin kirjoitetun sisällön. Tässä se on tyypitetty merkkijonoksi, koska otsikon sisältö on aina tekstiä.

Kysymysmerkki nimessä `taso?` tekee propsista **valinnaisen** (optional), jolloin sitä ei ole pakko antaa. Tyyppi `"iso" | "keski" | "pieni"` on **unionityyppi** (union type), joka sallii vain nämä kolme merkkijonoa. Jos komponentille annetaan jokin muu arvo, TypeScript ilmoittaa virheestä jo editorissa. Parametrilistan `taso = "keski"` antaa propsille **oletusarvon** (default value), jota käytetään, kun propsia ei anneta. `switch`-rakenne palauttaa tason mukaisen otsikkoelementin.

Tiedoston viimeinen rivi `export default Otsikko` on komponentin **vienti** (export). Sen ansiosta komponentti voidaan **tuoda** (import) toiseen tiedostoon, kuten `App.tsx`-tiedostoon. `App.tsx`-tiedoston sisältö korvataan seuraavalla. Komponentin runko on sama kuin demojen 1 ja 2 `App`-komponentissa, ja uudet rivit on merkitty kommentilla.

```tsx
import './App.css';
import Otsikko from './components/Otsikko'; // uusi

const App = () => {

  return (
    <>
      {/* uusi: kaksi Otsikko-komponenttia */}
      <Otsikko taso="iso">Demo 3: React-komponentit ja propsit</Otsikko>
      <Otsikko>Liikennelaskuri</Otsikko>
    </>
  );
};

export default App;
```

Ensimmäinen otsikko saa propsin `taso="iso"`, joten se näytetään `<h1>`-elementtinä. Toiselle otsikolle ei anneta tasoa, joten se saa oletusarvon `"keski"` ja näytetään `<h2>`-elementtinä. Tagien väliin kirjoitettu teksti välittyy komponentille `children`-propsina.

Aiheesta lisää: [Reactin dokumentaatio propsien välittämisestä](https://react.dev/learn/passing-props-to-a-component) ja [Reactin dokumentaatio komponenttien viennistä ja tuonnista](https://react.dev/learn/importing-and-exporting-components).

### 6.2 Sivu-komponentti ja tyylit

Seuraavaksi koko sivun sisältö kootaan yhden `Sivu`-komponentin sisään, jotta sivun leveys määritellään yhdessä paikassa. `Sivu` tehdään ennen muita komponentteja, koska kaikki myöhemmin lisättävät osat sijoitetaan sen sisään.

```tsx
// uusi tiedosto: src/components/Sivu.tsx
interface Props {
  children: React.ReactNode;
}

const Sivu = ({ children }: Props) => {
  return (
    <div className="sivu">
      {children}
    </div>
  );
};

export default Sivu;
```

`Sivu`-komponentin `children` on tyypiltään `React.ReactNode`, joka kattaa kaikki JSX:ssä näytettävät arvot, kuten elementit, komponentit, tekstin ja numerot. Tyyppiä tarvitaan, koska `Sivu`-komponentin sisään sijoitetaan useita erilaisia komponentteja. `React.ReactNode` on käytettävissä ilman erillistä tuontia.

Aiheesta lisää: [Reactin TypeScript-dokumentaatio](https://react.dev/learn/typescript).

Elementin CSS-luokka annetaan JSX:ssä `className`-attribuutilla, koska `class` on JavaScriptin varattu sana. Sovelluksen kaikki tyylit kirjoitetaan `App.css`-tiedostoon, jonka sisältö korvataan kokonaan seuraavalla. Luokat `yhteenveto` ja `laskurinappi` otetaan käyttöön seuraavissa vaiheissa.

```css
.sivu {
  max-width: 900px;
  margin: auto;
}

.yhteenveto {
  border: solid 1px #ccc;
  padding: 20px;
  width: 300px;
  font-weight: bold;
}

.laskurinappi {
  display: block;
  width: 342px;
  padding: 15px 20px;
  margin-bottom: 5px;
  border: solid 1px #aaa;
  border-radius: 5px;
  background-color: rgb(46, 80, 192);
  color: white;
  text-align: left;
  font-family: inherit;
  font-size: 16px;
  cursor: pointer;
}

.laskurinappi:hover {
  background-color: rgb(105, 135, 235);
}

.laskurinappi:active {
  background-color: rgb(20, 47, 138);
}
```

`App`-komponentin fragmentti `<>...</>` korvataan `Sivu`-komponentilla:

```tsx
import './App.css';
import Sivu from './components/Sivu'; // uusi
import Otsikko from './components/Otsikko';

const App = () => {

  return (
    <Sivu>
      {/* muutettu: fragmentti korvattu Sivu-komponentilla */}
      <Otsikko taso="iso">Demo 3: React-komponentit ja propsit</Otsikko>
      <Otsikko>Liikennelaskuri</Otsikko>
    </Sivu>
  );
};

export default App;
```

> [!NOTE]
> `.laskurinappi`-luokan leveys on 342 pikseliä, vaikka `.yhteenveto`-luokan leveys on 300 pikseliä. Selaimet laskevat painikkeen leveyteen mukaan reunukset ja sisävälin, mutta kappaleen leveyteen ne lisätään erikseen. Tästä syystä molemmat laatikot näkyvät sivulla yhtä leveinä.

### 6.3 Yhteenveto-komponentti ja tila

Kulkuneuvojen yhteismäärä tallennetaan `App`-komponentin tilaan, koska sekä yhteenveto että laskurinapit tarvitsevat sitä. Tila ja sitä näyttävä `Yhteenveto` tehdään ennen laskurinappeja, jotta napeilla on valmiina tila, jota ne päivittävät.

```tsx
// uusi tiedosto: src/components/Yhteenveto.tsx
interface Props {
  yhteensa: number;
}

const Yhteenveto = ({ yhteensa }: Props) => {
  return (
    <p className="yhteenveto">Kulkuneuvoja yhteensä: {yhteensa}</p>
  );
};

export default Yhteenveto;
```

```tsx
import { useState } from 'react'; // uusi
import './App.css';
import Sivu from './components/Sivu';
import Otsikko from './components/Otsikko';
import Yhteenveto from './components/Yhteenveto'; // uusi

const App = () => {

  const [yhteensa, setYhteensa] = useState<number>(0); // uusi

  return (
    <Sivu>
      <Otsikko taso="iso">Demo 3: React-komponentit ja propsit</Otsikko>
      <Otsikko>Liikennelaskuri</Otsikko>

      {/* uusi */}
      <Yhteenveto yhteensa={yhteensa} />
    </Sivu>
  );
};

export default App;
```

`App` välittää tilamuuttujan arvon `Yhteenveto`-komponentille `yhteensa`-propsina. Aaltosulkeet attribuutin ympärillä välittävät JavaScript-arvon, kun taas lainausmerkit välittävät pelkän tekstin, kuten `taso="iso"`. Tieto kulkee propseissa aina **emokomponentilta** (parent component) **lapsikomponentille** (child component). Kun `yhteensa`-tila muuttuu, `App` piirretään uudelleen ja `Yhteenveto` saa propsina uuden arvon. `Yhteenveto`-tagi suljetaan heti kauttaviivalla (`/>`), koska sen sisään ei kirjoiteta sisältöä.

> [!NOTE]
> Editori ilmoittaa tässä vaiheessa virheen `'setYhteensa' is declared but its value is never read`, koska päivitysfunktiota ei vielä käytetä missään. Virhe poistuu seuraavassa vaiheessa, kun `setYhteensa` otetaan käyttöön.

### 6.4 Laskurinappi-komponentti

Laskurinappi tehdään viimeisenä, koska se tarvitsee sekä oman tilan että funktion, jolla `App`-komponentin tilaa päivitetään.

```tsx
// uusi tiedosto: src/components/Laskurinappi.tsx
import { useState } from 'react';

interface Props {
  children: string;
  onPainallus: () => void;
}

const Laskurinappi = ({ children, onPainallus }: Props) => {

  const [laskuri, setLaskuri] = useState<number>(0);

  const painettu = (): void => {
    setLaskuri(laskuri + 1);
    onPainallus();
  }

  return (
    <button className="laskurinappi" onClick={painettu}>
      {children} ({laskuri})
    </button>
  );
};

export default Laskurinappi;
```

`Laskurinappi` laskee omat painalluksensa `laskuri`-tilaan. Jokainen komponentin **ilmentymä** (instance) saa oman erillisen tilansa, joten jokaisen sivulla olevan napin laskuri kasvaa vain sitä nappia painettaessa.

Aiheesta lisää: [Reactin dokumentaatio komponentin omasta tilasta](https://react.dev/learn/state-a-components-memory#state-is-isolated-and-private).

`onPainallus`-propsin tyyppi `() => void` tarkoittaa funktiota, joka ei ota parametreja eikä palauta arvoa. `painettu`-funktio kasvattaa napin omaa laskuria ja kutsuu sen jälkeen propsina saatua funktiota. Funktion sisältö määritellään `App`-komponentissa, joten nappi voi päivittää yhteismäärää, vaikka tila on `App`-komponentissa. Tätä kutsutaan **tilan nostamiseksi** (lifting state up). Tapahtumiin reagoivien propsien nimet aloitetaan Reactissa sopimuksen mukaan `on`-etuliitteellä.

Aiheesta lisää: [Reactin dokumentaatio tilan jakamisesta komponenttien välillä](https://react.dev/learn/sharing-state-between-components).

`App`-komponenttiin lisätään yhteismäärää kasvattava `lisaaYksi`-funktio ja yksi laskurinappi:

```tsx
import { useState } from 'react';
import './App.css';
import Sivu from './components/Sivu';
import Otsikko from './components/Otsikko';
import Yhteenveto from './components/Yhteenveto';
import Laskurinappi from './components/Laskurinappi'; // uusi

const App = () => {

  const [yhteensa, setYhteensa] = useState<number>(0);

  const lisaaYksi = (): void => { // uusi
    setYhteensa(yhteensa + 1); // uusi
  } // uusi

  return (
    <Sivu>
      <Otsikko taso="iso">Demo 3: React-komponentit ja propsit</Otsikko>
      <Otsikko>Liikennelaskuri</Otsikko>

      <Yhteenveto yhteensa={yhteensa} />

      {/* uusi */}
      <Laskurinappi onPainallus={lisaaYksi}>Henkilöauto</Laskurinappi>
    </Sivu>
  );
};

export default App;
```

Funktio välitetään propsina ilman sulkeita (`lisaaYksi`), jolloin propsin arvoksi tulee itse funktio eikä sen paluuarvo. Napin painaminen kasvattaa nyt sekä napin omaa laskuria että yhteenvedon lukua.

### 6.5 Laskurinapit taulukosta

Loput napit muodostetaan kulkuneuvojen nimet sisältävästä taulukosta `map()`-metodilla samalla tavalla kuin demo 2:n tehtävälistassa. Taulukko määritellään komponentin ulkopuolella, koska sen sisältö ei muutu.

```tsx
import { useState } from 'react';
import './App.css';
import Sivu from './components/Sivu';
import Otsikko from './components/Otsikko';
import Yhteenveto from './components/Yhteenveto';
import Laskurinappi from './components/Laskurinappi';

const kulkuneuvot: string[] = [ // uusi
  "Henkilöauto", // uusi
  "Pakettiauto", // uusi
  "Linja-auto", // uusi
  "Kuorma-auto tai rekka", // uusi
  "Polkupyörä", // uusi
  "Moottoripyörä", // uusi
  "Sähköpotkulauta", // uusi
  "Muu kulkuneuvo" // uusi
]; // uusi

const App = () => {

  const [yhteensa, setYhteensa] = useState<number>(0);

  const lisaaYksi = (): void => {
    setYhteensa(yhteensa + 1);
  }

  return (
    <Sivu>
      <Otsikko taso="iso">Demo 3: React-komponentit ja propsit</Otsikko>
      <Otsikko>Liikennelaskuri</Otsikko>

      <Yhteenveto yhteensa={yhteensa} />

      {/* muutettu: yksittäinen nappi korvattu map()-kutsulla */}
      {kulkuneuvot.map((kulkuneuvo: string) => {
        return (
          <Laskurinappi key={kulkuneuvo} onPainallus={lisaaYksi}>
            {kulkuneuvo}
          </Laskurinappi>
        );
      })}
    </Sivu>
  );
};

export default App;
```

Jokainen nappi saa saman `lisaaYksi`-funktion, mutta oman nimensä `children`-propsina. Avaimena (`key`) käytetään kulkuneuvon nimeä, koska nimet ovat taulukossa uniikkeja. Taulukon indeksiä ei suositella avaimeksi, koska indeksit vaihtuvat, jos alkioiden järjestys muuttuu.

Aiheesta lisää: [Reactin dokumentaatio avaimista](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key).

## 7. Projektin rakenne lopussa

```text
demo-03/
├── src/
│   ├── components/
│   │   ├── Laskurinappi.tsx
│   │   ├── Otsikko.tsx
│   │   ├── Sivu.tsx
│   │   └── Yhteenveto.tsx
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

- Sovelluksen jakaminen omiin komponentteihin ja tiedostoihin
- Propsien tyypittäminen rajapinnalla ja niiden purkaminen parametreissa
- Valinnaiset propsit, unionityypit ja oletusarvot
- `children`-propsin käyttö tekstin ja muiden komponenttien välittämiseen
- Komponentin oma tila ja emokomponentin tilan päivittäminen propsina välitetyllä funktiolla, ja
- Komponenttien muodostaminen taulukosta `map()`-metodilla.

---

## 10. Jatka harjoittelua

- Näytä yhteenvedon alla, mitä kulkuneuvoa painettiin viimeksi. Muuta `onPainallus`-propsin tyypiksi `(nimi: string) => void` ja kutsu sitä napissa arvolla `children`. Tallenna nimi `App`-komponentissa uuteen tilaan.
- Lisää painike, joka nollaa yhteismäärän. Huomaa, että nappien omat laskurit eivät nollaudu, koska niiden tila on jokaisessa napissa erikseen. Mieti, mihin komponenttiin laskurien tila pitäisi siirtää, jotta kaikki luvut voisi nollata kerralla.
- Lisää `Yhteenveto`-komponenttiin ehdollisesti näytettävä teksti, joka ilmoittaa, kun kulkuneuvoja on laskettu vähintään 20.
