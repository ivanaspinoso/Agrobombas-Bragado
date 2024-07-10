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
    backwa: "14706",
    vinculated: false,
    autoreplys: true,
    autobots: true,
    price: 60
  },
  {
    name: "Ivana S",
    username: "ivana",
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
    backwa: "14852",
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
    business: "Ivana Frontend",
    slogan: "Embellecemos tu proyecto",
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
