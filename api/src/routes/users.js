var express = require("express");

// requiere bcrypt para asegurar user password

const bcrypt = require("bcrypt");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Users } = require("../models/index");

const { generateToken, validateToken } = require("../utils/token");

var router = express.Router();

const { Client, LocalAuth } = require('whatsapp-web.js');

//Obtener todos las usuarios
router.get("/", /* validateToken, */ async (req, res) => {
  try {
    let getAllUsers = await Users.findAll({
      order: [["createdAt", "ASC"]],
    });
    // console.log(getAllUsers)
    return res.send(getAllUsers);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener usuarios" + err,
    });
  }
});

// usernames para no chocar usuarios nuevos

//Obtener todos las usuarios
router.get("/usernames", async (req, res) => {
  try {
    let getAllUserNames = await User.findAll({
      order: [["username", "ASC"]],
    });
    let usernames = []
    getAllUserNames.map((user) => {
      usernames.push(user.username)
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
  const user = await Users.findOne({
    where: {
      username: body.username,
    },
  });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      let objLogin = {
        username: user.username,
        id: user.id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        cellphone: user.cellphone,
        address: user.address,
        city: user.city,
        zip: user.zip,
        province: user.province,
        country: user.country,
        active: user.active,
        blocked: user.blocked,
        birthdate: user.birthdate,
        password: body.password,
        backwa: user.backwa,
        vinculated: user.vinculated,
        qrcode: user.qrcode,
        /*         password: body.password, */
        token: generateToken(user),
        autoreplys: user.autoreplys,
        autobots: user.autobots,
        price: user.price,
      };
      // token: generateToken(user)
      return res
        .status(200)
        .json({ message: "Usuario logueado con éxito", login: objLogin });
    } else {
      res.status(400).json({ error: "Contraseña incorrecta" });
    }
  } else {
    res.status(400).json({ error: "Usuario inexistente" });
  }
});


// login route
router.post("/qrcode", async (req, res) => {
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
  const user = await Users.findOne({
    where: {
      username: body.username,
    },
  });
  if (user) {
    // check user password with hashed password stored in the database
    const validPassword = await bcrypt.compare(body.password, user.password);
    if (validPassword) {
      let objLogin = {

        qrcode: user.qrcode,
        /*         password: body.password, */
      };
      const userQR = objLogin.qrcode
      // token: generateToken(user)
      return res
        .status(200)
        .json({ message: "QR obtenido con éxito", qrcode: userQR });
    } else {
      res.status(400).json({ error: "Contraseña incorrecta" });
    }
  } else {
    res.status(400).json({ error: "Usuario inexistente" });
  }
});


// vincular usuario con WA
router.put("/vinculate", async (req, res) => {
  const { id, vinculated, qrcode } = req.body
  const objUser = {
    id,
    vinculated,
    qrcode
  }
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await Users.update(objUser, {
      where: {
        id,
      },
    });
    res.status(200).send("Usuario vinculated")

  } catch (error) {
    res.status(400).json({ message: "No se pudo actualizar usuario" + error });
  }
})

// Actualizar datos de usuario
router.put("/update", /* validateToken, */ async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { id, name, newpass, olduser, oldpass, email, address, cellphone, isAdmin } = req.body.user;
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

  let existUser = await User.findOne({
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

  const validPassword = await bcrypt.compare(oldpass, existUser.password);
  if (validPassword) {
    const objUser = {
      username: existUser.username,
      name,
      password: newpass ? newpass : existUser.password,
      email,
      token,
      address,
      cellphone,
      isAdmin,
      id
    };

    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let newUser = await User.update(objUser, {
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


// Actualizar datos de usuario por parte de admin
router.put("/updateadm", /* validateToken, */ async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { id, backwa } = req.body.user;
  // console.log(req.body.user);
  // chequeo que estén completos los 3 campos requeridos
  if (!id || id === "") {
    return res.status(400).json({ message: "Falta ingresar id de usuario" });
  }

  let existUser = await Users.findOne({
    where: {
      id,
    },
  });

  if (!existUser)
    return res
      .status(400)
      .json({ message: "No tiene permisos para actualizar usuario" });
  else {
    // const validPassword = await bcrypt.compare(oldpass, existUser.password);

    const objUser = {
      id,
      backwa
    };

    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let newUser = await Users.update(objUser, {
        where: {
          id,
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
  }
});






// Activar usuario
router.post("/active", async (req, res) => {
  // tomo del form de login el username y la contraseña (aquí por body)
  const { username, password } = req.body;
  // console.log(username, password);
  // reviso que lleguen bien
  if (!username || username === "") {
    return res.status(400).json({ message: "Por favor, ingrese username" });
  }
  if (!password || password === "") {
    return res
      .status(400)
      .json({ message: "Por favor, ingrese la contraseña" });
  }
  let existUser = await User.findOne({
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
    let newUser = await User.update(objUser, {
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


//add user (quizás no se use)
router.post("/add", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const {
    name,
    birthdate,
    email,
    username,
    password,
    isAdmin,
    cellphone,
    address,
    city,
    zip,
    province,
    country,
    backwa,
    autoreplys,
    autobots
  } = req.body;
  let hash = "";
  // chequeo que estén completos los 3 campos requeridos
  const checkUser = await Users.findOne({
    where: {
      username: username,
    },
  });
  if (checkUser) {
    return res
      .status(400)
      .json({ message: "Usuario repetido, por favor elija otro" });
  }
  const checkPhone = await Users.findOne({
    where: {
      cellphone: cellphone,
    },
  });
  if (checkPhone) {
    return res
      .status(400)
      .json({ message: "Numero whatsapp repetido, por favor elija otro" });
  }
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (!username || username === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar username correspondiente" });
  }
  if (!cellphone || cellphone === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar numero de celular correspondiente" });
  }
  if (!password || password === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar password correspondiente" });
  } else {
    // hasheo password
    hash = await bcrypt.hashSync(password, 8);
  }

  const objUser = {
    name,
    birthdate,
    email,
    username,
    password: hash,
    isAdmin,
    cellphone,
    address,
    city,
    zip,
    province,
    country,
    active: false,
    blocked: false,
    backwa,
    vinculated: false,
    autobots,
    autoreplys
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newUser = await Users.create(objUser);
    // si todo sale bien devuelvo el objeto agregado
    console.log("Objeto de usuario guardado");
    res
      .status(200)
      .json({ message: "Usuario admin generado correctamente", user: newUser });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    console.log(error);
    res.status(500).json({ message: "No se pudo crear el admin" + error });
  }
});


module.exports = router;