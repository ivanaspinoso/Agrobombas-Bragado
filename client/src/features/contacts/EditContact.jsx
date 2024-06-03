import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { contactUpdate } from "../../app/actions/contacts";

let data = []

const EditContact = () => {
  const location = useLocation();
  const categs = useSelector((state) => state.groupsReducer.groups)
  const dispatch = useDispatch();
  console.log(location.state);
  const [id] = useState(location.state.id);
  const [name, setName] = useState(location.state.name);
  const [cellphone, setCellphone] = useState(location.state.cellphone);
  const [groups, setGroups] = useState(location.state.categories)
  const [input,  setInput] = useState({
    categories: []
  })
  const navigate = useNavigate();

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

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(groups, input.categories)
    dispatch(contactUpdate({ id, name, cellphone, groups: input.categories }));
    navigate("/show-contacts", { replace: true });
  };

  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Editar Contacto
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4 "
        style={{ maxWidth: "600px", margin: "auto" }}
      >
                <div className="mb-3">
          <label className="form-label">Seleccione grupo/s</label>
          <select
            className="form-select"
            name="categories"
            // value={input.categories}
            // onChange={handleChangeSelect}
            onChange={handleChangeSelect}
            value={input.categories}
            id="seleccategory"
          >
            <option key="0" value="0">
              Group of contact{" "}
            </option>
            {categs &&
              categs.map((elem) => (
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
            type="text"
            className="form-control"
            id="cellphone"
            value={cellphone}
            onChange={(e) => setCellphone(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="btn "
          style={{ background: "#006877", color: "white" }}
        >
          Update Contact
        </button>
      </form>
    </div>
  );
};

export default EditContact;