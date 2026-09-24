# Sovellusohjelmointi 1: ohjelmointidemot

Repositorio sisältää kurssin ohjelmointidemot. Jokainen demo on oma React + TypeScript + Vite -projektinsa omassa kansiossaan (`demo-01`, `demo-02`, ...).

---

## Esivaatimukset

> **Lähteet:** [Git: First-Time Git Setup](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup) · [GitHub Docs: Setting your username in Git](https://docs.github.com/en/get-started/git-basics/setting-your-username-in-git)

Koneelle asennetaan:

- [Git](https://git-scm.com/downloads)
- [Node.js](https://nodejs.org/) (LTS-versio)
- [Visual Studio Code](https://code.visualstudio.com/)

Lisäksi tarvitaan [GitHub-tili](https://github.com/signup).

Gitille asetetaan nimi ja sähköpostiosoite kerran koneen asennuksen jälkeen. Ilman niitä commitointi ei onnistu.

```bash
git config --global user.name "Etunimi Sukunimi"
git config --global user.email "github-tilin@sahkoposti.fi"
```

---

## Demojen kloonaaminen ja käyttäminen

### Vaihe 1: Repositorion kloonaaminen

> **Lähteet:** [GitHub Docs: Cloning a repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) · [VS Code: Clone a repository locally](https://code.visualstudio.com/docs/sourcecontrol/intro-to-git#_option-a-clone-a-repository-locally)

**VS Coden Source Control -näkymässä:**

1. Suljetaan mahdollisesti auki oleva kansio: **File > Close Folder**.
2. Avataan Source Control -näkymä vasemman reunan versionhallintakuvakkeesta tai näppäinyhdistelmällä `Ctrl+Shift+G`.
3. Painetaan **Clone Repository**.
4. Liitetään kenttään osoite ja painetaan Enter:

   ```text
   https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
   ```

5. Valitaan kansio, johon repositorio kloonataan.
6. Valitaan ilmoituksesta **Open**.
7. Vastataan luottamuskyselyyn **Yes, I trust the authors**.

**Vaihtoehtoisesti** komentopaletista (`Ctrl+Shift+P`, macOS: `Cmd+Shift+P`) komennolla `Git: Clone` tai terminaalissa:

```bash
git clone https://github.com/xamk-sovellusohjelmointi-1/ohjelmointidemot.git
```

### Vaihe 2: Demon avaaminen ja käynnistäminen

> **Lähteet:** [Vite: Getting Started](https://vite.dev/guide/) · [VS Code: Getting started with the terminal](https://code.visualstudio.com/docs/terminal/getting-started)

**1. Avataan demon kansio:** **File > Open Folder** ja valitaan esimerkiksi `ohjelmointidemot/demo-01`.

**2. Avataan terminaali:** **Terminal > New Terminal**. Terminaali avautuu demon kansioon.

**3. Asennetaan riippuvuudet:**

```bash
npm install
```

**4. Käynnistetään kehityspalvelin:**

```bash
npm run dev
```

**5. Avataan sovellus selaimessa.** Jokaisella demolla on oma porttinsa: demo 1 → `http://localhost:3001`, demo 2 → `http://localhost:3002` ja niin edelleen. Tarkka osoite tulostuu terminaaliin.

Kehityspalvelin pysäytetään terminaalissa näppäinyhdistelmällä `Ctrl+C`.

### Vaihe 3: Uusien demojen hakeminen

> **Lähteet:** [VS Code: Push, pull, and sync](https://code.visualstudio.com/docs/sourcecontrol/repos-remotes#_push-pull-and-sync) · [VS Code: Discard changes](https://code.visualstudio.com/docs/sourcecontrol/staging-commits#_discard-changes) · [GitHub Docs: Getting changes from a remote repository](https://docs.github.com/en/get-started/using-git/getting-changes-from-a-remote-repository)

**VS Coden Source Control -näkymässä:**

1. Avataan repositorion juurikansio `ohjelmointidemot`: **File > Open Folder**.
2. Avataan Source Control -näkymä (`Ctrl+Shift+G`).
3. Valitaan näkymän yläreunan **...**-valikosta **Pull**.

**Vaihtoehtoisesti** terminaalissa repositorion juurikansiossa:

```bash
git pull
```

> **Huomio:** Jos demojen tiedostoja on muokattu, pull voi epäonnistua. Muutokset perutaan Source Control -näkymässä napsauttamalla tiedostoa hiiren oikealla painikkeella ja valitsemalla **Discard Changes**, tai terminaalissa komennolla `git restore .`. Omat kokeilut kannattaa tehdä demosta kopioituun kansioon repositorion ulkopuolella.

---


