const bcrypt = require("bcrypt");

const initialUsers = [
  {
    name: "Fede OyB",
    username: "fede",
    password: bcrypt.hashSync("admin", 8),
    isAdmin: true,
    cellphone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    province: "",
    country: "",
    active: true,
    blocked: false,
    backwa: "http://localhost:10001/client-0001",
    vinculated: false,
    autoreplys: true,
    autobots: true,
    price: 60
  },
  {
    name: "Franco M.",
    username: "fran",
    password: bcrypt.hashSync("admin", 8),
    isAdmin: false,
    cellphone: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    province: "",
    country: "",
    active: true,
    blocked: false,
    backwa: "http://localhost:10002/client-0002",
    vinculated: false,
    autoreplys: false,
    autobots: false,
    price: 30
  }
]

const initialConfigs = [
  {
    business: "SIB 2000",
    slogan: "Servicios y Productos de Informática",
    horario: "",
    messagewauno: "Mensaje 01",
    messagewados: "Mensaje 02",
    messagewatres: "Mensaje 03",
    messagewacuatro: "Mensaje 04",
    deliveryprice: 0,
    address: "Tu Dire",
    city: "Tu Ciudad",
    userId: 1
  },
  {
    business: "DFM Seguros",
    slogan: "Servicios y Productos de Seguros",
    horario: "",
    messagewauno: "Mensaje 01",
    messagewados: "Mensaje 02",
    messagewatres: "Mensaje 03",
    messagewacuatro: "Mensaje 04",
    deliveryprice: 0,
    address: "Tu Dire",
    city: "Tu Ciudad",
    userId: 2
  },

];


const initialGroups = [
  {
    category: "Default",
    description: "Categoria por defecto",
    undelete: true,
    userId: 1
  },
  {
    category: "Default",
    description: "Categoria por defecto",
    undelete: true,
    userId: 2
  },

];

module.exports = {
  initialConfigs,
  initialGroups,
  initialUsers
};
