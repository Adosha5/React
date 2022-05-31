import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

const Lomake = () => {

    const [joukkue, setJoukkue] = useState('');
    const [kotipaikka, setKotipaikka] = useState('');
    const [valmentaja, setValmentaja] = useState('');
    const [id, setId] = useState(1);
    const [joukkueet, setJoukkueet] = useState([]);
    const valmentajat = ["Jukka Jalonen", "Raimo Helminen", "Pekka Virta", "Tommi Jokinen", "Rauno Korpi"];
    const [muokattavana, setMuokattavana] = useState(false);    

    // lisätään annetut tiedot taulukkoon, kun lisää-nappia painetaan
    const lisaaButtonClicked = (event) => {

        let uusi = { joukkue: joukkue, kotipaikka: kotipaikka, valmentaja: valmentaja, id: id };
        setJoukkueet([...joukkueet, uusi]);
        console.log("Joukkueet: ", joukkueet)

        setJoukkue("");
        setKotipaikka("");
        setValmentaja("");
        setId("");
    }

    const valueSelected = (valittuValmentaja) => {

        setValmentaja(valittuValmentaja);
    }

    // poistetaan joukkue taulukosta, kun poista-nappia painetaan
    const poistaJoukkue = (valittuId) => {

        console.log("Poista-nappia painettu, id: " + valittuId)
        
        const uusiJoukkueet = joukkueet.filter(a => a.id != valittuId);
        setJoukkueet(uusiJoukkueet);
    }

    // muutetaan joukkueen tietoja, kun muuta-nappia painetaan
    const muutaJoukkue = (valittuId) => {

        console.log("Muuta-nappia painettu, id: " + valittuId)

        setMuokattavana(true);

        const muokattavaJoukkue = joukkueet.filter(a => a.id == valittuId);
        console.log(muokattavaJoukkue[0]);
        
        setJoukkue(muokattavaJoukkue[0].joukkue);
        setKotipaikka(muokattavaJoukkue[0].kotipaikka);
        setValmentaja(muokattavaJoukkue[0].valmentaja);
        setId(muokattavaJoukkue[0].id);    
    }

    // tallennetaan muutetut joukkueen tiedot taulukkoon
    const tallennaButtonClicked = (event) => {

        setMuokattavana(false);
   
        let i = joukkueet.findIndex(a => a.id == id);
        let t = joukkueet;
        let muokattujoukkue = { joukkue: joukkue, kotipaikka: kotipaikka, valmentaja: valmentaja, id: id };

        t[i] = muokattujoukkue;
        setJoukkueet(t);

        setJoukkue("");
        setKotipaikka("");
        setValmentaja("");
        setId("");
    }

    return (
        <div>
            <label> Joukkue: <br />
                <input data-testid="joukkue" type="text" value={joukkue} onChange={(e) => setJoukkue(e.target.value)} /></label><br /><br />
            <label> Kotipaikka: <br />
                <input data-testid="kotipaikka" type="text" value={kotipaikka} onChange={(e) => setKotipaikka(e.target.value)} /></label><br /><br />
            <label> Valmentaja: <br />
                <Valmentaja data={valmentajat} valueSelected={valueSelected} value={valmentaja}/></label><br /><br />
            <label> Id: <br />
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} /></label><br /><br />
            {  
            muokattavana ? <button data-testid="tallenna" onClick={(e) => tallennaButtonClicked(e)}>Tallenna</button> : 
                <button data-testid="lisaa" onClick={(e) => lisaaButtonClicked(e)}>Lisää</button>
            }           
            <br /><br />
            <Joukkueet joukkueet={joukkueet} onDelete={poistaJoukkue} onChange={muutaJoukkue}/>
        </div>
    )
}

const Valmentaja = (props) => {

    const {data, valueSelected} = props;     

    const valitseValmentaja = (valittu) => {

        if (valueSelected)
            valueSelected(valittu);
    }

    return (

        <select data-testid="valmentajaSelect" onChange={(e) => valitseValmentaja(e.target.value)}>
            <option data-testid="valmentajaOption" value={data[0]}>{data[0]}</option>
            <option data-testid="valmentajaOption" value={data[1]}>{data[1]}</option>
            <option data-testid="valmentajaOption" value={data[2]}>{data[2]}</option>
            <option data-testid="valmentajaOption" value={data[3]}>{data[3]}</option>
            <option data-testid="valmentajaOption" value={data[4]}>{data[4]}</option>
        </select>
    )
}

const Joukkueet = (props) => {

    const {joukkueet, onDelete, onChange} = props; 
    let taulukko = [];

    if (onDelete) {

        if(onChange){

            taulukko = joukkueet.map((n, index) => {
                return <tr key={index}>
                    <td>{n.joukkue}</td>
                    <td>{n.kotipaikka}</td>
                    <td>{n.valmentaja}</td>
                    <td>{n.id}</td>
                    <td><button data-testid="poista" onClick={(e) => poistaButtonClicked(n.id)}>Poista</button></td>
                    <td><button data-testid="muuta" onClick={(e) => muutaButtonClicked(n.id)}>Muuta</button></td>
                </tr>
            })
        }
        else {

        taulukko = joukkueet.map((n, index) => {
            return <tr key={index}>
                <td>{n.joukkue}</td>
                <td>{n.kotipaikka}</td>
                <td>{n.valmentaja}</td>
                <td>{n.id}</td>
                <td><button data-testid="poista" onClick={(e) => poistaButtonClicked(n.id)}>Poista</button></td>
            </tr>
        })

        }
    }
    else {

        if(onChange){

            taulukko = joukkueet.map((n, index) => {
                return <tr key={index}>
                    <td>{n.joukkue}</td>
                    <td>{n.kotipaikka}</td>
                    <td>{n.valmentaja}</td>
                    <td>{n.id}</td>
                    <td></td>
                    <td><button data-testid="muuta" onClick={(e) => muutaButtonClicked(n.id)}>Muuta</button></td>
                </tr>
            })
        }
        else {
        taulukko = joukkueet.map((n, index) => {
            return <tr key={index}>
                <td>{n.joukkue}</td>
                <td>{n.kotipaikka}</td>
                <td>{n.valmentaja}</td>
                <td>{n.id}</td>
            </tr>
        }) 
        }       
    }  

    const poistaButtonClicked = (joukkueenId) => {
    
        if (onDelete)
            onDelete(joukkueenId);
    }

    const muutaButtonClicked = (joukkueenId) => {

        if (onChange)
        onChange(joukkueenId);
    }

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Joukkue</th>
                        <th>Kotipaikka</th>
                        <th>Valmentaja</th>
                        <th>Id</th>
                        <th>Poista</th>
                        <th>Muuta</th>
                    </tr>
                </thead>
                <tbody>
                    {taulukko}
                </tbody>
            </table>
        </div>
    )
}

export { Lomake, Valmentaja, Joukkueet };