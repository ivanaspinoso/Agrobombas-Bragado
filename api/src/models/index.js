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
const categoryModel = require("./categories.js");
const userModel = require("./users.js");

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
const Category = categoryModel(sequelize);
const Users = userModel(sequelize);


Users.hasOne(Configs)       // Una usuario puede tener una config
Configs.belongsTo(Users);    // Una config tener un solo usuario (fabrica)

Users.hasOne(Category)       // Una usuario puede tener una config
Category.belongsTo(Users);    // Una config tener un solo usuario (fabrica)

Contacts.belongsToMany(Users, { through: 'contact_user' });
Users.belongsToMany(Contacts, { through: 'contact_user' }); 


// Será necesario definir las relaciones segun necesite el sistema

Contacts.hasMany(Messages)       // Una contacto puede tener varios mensages
Messages.belongsTo(Contacts);    // Un mensaje puede tener un solo contacto/destinatario (fabrica)

Contacts.belongsToMany(Category, { through: 'contact_cat' });
Category.belongsToMany(Contacts, { through: 'contact_cat' }); 

module.exports = {
  conn: sequelize,
  Contacts,
  Configs,
  Messages,
  Category,
  Users,
/*
   Product,
  Brand,
  Order,
  OrderLine,
  IP,
  Prod_Cat: sequelize.models.prod_cat,
 */  Sequelize: sequelize
};
