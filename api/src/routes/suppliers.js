var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Supplier, Product } = require("../models/index");

const { generateToken, validateToken } = require("../utils/token");

var router = express.Router();

//Obtener todos las proveedores
router.get("/", /* validateToken, */ async (req, res) => {
  try {
    let getAllSuppliers = await Supplier.findAll({
      order: [["createdAt", "ASC"]],
    });
    // console.log("Proeedores", getAllSuppliers) 
    return res.send(getAllSuppliers);
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
  const user = await User.findOne({
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
router.put("/update", /* validateToken, */ async (req, res) => {
  // tomo todos los campos del form de registro de usuario
  const {
    id,
    name,
    address,
    postal_code,
    city,
    phone,
    cuit,
    email,
    web,
    code } = req.body;
  // console.log(req.body.user);
  // chequeo que estén completos los 3 campos requeridos
  if (!id || id === "") {
    return res.status(400).json({ message: "Falta ingresar id de usuario" });
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

  let existSupp = await Supplier.findOne({
    where: {
      id,
    },
  });

  if (!existSupp)
    return res
      .status(400)
      .json({ message: "Proveedor no encontrado" });
  // console.log("Objeto user modificar usuario creado")
  // armo el objeto

  // const validPassword = await bcrypt.compare(oldpass, existUser.password);
  if (existSupp) {
    const objSupp = {
      id,
      name,
      address,
      postal_code,
      city,
      phone,
      cuit,
      email,
      web,
      code 
    };

    try {
      // envio los datos al modelo sequelize para que los guarde en la database
      let editSupp = await Supplier.update(objSupp, {
        where: {
          id,
        },
      });
      // si todo sale bien devuelvo el objeto agregado
      // console.log("Objeto de usuario guardado")
      res
        .status(200)
        .json({ message: "Proveedor modificado con éxito", user: objSupp });
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
    address,
    postal_code,
    city,
    phone,
    cuit,
    email,
    web,
    code
  } = req.body;
  let hash = "";
  // chequeo que estén completos los 3 campos requeridos
  if (!name || name === "") {
    return res
      .status(400)
      .json({ message: "Falta ingresar nombre correspondiente" });
  }
  if (!code || name === 0) {
    return res
      .status(400)
      .json({ message: "Falta ingresar codigo correspondiente" });
  }

  const objSupplier = {
    name,
    address,
    postal_code,
    phone,
    city,
    cuit,
    email,
    web,
    code
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let newSuplier = await Supplier.create(objSupplier);
    // si todo sale bien devuelvo el objeto agregado
    console.log("Proveeedor de productos guardado");
    res
      .status(200)
      .json({ message: "Proveeedor de productos guardado", user: objSupplier });
  } catch (error) {
    // en caso de error lo devuelvo al frontend
    console.log(error);
    res.status(500).json({ message: "No se pudo guardar Proeedor" + error });
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



// Eliminarproveedor
router.delete("/delete/:id", /* validateToken, */ async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).send({ message: "Debe ingresar proveedor" });

  let producSocios = await Supplier.findAll({
      where: { id: id },
      include: { model: Product },
  }).then((s) => {
      if (s[0] && s[0].products.length > 0) {
          return s[0].products.length
      } else return 0
  });

  const existCat = await Supplier.findOne({
      where: {
          id,
      },
  });

  if (producSocios > 0) {
      return res.status(400).json({ message: "No se puede eliminar, productos asociados" })
  } else {
      if (existCat) {
          try {
              let delSupp = await Supplier.destroy({
                  where: {
                      id,
                  },
              });
              console.log(delSupp);
              return res
                  .status(200)
                  .json({ message: "Proveedor eliminado correctamente" });
          } catch (err) {
              return res
                  .status(500)
                  .json({ message: "No se pudo eliminar el proveedor" + err });
          }
      } else {
          return res.status(400).json({ message: "Proveedor inexistente" });
      }
  }
});


module.exports = router;
