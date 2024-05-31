import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { messageAdd} from "../../app/actions/messages";
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";

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
              console.log("dias",days)
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
              console.log("dias",days)
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
    <div class="container mx-auto mt-5 px-4">
    <h2 class="text-left text-xl font-bold uppercase mb-2 mx-8" style={{ letterSpacing: "2px" }}>
      Agregar mensaje
    </h2>
    <form onSubmit={handleSubmit} class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="textAreaExample">
          Message
        </label>
        <textarea class="form-textarea mt-1 block w-full border border-gray-300 rounded" id="textAreaExample" rows="4" value={textm} onChange={(e) => setTextM(e.target.value)} required></textarea>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="todos">
          Todos los destinatarios
        </label>
        <input class="form-checkbox h-5 w-5 text-indigo-600" type="checkbox" id="todos" checked={todos} onChange={() => setTodos(!todos)} />
      </div>
      {!todos && (
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="seleccontact">
            Seleccione Destinatario/s
          </label>
          <select class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="contacts" value={input.contacts} onChange={handleDestinChangeSelect} id="seleccontact">
            <option value="">Elija contacto</option>
            {destin && destin.map((elem) => (
              <option key={elem.id} value={elem.id}>{elem.name}</option>
            ))}
          </select>
        </div>
      )}
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="areatempec">
          Contactos Seleccionados:
        </label>
        <textarea class="form-textarea mt-1 block w-full rounded" id="areatempec" rows="1" cols="35" readonly>{data.join(", ")}</textarea>
        <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2" onClick={handleCClick}>
          Borrar contacto
        </button>
      </div>
    
      <div class="mb-4">
        <div class="flex flex-col justify-between">
          <div class="md:w-1/2">
            <label class="inline-flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2" id="inmediate" checked={inmediate} onChange={() => setInmediate(!inmediate)} />
              <span class="text-gray-700">Enviar inmediato</span>
            </label>
          </div>
          {!inmediate && (
            <div class="mt-2 md:mt-0 md:ml-4">
              Programar envio:
              <input type="date" class="form-input mt-1 block w-full" id="senddate" value={senddate} onChange={(e) => setSendDate(e.target.value)} />
              <input type="time" class="form-input mt-1 block w-full ml-2" id="hora" value={sendtime} onChange={(e) => setSendTime(e.target.value)} />
            </div>
          )}
        </div>
      </div>
      <div class="mb-4">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2">
            <label class="inline-flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mr-2" id="repite" checked={repite} onChange={() => setRepite(!repite)} />
              <span class="text-gray-700">Repetir</span>
            </label>
          </div>
          {!repite && (
            <div class="mt-2 md:mt-0 md:ml-4">
              <input type="checkbox" class="form-checkbox h-5 w-5 text-indigo-600" id="mensual" checked={mensual} onChange={() => setMensual(!mensual)} />
              <span class="ml-2 text-gray-700">Mensualmente</span>
            </div>
          )}
        </div>
      </div>
      <button class=" inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500" type="submit">
        Agregar Mensaje
      </button>
    </form>
  </div>
  
  );
};

export default AddMessage;