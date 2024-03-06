const { Sequelize } = require("sequelize");
const {
  dbUser,
  dbPassword,
  dbHost,
  dbName,
} = require("../utils/config/index.js");

const configsModel = require("./configs");
const contactsModel = require("./contacts.js");
const messagesModel = require("./messages.js");
/*
const orderModel = require("./orders");
const productModel = require("./products");
const orderLineModel = require("./orderline");
const brandModel = require("./brands")
const ipmodels = require("./payips")
 */
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

const Configs = configsModel(sequelize);
const Contacts = contactsModel(sequelize);
const Messages = messagesModel(sequelize);

// Será necesario definir las relaciones segun necesite el sistema

Contacts.hasMany(Messages)       // Una contacto puede tener varios mensages
Messages.belongsTo(Contacts);    // Un producto puede tener una sola marca (fabrica)

/* 
Product.belongsToMany(Category, { through: 'prod_cat' });
Category.belongsToMany(Product, { through: 'prod_cat' }); 

Brand.hasMany(Product)       // Una marca puede tener varios productos
Product.belongsTo(Brand);    // Un producto puede tener una sola marca (fabrica)

Product.hasMany(OrderLine);
OrderLine.belongsTo(Product);

Order.hasMany(OrderLine);
OrderLine.belongsTo(Order);

User.hasMany(Order);
Order.belongsTo(User);

Product.belongsToMany(User, { through: 'favorites' });
User.belongsToMany(Product, { through: 'favorites' }); 
*/

// console.log()
// Exports models

module.exports = {
  conn: sequelize,
  Contacts,
  Configs,
  Messages,
/*   Product,
  Category,
  Brand,
  Order,
  OrderLine,
  IP,
  Prod_Cat: sequelize.models.prod_cat,
 */  Sequelize: sequelize
};
