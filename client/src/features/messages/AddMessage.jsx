import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserMessages, messageAdd, resultMessage } from "../../app/actions/messages";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { getContactSend } from "../../app/actions/contacts";


let data = []

const AddMessage = () => {
  const login = useSelector((state) => state.usersReducer.login)
  const groups = useSelector((state) => state.groupsReducer.groups);
  const destin = useSelector((state) => state.contactsReducer.contacts);
  const configs = useSelector((state) => state.configsReducer.configs);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  // senddate, sendtime, sended, sendedate, sendedtime

  const hoy = new Date()/* .toLocaleDateString();  */
  const ahora = new Date().toLocaleTimeString();
  const [textm, setTextM] = useState("");
  const [inmediate, setInmediate] = useState(true);
  const [repite, setRepite] = useState(false);
  const [senddate, setSendDate] = useState(hoy);
  const [sendtime, setSendTime] = useState("09:00");
  const [todos, setTodos] = useState(false)
  const [days, setDays] = useState(30)
  const [veces, setVeces] = useState(1)
  const [mensual, setMensual] = useState(false)

  const allContacts = useSelector((state) => state.contactsReducer.contacts)

  const [input, setInput] = useState({
    categories: [],
    contacts: []
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(data)
    const groups = input.categories
    const destins = input.contacts
    let alldestins = []
    var senddates = senddate
    var sendtimes = sendtime

    if (todos) {
      // console.log("usuarios", allContacts)
      allContacts && allContacts.map(async (contact) => {
        // console.log("dia: " + senddate)
        var senddates = senddate
        var sendtimes = sendtime
        alldestins.push(contact.id)
        // console.log("la arme?", senddates, sendtimes)
        console.log(contact.id)
        let texttosend = textm.replaceAll("-NB-", contact.name)
        texttosend = texttosend.replaceAll("-EM-", configs.business)
        texttosend = texttosend.replaceAll("-EMS-", configs.slogan)
        console.log("Nuevo texto: " + texttosend)
        const message = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact.id, backwa: login.bacwa };
        // console.log("MENSAJE A ENVIAR", message)

        await dispatch(messageAdd(message));
        const messid = Number(localStorage.getItem("messAdded"))

        if (message.inmediate === true) {
          // console.log(contact.cellphone, login.backwa, text)
          // para luego enviar mensaje
          const { data } = await axios.post(`${login.backwa}/send/`, { idmess: messid, contacto: contact.cellphone, message: texttosend })
          console.log(data)
          // y luego modificar mensaje con el resultado obtenido
          // await dispatch(resultMessage())
        }

        if (repite) {
          setInmediate(false)
          let sumdays = new Date(senddates)
          if (mensual)
            sumdays.setMonth(sumdays.getMonth() + 1)
          else
            sumdays.setDate(sumdays.getDate() + days)
          console.log(new Date(sumdays))
          senddates = sumdays.toISOString().split('T')[0];
          console.log(senddates)
          for (let i = 0; i < veces; i++) {
            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact.id, backwa: login.bacwa };
            dispatch(messageAdd(messrepite));
            sumdays = new Date(senddates)
            if (mensual)
              sumdays.setMonth(sumdays.getMonth() + 1)
            else
              sumdays.setDate(sumdays.getDate() + days)
            senddates = sumdays.toISOString().split('T')[0];
            console.log(messrepite)
            // senddates.setDate(senddates.getDate() + days);
          }
        }



      })
    } else {
      // console.log("destinatario", destins)
      destins && destins.map(async (contact) => {
        // console.log("dia: " + senddate)
        var senddates = senddate
        var sendtimes = sendtime

        const isContactSend = destin.filter((aenviar) => aenviar.id == contact);
        let texttosend = textm.replaceAll("-NB-", isContactSend[0].name)
        texttosend = texttosend.replaceAll("-EM-", configs.business)
        texttosend = texttosend.replaceAll("-EMS-", configs.slogan)
        console.log("Nuevo texto: " + texttosend)
        const message = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact };
        // console.log("MENSAJE A ENVIAR", message)

        await dispatch(messageAdd(message));
        const messid = Number(localStorage.getItem("messAdded"))

        if (message.inmediate === true) {

          // const cell = await dispatch(getContactSend(contact))
          console.log("a enviar", isContactSend[0].cellphone)
          // // console.log(cell.cellphone, login.backwa, text)
          // para luego enviar mensaje
          const { data } = await axios.post(`${login.backwa}/send/`, { idmess: messid, contacto: isContactSend[0].cellphone, message: texttosend })
          console.log(data)

          // y luego modificar mensaje con el resultado obtenido

        }

        if (repite) {
          setInmediate(false)
          let sumdays = new Date(senddates)
          if (mensual)
            sumdays.setMonth(sumdays.getMonth() + 1)
          else
            sumdays.setDate(sumdays.getDate() + days)
          console.log(new Date(sumdays))
          senddates = sumdays.toISOString().split('T')[0];
          console.log(senddates)
          for (let i = 0; i < veces; i++) {
            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact };
            dispatch(messageAdd(messrepite));
            sumdays = new Date(senddates)
            if (mensual)
              sumdays.setMonth(sumdays.getMonth() + 1)
            else
              sumdays.setDate(sumdays.getDate() + days)
            senddates = sumdays.toISOString().split('T')[0];
            console.log(messrepite)
            // senddates.setDate(senddates.getDate() + days);
          }
        }

      })
    }
    //    const message = { text, inmediate, senddates, sendtimes, /* contactid: contact.id */ alldestins, backwa: login.bacwa };
    //    await dispatch(messageAdd(message));

    navigate("/show-messages", { replace: true });
  };



  function handleDestinChangeSelect(e) {
    var temperac = input.contacts.find((temp) => temp === e.target.value);
    // console.log(temperac);
    if (!temperac && e.target.value !== "0") {
      data = [...input.contacts];
      data.push(e.target.value);
      setInput({ ...input, contacts: data });
      var seltempec = document.getElementById("seleccontact");
      // console.log(seltempec);
      var strtempec = seltempec.options[seltempec.selectedIndex].text;
      var artempesc = document.getElementById("areatempec");
      artempesc.value += artempesc.value.length > 0 ? ", " + strtempec : strtempec;
      // console.log("estas seleccionando:" + data);
    } else alert("El contacto ya fue agregado");
  }

  const handleCClick = () => {
    // console.log("DATA", data)
    let eliminado = data.pop()
    // console.log("Elimine", eliminado)
    var artempesc = document.getElementById("areatempec");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenareac = artempesc.value.split(",");
    textoenareac.pop()
    // console.log("Text area", textoenareac)
    artempesc.value = textoenareac
    // console.log(artempesc)
  }

  function handleChangeSelect(e) {
    var tempera = input.categories.find((temp) => temp === e.target.value);
    // console.log(tempera);
    if (!tempera && e.target.value !== "0") {
      data = [...input.categories];
      data.push(e.target.value);
      setInput({ ...input, categories: data });
      var seltempe = document.getElementById("seleccategory");
      // console.log(seltempe);
      var strtempe = seltempe.options[seltempe.selectedIndex].text;
      var artempes = document.getElementById("areatempe");
      artempes.value += artempes.value.length > 0 ? ", " + strtempe : strtempe;
      // console.log("estas seleccionando:" + data);
    } else alert("La categoría ya fue agregada");
  }


  const handleClick = () => {
    // console.log("DATA", data)
    let eliminado = data.pop()
    // console.log("Elimine", eliminado)
    var artempes = document.getElementById("areatempe");
    // artempes.value -= artempes.value.length > 0 ? ", " - strtempe : strtempe;
    var textoenarea = artempes.value.split(",");
    textoenarea.pop()
    // console.log("Text area", textoenarea)
    artempes.value = textoenarea
  }

  // console.log("use estate ", hoy, "DEstinatarios ", destin)

  if (destin.length === 0) {
    Swal.fire({
      title: "Destinatarios",
      html: "Debe ingresar, al menos, un destinatario<br/>Desea agregar?",
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
        Agregar mensaje
      </h2>
      <form
        onSubmit={handleSubmit}
        className="border rounded p-4"
        style={{ maxWidth: "80%", margin: "auto" }}
      >
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" checked={todos} onChange={() => setTodos(!todos)} />
          <label class="form-check-label" for="flexCheckDefault">
            Todos los destinatarios
          </label>
        </div>
        {!todos ? <div className="d-flex p-2 bd-highlight"><div className="border rounded">
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
                Elija contacto{" "}
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
            <label className="mb-3">Contactos Seleccionados:</label>
            <textarea
              className="form-control"
              id="areatempec"
              readOnly
              rows="1"
              cols="35"
            /><div className="btn btn-outline-success searchbut" onClick={handleCClick}> borrar contacto </div>
          </div>

        </div>
          {/* Seleccionar grupos destinatarios */}
          {/* <div className="border rounded"> 
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
                  Grupo de contactos{" "}
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
              <label className="mb-3">Grupos seleccionados:</label>
              <textarea
                className="form-control"
                id="areatempe"
                readOnly
                rows="1"
                cols="35"
              /><div className="btn btn-outline-success searchbut" onClick={handleClick}> borrar grupo </div>
            </div>
          </div> */}
          <hr /></div>
          : ""}
        <div class="mb-3 form-outline">
          <label class="form-label" for="textAreaExample">Message</label>
          <textarea class="form-control"
            id="textAreaExample1"
            rows="4"
            value={textm}
            onChange={(e) => setTextM(e.target.value)}
            required
          ></textarea>
          <div>
            Puede susar los comodines: <br />
            -NB- para insertar nombre de destinatario, <br />
            -EM- para insertar nombre de su empresa, <br />
            -EMS- para insertar slogan de su empresa. <br />
          </div>
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
                Fecha: <input
                  type="date"
                  id="senddate"
                  value={senddate}
                  onChange={(e) => setSendDate(e.target.value)} />
                <br />
                Hora:   <input
                  type="time"
                  id="hora"
                  list="times"
                  value={sendtime}
                  onChange={(e) => setSendTime(e.target.value)} />

                <datalist id="times">
                  <option value="08:00:00" />
                  <option value="08:15:00" />
                  <option value="08:30:00" />
                  <option value="08:45:00" />
                  <option value="09:00:00" />
                  <option value="09:15:00" />
                  <option value="09:30:00" />
                  <option value="09:45:00" />
                  <option value="10:00:00" />
                  <option value="10:15:00" />
                  <option value="10:30:00" />
                  <option value="10:45:00" />
                  <option value="11:00:00" />
                  <option value="10:15:00" />
                  <option value="11:30:00" />
                  <option value="11:45:00" />
                  <option value="12:00:00" />
                  <option value="12:15:00" />
                  <option value="12:30:00" />
                  <option value="12:45:00" />
                  <option value="13:00:00" />
                  <option value="13:15:00" />
                  <option value="13:30:00" />
                  <option value="13:45:00" />
                  <option value="14:00:00" />
                  <option value="14:15:00" />
                  <option value="14:30:00" />
                  <option value="14:45:00" />
                  <option value="15:00:00" />
                  <option value="15:15:00" />
                  <option value="15:30:00" />
                  <option value="15:45:00" />
                  <option value="16:00:00" />
                  <option value="16:15:00" />
                  <option value="16:30:00" />
                  <option value="16:45:00" />
                  <option value="17:00:00" />
                  <option value="17:15:00" />
                  <option value="17:30:00" />
                  <option value="17:45:00" />
                  <option value="18:00:00" />
                  <option value="18:15:00" />
                  <option value="18:30:00" />
                  <option value="18:45:00" />
                  <option value="19:00:00" />
                  <option value="19:15:00" />
                  <option value="19:30:00" />
                  <option value="19:45:00" />
                  <option value="20:00:00" />
                  <option value="20:15:00" />
                  <option value="20:30:00" />
                  <option value="20:45:00" />
                  <option value="21:00:00" />
                  <option value="21:15:00" />
                  <option value="21:30:00" />
                  <option value="21:45:00" />
                </datalist>
              </div>
              : ""}
          </div>
        </div>
        <div class="form-check">
          <input class="form-check-input" type="checkbox" value="" checked={repite} onChange={() => setRepite(!repite)} />
          <label class="form-check-label" for="flexCheckDefault">
            Repetir
          </label>
          <div>
            {repite ?
              <div className="form-control">
                <input class="form-check-input" type="checkbox" value="" checked={mensual} onChange={() => setMensual(!mensual)} />
                <label class="form-check-label" for="flexCheckDefault">
                  Mensualmente
                </label>
                <br />
                {!mensual ? <>
                  Cada:<input
                    type="number"
                    id="days"
                    value={days}
                    onChange={(e) => setDays(e.target.value)} />
                  dias </> : " Mismo dia de cada mes"}
                <br />
                <input
                  type="number"
                  id="veces"
                  value={veces}
                  onChange={(e) => setVeces(e.target.value)} />Veces
                <br />
              </div>
              : ""}
          </div>

        </div>

        <button
          type="submit"
          className="btn"
          style={{ background: "#006877", color: "white" }}
        >
          Agregar Mensaje
        </button>
      </form>
    </div>
  );
};

export default AddMessage;