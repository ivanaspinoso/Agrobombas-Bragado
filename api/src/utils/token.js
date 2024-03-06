const { SALT } = process.env;

const { User } = require("../models/index");

var jwt = require("jsonwebtoken");

// Generar token para usuario
generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      password: user.password,
    },
    SALT || "somethingsecret",
    {
      expiresIn: "30d",
    }
  );
};

// proteger las rutas para que solo los usuarios registrados puedan usarlas
validateToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(400).json({ message: "Token no definido, debe estar logueado" });
    // console.log(token);
    const decoded = jwt.verify(token, SALT || "somethingsecret");
    // console.log(decoded);
    /* database.filter((u) => u.id == decoded.user[0].id); */
    const userFound = await User.findOne({
      where: {
        id: decoded.id,
        password: decoded.password,
      },
    });
    console.log(userFound)
    if (!userFound) {
      return res.status(403).json("Acceso denegado. Usuario no encontrado");
    }
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Acceso denegado. Error al autorizar: " + error });
  }
};

module.exports = { generateToken, validateToken };
