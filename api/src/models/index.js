const { Sequelize } = require("sequelize");
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
} = require("../utils/config/index.js");

const userModel = require("./users");
const familyModel = require("./families");
const orderModel = require("./sales");
const productModel = require("./products");
const orderLineModel = require("./orderline");
const companyModel = require("./companys");
const customerModel = require("./customers")
const supplierModel = require("./suppliers")
const cashflowModel = require("./cashflows")
const salesModel  = require("./sales")
const caccountsModel = require("./caccounts.js")
const buysModel = require("./buys.js")
// const buylinesModel = require("./buylines.js")


const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;
let sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize({
        database: DB_NAME,
        dialect: "postgres",
        host: DB_HOST,
        port: 5432,
        username: DB_USER,
        password: DB_PASSWORD,
        pool: {
          max: 3,
          min: 1,
          idle: 10000,
        },
        dialectOptions: {
          ssl: {
            require: true,
            // Ref.: https://github.com/brianc/node-postgres/issues/2009
            rejectUnauthorized: false,
          },
          keepAlive: true,
        },
        ssl: true,
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        { logging: false, native: false }
      );

const User = userModel(sequelize);
const Product = productModel(sequelize);
const Family = familyModel(sequelize);
const Order = orderModel(sequelize);
const OrderLine = orderLineModel(sequelize);
const Company = companyModel(sequelize);
const Customer = customerModel(sequelize)
const Supplier = supplierModel(sequelize)
const Cashflow = cashflowModel(sequelize)
const Sales = salesModel(sequelize)
const Caccounts = caccountsModel(sequelize)
const Buys = buysModel(sequelize)
// const BuyLine = buylinesModel(sequelize)

// const IP = ipmodels(sequelize) */
const Prod_Cat = (sequelize.models.prod_cat)

// Será necesario definir las relaciones

Product.belongsToMany(Family, { through: 'prod_cat' });
Family.belongsToMany(Product, { through: 'prod_cat' }); 

// Brand.hasMany(Product)       // Una marca puede tener varios productos
// Product.belongsTo(Brand);    // Un producto puede tener una sola marca (fabrica)

Supplier.hasMany(Product)       // Una marca puede tener varios productos
Product.belongsTo(Supplier);    // Un producto puede tener una sola marca (fabrica)

Customer.hasMany(Sales)         // A un cliente le podemos hacer varias ventas
Sales.belongsTo(Customer)       // A una venta solo le podemos asignar un cliente

User.hasMany(Cashflow)          // Un usuario puede hacer varias movimientos de caja
Cashflow.belongsTo(User)        // a Un movimiento de caja solo le popodemos asignar un usuario

// relaciones para ventas

Product.hasMany(OrderLine);      // Un producto puede tener varias lineas de venta
OrderLine.belongsTo(Product);    // Una linea de venta solo puede tener un producto

Sales.hasMany(OrderLine);
OrderLine.belongsTo(Sales);

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Sales)             // Un usuario puede hacer varias ventas
Sales.belongsTo(User)           // a Una venta solo le popodemos asignar un usuario

// relaciones para compras

// Product.hasMany(BuyLine);      // Un producto puede tener varias lineas de compra
// BuyLine.belongsTo(Product);    // Una linea de compra solo puede tener un producto

// Buys.hasMany(BuyLine);
// BuyLine.belongsTo(Buys);

// Supplier.hasMany(Buys);
// Buys.belongsTo(User);

Supplier.hasMany(Buys);        // Un proveedor puede tener varias compras
Buys.belongsTo(Supplier);      // a una compra solo se le asigna un proveedor

User.hasMany(Buys)             // Un usuario puede hacer varias compras
Buys.belongsTo(User)           // a Una compra solo le popodemos asignar un usuario

User.hasMany(Caccounts)          // Un usuario puede hacer varias movimientos de cuentas corrientes
Caccounts.belongsTo(User)        // a Un movimiento de cuenta corriente solo le popodemos asignar un usuario

Customer.hasMany(Caccounts)      // Un cliente puede hacer varias movimientos de cuentas corrientes
Caccounts.belongsTo(Customer)        // a Un movimiento de cuenta corriente solo le popodemos asignar un usuario

Product.hasMany(OrderLine)         // Un producto puede estar en varias lineas de venta
OrderLine.belongsTo(Product)        // Una linea de venta puede tener Un producto

Product.belongsToMany(User, { through: 'favorites' });
User.belongsToMany(Product, { through: 'favorites' });

// console.log()
// Exports models

module.exports = {
  conn: sequelize,
  User,
  Product,
  Family,
  // Brand,
  Order,
  OrderLine,
  Company,
  Supplier,
  Customer,
  Cashflow,
  Sales,
  Caccounts,
  Buys,
  // IP,
  Prod_Cat: sequelize.models.prod_cat,
  Sequelize: sequelize
};
