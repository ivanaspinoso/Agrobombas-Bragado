import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "./ContactsSlice";
import { useNavigate } from "react-router-dom";
import { contactAdd } from "../../app/actions/contacts";

let data = []

const AddContact = () => {
  const groups = useSelector((state) => state.groupsReducer.groups);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [cellphone, setCellphone] = useState("");
  const [country, setCountry] = useState("");
  const [input, setInput] = useState({
    categories: [],
  });


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    const groups = input.categories
    if (groups.length <= 0) {
      alert("Por favor asigne uno o mas grupos al contacto")
    } else {
      const contact = { name, cellphone, country, groups };
      dispatch(contactAdd(contact));
      navigate("/show-contacts", { replace: true });
    }
  };

  function handleChangeSelect(e) {
    var tempera = input.categories.find((temp) => temp === e.target.value);
    console.log(tempera);
    if (!tempera && e.target.value !== "0") {
      data = [...input.categories];
      data.push(e.target.value);
      setInput({ ...input, categories: data });
      var seltempe = document.getElementById("seleccategory");
      console.log(seltempe);
      var strtempe = seltempe.options[seltempe.selectedIndex].text;
      var artempes = document.getElementById("areatempe");
      artempes.value += artempes.value.length > 0 ? ", " + strtempe : strtempe;
      console.log("estas seleccionando:" + data);
    } else alert("La categoría ya fue agregada");
  }


  const handleClick = () => {
    console.log("DATA", data)
    let eliminado = data.pop()
    console.log("Elimine", eliminado)
    var artempes = document.getElementById("areatempe");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenarea = artempes.value.split(",");
    textoenarea.pop()
    console.log("Text area", textoenarea)
    artempes.value = textoenarea
  }


  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Add Contact
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div className="mb-3">
          <label className="form-label">Seleccione grupo/s</label>
          <select
            className="form-select"
            name="categories"
            value={input.categories}
            onChange={handleChangeSelect}
            id="seleccategory"
          >
            <option key="0" value="0">
              Group of contact{" "}
            </option>
            {groups &&
              groups.map((elem) => (
                <option key={elem.id} value={elem.id}>
                  {elem.category}
                </option>
              ))}
          </select>
        </div>
        <div className="mb-3">
          <label className="mb-3">Selecteds groups:</label>
          <textarea
            className="form-control"
            id="areatempe"
            readOnly
            rows="1"
            cols="35"
          /><div className="btn btn-outline-success searchbut" onClick={handleClick}> borrar </div>
        </div>

        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Cellphone:
          </label>
          <input
            type="number"
            className="form-control"
            id="cellphone"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label">
            Country:
          </label>
          <input
            type="text"
            className="form-control"
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn"
          style={{ background: "#006877", color: "white" }}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default AddContact;