import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

//function App() {
const App = (props) => {

  const p = props.puhelin;
  const n = props.nimi;

  const [data, setData] = useState(["Maija", "Liisa", "Matti", "Heikki"]);  
  const [joukkueet, setJoukkue] = useState([{koko : 5, luku: 8, nimi:"Testi"}, {koko : 2, luku: -1, nimi:"Maija"}, {koko : 22, luku: -8, nimi:"TestiXX"}]);
  const [asiakas, setAsiakas] = useState('');

  const Lisaa = () => {

    // joukkueet = [{koko: 1, luku: 1, nimi: asiakas}];   
    setJoukkue([...joukkueet, {koko: 1, luku: 1, nimi: asiakas}]);
  }

  return (    
    <div>
      <Otsikko title="React luento" />
      <Otsikko title="Perusasiaa" />
      <p>Terve maailma {p}, {n} ja {props.osoite}</p>
      
      <Lista nimet={data} />
      <Joukkueet data={joukkueet} />

      <p>Asiakas {asiakas}</p>
      <input type="text" onChange={(e) => setAsiakas(e.target.value)} />
      <button onClick={() => Lisaa()}>Lisää</button>
      <div>
        <p>Heippa</p>
      </div>
    </div>
  );
}

const Joukkueet = (props) => {

  const x = props.data || [];

  const t = x.map((j, index) => {
    console.log("t:", j);
    return <li key={index}>{j.nimi} {j.koko}</li>
  })

  return (
    <ul>
      {t}
    </ul>
  )
}

const Lista = (props) => {

  console.log("Lista:", props);
  const t = props.nimet || [];

  const items = t.map((n,index) => {
    return <li key={"l_" + index}>{n}</li>
  })

  return (
    <ol>
      {items}
    </ol>
  )
}

const Otsikko = (props) => {

  return (
    <h1>{props.title}</h1>
  );
}

export default App;
