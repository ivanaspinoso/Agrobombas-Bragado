var express = require("express");


// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Contacts } = require("../models/index");

const { generateToken, validateToken } = require("../utils/token");

var router = express.Router();

//Obtener todos las usuarios
router.get("/", async (req, res) => {
  try {
    let getAllContacts = await Contacts.findAll({
      order: [["name", "ASC"]],
    });
    console.log(getAllContacts)
    return res.send(getAllContacts);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usuarios \n" + err,
    });
  }
});

// usernames para no chocar usuarios nuevos

//Obtener todos las usuarios
router.get("/usernames", async (req, res) => {
  try {
    let getAllUserNames = await Contacts.findAll({
      order: [["username", "ASC"]],
    });
    let usernames = []
    getAllUserNames.map((user) => {
      usernames.push(Contacts.username)
    })
    return res.send(usernames);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usernames" + err,
    });
  }
});

// login route
router.post("/login", async (req, res) => {
  const body = req.body;
  // reviso que lleguen bien
  if (!body.username || body.username === "") {
    return res.status(400).json({ message: "Por favor, ingrese username" });
  }
  if (!body.password || body.password === "") {
    return res
      .status(400)
      .json({ message: "Por favor, ingrese la contraseña" });
  }
  const user = await Contacts.findOne({
    where: {
      username: body.username,
    },
  });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, Contacts.password);
    if (validPassword) {
      let objLogin = {
        username: Contacts.username,
        id: Contacts.id,
        name: Contacts.name,
        email: Contacts.email,
        isAdmin: Contacts.isAdmin,
        cellphone: Contacts.cellphone,
        address: Contacts.address,
        city: Contacts.city,
        zip: Contacts.zip,
        province: Contacts.province,
        country: Contacts.country,
        active: Contacts.active,
        blocked: Contacts.blocked,
        birthdate: Contacts.birthdate,

        /*         password: body.password, */
        token: generateToken(user),
      };
      // token: generateToken(user)
      return res
        .status(200)
        .json({ message: "Usuario logueado con éxito", login: objLogin });
    } else {
      res.status(400).json({ error: "Contraseña incorrecta" });
    }
  } else {
    res.status(401).json({ error: "Usuario inexistente" });
  }
});


// Actualizar datos de usuario
router.put("/update", validateToken, async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { id, name, newpass, olduser, oldpass, email, token, address, cellphone, isAdmin } = req.body.user;
  // console.log(req.body.user);
  // chequeo que estén completos los 3 campos requeridos
  if (!id || id === "") {
    return res.status(400).json({ message: "Falta ingresar id de usuario" });
  }
  if (!olduser || olduser === "") {
    return res.status(400).json({ message: "Falta ingresar nombre usuario" });
  }
  if (!oldpass || oldpass === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar contraseña actual" });
  }
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (!email || email === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar email correspondiente" });
  }

  if (newpass) {
    if (!oldpass || oldpass === "")
      return res
        .status(400)
        .json({ message: "Falta ingresar password anterior" });
  }

  let existUser = await Contacts.findOne({
    where: {
      username: olduser,
    },
  });

  if (!existUser)
    return res
      .status(400)
      .json({ message: "No tiene permisos para actualizar usuario" });
  // console.log("Objeto user modificar usuario creado")
  // armo el objeto

  const validPassword = await bcrypt.compare(oldpass, existContacts.password);
  if (validPassword) {
    const objUser = {
      username: existContacts.username,
      name,
      password: newpass ? newpass : existContacts.password,
      email,
      token,
      address,
      cellphone,
      isAdmin,
      id
    };

    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let newUser = await Contacts.update(objUser, {
        where: {
          id,
/*           username: olduser,
          password: oldpass, */
        },
      });
      // si todo sale bien devuelvo el objeto agregado
      // console.log("Objeto de usuario guardado")
      res
        .status(200)
        .json({ message: "usuario modificado con éxito", user: objUser });
    } catch (error) {
      // en caso de error lo devuelvo al frontend
      // console.log(error)
      res.status(400).json({ message: "No se pudo actualizar usuario" + error });
    }
  } else {
    res.status(400).json({ message: "Clave anterior errónea" });
  }
});

//add user (quizás no se use)

router.post("/add", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const {
    name,
    email,
    cellphone,
    address,
    city,
    zip,
    province,
    country,
  } = req.body;
  let hash = "";
  // chequeo que estén completos los 3 campos requeridos
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  } else   if (!cellphone || cellphone === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar numero correspondiente" });
  } else   if (!country || country === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar pais correspondiente" });
  }
  const objUser = {
    name,
    email,
    cellphone,
    address,
    city,
    zip,
    province,
    country,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await Contacts.create(objUser);
    // si todo sale bien devuelvo el objeto agregado
    console.log("Objeto de usuario guardado");
    res
      .status(200)
      .json({ message: "Usuario admin generado correctamente", user: objUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    console.log(error);
    res.status(500).json({ message: "No se pudo crear el admin" + error });
  }
});

// Activar usuario
router.post("/active", async (req, res) => {
  // tomo del form de login el username y la contraseña (aquí por body)
  const { username, password } = req.body;
  console.log(username, password);
  // reviso que lleguen bien
  if (!username || username === "") {
    return res.status(400).json({ message: "Por favor, ingrese username" });
  }
  if (!password || password === "") {
    return res
      .status(400)
      .json({ message: "Por favor, ingrese la contraseña" });
  }
  let existUser = await Contacts.findOne({
    where: {
      username,
      password,
    },
  });
  if (!existUser)
    return res
      .status(400)
      .json({ message: "No tiene permisos para actactivar usuario" });
  // console.log("Objeto user modificar usuario creado")
  // armo el objeto
  const objUser = {
    active: true,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await Contacts.update(objUser, {
      where: {
        username,
        password,
      },
    });
    // si todo sale bien devuelvo el objeto agregado
    // console.log("Objeto de usuario guardado")
    res
      .status(200)
      .json({ message: "usuario activado con éxito", user: objUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    // console.log(error)
    res.status(400).json({ message: "No se pudo activar usuario" + error });
  }
  // res.send("get user")
});

module.exports = router;
