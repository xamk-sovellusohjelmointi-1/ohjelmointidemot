import { useEffect, useState } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { Route, Routes } from 'react-router';
import Otsikko from './components/Otsikko';
import PoistaTehtava from './components/PoistaTehtava';
import Tehtavalista from './components/Tehtavalista';
import UusiTehtava from './components/UusiTehtava';
import type { Tehtava } from './types';

const App = () => {

  const [tehtavat, setTehtavat] = useState<Tehtava[]>(() => {
    const tallennetut = localStorage.getItem("tehtavalista");
    return tallennetut ? JSON.parse(tallennetut) : [];
  });

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

export default App;
