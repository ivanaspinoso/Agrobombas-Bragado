var express = require("express");

// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Category, Contacts } = require("../models/index");

// Defino la validación de token para trabajar con estas rutas

const { validateToken } = require("../utils/token")

var router = express.Router();

router.post("/add", async (req, res) => {
  const { category, description, undelete, userid } = req.body;
  console.log(req.body);
  const objCatAdd = {
    category,
    description,
    undelete,
    userId: userid
  };

  const existCat = await Category.findOne({
    where: {
      category,
    },
  });
  if (!existCat) {
    try {
      let newCategory = await Category.create(objCatAdd); // envio los datos al modelo sequelize para que los guarde en la database
      return res.status(200).json(newCategory);
    } catch (err) {
      // en caso de error lo devuelvo al frontend
      return res.send({
        message: "No se pudo guardar la categoría" + err,
      });
    }
  } else {
    if (undelete) {
      try {
        let newCategory = await Category.create(objCatAdd); // envio los datos al modelo sequelize para que los guarde en la database
        return res.status(200).json(newCategory);
      } catch (err) {
        // en caso de error lo devuelvo al frontend
        return res.send({
          message: "No se pudo guardar la categoría" + err,
        });
      }
 
    } else 
    return res.status(400).send({ message: "Categoría existente" });
  }
});

router.put("/update", async (req, res) => {
  const { id, category, description } = req.body.cate;
  console.log(req.body.cate);
  if (!category || category === "") {
    return res
      .status(400)
      .json({ error: "Falta ingresar categoría correspondiente" });
  }
  const objCatUpd = {
    id,
    category,
    description,
  };
  try {
    // envio los datos al modelo sequelize para que los guarde en la database
    let updCat = await Category.update(objCatUpd, {
      where: {
        id,
      },
    });
    // si todo sale bien devuelvo el objeto agregado
    console.log("Categoria modificada");
    res.send(objCatUpd);
  } catch (err) {
    // en caso de error lo devuelvo al frontend
    console.log(err);
    res.status(400).json({ error: err });
  }
});

//Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    let getAllCategories = await Category.findAll({
      order: [["category", "ASC"]],
    });
    return res.send(getAllCategories);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener las categorías" + err,
    });
  }
});

//Obtener todas las categorías de un usuario
router.get("/byuser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let getAllCategories = await Category.findAll({
      order: [["category", "ASC"]],
      where: {
        userId: id,
      },
    });
    return res.send(getAllCategories);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener las categorías" + err,
    });
  }
});

//Obtener categoría por id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let getCategory = await Category.findOne({
      where: {
        id,
      },
    });
    return res.send(getCategory);
  } catch (err) {
    return res.send({
      message: "No se pudo obtener la categoría" + err,
    });
  }
});

// Borrar categoria
router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).send({ message: "Debe ingresar categoría" });

  let producSocios = await Category.findAll({
    where: { id: id },
    include: { model: Contacts },
  }).then((s) => {
    if (s[0] && s[0].contacts.length > 0) {
      return s[0].contacts.length
    } else return 0
  });

  const existCat = await Category.findOne({
    where: {
      id,
    },
  });

  if (producSocios > 0) {
    return res.status(400).json({ message: "No se puede eliminar, Contactos asociados" })
  } else {
    if (existCat) {
      try {
        let delCategory = await Category.destroy({
          where: {
            id,
          },
        });
        console.log(delCategory);
        return res
          .status(200)
          .json({ message: "Categoria eliminada correctamente" });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "No se pudo eliminar la categoría" + err });
      }
    } else {
      return res.status(400).json({ message: "Categoría inexistente" });
    }
  }
});

module.exports = router;