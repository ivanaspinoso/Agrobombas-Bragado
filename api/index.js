const express = require("express");
const morgan = require("morgan");
// const cors = require("cors"); // para poder hacer peticiones desde cualquier punto (tambien se puede configurar de donde recibir las peticiones)
const routes = require("./src/routes/index");

const app = express();
const { PORT } = require("./src/utils/config/index.js");
const errorHandler = require("./src/utils/middlewares/errorHandler.js");
const setHeaders = require("./src/utils/middlewares/setHeaders.js");

// app.use(cors()); // uso de cors definido anteriormente
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(errorHandler);
app.use(setHeaders);

app.use("/", routes);

const {
  conn,
/*   Contacts,
  Messages, */
  Configs
} = require("./src/models/index.js");


const {
  initialConfigs,
} = require("./src/seed.js");


const forzar = true
// false // true

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
  }) 