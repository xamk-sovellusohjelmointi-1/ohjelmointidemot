import { useState } from 'react';
import './App.css';
import Sivu from './components/Sivu';
import Otsikko from './components/Otsikko';
import Yhteenveto from './components/Yhteenveto';
import Laskurinappi from './components/Laskurinappi';

const kulkuneuvot: string[] = [
  "Henkilöauto",
  "Pakettiauto",
  "Linja-auto",
  "Kuorma-auto tai rekka",
  "Polkupyörä",
  "Moottoripyörä",
  "Sähköpotkulauta",
  "Muu kulkuneuvo"
];

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
