const express = require("express");
const morgan = require("morgan");
// const cors = require("cors"); // para poder hacer peticiones desde cualquier punto (tambien se puede configurar de donde recibir las peticiones)
const routes = require("./src/routes/index");
const { PORT } = require("./src/utils/config/index.js");
const errorHandler = require("./src/utils/middlewares/errorHandler.js");
const setHeaders = require("./src/utils/middlewares/setHeaders.js");

// WA Context

const { programador_tareas, envio_anuncio_all, envio_anuncio_active, envio_anuncio_inactive } = require('./src/wa/programador.js');
const { Client, LocalAuth } = require('whatsapp-web.js');
const QRcode = require('qrcode');

// WA end

const app = express();
// app.use(cors()); // uso de cors definido anteriormente
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(errorHandler);
app.use(setHeaders);

app.use("/", routes);


(async () => {

  const {
    conn,
    Contacts,
    Messages,
    Category,
    Configs
  } = require("./src/models/index.js");
  
  
  const {
    initialConfigs,
    initialGroups
  } = require("./src/seed.js");
  
  
  const forzar = true
  // false // true
  
    try {
      // clear console
      console.clear()

      // Listening for the server
      conn
      .sync({ force: forzar })
      .then(() => {
        console.log("Connect");
        app.listen(PORT, () => {
          console.log(`Listen on port ${PORT}`);
        });
      })
      .then(async () => {
        if (forzar === true) await Configs.bulkCreate(initialConfigs);
      }).then(async () => {
        if (forzar === true) await Category.bulkCreate(initialGroups);
      }) 
    
      const client = new Client({
        authStrategy: new LocalAuth(),
        puppeteer: {
          args: ['--no-sandbox'],
        }
      });
  
      // Add this after express code but before starting the server
  
      client.on('qr', (qr) => {
        // NOTE: This event will not be fired if a session is specified.
        console.log('QR RECEIVED', qr);
  
        //probando mio
        app.get('/wapp/getqr', async (req, res) => {
          try {
            const qrCodeImage = await QRcode.toDataURL(qr, {
              width: 320,
              height: 320,
            });
            console.log(qrCodeImage)
  
            res.send(`<img src="${qrCodeImage}" alt="QR Code"/>`)
  
          } catch (err) {
            console.error('Error generating QR code:', err);
            res.status(500).send('Internal Server Error');
          }
        })
  
      });
  
      client.on('ready', () => {
        console.log('READY');
      });
  
      app.get('/wapp', (req, res) => {
        res.status(200).json({ message: "BackEnd for WAPP - Reminder." })
      })
  
  
      //mensaje a todos segun canal
      app.post('/wapp/send/', async (req, res) => {
        const { message, canal } = req.body
  
        //generando envios masivo
        try {
          await envio_anuncio_all(client, message, canal);
          return res.sendStatus(200).send("Enviando mensajes")
        } catch (er) {
          return res.sendStatus(400).send("No se pudo inciar masivo")
        }
     })
  
      //mensaje a todos los activos segun canal
  
     app.post('/wapp/sendacti/', async (req, res) => {
      const { message, canal } = req.body
  
      //generando envios masivo
      try {
        await envio_anuncio_active(client, message, canal);
        return res.sendStatus(200).send("Enviando mensajes")
      } catch (er) {
        return res.sendStatus(400).send("No se pudo inciar masivo")
      }
    })
  
        //mensaje a todos inactivos segun canal
  
    app.post('/wapp/sendinac/', async (req, res) => {
      const { message, canal } = req.body
  
      //generando envios masivo
      try {
        await envio_anuncio_inactive(client, message, canal);
        return res.sendStatus(200).send("Enviando mensajes")
      } catch (er) {
        return res.sendStatus(400).send("No se pudo inciar masivo")
      }
    })
  
      //init client whats-app web 
      await client.initialize();
  
      //init scheduler
      programador_tareas(client);
  
    } catch (error) {
      console.log('Error en index', error);
    }
  })();