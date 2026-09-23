# Demo 7 - Referenssi

## Komponentit

| Komponentti | Tiedosto | Propsit | Kuvaus |
|---|---|---|---|
| `App` | `src/App.tsx` | – (ei propseja) | Uutiskirjeen tilauslomake. Tallentaa kenttien arvot `lomaketiedot`-viitteeseen `syoteKasittelija`-funktiolla ja tarkistaa ne lähetyksessä `lomakeKasittelija`-funktiolla. Virheilmoitukset ovat `virheilmoitukset`-tilassa. Kun virheitä ei ole, näyttää ilmoituksen "Olet tilannut uutiskirjeemme, kiitos!". |

## Tekniikat

**Lomakkeen lähetys (`onSubmit` ja `preventDefault`)**

`type="submit"`-painike lähettää lomakkeen. `preventDefault` estää selainta lataamasta sivua uudelleen.

```tsx
import type { SubmitEvent } from 'react';

const lomakeKasittelija = (e: SubmitEvent): void => {
  e.preventDefault();
  // lähetyksen käsittely
};

<form onSubmit={lomakeKasittelija}>
  <Button type="submit" variant="contained">Lähetä</Button>
</form>
```

**Arvon tallentaminen viitteeseen (`useRef`)**

Viitteen `current`-kentän muuttaminen ei renderöi komponenttia uudelleen. Viitteeseen voi tallentaa minkä tahansa arvon, kuten olion.

```tsx
const lomaketiedot = useRef<Lomaketiedot>({
  nimi: "",
  sahkoposti: "",
  jakso: "",
  kayttoehdot: false
});

console.log(lomaketiedot.current.nimi);
```

**Yhteinen käsittelijä usealle kentälle (`name` ja laskettu ominaisuuden nimi)**

Kentän `name` kertoo, mihin olion kenttään arvo tallennetaan. Valintaruudusta tallennetaan `checked`, muista kentistä `value`.

```tsx
import type { ChangeEvent } from 'react';

const syoteKasittelija = (e: ChangeEvent<HTMLInputElement>): void => {
  lomaketiedot.current = {
    ...lomaketiedot.current,
    [e.target.name]: e.target.type === "checkbox" ? e.target.checked : e.target.value
  };
};

<TextField name="nimi" label="Nimi" onChange={syoteKasittelija} />
<Checkbox name="kayttoehdot" onChange={syoteKasittelija} />
```

**Valintanappiryhmä (`RadioGroup`)**

Ryhmän `name` ja `onChange` koskevat kaikkia sen valintanappeja. Valitun napin `value` tallentuu.

```tsx
<FormControl>
  <FormLabel id="jakso-otsikko">Haluan uutiskirjeen</FormLabel>
  <RadioGroup name="jakso" aria-labelledby="jakso-otsikko" onChange={syoteKasittelija}>
    <FormControlLabel value="paiva" label="Päivittäin" control={<Radio />} />
    <FormControlLabel value="viikko" label="Viikoittain" control={<Radio />} />
  </RadioGroup>
</FormControl>
```

**Validointi lähetyksen yhteydessä**

Virheet kerätään olioon ja tallennetaan tilaan, jolloin ne näkyvät sivulla. Tyhjä olio tarkoittaa, ettei virheitä löytynyt.

```tsx
const [virheilmoitukset, setVirheilmoitukset] = useState<Virheet>({});

const virheet: Virheet = {};

if (!lomaketiedot.current.sahkoposti) {
  virheet.sahkoposti = "Sähköposti puuttuu.";
} else if (!lomaketiedot.current.sahkoposti.includes("@")) {
  virheet.sahkoposti = "Virheellinen sähköpostiosoite.";
}

setVirheilmoitukset(virheet);

if (Object.keys(virheet).length === 0) {
  alert("Olet tilannut uutiskirjeemme, kiitos!");
}
```

**Tekstikentän virheilmoitus (`error` ja `helperText`)**

`error` muuttaa kentän punaiseksi, ja `helperText` näyttää ilmoituksen kentän alla.

```tsx
<TextField
  name="nimi"
  label="Nimi"
  error={Boolean(virheilmoitukset.nimi)}
  helperText={virheilmoitukset.nimi}
/>
```

**Ryhmän virheilmoitus (`FormControl` ja `FormHelperText`)**

`FormControl`-komponentin `error` muuttaa sen sisällä olevan `FormHelperText`-tekstin punaiseksi.

```tsx
<FormControl error={Boolean(virheilmoitukset.kayttoehdot)}>
  <FormControlLabel
    label="Hyväksyn käyttöehdot"
    control={<Checkbox name="kayttoehdot" onChange={syoteKasittelija} />}
  />
  <FormHelperText>{virheilmoitukset.kayttoehdot}</FormHelperText>
</FormControl>
```

## Tyypit ja rajapinnat

| Nimi | Kentät | Käyttäjät |
|---|---|---|
| `Lomaketiedot` (`src/App.tsx`) | `nimi: string`, `sahkoposti: string`, `jakso: string`, `kayttoehdot: boolean` | `App` (`lomaketiedot`-viite) |
| `Virheet` (`src/App.tsx`) | `nimi?: string`, `sahkoposti?: string`, `jakso?: string`, `kayttoehdot?: string` | `App` (`virheilmoitukset`-tila) |
