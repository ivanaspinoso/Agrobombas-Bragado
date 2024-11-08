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


// Actualizar datos de proveedor
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
    code,
  province } = req.body;
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
      code,
      province
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
    code,
    province
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
    code,
    province
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

// Eliminar proveedor
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
