# Demo 1: React ja Vite tutuksi

Aloitetaan opiskelu tutustumalla React-kirjaston käyttöön ja React-projektin alustamiseen Vite -rakennustyökalulla (build tool). Demossa rakennetaan hieman monimutkaisempi "Hello World!" -sovellus, jossa opetellaan React-komponentin rakennetta, tilamuuttujia ja tulostusta.

## Sisällysluettelo
 
- [1. Uuden React-sovelluksen luominen Vite -rakennustyökalulla](#1-uuden-react-sovelluksen-luominen-vite--rakennustyökalulla)
- [2. React-komponentin alustus ja Reactin toiminta Vitellä rakennetussa sovelluksessa](#2-react-komponentin-alustus-ja-reactin-toiminta-vitellä-rakennetussa-sovelluksessa)
- [3. Vite-projektin muut tiedostot](#3-vite-projektin-muut-tiedostot)
- [4. Hello World! -sovelluksen rakentaminen](#4-hello-world--sovelluksen-rakentaminen)
  - [4.1 Sisällön tulostaminen React-komponentilla selaimeen](#41-sisällön-tulostaminen-react-komponentilla-selaimeen)
  - [4.2 Tilamuuttujat ja useState](#42-tilamuuttujat-ja-usestate)
  - [4.3 Painikkeen luominen Reactissa](#43-painikkeen-luominen-reactissa)
  - [4.4 Ehdollinen tulostus](#44-ehdollinen-tulostus)
  - [4.5 Käyttäjän syötteen kerääminen ja tilamuuttujan päivittäminen syötteestä](#45-käyttäjän-syötteen-kerääminen-ja-tilamuuttujan-päivittäminen-syötteestä)
  - [4.6 Nimen tarkistus ja tervehdyksen muotoilu](#46-nimen-tarkistus-ja-tervehdyksen-muotoilu)
  - [4.7 Tyylien lisääminen React-komponenttiin ja loppusilaukset](#47-tyylien-lisääminen-react-komponenttiin-ja-loppusilaukset)
- [5 Lopuksi](#5-lopuksi)

**Projektin asentaminen ja käynnistäminen**

Kun olet kloonannut demon omalle koneellesi, voit käynnistää sen avaamalla VS Coden Terminalin demon sijainnissa ja suorittamalla Noden asennuskomennon

```bash
npm install
```

ja käynnistämällä kehityspalvelimen

```bash
npm run dev
```

## 1 Uuden React-sovelluksen luominen Vite -rakennustyökalulla

Käydään lyhyesti läpi vaiheet, joilla uusi React-sovellus alustetaan. Ohjeet perustuvat [Viten dokumentaatioon](https://vite.dev/guide/ "https://vite.dev/guide/"). Tässä ja tulevissa demoissa React-sovelluksia ohjelmoidaan TypeScript-ohjelmointikielellä, jonka takia Vite-sovellus alustetaan React-TypeScript -mallipohjaan.

Avaa VS Code uuteen tyhjään kansioon koneellasi. Avaa VS Coden Terminal ja suorita komento:

```bash
npm create vite@latest . -- --template react-ts
```

Komento luo kansioon uuden React-projektin, jonka kielenä käytetään TypeScriptiä. Komento purettuna:

- `npm create vite@latest`: Kutsutaan Noden paketinhallintaohjelman `create`-komentoa ja luodaan uusi Vite-sovellus viimeisimmällä saatavilla olevalla versiolla.
- `.`: Seuraavaksi tulisi projektin nimi. Jos nimen sijaan kirjoitetaan piste, Vite-projektin nimeksi tulee VS Codessa auki olevan kansion nimi. Tähän voi myös itse kirjoittaa oman haluamansa projektin nimen.
- `-- --template react-ts`: Kirjoitetaan lisäkomentona, että käytetään sovelluksen luomiseen pohjana (template) react-ts -mallipohjaa, joka määrittää tarvittavat tiedostot TypeScript-ohjelmointiin.

Vite kysyy tässä vaiheessa käyttäjältä listan kysymyksiä osana asennusprojektia. Kaikkiin voi vastata oletusarvoilla, eli painella Enteriä kunnes Vite alkaa lataamaan tarvittavia tiedostoja netistä ja asentamaan projektia. Demojen kannalta eri asennusvaihtoehdoilla, kuten "Linterin" valinnalla ei ole väliä.

Viten tulisi asentaa projektin tarvitsemat riippuvuudet automaattisesti ja käynnistää kehityspalvelin. Jos näin ei tapahdu, voit asentaa riippuvuudet itse komennolla 

```bash
npm install
```

...ja käynnistää kehityspalvelimen

```bash
npm run dev
```

Terminaaliin tulee tulostus onnistuneesta asennuksesta ja painettava linkki käynnissä olevaan React-sovellukseen. Painamalla linkkiä avautuu selaimeen tai VS Coden preview-ikkunaan näkymä Viten luomasta React-sovelluksen pohjasta.

Kehityspalvelimen voi sammuttaa painamalla `Ctrl+C` ja käynnistää uudelleen komennolla:

```bash
npm run dev
```

## 2 React-komponentin alustus ja Reactin toiminta Vitellä rakennetussa sovelluksessa

Viten luomassa React-projektissa on oletuksena vain yksi React-komponentti [`./src/App.tsx`](./src/App.tsx). Vite luo `App`-komponenttiin valmiin näkymän, jonka rakennetta voi tutkia selaamalla komponentin koodeja. On kuitenkin helpompaa havainnollistaa React-komponentin perusrakennetta poistamalla kaikki ylimääräinen `App`-komponentista.

```tsx
// React-komponentti yksinkertaisimmillaan
function App() {

  return(
      <p>Heippa maailma!</p>
  );
}

export default App;
```

React-komponentti koostuu siis funktiosta, joka palauttaa HTML:ää muistuttavaa JSX-koodia. Komponentti ei itsessään tee vielä mitään, vaan se pitää määrittää vietäväksi (`export default KomponentinNimi`), jonka jälkeen se tuodaan (import) ja renderöidään Reactin "juuressa" tai muussa ylemmän tason komponentissa, joka on puolestaan tuotu juureen. Vite luo Reactin juuren `main.tsx`-tiedostoon:

```tsx
// main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
```

Yllä olevassa esimerkissä tehdään perinteistä JavaScript-ohjelmointia muistuttava kutsu, jossa haetaan HTML-dokumentin elementtiä id:llä 'root'. Jos HTML-elementti löytyy, siihen tulostetaan `render()`-metodin argumentteina annetut React-komponentit. Näin React rakentuu ja React-komponenteissa määritelty sisältö saadaan näkymään selaimessa. Tarkastellaan vielä HTML-tiedostoa, jonka 'root'-elementtiin yllä viitataan.

```html
<!doctype html>
<html lang="en">
  <head>
    ...
  </head>
  <body>

    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>

  </body>
</html>
```

HTML-tiedosto sisältää yhden `<div>`-elementin ja `<script>` tagin. Jos olet aiemmin ohjelmoinut HTML:ää tai JavaScriptiä, tunnistat "divin" ns. tyhjäksi elementiksi, jonka sisään voidaan kirjoittaa muuta HTML:ää. `<script>`-elementti muodostaa viittauksen johonkin JavaScript-ohjelmaan, jolla dokumenttia hallitaan. Tässä tapauksessa `main.tsx`-tiedostoon. Vite luo automaattisesti React-sovellukseen etusivuksi HTML-tiedoston, johon se liittää kaikki React-sovelluksessa tarvittavat viittaukset. `main.tsx` kutsuu HTML:n "root"-elementtiä, ja tulostaa siihen `render()`-komennolla kaikki annetut React-komponentit, jotka sitten näkyvät selaimessa.

>[!NOTE]
> Tiivistettynä voidaan siis todeta, että Reactissa varsinaista HTML-sivua ei tarvitse käydä itse rakentamaan ja hallitsemaan kirjoittamalla JavaScriptiä, vaan kaikki sovelluksen käyttöliittymään liittyvät rakenteet ja toiminnot ohjelmoidaan React-komponentteihin, jotka automaattisesti tulostetaan selaimella näytettävälle sivulle. React myös hoitaa automaattisesti kaikki käyttöliittymässä tapahtuvat päivitykset, jolloin dokumenttien hallinnan sijaan voidaan keskittyä kirjoittamaan määritelmät sille, miltä sivun tulisi näyttää missäkin vaiheessa.

## 3 Vite-projektin muut tiedostot

Vite luo asennuksen yhteydessä projektiin paljon muitakin tiedostoja, joista suurin osa on sovelluksen kehittämiseen ja suorittamiseen tarvittavia tiedostoja. Näihin ei tarvitse tai pidäkään puuttua. Vite-projektiin tulee myös joitain muita tarpeettomia tiedostoja, jotka liittyvät lähinnä esimerkkisovelluksen tyyleihin ja medialiitteisiin, joiden voi myös antaa olla. Demossa ylimääräiset tiedostot on poistettu ja voit verrata itse luomasi oletusprojektin rakennetta demon muokattuun rakenteeseen.

## 4 Hello World! -sovelluksen rakentaminen

Katsotaan seuraavaksi, miten demon "Hello World!" -sovellus rakentuu. Samalla esitellään Reactin peruskäsitteitä.

### 4.1 Sisällön tulostaminen React-komponentilla selaimeen

Kuten yllä mainittiin, React hoitaa automaattisesti komponentteihin kirjoitettujen käyttöliittymien kääntämisen ja tulostamisen lopulliseen HTML-näkymään selaimessa.

Katsotaan aluksi, miten React-komponenttiin kirjoitetaan sisältöä, joka tulostetaan selaimeen. Tulostettavat sisällöt kirjoitetaan komponentin palautukseen (return). Komponentti palauttaa HTML:ää muistuttavaa JSX-koodia, jolla on tiettyjä eroavaisuuksia mm. syntaksin kirjoittamisen osalta. Katsotaan eroja sitä mukaa kun niitä tulee.

```tsx
// Funktio voidaan kirjoittaa myös perinteisen function -kirjoitustavan lisäksi nuolifunktiona
const App = () => {
  return(
    <>
      <h1>Demo 1: React ja Vite tutuksi</h1>
      <h2>Heippa maailma!</h2>
    </>
  );
}
```

Komponentti tulostaa kaksi h-otsikkoa rinnakkain. React-komponentti voi palauttaa ylimmällä tasolla vain yhden JSX-elementin. Jos komponentissa halutaan tulostaa rinnakkain useampia elementtejä, ne pitää upottaa tyhjän React.Fragment -tagin (`<></>`) sisään lapsielementteinä. Muuten tulee virheitä, joista VS Code kyllä ilmoittaa.

Jos tallennat komponentin ja päivität sivun, sinne pitäisi ilmestyä kaksi otsikkoa allekkain.

### 4.2 Tilamuuttujat ja useState

Keskeisenä Reactiin liittyy [tilan](https://react.dev/learn/state-a-components-memory "https://react.dev/learn/state-a-components-memory") käsite. Komponentilla on aina jokin tila, jonka mukaan sisältö tulostetaan selaimeen. React hallitsee tilaa automaattisesti. Reactissa ei voida käyttää perinteisiä muuttujia, sillä niiden muuttaminen ei päivitä Reactin tilaa. Reactin käyttöliittymän päivitys perustuu tilan muutoksiin. Tämän takia Reactissa kaikki muuttujat pitää sitoa tilaan luomalla ne tilamuuttujina.

```tsx
import { useState } from 'react';

const App = () => {

  const [tervehdys, setTervehdys] = useState<string>("");

  return(...);
}
```

Tilamuuttuja määritetään komponentin ylätasolla ennen palautusta (return) antamalla sille nimi (tervehdys) ja päivitysfunktio (setTervehdys). Tilamuuttujan arvoksi sijoitetaan [useState()-funktio](https://react.dev/reference/react/useState "https://react.dev/reference/react/useState"), joka on ns. React Hook, jonka avulla tilamuuttujia luodaan.

Yllä olevassa koodissa useState on tyypitetty TypeScriptin sääntöjen mukaan merkkijonoksi \<Type> -määrityksellä (`useState<string>()`). Tilamuuttujiin on hyvä antaa jokin oletusarvo esimerkiksi tyhjänä arvona. Ilman arvoa tyyppi määräytyy Union-tyypiksi, esim. `string | undefined`, joka voi johtaa odottamattomiin ongelmiin koodissa, kun tilamuuttujan arvoon halutaan viitata ilman, että sitä on annettu.

Tilamuuttujaa voidaan päivittää kutsumalla sen set-funktiota. Tilamuuttujaa ei voi päivittää sijoittamalla siihen uutta arvoa kuten perinteisessä JavaScriptissä.

```tsx
const [tervehdys, setTervehdys] = useState<string>("");

const tervehdi(): void => {
  setTervehdys("Heippa maailma!");
}
```

> [!NOTE]
>
> Huomaa, että tervehdi() -funktion TypeScript -tyypiksi annetaan void. Se tarkoittaa, että funktio ei palauta mitään arvoa. Jos funktiossa olisi palautus (return), funktion tyypiksi annettaisiin palautuksen tyyppi, esim. tervehdi(): string { return "Heippa maailma!"; }
>
> React-komponentit ovat funktioita ja niissä oleva JSX-palautus tarkoittaa, että komponenttifunktiolla on jokin React-tyyppi. Kaikkia TypeScript-tyyppejä ei tarvitse määrittää eksplisiittisesti erikseen, vaan monet tyypit voidaan tulkita ohjelman kontekstista. Yleisimmissä Reactin ohjeissa komponenttien tyyppiä ei määritellä erikseen eikä sitä tehdä tässäkään.

Käyttöliittymiin kuuluu oleellisena osana, että käyttäjä voi tehdä jotain, jonka seurauksena tapahtuu jotain. Katsotaan seuraavaksi, miten Reactissa voidaan luoda painikkeita.

### 4.3 Painikkeen luominen Reactissa

Reactissa painikkeen luominen on helppoa ja rakenne muistuttaa HTML:ää. Painikkeelle voidaan lisätä painalluksen tapahtuma (onClick), johon voidaan liittää funktio seurauksena painamiselle. Lisätään edellisen kohdan funktio painikkeeseen.

```tsx
const App = () => {

  const [tervehdys, setTervehdys] = useState<string>("");

  const tervehdi(): void => {
    setTervehdys("Heippa maailma!");
  }

  return(
    <>
      <h1>Demo 1: React ja Vite tutuksi</h1>
      <h2>Heippa maailma!</h2>

      <button onClick={tervehdi}>Sano heippa!</button>
    </>
  );

}

export default App;
```

> [!NOTE]
>
> Huomaa, että JSX:ssä onClick-tapahtuman käsittelijä kirjoitetaan aaltosulkeiden `onClick={funktio}` sisään, kun perinteisessä HTML:ssä se kirjoitettaisiin lainausmerkkeihin `onClick="funktio()"`. JSX:ssä parametrittomaan funktioon ei myöskään kirjoiteta sulkeita nimen perään.

Funktion voisi myös kirjoittaa onClick-käsittelijän sisään nuolifunktiona. Riippuu ihan tilanteesta, kumpi tapa kannattaa. Yleensä monikäyttöiset tai pitkät funktiot kannattaa kirjoittaa erikseen komponentin ylätasolle, jotta JSX-palautuksen rakenteen luettavuus ei kärsi. Tässä tapauksessa funktion kirjoittaminen suoraan nappiin voisi olla ihan hyväksyttävää.

```tsx
<button onClick={() => {
  setTervehdys("Heippa maailma!");
}}>Sano heippa!</button>
```

Nyt ohjelma suorittaa tervehdi()-funktion painiketta painamalla. Ohjelma ei kuitenkaan vielä tulosta mitään. Katsotaan seuraavaksi, miten Reactissa voidaan tehdä tilamuuttujasta riippuva ehdollinen tulostus käyttämällä ternary -operaatiota.

### 4.4 Ehdollinen tulostus

Olisi hyvä, jos sovellus näyttäisi painikkeella luodun tulostuksen käyttäjälle. Ei kuitenkaan ole välttämättä toivottavaa, että sivulla näkyy tyhjä JSX-elementti silloin, kun tervehdystä ei ole vielä muodostettu. Etenkin, jos tervehdyksen tulostavassa elementissä on tyylejä, jotka näkyisivät myös silloin kun sisältöä ei ole.

```tsx
const App = () => {

  const [tervehdys, setTervehdys] = useState<string>("");

  const tervehdi(): void => {
    setTervehdys("Heippa maailma!");
  }

  return(
    <>
      <h1>Demo 1: React ja Vite tutuksi</h1>
      <h2>Heippa maailma!</h2>

      <button onClick={tervehdi}>Sano heippa!</button>

      <p style={{ "border": "1px solid black", "padding": "5px"}}>{tervehdys}</p>
    </>
  );
}

export default App;
```

> [!NOTE]
>
> `<p>`-elementissä style-attribuutin arvo kirjoitetaan JSON-objektina (huomioi kahdet sisäkkäiset aaltosulkeet `{{}}`) ja tilamuuttujan arvo upotetaan JSX-palautukseen aaltosulkeilla `{}`.
>
> JSON-objektin kirjoituksessa ulommat aaltosulkeet määrittävät JSX-syntaksin mukaisen style-attribuutin arvon upotuksen kuten tilamuuttujissakin. Sisemmät aaltosulkeet ovat varsinaisen JSON-objektirakenteen määrittävät sulkeet, joiden sisään avain-arvo -parit tulevat.

Yllä oleva ohjelma tulostaisi oletuksena sivun pohjalle tyhjän laatikon mustilla ääriviivoilla, koska tervehdyksen tulostus sisältyy tähän elementtiin ja se on jo olemassa, vaikka itse sisältö olisikin tyhjä merkkijono. Tässä tapauksessa tulostus halutaan määrittää ehdolliseksi siten, että `<p>`-elementti tulostetaan vain, jos `tervehdys`-tilamuuttujan arvo on ns. truthful, eli se palauttaa loogisessa vertailussa Boolean-arvon `true`. Tyhjä merkkijono tai numero 0 ovat Boolean-arvoltaan ns. falsyja, eli epätosia (`false`).

Ehdollinen tulostus voidaan muodostaa upottamalla JSX-palautukseen JavaScript-koodilla ehdollinen sijoitus eli ns. ternary operaatio. Koodin upotus tapahtuu kuten tähänkin asti eli aaltosulkeilla `{}`, jotka voidaan myös kirjoittaa käsittämään useampi rivi koodia. Ehdollisessa operaatiossa tarkastellaan jotakin loogista vertailua ja palautetaan lausekkeen `?`-arvo, jos ehto on `true` ja `:`-arvo, jos ehto on `false`.

```tsx
{
Boolean(tervehdys)
? <p style={{ "border": "1px solid black", "padding": "5px"}}>{tervehdys}</p>
: null
}
```

Muodostetaan `tervehdys`-tilamuuttujasta Boolean eli totuusarvo, jolloin se palauttaa automaattisesti `true`/`false` riippuen siitä, onko tilamuuttujassa olevan merkkijonon sisältö truthy (merkkijonossa tekstiä) vai falsy (tyhjä merkkijono). Jos ehto on tosi, palautetaan tulostukseen `?`-jälkeinen JSX, muussa tapauksessa palautus on tyhjä arvo eli `null`. `null` ei ole tyhjä elementti tai merkkijono, vaan sillä tarkoitetaan tyhjää arvoa tai toisin sanoen arvon puuttumista (ei siis palauteta mitään).

Ehdollisen sijoituksen voi tässä tapauksessa myös lyhentää, koska `false`-tilalle ei ole vaihtoehtoista tulostusta. Käyttämällä JavaScriptin loogista AND -operaatiota, voidaan ehdollinen sijoitus lyhentää. Jos ehto on `false`, oikeaa puolta ei edes tarkisteta ja tulostusta ei tehdä. Jos ehto on `true`, tehdään && oikealla puolella oleva tulostus.

```tsx
{ Boolean(tervehdys) && <p style={{ "border": "1px solid black", "padding": "5px"}}>{tervehdys}</p> }
```

Lisätään ohjelmaan lopuksi vielä ominaisuus, jossa käyttäjän pitää kirjoittaa oma nimensä, jonka perusteella tervehdys muodostetaan.

### 4.5 Käyttäjän syötteen kerääminen ja tilamuuttujan päivittäminen syötteestä

Reactissa käyttäjän syötettä voidaan pyytää `<input>`-elementillä. Pyydetään käyttäjältä nimeä ja sijoitetaan se uuteen tilamuuttujaan `nimi`. Jotta `<input>` voi päivittää tilamuuttujaa, pitää sille määrittää kenttään syötettyä sisältöä seuraava tapahtumakäsittelijä.

```tsx
const [nimi, setNimi] = useState<string>("");

<input
  type="text"
  placeholder="Anna nimesi..."
  onChange={}
/>
```

`<input>`-kentän `onChange` tapahtuma suoritetaan joka kerta, kun käyttäjä kirjoittaa tai poistaa merkin kentästä. Tapahtuma sisältää erilaisia tietoja, joista yksi on tapahtuman kohteen (input-kenttä) sen hetkinen arvo.

```tsx
const [nimi, setNimi] = useState<string>("");

<input
  type="text"
  placeholder="Anna nimesi..."
  onChange={(e) => {
    console.log(e);
    console.log(e.target);
    console.log(e.target.value);
  }}
/>
```

Tapahtumakäsittelijän nuolifunktioon on annettu parametrina `e` lyhenteenä event-sanasta. Tällä on oma tyyppi, jonka TypeScript tulkitsee automaattisesti kontekstista. Tapahtuman tyyppi sisältää erilaisia tietoja, joita voidaan tarkastella selaimen kehittäjätyökalujen (paina selaimessa F12 painiketta) avulla Console-välilehdellä. React-sovelluksissa `console.log()` tulostaa viestit selaimeen, ei VS Coden Terminaliin. Voit tarkastella koko tapahtuman `e` tietoja palauttamalla pelkän tapahtuman sellaisenaan. `e.target` palauttaa tapahtuman kohteen, eli syöttökentän itsessään. `e.target.value` palauttaa syöttökentän arvon. Tässä tapauksessa tarvitsemme vain syöttökentän sen hetkistä arvoa, joka sijoitetaan `nimi`-tilamuuttujaan.

```tsx
const [nimi, setNimi] = useState<string>("");

<input
  type="text"
  placeholder="Anna nimesi..."
  onChange={(e) => {
    console.log(e.target.value);
    setNimi(e.target.value);
  }}
/>
```

### 4.6 Nimen tarkistus ja tervehdyksen muotoilu

Tehdään vielä lopuksi `tervehdi()`-funktioon muutos, joka tarkistaa käyttäjän syötteen ja siitä muodostetun `nimi`-tilamuuttujan arvon ja muotoilee tervehdyksen henkilökohtaisesti käyttäjälle.

```tsx
const tervehdi = (): void => {
  setTervehdys(`Heippa maailma, ${nimi} täällä!`);
}
```

Ohjelmassa on kuitenkin vielä yksi looginen virhe. Jos nimi on tyhjä ja tervehdyksen tulostavaa nappia painetaan, tulostuu viesti keskeneräisenä `Heippa maailma, täällä!`. Koska viestiä ei haluta tulostaa ilman nimeä, tarkistetaan nimen arvo ennen tervehdyksen päivittämistä. Tätä kutsutaan myös syötteen validoinniksi.

```tsx
const tervehdi = (): void => {
  if (!nimi.trim()) return;
  setTervehdys(`Heippa maailma, ${nimi} täällä!`);
}
```

Tehdään tarkistus nimelle. Jos nimen arvo on falsy, eli tyhjä merkkijono, keskeytetään funktion suoritus palaamalla (return) ennen kuin tervehdystä ehditään muodostaa. Jos nimi on annettu, voidaan tervehdys muodostaa. Tässä nimelle ei tehdä muuta tarkistusta, kuin että se on ainakin yhden merkin pituinen. Ketjuttamalla `trim()` -metodi `nimi`-muuttujan perään, poistetaan nimestä ylimääräiset tyhjät merkit alusta ja lopusta.

### 4.7 Tyylien lisääminen React-komponenttiin ja loppusilaukset

Oletuksena Vite luo malliprojektiin tyylitiedostot `App`-komponentille ja `main.tsx`-tiedostolle. Tyylitiedostot tuodaan import-komennolla viitaten niiden suhteelliseen sijaintiin.

```tsx
import './App.css';
```

Luodaan demosovellukselle omat tyylit ja käytetään niitä sovelluksessa. Kopioi demossa olevien `./src/App.css` ja `./src/index.css` -tiedostojen tyylit itse luomasi projektin vastaaviin tiedostoihin ja korvaa Viten oletustyylit niillä. Voit myös itse jatkaa projektin muotoilua omilla CSS-tyyleillä, se on hyvää harjoitusta tuleviin tehtäviin.

## 5 Lopuksi

Demosovellus "Hello World" oli tässä. Perehdyimme demossa Vitellä luodun React-sovelluksen perusrakenteisiin ja tärkeimpiin tiedostoihin, joita tarvitset. Käytännössä ainoat tiedostot, joihin tehdään demoissa muutoksia ovat Reactin komponenttitiedostot ja niihin liittyvät tyylitiedostot. Myöhemmissä demoissa luodaan itse omia komponenttitiedostoja näiden lisäksi. Viten muihin määrittelytiedostoihin ei tarvitse nyt tai jatkossakaan koskea.

React-tekniikoissa tutustuimme komponenttien rakenteeseen, tilamuuttujiin, käyttäjän syötteen käsittelyyn, tapahtumakäsittelijöihin, funktioihin ja ehdolliseen tulostukseen. Demon kaikki tekniikat toimivat pohjana tuleville demoille, joissa käyttöliittymiä rakennetaan.

Demossa ei käyty teknisesti syvällisellä tasolla läpi jokaista tähän asti vastaan tullutta teknistä toimintoa tai yksityiskohtaa. Aikaa tälle ei ole riittävästi, vaan tärkeimpänä asiana on käydä läpi Reactilla käyttöliittymien rakentamisen perustekniikoita. Aiheisiin voi perehtyä syvemmin hakemalla tietoa itse netistä.
