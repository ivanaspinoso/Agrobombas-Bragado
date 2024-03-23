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
  }
]

const initialConfigs = [
  {
    business: "Tu Empresa",
    slogan: "Servicios y Productos de Tu Empresa",
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
];


const initialGroups = [
  {
    category: "Default",
    description: "Categoria por defecto",
    undelete: true
  },
];

module.exports = {
  initialConfigs,
  initialGroups,
  initialUsers
};
