import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageAdd, resultMessage } from "../../app/actions/messages";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import Emoji from "react-emoji-render"; // Importar Emoji desde react-emoji-render
import { REACT_APP_AUTHOR, REACT_APP_API } from "../../app/consts/consts";


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
  const [xmonths, setXMonths] = useState(1)

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

        /*         dispatch(messageAdd(message));
                const messid = Number(localStorage.getItem("messAdded"))
         */
        if (message.inmediate === true) {
          const numbertosend = contact.cellphone + "@c.us"
          const params = {
            chatId: numbertosend,
            message: texttosend
          }
          const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json', authorization: REACT_APP_AUTHOR },
            body: JSON.stringify(params)
          };

          fetch('https://waapi.app/api/v1/instances/' + login.backwa + '/client/action/send-message', options)
            .then(response => response.json())
            .then(async response => {
              // const messid = Number(localStorage.getItem("messAdded"))
              // console.log(messid)
              console.log(response)
              // aqui escribir resultado de envio de mensaje
              var datetime = new Date();
              var fecha = datetime.getFullYear() + "-" + (datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + datetime.getDate().toString().padStart(2, "0")
              var hora = datetime.getHours().toString().padStart(2, "0") + ":" + datetime.getMinutes().toString().padStart(2, "0")
              var objMess = {
                ...message,
                sendeddate: fecha,
                sendedtime: hora,
                sended: response.data.status === "success" ? true : false,
                result: response.data.status // "Mensaje enviado con éxito"
              }
              // console.log(objMess)
              // console.log("ID ", response.data.data.id)
              dispatch(messageAdd(objMess));
              // dispatch(resultMessage(objMess))
              // await axios.put(`${REACT_APP_API}/messages/sended`, objMess)
              // fin guardar resultado de envio
            })
            .catch(err => console.error(err));

          // console.log(contact.cellphone, login.backwa, text)
          // para luego enviar mensaje

          // const { data } = await axios.post(`${login.backwa}/send/`, { idmess: messid, contacto: contact.cellphone, message: texttosend })
          // console.log(data)
          // y luego modificar mensaje con el resultado obtenido
          // await dispatch(resultMessage())
        } else {
          dispatch(messageAdd(message));
        }

        if (repite) {
          console.clear()
          setInmediate(false)
          let sumdays = new Date(senddates)

          let mesobten = parseInt(sumdays.getMonth())
          console.log("Primer mes" + mesobten)
          let elmes = parseInt(mesobten) + parseInt(xmonths)
          console.log("Primer somatorial, elmes", elmes)

          for (let i = 0; i < veces; i++) {
            if (mensual) {
              sumdays.setMonth(elmes)
              elmes = parseInt(elmes) + parseInt(xmonths)
            }
            else {
              sumdays.setDate(sumdays.getDate() + parseInt(days))
              console.log("dias", days)
            }
            senddates = sumdays.toISOString().split('T')[0];
            // console.log("meses",xmonths,"fecha sumada la "+ (i + 2) +" vez",sumdays)
            // console.log("Fecha sumada la "+ (i + 2) +" vez",sumdays, "\n sumado ", xmonths, " meses", "\n mes obtenido", sumdays.getMonth())
            // console.log()
            console.log(senddates)
            console.log("El mes " + elmes)
            // senddates.setDate(senddates.getDate() + days);
            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact.id, backwa: login.bacwa };
            dispatch(messageAdd(messrepite));
            //            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact };
            //            dispatch(messageAdd(messrepite));
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

        // dispatch(messageAdd(message));

        if (message.inmediate === true) {
          console.log(isContactSend[0].cellphone)
          const numbertosend = isContactSend[0].cellphone + "@c.us"
          console.log(numbertosend)
          const params = {
            chatId: numbertosend,
            message: texttosend
          }
          const options = {
            method: 'POST',
            headers: { accept: 'application/json', 'content-type': 'application/json', authorization: REACT_APP_AUTHOR },
            body: JSON.stringify(params)
          };

          fetch('https://waapi.app/api/v1/instances/' + login.backwa + '/client/action/send-message', options)
            .then(response => response.json())
            .then(async response => {
              // const messid = Number(localStorage.getItem("messAdded"))
              // console.log(messid)
              console.log(response)
              // aqui escribir resultado de envio de mensaje
              var datetime = new Date();
              var fecha = datetime.getFullYear() + "-" + (datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + datetime.getDate().toString().padStart(2, "0")
              var hora = datetime.getHours().toString().padStart(2, "0") + ":" + datetime.getMinutes().toString().padStart(2, "0")
              var objMess = {
                ...message,
                sendeddate: fecha,
                sendedtime: hora,
                sended: response.data.status === "success" ? true : false,
                result: response.data.status // "Mensaje enviado con éxito"
              }
              // console.log(objMess)
              // console.log("ID ", response.data.data.id)
              dispatch(messageAdd(objMess));
              // dispatch(resultMessage(objMess))
              // await axios.put(`${REACT_APP_API}/messages/sended`, objMess)
              // fin guardar resultado de envio
            })
            .catch(err => console.error(err));


          // const cell = await dispatch(getContactSend(contact))
          // console.log("a enviar", isContactSend[0].cellphone)
          // // console.log(cell.cellphone, login.backwa, text)
          // para luego enviar mensaje
          // const { data } = await axios.post(`${login.backwa}/send/`, { idmess: messid, contacto: isContactSend[0].cellphone, message: texttosend })
          // console.log(data)

          // y luego modificar mensaje con el resultado obtenido

        } else {
          dispatch(messageAdd(message));

        }

        if (repite) {
          console.clear()
          setInmediate(false)
          let sumdays = new Date(senddates)

          let mesobten = parseInt(sumdays.getMonth())
          console.log("Primer mes" + mesobten)
          let elmes = parseInt(mesobten) + parseInt(xmonths)
          console.log("Primer somatorial, elmes", elmes)

          for (let i = 0; i < veces; i++) {
            if (mensual) {
              sumdays.setMonth(elmes)
              elmes = parseInt(elmes) + parseInt(xmonths)
            }
            else {
              sumdays.setDate(sumdays.getDate() + parseInt(days))
              console.log("dias", days)
            }
            senddates = sumdays.toISOString().split('T')[0];
            // console.log("meses",xmonths,"fecha sumada la "+ (i + 2) +" vez",sumdays)
            // console.log("Fecha sumada la "+ (i + 2) +" vez",sumdays, "\n sumado ", xmonths, " meses", "\n mes obtenido", sumdays.getMonth())
            // console.log()
            console.log(senddates)
            console.log("El mes " + elmes)
            // senddates.setDate(senddates.getDate() + days);
            const messrepite = { text: texttosend, inmediate, senddates, sendtimes, contactid: contact };
            dispatch(messageAdd(messrepite));

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
    <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
      <h2 className="text-left text-xl font-bold uppercase mb-2 mx-8 my-5" style={{ letterSpacing: "2px" }}>
        Agregar mensaje
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="textAreaExample">
            Message
          </label>
          <textarea className="form-textarea mt-1 px-1 block w-full border border-gray-300 rounded" id="textAreaExample" rows="4" value={textm} onChange={(e) => setTextM(e.target.value)} required></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Vista previa
          </label>
          {textm && (
            <div className="bg-gray-100 p-2 rounded">
              <Emoji text={textm || 'Default Text'} />
            </div>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="todos">
            Todos los destinatarios
          </label>
          <input className="form-checkbox h-5 w-5 text-indigo-600" type="checkbox" id="todos" checked={todos} onChange={() => setTodos(!todos)} />
        </div>
        {!todos && (
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seleccontact">
              Seleccione Destinatario/s
            </label>
            <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="contacts" value={input.contacts} onChange={handleDestinChangeSelect} id="seleccontact">
              <option value="">Elija contacto</option>
              {destin && destin.map((elem) => (
                <option key={elem.id} value={elem.id}>{elem.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="areatempec">
            Contactos Seleccionados:
          </label>
          <textarea className="form-textarea mt-1 block w-full rounded bg-white" id="areatempec" rows="1" cols="35" disabled readOnly={false}>{data.join(", ")}</textarea>
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline mt-2" onClick={handleCClick}>
            Borrar contacto
          </button>
        </div>
        <div className="mb-4">
          <div className="flex flex-col justify-between">
            <div className="md:w-1/2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2" id="inmediate" checked={inmediate} onChange={() => setInmediate(!inmediate)} />
                <span className="text-gray-700">Enviar inmediato</span>
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
        </div>
        <div className="mb-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2">
              <label className="inline-flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2" id="repite" checked={repite} onChange={() => setRepite(!repite)} />
                <span className="text-gray-700">Repetir</span>
              </label>
              {repite && (
                <div className="mt-2 md:mt-0 md:ml-4">
                  <input type="checkbox" className="form-checkbox h-5 w-5 text-indigo-600" id="mensual" checked={mensual} onChange={() => setMensual(!mensual)} />
                  <span className="ml-2 text-gray-700">Mensualmente</span>
                  <br />
                  {!mensual ? (
                    <>
                      Cada:<input
                        type="number"
                        id="days"
                        value={days}
                        onChange={(e) => setDays(e.target.value)} />
                      días
                    </>
                  ) : (
                    <>
                      Mismo día de cada mes<br />
                      Cada:<input
                        type="number"
                        id="nonths"
                        value={xmonths}
                        onChange={(e) => setXMonths(e.target.value)} />
                      mes/es
                    </>
                  )}
                  <br />
                  <input
                    type="number"
                    id="veces"
                    value={veces}
                    onChange={(e) => setVeces(e.target.value)} /> Veces
                  <br />
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="inline-flex items-center px-4 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">
          Enviar Mensaje
        </button>
      </form>
    </div>


  );
};

export default AddMessage;