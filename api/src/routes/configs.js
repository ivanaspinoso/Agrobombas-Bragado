var express = require("express");

const { Configs } = require("../models/index");

const { validateToken } = require("../utils/token");

var router = express.Router();

// Datos de configuracion de la app

router.put("/update", (req, res) => {
  const {
    id,
    business,
    slogan,
    messagewauno,
    messagewados,
    messagewatres,
    messagewacuatro,
    horario,
    deliveryprice,
    address,
    zip,
    city,
    province,
    country,
    longitude,
    latitude
  } = req.body;
  console.log(req.body);
  Configs.findByPk(id)
    .then((config) => {
      (config.business = business),
        (config.slogan = slogan),
        (config.messagewauno = messagewauno),
        (config.messagewados = messagewados),
        (config.messagewatres = messagewatres),
        (config.messagewacuatro = messagewacuatro),
        (config.horario = horario),
        (config.deliveryprice = deliveryprice),
        (config.address = address),
        (config.zip = zip),
        (config.city = city),
        (config.province = province),
        (config.country = country),
        (config.longitude = longitude),
        (config.latitude = latitude)
        config
          .save()
          .then((_) => {
            return res
              .status(200)
              .json({ message: "Configs Guardadas", config });
          })
          .catch((err) => {
            return res.status(400).json({ message: "No se pudo guardar", err });
          });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  // console.log(req.params);
  Configs.findByPk(id)
    .then((config) => {
      // console.log(config);
      return res.status(200).json({ message: "Get config", config });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
});

//Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    let getAllConfigs = await Configs.findAll({
      order: [["business", "ASC"]],
    });
    return res.send(getAllConfigs);
  } catch (err) {
    return res.send({
      message: "No se pudieron obtener las configuraciones" + err,
    });
  }
});

router.post("/add", async (req, res) => {
  const { business, userid } = req.body;
  console.log(req.body);
  const objConAdd = {
    business,
    userId: userid,
  };
  const existCon = await Configs.findOne({
    where: {
      business,
    },
  });
  if (!existCon) {
    try {
      let newConfig = await Configs.create(objConAdd); // envio los datos al modelo sequelize para que los guarde en la database
      return res.status(200).json(newConfig);
    } catch (err) {
      // en caso de error lo devuelvo al frontend
      return res.send({
        message: "No se pudo guardar la config" + err,
      });
    }
  } else {
    return res.status(400).send({ message: "Config existente" });
  }
});

module.exports = router;
