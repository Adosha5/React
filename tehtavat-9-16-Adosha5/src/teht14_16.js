import logo from './logo.svg';
import './App.css';
import { useState } from 'react';


const Teht14 = () => {

    const ammatit = [{ koodi: '-1', selite: '--Valitse--' }, { koodi: 'teacher', selite: 'Opettaja' }, { koodi: 'police', selite: 'Poliisi' },
    { koodi: 'doctor', selite: 'Lääkäri' }, { koodi: 'player', selite: 'Pelaaja' }]

    return (
        <div>
            <Professional ammatit={ammatit} />
        </div>
    )
}

const Professional = (props) => {

    const vaihtoehdot = props.ammatit.map((n, index) => {
        return <option value={n.koodi} key={index}>{n.selite}</option>
    })

    const [nimi, setNimi] = useState('');
    const [valittukoodi, setvalittuKoodi] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [tutkinto_suoritettu, setTutkinto_suoritettu] = useState("Ei tutkintoa");
    const [tutkinto, setTutkinto] = useState("");
    const [ammatit, setAmmatit] = useState([]);

    const insertButtonClicked = (event) => {
        
        let uusi = { nimi: nimi, koodi: valittukoodi, tutkinto_suoritettu: tutkinto_suoritettu, tutkinto: tutkinto };
        setAmmatit([...ammatit, uusi]);
        console.log("Ammatit: ", ammatit)

        setNimi("");
        setvalittuKoodi("-1");
        setTutkinto_suoritettu("Ei tutkintoa");
        setIsChecked(false);
        setTutkinto("");
    }
    
    const tutkintoValittu = (event) => {

        setIsChecked(!isChecked);

        setTutkinto_suoritettu("Tutkinto suoritettu");
    }

    return (
        <div>
            <label> Nimi: <br />
                <input type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} /></label><br /><br /> 
            <label> Ammatti: <br />
                <select value={valittukoodi} onChange={(e) => setvalittuKoodi(e.target.value)}>
                    {vaihtoehdot}
                </select></label><br /><br />
            <label> Tutkinto suoritettu:
                <input type="checkbox" checked={isChecked} onChange={(e) => tutkintoValittu()} />
                </label><br /><br />
            {  
            isChecked ? <label> Tutkinto: <br />
                <input type="text" value={tutkinto} onChange={(e) => setTutkinto(e.target.value)} /></label> : null   
            }    
            <br /><br />  
            <button onClick={(e) => insertButtonClicked(e)}>Insert</button><br /><br />

            <Table data={ammatit} />
        </div>
    )
}

const Table = (props) => {

    const taulukko = props.data.map((n, index) => {
        return <tr key={index}>
            <td>{n.nimi}</td>
            <td>{n.koodi}</td>
            <td>{n.tutkinto_suoritettu}</td>
            <td>{n.tutkinto}</td>
        </tr>
    })

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Nimi</th>
                        <th>Koodi</th>
                        <th>Tutkinto suoritettu</th>
                        <th>Tutkinto</th>
                    </tr>
                </thead>
                <tbody>
                    {taulukko}
                </tbody>
            </table>
        </div>
    )
}

export { Teht14, Professional, Table };