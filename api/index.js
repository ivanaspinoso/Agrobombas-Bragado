const express = require("express");
const morgan = require("morgan");
// const cors = require("cors"); // para poder hacer peticiones desde cualquier punto (tambien se puede configurar de donde recibir las peticiones)
const routes = require("./src/routes/index");
const { PORT, FORZAR } = require("./src/utils/config/index.js");
const errorHandler = require("./src/utils/middlewares/errorHandler.js");
const setHeaders = require("./src/utils/middlewares/setHeaders.js");
const { programador_tareas } = require('./src/scheduler.js')

const app = express();
// app.use(cors()); // uso de cors definido anteriormente
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json({ limit: "50mb" }));
app.use(morgan("dev"));

app.use(errorHandler);
app.use(setHeaders);

app.use("/wasystem", routes);

const {
  conn,
  Contacts,
  Messages,
  Users,
  Category,
  Configs
} = require("./src/models/index.js");

const {
  initialConfigs,
  initialGroups,
  initialUsers
} = require("./src/seed.js");

// clear console
console.clear();
console.log(typeof FORZAR);

fuerce = FORZAR === "true" ? true : false;

// Listening for the server
conn
  .sync({ force: fuerce })
  .then(() => {
    console.log("Connect");
    app.listen(PORT, () => {
      console.log(`Listen on port ${PORT}, forzar es: ${fuerce}`)
      //init scheduler
      programador_tareas()
    })
  })
  .then(async () => {
    if (fuerce === true) await Users.bulkCreate(initialUsers);
  })
  .then(async () => {
    if (fuerce === true) await Configs.bulkCreate(initialConfigs);
  })
  .then(async () => {
    if (fuerce === true) await Category.bulkCreate(initialGroups);
  })
  .catch((error) => {
    console.log("Error en index", error);
  });