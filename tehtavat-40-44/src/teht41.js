import React, { Component, useState } from 'react';

export const Teht41 = () => {

  const reset = () => {

    window.location.reload(false);
    console.log("Reset");
  }

  return (
    <div>
      <OpiskelijaForm />
      <br />
      <button onClick={() => reset()}>Reset</button>
    </div>
  );
}

export class ErrorBoundaryForm extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.    
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service    
    console.log("VIRHE: ", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI      
      return <h3>Virhe nimessä</h3>;
    }
    return this.props.children;
  }
}

export class ErrorBoundaryList extends Component {

  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.    
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service    
    console.log("VIRHE: ", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI      
      return <h3>Virhe listalla</h3>;
    }
    return this.props.children;
  }
}

export const OpiskelijaForm = () => {

  const [nimi, setNimi] = useState("");
  const [isCheckedNimi, setIsCheckedNimi] = useState(false);
  const [nimivirhe, setNimivirhe] = useState(false);
  const [isCheckedLista, setIsCheckedLista] = useState(false);
  const [listavirhe, setListavirhe] = useState(false);
  const [data, setData] = useState([]);

  const lisaa = () => {

    if (isCheckedNimi) {

      setNimivirhe(true);

    } else {

      setNimivirhe(false);
      data.push(nimi);
      setNimi("");
    }

    if (isCheckedLista) {

      setListavirhe(true);

    } else {

      setListavirhe(false);
    }
  }

  const ListaltaTuliVirhe = (arvo) => {

    setIsCheckedLista(arvo);
  }

  return (
    <div>
      <ErrorBoundaryForm>
        {
          nimivirhe ? <ErrorList /> : <div>
            <label> Nimi: <br />
              <input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} /></label><br /><br />
            <button onClick={() => lisaa()}>Lisää</button><br /><br />
            <label> Nimivirhe:
              <input type="checkbox" checked={isCheckedNimi} onChange={() => setIsCheckedNimi(!isCheckedNimi)} /></label><br /><br />
          </div>
        }
      </ErrorBoundaryForm>

      <ErrorBoundaryList>
        {listavirhe ? <OpiskelijaList /> : <OpiskelijaList data={data} virhe={ListaltaTuliVirhe} />
        }
      </ErrorBoundaryList>
    </div>
  )
}

export const OpiskelijaList = (props) => {

  const virhe = props.virhe;
  const [isChecked, setIsChecked] = useState(false);

  const taulukko = props.data;
  const lista = taulukko.map((t, i) => <li key={i}>{t}</li>)

  const Virhe = () => {

    setIsChecked(!isChecked);
  }

  if (isChecked) {

    virhe(true);
    console.log("virhe: true");
  }
  else {

    virhe(false);
    console.log("virhe: false");
  }

  return (
    <div>
      <label> Listavirhe:
        <input type="checkbox" checked={isChecked} onChange={() => Virhe()} /></label><br /><br />
      <ol>{lista}</ol>
    </div>
  )
}

export const ErrorList = (props) => {

  const { data } = props;

  const lista = data.map((t, i) => <li key={i}>{t}</li>)

  return (
    <div>
      <ul>{lista}</ul>
    </div>
  )
}

