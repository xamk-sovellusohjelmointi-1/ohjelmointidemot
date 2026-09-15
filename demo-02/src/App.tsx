import { useState, useRef } from 'react';
import './App.css';

// Määritetään Tehtävä-objektin muoto
interface Tehtava {
  id: string;
  nimi : string;
  tehty : boolean;
}

const App = () => {

  const uusiTehtava = useRef<HTMLInputElement>(null);

  const [
    tehtavat,
    setTehtavat
  ] = useState<Tehtava[]>([
    {
      id: crypto.randomUUID(),
      nimi : "Käy kaupassa", 
      tehty : false
    },
    {
      id: crypto.randomUUID(),
      nimi : "Siivoa", 
      tehty : true
    },
    {
      id: crypto.randomUUID(),
      nimi : "Ulkoiluta koiraa", 
      tehty : false
    }
  ]);
  
  const lisaaTehtava = (nimi : string): void => {
    
    let uusi : Tehtava = {
      id: crypto.randomUUID(),
      nimi,
      tehty: false
    }

    setTehtavat((edelliset: Tehtava[]) => {
      return [...edelliset, uusi];
    })
  }

  const merkitseTehdyksi = (id: string): void => {

    setTehtavat((edelliset: Tehtava[]) => {
      return edelliset.map((tehtava: Tehtava): Tehtava => {
        if (tehtava.id === id) {
          return { ...tehtava, tehty: !tehtava.tehty };
        } else {
          return tehtava;
        }
      });
    });
  }

  return (
    <>

      <h1>Demo 2: React-perusteita</h1>

      <h2>Tehtävälista</h2>

      <input 
        ref={uusiTehtava}
        type="text" 
        placeholder="Kirjoita tehtävä ja paina enter..."
        onKeyDown={(e : any) => {
          console.log(e.key);
          if (e.key === "Enter") {
            lisaaTehtava(e.target.value);
            e.target.value = null;
          }
        }}
      />

      <button onClick={ () => {
        if (uusiTehtava.current === null) {
          return;
        }
          lisaaTehtava(uusiTehtava.current.value) 
          uusiTehtava.current.value = "";   
      }}>Lisää</button>

      <ul>

      {tehtavat.map( (tehtava: Tehtava) => {

        return (
                  <li key={tehtava.id} onClick={() => { merkitseTehdyksi(tehtava.id); }}>
                    { (tehtava.tehty === true) 
                      ? <del>{tehtava.nimi}</del> 
                      : tehtava.nimi 
                    }
                  </li>
        );

      } )}

      </ul>

      <p><small>Klikkaa tehtävän nimeä merkitäksesi sen suoritetuksi.</small></p>

    </>
  );
}

export default App;
