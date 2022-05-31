import React, { useEffect, useState } from "react";
import { Link, NavLink, Routes, Route, BrowserRouter as Router, useNavigate, useLocation, Navigate, useParams } from 'react-router-dom'
import "./index.css";

const Spa = (props) => {

  const [user, setUser] = useState(null);
  const [id, setId] = useState(null);
  const userAnnettu = (loggedUser) => { setUser(loggedUser); }
  const idAnnettu = (loggedId) => { setId(loggedId); }

  return (
    <div>

      <NavLink to="/koti" className="nav_link" style={{fontSize:"20px", height:"100px", textDecoration:"none"}}>Koti</NavLink>
      <Link to="/autot" className="nav_link" style={{fontSize:"20px", height:"100px", textDecoration:"none"}}>Autot</Link>
      {user ? <h3>{user},{id}</h3> : null
      }
      <Routes>
        <Route path="/koti" element={<Koti />} />
        
        <Route path="/autot" element=
          {user ?
            <Autot/> : <Kirjaudu onLoginUser={(user) => userAnnettu(user)} onLoginId={(id) => idAnnettu(id)} />
          } />

        <Route path="/details/:merkki/:malli" element={<Details />} />

        <Route exact path="*" element={<Error />} />

      </Routes>

    </div>
  );
}

const Kirjaudu = (props) => {

  const [etunimi, setEtunimi] = useState("");
  const [henkilonumero, setHenkilonumero] = useState("");

  let navigate = useNavigate();
  console.log("Login:", props);

  const KirjauduSisaan = (event) => {

    if (props.onLoginUser !== null && props.onLoginId !== null) {

      props.onLoginUser(etunimi);
      props.onLoginId(henkilonumero);
      navigate("/autot");
    }
  }

  return (
    <div>
      <label> Etunimi: <br />
        <input type="text" value={etunimi} onChange={(e) => setEtunimi(e.target.value)} /></label><br /><br />
      <label> Henkilönumero: <br />
        <input type="text" value={henkilonumero} onChange={(e) => setHenkilonumero(e.target.value)} /></label><br /><br />

      <button onClick={(e) => KirjauduSisaan(e)}>Kirjaudu</button>
    </div>
  );
}

const Koti = (props) => {

  return <div>
    <p> Savonia AMK </p>
    <Aika />
  </div>
}

const Aika = () => {

  let today = new Date();
  let tunnit = today.getHours();
  let pvm = today.getDate() + "." + (today.getMonth() + 1) + "." + today.getFullYear();
  let teksti = "";

  if (tunnit >= 6 && tunnit <= 14) {

    teksti = pvm + " aamupäivä";

  } else {

    teksti = pvm + " iltapäivä";
  }

  return (
    <p> {teksti} </p>
  )

}

const Autot = () => {

  const [autotaulukko, setAutotaulukko] = useState([]);

  useEffect(() => {

    console.log("Autot useEffect ...");

    const fetchAutot = async () => {

      console.log("fetchAutot alkaa ...");

      // haetaan autojen tiedot
      let response = await fetch("http://localhost:3004/autot");
      console.log("fetch called ...", response);
      let c = await response.json();
      console.log("autot = ", c);

      // lisätään autojen tiedot taulukkoon
      setAutotaulukko(c);
      console.log("setAutotaulukko called ...");
    }

    fetchAutot();

  }, []);

  const autolista = autotaulukko.map((a, i) => {
    return <li key={a.id}><Link to={`/details/${a.Merkki}/${a.Malli}`}>{a.Merkki},{a.Malli}</Link></li>
  })

  return (
    <div>
      <p>Cars</p>
      <ol>
        {autolista}
      </ol>
    </div>
  )
}

const Error = () => {

  let navigate = useNavigate();
  let location = useLocation();

  const KotiSivulle = (event) => {
    navigate("/koti");
  }

  return (
    <div>
      <h4>Yritit navigoida sivulle: {location.pathname}</h4>

      <button onClick={(e) => KotiSivulle(e)}>Koti-sivulle</button>
    </div>
  );
}

const Details = () => {

  let params = useParams();

  return (
    <div>
      <p>Details</p>
      <h6 data-testid="details">{params.merkki},{params.malli}</h6>
    </div>
  )
}

export { Spa, Kirjaudu, Koti, Aika, Autot, Error, Details };
