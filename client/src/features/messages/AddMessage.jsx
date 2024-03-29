import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageAdd } from "../../app/actions/messages";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";


let data = []

const AddMessage = () => {
  const groups = useSelector((state) => state.groupsReducer.groups);
  const destin = useSelector((state) => state.contactsReducer.contacts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // senddate, sendtime, sended, sendedate, sendedtime

  const hoy = new Date()/* .toLocaleDateString(); */
  const ahora = new Date().toLocaleTimeString();
  const [text, setText] = useState("");
  const [inmediate, setInmediate] = useState(true);
  const [senddate, setSendDate] = useState(hoy);
  const [sendtime, setSendTime] = useState(ahora);
  const [todos, setTodos] = useState(false)

  const [input, setInput] = useState({
    categories: [],
    contacts: []
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(data)
    const groups = input.categories
    const users = input.contacts

    if (users.length <= 0 && groups.length <= 0) {
      alert("Por favor asigne uno contacto o grupo de contacto para enviar el mensaje")
    } else {
      users && users.map((contact) => {
        console.log("dia: " + senddate)
        var senddates = new Date()
        var sendtimes = new Date()
        const message = { text, inmediate, senddates, sendtimes, contactid: contact };

        console.log(message)

        dispatch(messageAdd(message));

      })
      navigate("/show-messages", { replace: true });
    }
  };

  function handleDestinChangeSelect(e) {
    var temperac = input.contacts.find((temp) => temp === e.target.value);
    console.log(temperac);
    if (!temperac && e.target.value !== "0") {
      data = [...input.contacts];
      data.push(e.target.value);
      setInput({ ...input, contacts: data });
      var seltempec = document.getElementById("seleccontact");
      console.log(seltempec);
      var strtempec = seltempec.options[seltempec.selectedIndex].text;
      var artempesc = document.getElementById("areatempec");
      artempesc.value += artempesc.value.length > 0 ? ", " + strtempec : strtempec;
      console.log("estas seleccionando:" + data);
    } else alert("El contacto ya fue agregado");
  }

  const handleCClick = () => {
    console.log("DATA", data)
    let eliminado = data.pop()
    console.log("Elimine", eliminado)
    var artempesc = document.getElementById("areatempec");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenareac = artempesc.value.split(",");
    textoenareac.pop()
    console.log("Text area", textoenareac)
    artempesc.value = textoenareac
  }

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

  console.log("use estate ", hoy, "DEstinatarios ", destin)

  if (destin.length === 0) {
    Swal.fire({
      title: "Destinatarios",
      html:"Debe ingresar, al menos, un destinatario<br/>Desea agregar?",
      icon: "question",
      showDenyButton: true,
      confirmButtonText: 'Sí',
      denyButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/add-contact")
      } else if (result.isDenied) {
        navigate("/")
      }
    });
  }

  return (
    <div className="container mt-5">
      <h2
        className="text-center text-uppercase m-5"
        style={{ letterSpacing: "5px", fontWeight: "ligher" }}
      >
        Add Message
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4"
        style={{ maxWidth: "600px", margin: "auto" }}
      >
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" checked={todos} onChange={() => setTodos(!todos)} />
          <label class="form-check-label" for="flexCheckDefault">
            Todos los destinatarios
          </label>
        </div>
        {!todos ? <>
          <label className="form-label">Seleccione Destinatario/s</label>
          <div className="mb-3">
            <select
              className="form-select"
              name="contacts"
              value={input.contacts}
              onChange={handleDestinChangeSelect}
              id="seleccontact"
            >
              <option key="0" value="0">
                Elija destinatario contact{" "}
              </option>
              {destin &&
                destin.map((elem) => (
                  <option key={elem.id} value={elem.id}>
                    {elem.name}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-3">
            <label className="mb-3">Selecteds groups:</label>
            <textarea
              className="form-control"
              id="areatempec"
              readOnly
              rows="1"
              cols="35"
            /><div className="btn btn-outline-success searchbut" onClick={handleCClick}> borrar </div>
          </div>


          {/* Seleccionar grupos destinatarios */}
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
          </div></>
          : ""}
        <div class="mb-3 form-outline">
          <label class="form-label" for="textAreaExample">Message</label>
          <textarea class="form-control"
            id="textAreaExample1"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          ></textarea>

        </div>{/* 
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Texto del mensaje:
          </label>
          <input
            type="text"
            className="form-control"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div> */}
        <div className="mb-3">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="" checked={inmediate} onChange={() => setInmediate(!inmediate)} />
            <label class="form-check-label" for="flexCheckDefault">
              Enviar inmediato
            </label>
          </div>
          <div>
            {!inmediate ?
              <div className="form-control">
                <label>Programar envio:</label><br />
                Fecha: <DatePicker selected={senddate} onChange={(senddate) => setSendDate(senddate)} /><br />
                Hora:   <input
                  type="time"
                  id="hora"
                  value={sendtime}
                  step="900"
                  onChange={(e) => setSendTime(e.target.value)} />
              </div>
              : ""}
          </div>
        </div>

        <button
          type="submit"
          className="btn"
          style={{ background: "#006877", color: "white" }}
        >
          Add Message
        </button>
      </form>
    </div>
  );
};

export default AddMessage;