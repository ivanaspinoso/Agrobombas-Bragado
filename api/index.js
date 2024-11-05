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
  User,
  Product,
  Order,
  Category,
  Brand,
  Prod_Cat,
  OrderLine,
  Configs,
  Company,
  Supplier,
  Family,
  Customer,
  Cashflow
} = require("./src/models/index.js");


const {
  initialCategories,
  initialProducts,
  initialUsers,
  initialOrders,
  initialOrderlines,
  initialConfigs,
  categoryProducts,
  initialBrands,
  initialCompany,
  initialSuppliers,
  initialFamilies,
  familyyProducts,
  initialCustomers,
  initialCashflows
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
  }).then(async () => {
    if (forzar === true) await Company.bulkCreate(initialCompany);
  })
   .then(async () => {
    if (forzar === true) await User.bulkCreate(initialUsers);
  })
  .then(async () => {
    if (forzar === true) await Supplier.bulkCreate(initialSuppliers);
  })
  .then(async () => {
    if (forzar === true) await Family.bulkCreate(initialFamilies);
  })
  .then(async () => {
    if (forzar === true) await Product.bulkCreate(initialProducts);
  })
  .then(async () => {
    if (forzar === true) await Prod_Cat.bulkCreate(familyyProducts);
  })
  .then(async () => {
    if (forzar === true) await Customer.bulkCreate(initialCustomers);
  })
  .then(async () => {
    if (forzar === true) await Cashflow.bulkCreate(initialCashflows);
  })
/*  
  .then(async () => {
    if (forzar === true) await Brand.bulkCreate(initialBrands);
  })
 */
/*   .then(async () => {
    if (forzar === true) await Order.bulkCreate(initialOrders);
  })
  .then(async () => {
    if (forzar === true) await OrderLine.bulkCreate(initialOrderlines);
  }) */
  /* .then(async () => {
    if (forzar === true) await Configs.bulkCreate(initialConfigs);
  })
  .catch((error) => console.log("Error al bulkcreate", error)); */
