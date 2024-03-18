var express = require("express");


// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Contacts, Messages, Category } = require("../models/index");

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

//Obtener todos las celulares para evitar duplicado

router.get("/allphones", async (req, res) => {
  try {
    let getAllUserPhones = await Contacts.findAll({
      order: [["cellphone", "ASC"]],
    });
    let userphones = []
    getAllUserPhones.map((phone) => {
      userphones.push(phone.cellphone)
    })
    return res.send(userphones);
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


// Actualizar datos de contacto
router.put("/update", async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const { id, name, email, cellphone, address, city, zip, province, country} = req.body.user;
  console.log("RESULTADO: ", id);
  // chequeo que estén completos los 3 campos requeridos
  if (!id || id === "") {
    return res.status(400).json({ message: "Falta ingresar id de usuario" });
  }
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (!cellphone || cellphone === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar numero correspondiente" });
  }

    const objUser = {
      name,
      email,
      address,
      cellphone,
      city,
      zip,
      province,
      country,
      id
    };

    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let newUser = await Contacts.update(objUser, {
        where: {
          id,
        },
      });
      // si todo sale bien devuelvo el objeto agregado
      // console.log("Objeto de usuario guardado")
      res
        .status(200)
        .json({ message: "contacto modificado con éxito", user: objUser });
    } catch (error) {
      // en caso de error lo devuelvo al frontend
      // console.log(error)
      res.status(400).json({ message: "No se pudo actualizar contacto" + error });
    }
});

//add contact
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
    groups
  } = req.body;
  let hash = "";
  console.log("grupos", groups)
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
  }  if (!groups || groups.length <= 0) {
    return res
      .status(400)
      .json({ message: "Falta ingresar grupo para contacto" });
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
    await newUser.setCategories(groups);
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


// Borrar Contacto
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).send({ message: "Debe seleccionar contacto" });

  let producSocios = await Contacts.findAll({
    where: { id: id },
    include: { model: Messages },
  }).then((s) => {
    if (s[0] && s[0].messages.length > 0) {
      return s[0].messages.length
    } else return 0
  });
 
  const existCat = await Contacts.findOne({
    where: {
      id,
    },
  });

  if (producSocios > 0) {
    return res.status(400).json({message:"No se puede contacto, mensajes asociados"})
  } else {
  if (existCat) {
    try {
      let delContact = await Contacts.destroy({
        where: {
          id,
        },
      });
      console.log(delContact);
      return res
        .status(200)
        .json({ message: "contacto eliminada correctamente" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "No se pudo eliminar el contacto" + err });
    }
  } else {
    return res.status(400).json({ message: "Contacto inexistente" });
  } 
}
 });


module.exports = router;
