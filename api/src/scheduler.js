const cron = require('node-cron');
const axios = require("axios")
require('dotenv').config();

const autor = process.env.AUTOR

function programador_tareas() {
    const tiempo = '*/15 8-22 * * *' // everyday cada 15' de 8 a 22 hs
    if (cron.validate(tiempo)) {
        console.log('Cron inicializado');
        cron.schedule(tiempo, async () => {
            try {
                var datetime = new Date();
                var datesend = datetime.getDate()
                var timesend = datetime.getTime()
                var diadeaviso = datetime.toISOString().slice(8, 10) < 10 ? datetime.toISOString().slice(9, 10) : datetime.toISOString().slice(8, 10)
                var dia = {
                    diaavisa: diadeaviso
                }
                var venci = datetime.toISOString().slice(2, 4) + datetime.toISOString().slice(5, 7)
                // console.log(venci)
                // console.log(dia.diaavisa)
                // console.log(datetime.getFullYear() + '-' + datetime.getMonth() + '-' + datetime.getDay());
                // console.log(datetime.getHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds());
                // console.log("pasaron 5 minutos")
                var url = `${process.env.BACK_URL}/wasystem/messages/tosendall` // wasystem/messages/byuser/1
                var fecha = datetime.getFullYear() + "-" + (datetime.getMonth() + 1).toString().padStart(2, '0') + "-" + datetime.getDate().toString().padStart(2, "0")
                var hora = datetime.getHours().toString().padStart(2, "0") + ":" + datetime.getMinutes().toString().padStart(2, "0")
                console.log()
                console.log("URL: " + url, fecha, hora);
                const { data } = await axios.post(url, { /* userid: process.env.USER_ID, */ datesend: fecha, timesend: hora })
                // console.log("Fecha y hora:", fecha, hora, "data: ", data)
                data.map(async (mensaje) => {

                    console.log(mensaje.contact.user.backwa)
                    if (mensaje.contact.user.backwa) {
                        const numbertosend = mensaje.contact.cellphone + "@c.us"
                        const texttosend = mensaje.text
                        console.log("Message enviado", mensaje.id)
                        const params = {
                            chatId: numbertosend,
                            message: texttosend
                        }
                        const options = {
                            method: 'POST',
                            headers: { accept: 'application/json', 'content-type': 'application/json', authorization: process.env.AUTOR },
                            body: JSON.stringify(params)
                        };

                        fetch('https://waapi.app/api/v1/instances/' + mensaje.contact.user.backwa + '/client/action/send-message', options)
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
                                    messid: mensaje.id,
                                    datesended: fecha,
                                    timesended: hora,
                                    sended: response.data.status === "success" ? true : false,
                                    result: response.data.status // "Mensaje enviado con éxito"
                                }
                                // console.log(objMess)
                                try {
                                    await axios.put(`${process.env.BACK_URL}/wasystem/messages/sended`, objMess)
                                    // res.status(200).send("Mensaje enviado")
                                } catch (error) {
                                    // res.status(400).send("Enviado pero con error al " + error + " al modificar")
                                }
                            })
                            .catch(err => console.error(err));
                    }
                })
            } catch (error) { console.log('Error en cron', error); }
        })
    } else { console.log("tiempo no validado") }
}

module.exports = {
    programador_tareas,
};