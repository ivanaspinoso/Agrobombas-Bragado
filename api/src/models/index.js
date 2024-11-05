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

// const IP = ipmodels(sequelize) */
const Prod_Cat = (sequelize.models.prod_cat)

// Será necesario definir las relaciones

Product.belongsToMany(Family, { through: 'prod_cat' });
Family.belongsToMany(Product, { through: 'prod_cat' }); 

// Brand.hasMany(Product)       // Una marca puede tener varios productos
// Product.belongsTo(Brand);    // Un producto puede tener una sola marca (fabrica)

Supplier.hasMany(Product)       // Una marca puede tener varios productos
Product.belongsTo(Supplier);    // Un producto puede tener una sola marca (fabrica)


Product.hasMany(OrderLine);
OrderLine.belongsTo(Product);

Order.hasMany(OrderLine);
OrderLine.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

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
  // IP,
  Prod_Cat: sequelize.models.prod_cat,
  Sequelize: sequelize
};
