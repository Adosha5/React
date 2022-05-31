import { useState, useEffect } from 'react';

function Asiakas() {

    const [nimi, setNimi] = useState('');
    const [osoite, setOsoite] = useState('');
    const [query, setQuery] = useState('');
    const [asiakas, setAsiakas] = useState([]);
    const [naytaTaulukko, setNaytaTaulukko] = useState(false);
    const [hakuMenossa, setHakuMenossa] = useState(false);
    const [eiDataa, setEiDataa] = useState(false);
    const [asiakastyyppi, setAsiakastyyppi] = useState('');
    const [asiakastyypit, setAsiakastyypit] = useState([]);
    const [poistoquery, setPoistoQuery] = useState('');
    const [lisaaUusiValittu, setLisaaUusiValittu] = useState(false);
    const [uusinimi, setUusiNimi] = useState('');
    const [uusiosoite, setUusiOsoite] = useState('');
    const [uusipostinumero, setUusiPostinumero] = useState('');
    const [uusipostitoimipaikka, setUusiPostitoimipaikka] = useState('');
    const [uusipuhelin, setUusiPuhelin] = useState('');
    const [uusiasiakastyyppi, setUusiAsiakastyyppi] = useState('');
    const [uusiSelite, setUusiSelite] = useState('');
    const [uusiasiakasquery, setUusiAsiakasQuery] = useState('');
    const [id, setId] = useState("");
    const [muokkaaValittu, setMuokkaaValittu] = useState(false);
    const [muokkausquery, setMuokkausQuery] = useState('');
    const [muokkausqueryid, setMuokkausQueryId] = useState('');

    console.log("Rendering ....")

    useEffect(() => {

        console.log("Haun useEffect ...");

        const fetchAsiakkaat = async () => {

            console.log("fetchAsiakkaat alkaa ...");

            // laitetaan Loading-teksti näkymään haun ajaksi, piilotetaan tulostaulukko ja ei dataa -ilmoitus
            setHakuMenossa(true);
            setNaytaTaulukko(false);
            setEiDataa(false);

            // haetaan asiakkaiden tiedot
            let response = await fetch("http://localhost:3004/asiakas?" + query);
            console.log("fetch called ...", response);
            let c = await response.json();
            console.log("asiakkaat = ", c);

            // tarkastetaan, palauttiko haku dataa
            if (c.length !== 0) {

                // lisätään asiakkaiden tiedot taulukkoon
                setAsiakas(c);
                console.log("setAsiakas called ...");

                // piilotetaan loading-teksti ja laitetaan tulostaulukko näkyviin
                setHakuMenossa(false);
                setNaytaTaulukko(true);
            }
            else {

                // piilotetaan loading-teksti
                setHakuMenossa(false);
                setEiDataa(true)

                // näytetään ei dataa -virheilmoitus 2 sekunnin ajan
                const ajastin = setTimeout(() => setEiDataa(false), 2000);
                // clearTimeout(ajastin);
            }
        }

        if (query != '') fetchAsiakkaat();

    }, [query]);

    // hae-nappia painettu
    const handleFetch = () => {

        let a = [];

        if (nimi == "" && osoite == "" && asiakastyyppi == "") {

            setQuery(null);
        }
        else {
            if (nimi !== "")
                a.push("nimi=" + nimi);

            if (osoite !== "")
                a.push("osoite=" + osoite);

            if (asiakastyyppi !== "")
                a.push("tyyppi_id=" + asiakastyyppi);

            let hakulause = a.join("&");
            setQuery(hakulause);
        }

        setNimi("");
        setOsoite("");
        setAsiakastyyppi("");
    }

    // tuodaan asiakastyyppien lista select-valikkoon
    useEffect(() => {

        console.log("Asiakastyypit useEffect ...");

        const fetchAsiakastyypit = async () => {
            console.log("fetchAsiakastyypit alkaa ...");
            let response = await fetch("http://localhost:3004/asiakastyyppi");
            console.log("asiakastyypit-fetch called ...", response);
            let c = await response.json();
            console.log("asiakastyypit = ", c);
            setAsiakastyypit(c);
            console.log("setAsiakatyypit called ...");
        }

        fetchAsiakastyypit();

    }, []);

    // poista-nappia painettu
    const poista = (valittuid, valittunimi) => {

        console.log("Poistettava id:" + valittuid);

        // poiston vahvistus
        if (window.confirm("Haluatko varmasti poistaa asiakkaan " + valittunimi + "?")) { setPoistoQuery(valittuid); }

        setNimi("");
        setOsoite("");
        setAsiakastyyppi("");
    }

    // poistetaan asiakas
    useEffect(() => {

        console.log("Poistamisen useEffect ...");

        const fetchPoisto = async () => {

            console.log("fetchPoisto alkaa ...");

            // poistetaan valittu asiakas
            let response = await fetch("http://localhost:3004/asiakas/" + poistoquery, { method: 'DELETE' });

            console.log("fetchPoisto called ...", response);
            console.log("Poistettu id: ", poistoquery);

            // päivitetään taulukko
            setQuery(query + "&12355");
        }

        if (poistoquery != '') fetchPoisto();

    }, [poistoquery]);

    // lisää-nappia painettu
    const lisaaUusi = () => {

        // laitetaan lisäyslomake ja napit näkyviin
        setLisaaUusiValittu(true);
        setMuokkaaValittu(false);
    }

    // peruuta-nappia painettu
    const peruuta = () => {

        // laitetaan hakulomake ja taulukko näkyviin
        setLisaaUusiValittu(false);
    }

    // tallennetaan uuden asiakkaan tiedot
    const tallenna = () => {

        let uusiasiakas = {
            id: id, nimi: uusinimi, osoite: uusiosoite, postinumero: "Postinumero", postitoimipaikka: "Kaupunki",
            puhelinnro: uusipuhelin, tyyppi_id: uusiasiakastyyppi, tyyppi_selite: "1=henkilöasiakas, 2=yritysasiakas, 3=entinen asiakas"
        };

        setUusiAsiakasQuery(uusiasiakas);
        console.log("Uusi asiakas: " + uusiasiakasquery);

        setUusiNimi("");
        setUusiOsoite("");
        setUusiPuhelin("");
        setUusiAsiakastyyppi("");
    }

    // lisätään uusi asiakas
    useEffect(() => {

        console.log("Uuden asiakkaan lisäys useEffect ...");

        const fetchUusiAsiakas = async () => {

            console.log("fetchUusiAsiakas alkaa ...")

            // lisätään uusi asiakas
            let response = await fetch("http://localhost:3004/asiakas",
                {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(uusiasiakasquery)
                });
            console.log("fetchUusiAsiakas called ...", response);
            let c = await response.json();
            console.log("uusi asiakas = ", c);

            // päivitetään taulukko ??
            setQuery(query);

            // laitetaan hakulomake ja taulukko näkyviin
            setLisaaUusiValittu(false);
        }

        if (uusiasiakasquery != '') fetchUusiAsiakas();

    }, [uusiasiakasquery]);

    // muokkaa-nappia painettu
    const muokkaa = (valittuid) => {  
        
        // haetaan muokattavan asiakkaan tiedot
        setMuokkausQueryId(valittuid);

        // laitetaan lisäyslomake ja napit näkyviin
        setLisaaUusiValittu(true);
        setMuokkaaValittu(true);
    }

    // peruuta muokkaus -nappia painettu
    const peruutaMuokkaus = () => {

        // laitetaan hakulomake ja taulukko näkyviin
        setLisaaUusiValittu(false);
    }

    // haetaan valitun muokattavan asiakkaan tiedot
    useEffect(() => {

        console.log("Muokkauksen useEffect ...");

        const fetchMuokattavaAsiakas = async () => {

            console.log("fetchMuokattavaAsiakas alkaa ...");

            // haetaan asiakkaan tiedot
            let response = await fetch("http://localhost:3004/asiakas/" + muokkausqueryid);
            console.log("fetchMuokattavaAsiakas called ...", response);
            let c = await response.json();
            console.log("Muokattava asiakas = ", c);

            // lisätään asiakkaan tiedot muokkauslomakkeelle
            setId(c.id);
            setUusiNimi(c.nimi);
            setUusiOsoite(c.osoite);
            setUusiPostinumero(c.postinumero);
            setUusiPostitoimipaikka(c.postitoimipaikka);
            setUusiPuhelin(c.puhelinnro);
            setUusiAsiakastyyppi(c.tyyppi_id);
            setUusiSelite(c.tyyppi_selite);
        }

        if (muokkausqueryid != '') fetchMuokattavaAsiakas();

    }, [muokkausqueryid]);

    // tallenna muokkaukset -nappia painettu
    const tallennaMuutos = () => {

        let muokattuasiakas = {
            id: id, nimi: uusinimi, osoite: uusiosoite, postinumero: uusipostinumero, postitoimipaikka: uusipostitoimipaikka,
            puhelinnro: uusipuhelin, tyyppi_id: uusiasiakastyyppi, tyyppi_selite: uusiSelite
        };

        setMuokkausQuery(muokattuasiakas);
        console.log("Muokattu asiakas: " + muokkausquery);

        setId("");
        setUusiNimi("");
        setUusiOsoite("");
        setUusiPostinumero("");
        setUusiPostitoimipaikka("");
        setUusiPuhelin("");
        setUusiAsiakastyyppi("");
        setUusiSelite("");
    }

    // tallennetaan muokatut tiedot
    useEffect(() => {

        console.log("Muokkauksen tallennus useEffect ...");

        const fetchMuokattuAsiakas = async () => {

            console.log("fetchMuokattuAsiakas alkaa ...")

            // lisätään muokatun asiakkaan tiedot
            let response = await fetch("http://localhost:3004/asiakas/" + muokkausquery.id, // tähän vain id
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(muokkausquery)
                });
            console.log("fetchMuokattuAsiakas called ...", response);
            let c = await response.json();
            console.log("muokattu asiakas = ", c);

            // päivitetään taulukko
            setQuery(query + "&98765");

            // laitetaan hakulomake ja taulukko näkyviin
            setLisaaUusiValittu(false);
        }

        if (muokkausquery != '') fetchMuokattuAsiakas();

    }, [muokkausquery]);

    // tulostaulukko
    const taulukko = asiakas.map((s, i) => {
        return <tr key={s.id}>
            <td>{s.id}</td>
            <td>{s.nimi}</td>
            <td>{s.osoite}</td>
            <td>{s.postinumero}</td>
            <td>{s.postitoimipaikka}</td>
            <td>{s.puhelinnro}</td>
            <td>{s.tyyppi_id}</td>
            <td>{s.tyyppi_selite}</td>
            <td><button data-testid="deleteButton" onClick={() => poista(s.id, s.nimi)}>Poista {s.id}</button></td>
            <td><button data-testid="editButton" onClick={() => muokkaa(s.id)}>Muokkaa asiakasta {s.id}</button></td>
        </tr>
    })

    // asiakastyypin valinta
    const asiakastyyppivalikko = asiakastyypit.map((s, i) => {
        return <option data-testid="customertypeOption" key={s.id} value={s.id}>{s.id} {s.lyhenne} {s.selite}</option>
    })

    return (
        <div>
            {lisaaUusiValittu ? <form>
                <label> Nimi: <br />
                    <input data-testid="nameEdit" type="text" value={uusinimi} onChange={(e) => setUusiNimi(e.target.value)} /></label><br /><br />
                <label> Osoite: <br />
                    <input data-testid="addressEdit" type="text" value={uusiosoite} onChange={(e) => setUusiOsoite(e.target.value)} /></label><br /><br />
                <label> Puhelin: <br />
                    <input data-testid="phoneEdit" type="text" value={uusipuhelin} onChange={(e) => setUusiPuhelin(e.target.value)} /></label><br /><br />
                <label> Asiakastyyppi: <br />
                    <select data-testid="customertypeSelectEdit" value={uusiasiakastyyppi} onChange={(e) => setUusiAsiakastyyppi(e.target.value)}>
                        {asiakastyyppivalikko}
                    </select></label>                      
                <br /><br />
                
                {muokkaaValittu ? <div>                
                <button data-testid="cancelEditButton" onClick={() => peruutaMuokkaus()}>Peruuta muokkaus</button>
                <br /><br />
                <button data-testid="saveEditButton" onClick={() => tallennaMuutos()}>Tallenna muutos</button>                
                </div>
                :
                <div>
                <button data-testid="cancelButton" onClick={() => peruuta()}>Peruuta</button>
                <br /><br />
                <button data-testid="saveButton" onClick={() => tallenna()}>Tallenna</button>
                <br /><br /></div> }
                </form>

                : <div>
                    <label> Nimi: <br />
                        <input data-testid="nameInput" type="text" value={nimi} onChange={(e) => setNimi(e.target.value)} /></label><br /><br />
                    <label> Osoite: <br />
                        <input data-testid="addressInput" type="text" value={osoite} onChange={(e) => setOsoite(e.target.value)} /></label><br /><br />
                    <label> Asiakastyyppi: <br />
                        <select data-testid="customertypeSelect" value={asiakastyyppi} onChange={(e) => setAsiakastyyppi(e.target.value)}>
                            {asiakastyyppivalikko}
                        </select></label>
                    <br /><br />
                    <button data-testid="searchButton" onClick={() => handleFetch()}>Hae</button>
                    <br /><br />

                    <button data-testid="addButton" onClick={() => lisaaUusi()}>Lisää uusi</button>
                    <br /><br />

                    {hakuMenossa ?
                        <p data-testid="loading">Loading...</p> : null}
                    <br />

                    {eiDataa ?
                        <p data-testid="notFound">Annetuilla hakuehdoilla ei löytynyt dataa</p> : null}
                    <br />

                    {naytaTaulukko ?
                        <table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nimi</th>
                                    <th>Osoite</th>
                                    <th>Postinumero</th>
                                    <th>Postitoimipaikka</th>
                                    <th>Puhelinnumero</th>
                                    <th>Tyyppi_id</th>
                                    <th>Tyyppi_selite</th>
                                    <th>Poista</th>
                                    <th>Muokkaa</th>
                                </tr>
                            </thead>
                            <tbody>
                                {taulukko}
                            </tbody>
                        </table>
                        : null}

                </div>}
        </div>
    )
}

export { Asiakas };
