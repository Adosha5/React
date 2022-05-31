/*  data-testid="" seuraaville:

    joukkue input = "joukkue"
    kotipaikka input = "kotipaikka"
    valmentaja select = "valmentajaSelect"
    valmentaja option = "valmentajaOption"
    lisää button = "lisaa"
    poista button = "poista"
    muuta button = "muuta"
    tallenna button = "tallenna"

    Tulostettava id alkamaan 1

    Tulostuksessa käytettävä thead sekä tbody lohkoa

    Tulostuksen järjestys:
    -Joukkue
    -Kotipaikka
    -Valmentaja
    -ID
    (-Poista nappi
    -Muuta nappi)

*/

import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import { Lomake, Joukkueet, Valmentaja } from "./teht16e_g";

const valmentajatData = [
  "Jukka Jalonen",
  "Raimo Helminen",
  "Pekka Virta",
  "Tommi Jokinen",
  "Rauno Korpi",
];
const joukkueetData = [
  {
    joukkue: "joukkue uusi",
    kotipaikka: "kotipaikka uusi",
    valmentaja: valmentajatData[2],
    id: 1,
  },
  {
    joukkue: "joukkue uusi2",
    kotipaikka: "kotipaikka uusi2",
    valmentaja: valmentajatData[3],
    id: 2,
  },
];
const joukkueUserInput = "syötetty joukkue";
const kotipaikkaUserInput = "syötetty kotipaikka";

describe("Tehtävä 16e Lomakkeen luominen", () => {
  test("Tehtävä 16e, Lomake elementti", () => {
    render(<Lomake />);
    const joukkueInput = screen.getByTestId("joukkue");
    const kotipaikkaInput = screen.getByTestId("kotipaikka");
    const valmentajaLista = screen.getByTestId("valmentajaSelect");
    const valmentajaOption = screen.getAllByTestId("valmentajaOption");

    fireEvent.change(joukkueInput, { target: { value: "uusi joukkue" } });
    fireEvent.change(kotipaikkaInput, { target: { value: "uusi kotipaikka" } });
    expect(joukkueInput.value).toBe("uusi joukkue");
    expect(kotipaikkaInput.value).toBe("uusi kotipaikka");

    //Tässä tulee tieto lapsi elementissä
    //TODO: Korjaa valmentaja select komponentti
    console.log("Valmentaja option: ", valmentajaOption[1].value);
    console.log("Valmentaja Lista type: ", valmentajaLista.type);
    expect(valmentajaLista.type).toBe("select-one");
    fireEvent.change(valmentajaLista, {
      target: { value: valmentajaOption[2].value },
    });
    expect(valmentajaLista.value).toBe(valmentajaOption[2].value);
    console.log("Valmentaja lista value: ", valmentajaLista.value);
  });

  cleanup();
  test("Tehtävä 16e, valmentaja komponentti", () => {
    render(<Valmentaja data={valmentajatData} />);
    const valmentajaLista = screen.getByTestId("valmentajaSelect");
    expect(valmentajaLista[valmentajaLista.length - 2].value).toBe(
      "Tommi Jokinen"
    );
  });
  cleanup();
  test("Teht 16e Joukkueet taulukko", () => {
    //render(<Joukkueet joukkueet={joukkueetData} />);
    const { debug } = render(<Joukkueet joukkueet={joukkueetData} />);
    let lohkot = screen.getAllByRole("rowgroup");
    const row = within(lohkot[1]).getAllByRole("row");
    joukkueetData.forEach((x, i) => {
      const td = within(row[i]).getAllByRole("cell");
      expect(td[0]).toHaveTextContent(x.joukkue);
      expect(td[1]).toHaveTextContent(x.kotipaikka);
      expect(td[2]).toHaveTextContent(x.valmentaja);
      expect(td[3]).toHaveTextContent(x.id);
    });
  });
  cleanup();
  test("Tehtävä 16e, lisää nappi", () => {
    const { debug } = render(<Lomake />);
    const joukkueInput = screen.getByTestId("joukkue");
    const kotipaikkaInput = screen.getByTestId("kotipaikka");
    const valmentajaLista = screen.getByTestId("valmentajaSelect");
    const valmentajaOption = screen.getAllByTestId("valmentajaOption");
    const lisaaNappi = screen.getByTestId("lisaa");

    fireEvent.change(joukkueInput, {
      target: { value: joukkueUserInput },
    });
    fireEvent.change(kotipaikkaInput, {
      target: { value: kotipaikkaUserInput },
    });

    fireEvent.change(valmentajaLista, {
      target: { value: valmentajaOption[1].value },
    });
    expect(valmentajaLista.value).toBeTruthy();
    console.log("Valmentaja lista value: ", valmentajaLista.value);

    fireEvent.click(lisaaNappi);
    let lohkot = screen.getAllByRole("rowgroup");
    // Pitäisi olla 2 lohkoa, toinen otsikoille (thead), toinen riveille (tbody)

    let data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(1);
    const td = within(data_rows[0]).getAllByRole("cell");

    //Renderöinti järjestyksellä on väliä
    //ID: alkamaan 1
    expect(td[0]).toHaveTextContent(joukkueUserInput);
    expect(td[1]).toHaveTextContent(kotipaikkaUserInput);
    expect(td[2]).toHaveTextContent(valmentajaOption[1].value);
    expect(td[3]).toHaveTextContent(1);

    fireEvent.click(lisaaNappi);
    fireEvent.click(lisaaNappi);
    data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(3);
  });
});
cleanup();
describe("Tehtävä 16f, Delete toiminto", () => {
  test("Tehtävä 16f, onDelete props ja nappi", () => {
    render(<Joukkueet joukkueet={joukkueetData} onDelete />);
    const deleteBt = screen.getAllByTestId("poista");
    expect(deleteBt[0]).toBeInTheDocument();
  });
  cleanup();
  test("Tehtävä 16f, onDelete props ei ole pakollinen, Taulukko tulostuu silti", () => {
    render(<Joukkueet joukkueet={joukkueetData} />);
    expect(screen.queryAllByTestId("poista")[0]).toBeUndefined();
    const lohkot = screen.getAllByRole("rowgroup");

    // Pitäisi olla 2 lohkoa, toinen otsikoille (thead), toinen riveille (tbody)
    const data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(2);
    const td = within(data_rows[0]).getAllByRole("cell");

    //Renderöinti järjestyksellä on väliä
    expect(td[0]).toHaveTextContent(joukkueetData[0].joukkue);
    expect(td[1]).toHaveTextContent(joukkueetData[0].kotipaikka);
    expect(td[2]).toHaveTextContent(joukkueetData[0].valmentaja);
    expect(td[3]).toHaveTextContent(joukkueetData[0].id);
  });

  test("Tehtävä 16f, Poistetaan valittu joukkue ja näytetään päivitetty taulukko", () => {
    render(<Lomake />);
    const joukkueInput = screen.getByTestId("joukkue");
    const kotipaikkaInput = screen.getByTestId("kotipaikka");
    const valmentajaLista = screen.getByTestId("valmentajaSelect");
    const valmentajaOption = screen.getAllByTestId("valmentajaOption");
    const lisaaNappi = screen.getByTestId("lisaa");

    fireEvent.change(joukkueInput, {
      target: { value: joukkueUserInput },
    });
    fireEvent.change(kotipaikkaInput, {
      target: { value: kotipaikkaUserInput },
    });
    fireEvent.change(valmentajaLista, {
      target: { value: valmentajaOption[1].value },
    });
    fireEvent.click(lisaaNappi);

    let lohkot = screen.getAllByRole("rowgroup");
    // Pitäisi olla 2 lohkoa, toinen otsikoille (thead), toinen riveille (tbody)

    let data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(1);

    const td = within(data_rows[0]).getAllByRole("cell");
    //Renderöinti järjestyksellä on väliä
    expect(td[0]).toHaveTextContent(joukkueUserInput);
    expect(td[1]).toHaveTextContent(kotipaikkaUserInput);
    expect(td[2]).toHaveTextContent(valmentajaOption[1].value);
    expect(td[3]).toHaveTextContent(1);

    //Otetaan tietyn syötteen delete button kiinni
    const deleteBt = screen.getByTestId("poista");

    fireEvent.click(lisaaNappi);
    fireEvent.click(lisaaNappi);
    data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(3);
    fireEvent.click(deleteBt);
    data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(2);
  });
});

describe("Tehtävä 16g, Change ominaisuus", () => {
  test("Tehtävä 16g, onChange props ja nappi", () => {
    render(<Joukkueet joukkueet={joukkueetData} onChange />);
    const changeBt = screen.getAllByTestId("muuta");
    expect(changeBt[0]).toBeInTheDocument();
  });
  test("Tehtävä 16g, onChange props ei ole pakollinen, Taulukko tulostuu silti", () => {
    render(<Joukkueet joukkueet={joukkueetData} />);
    expect(screen.queryAllByTestId("muuta")[0]).toBeUndefined();

    // Pitäisi olla 2 lohkoa, toinen otsikoille (thead), toinen riveille (tbody)
    const lohkot = screen.getAllByRole("rowgroup");
    const data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(2);
    const td = within(data_rows[0]).getAllByRole("cell");

    //Renderöinti järjestyksellä on väliä
    expect(td[0]).toHaveTextContent(joukkueetData[0].joukkue);
    expect(td[1]).toHaveTextContent(joukkueetData[0].kotipaikka);
    expect(td[2]).toHaveTextContent(joukkueetData[0].valmentaja);
    expect(td[3]).toHaveTextContent(joukkueetData[0].id);
  });
  test("Tehtävä 16g, Tietojen muuttaminen", () => {
    render(<Lomake joukkueet={joukkueetData} />);
    const joukkueInput = screen.getByTestId("joukkue");
    const kotipaikkaInput = screen.getByTestId("kotipaikka");
    const valmentajaLista = screen.getByTestId("valmentajaSelect");
    const valmentajaOption = screen.getAllByTestId("valmentajaOption");
    const lisaaNappi = screen.getByTestId("lisaa");

    fireEvent.change(joukkueInput, {
      target: { value: joukkueUserInput },
    });
    fireEvent.change(kotipaikkaInput, {
      target: { value: kotipaikkaUserInput },
    });

    fireEvent.change(valmentajaLista, {
      target: { value: valmentajaOption[2].value },
    });
    fireEvent.click(lisaaNappi);

    // Pitäisi olla 2 lohkoa, toinen otsikoille (thead), toinen riveille (tbody)
    let lohkot = screen.getAllByRole("rowgroup");
    let data_rows = within(lohkot[1]).getAllByRole("row");
    expect(data_rows.length).toBe(1);

    const td = within(data_rows[0]).getAllByRole("cell");
    //Renderöinti järjestyksellä on väliä
    
    expect(td[0]).toHaveTextContent(joukkueUserInput);
    expect(td[1]).toHaveTextContent(kotipaikkaUserInput);
    expect(td[2]).toHaveTextContent(valmentajaOption[2].value);
    expect(td[3]).toHaveTextContent(1);

    const changeBt = screen.getAllByTestId("muuta");
    fireEvent.click(changeBt[0]);
    const tallennaBt = screen.getByTestId("tallenna");
    expect(tallennaBt).toBeInTheDocument();
    expect(lisaaNappi).toBe(tallennaBt);

    expect(joukkueInput.value).toMatch(joukkueUserInput);
    fireEvent.change(joukkueInput, {
      target: { value: "muutettu joukkue" },
    });
    fireEvent.change(kotipaikkaInput, {
      target: { value: "muutettu kotipaikka" },
    });
    fireEvent.change(valmentajaLista, {
      target: { value: valmentajaOption[3].value },
    });
    fireEvent.click(tallennaBt);
    expect(td[0]).toHaveTextContent("muutettu joukkue");
    expect(td[1]).toHaveTextContent("muutettu kotipaikka");
    expect(td[2]).toBeTruthy();
    expect(td[3]).toHaveTextContent(1);
  });
});

