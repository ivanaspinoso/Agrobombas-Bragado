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

module.exports = router;
