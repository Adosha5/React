import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import styled, { css } from 'styled-components';

function MyCounter() {

  const Add = styled.button`
    background-color: grey;
    border: 3px solid red;
    color: black;
    margin: 10px;
  `;

  const Reset = styled.button`
    background: orange;
    font-style: italic;
    margin: 10px;
  `;

  const Counter = styled.h1`
    color: blue;
    font-size: 10px;
    padding: 10px;

    ${props => props.Big && css`
    color: red;
    `}
  `;

  const [laskuri, setLaskuri] = useState(0);

  const Laske = (event) => {

    setLaskuri(laskuri + 1);
  }

  const Nollaa = (event) => {

    setLaskuri(0);
  }

  return (
    <div>
      <Add onClick={(e) => Laske(e)}>Add</Add>
      <Reset onClick={(e) => Nollaa(e)}>Reset</Reset>
      <br />
      {
      laskuri > 5 ? <Counter Big>Counter is {laskuri}</Counter> : <Counter>Counter is {laskuri}</Counter> 
      }
    </div>
  );

}

export { MyCounter };
