import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Spa } from './teht27_32';
// import { Teht33  } from './teht33';
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
      <Router>
        <Spa  />
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
