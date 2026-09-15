import { useState } from 'react';
import './App.css';

const App = () => {

  const [nimi, setNimi] = useState<string>("");
  const [tervehdys, setTervehdys] = useState<string>("");

  const tervehdi = (): void => {
    if (!nimi) return;
    setTervehdys(`Heippa maailma, ${nimi} täällä!`);
  }

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

      <button
        onClick={tervehdi}
      >
        Sano heippa!
      </button>

      {
      Boolean(tervehdys)
      && <p style={{ "border": "1px solid black", "padding": "5px"}}>{tervehdys}</p>
      
      }
    </>
  );
};

export default App;
