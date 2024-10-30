const express = require("express");
const { Op } = require("sequelize");
// Defino el modelo user para utilizarlo en las rutas correspondientes
const { Product, Family, OrderLine, Prod_Cat,/* Conn */ } = require("../models/index");
// cloudinary subir imagen al momento de guardar producto
const cloudinary = require('../utils/cloudinary');

const router = express.Router();

//todos los productos
router.get("/", (req, res, next) => {
  Product.findAll({
    include: [
      {
        model: Family,
        required: true,
      },
/*       {
        model: Brand,
        required: true,
      } */]
  })
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//todos los productos para admin
router.get("/admin", (req, res, next) => {
  Product.findAll({
    include: [
      {
        model: Family,
        required: true,
      },
    ],
    order: [["exist", "DESC"]],
  })
    .then((products) => {
      res.send(products);
    })
    .catch(next);
});

//producto por id para admin
router.get("/admin/:id", (req, res) => {
  let { id } = req.params;
  if (!id) return res.status(400).send("Este producto no existe");
  Product.findOne({
    where: {
      id,
    },
    include: [
      {
        model: Family,
        required: true,
      },
    ],
  }).then((product) => {
    if (!product)
      return res
        .status(400)
        .json({ message: "No se encontró producto con id: " + id });
    return res.status(200).json(product);
  });
});

//todos los productos ordenados por nombre, si existen y agrupados por categoria
router.get("/grupocat", (req, res, next) => {
  Product.findAll({
    include: [
      {
        model: Family,
        required: true,
      },
/*       {
        model: Brand,
        required: true,
      }
 */    ],
    order: [["name", "ASC"]],
    where: {
      exist: true,
    },
  })
    .then((products) => {
      // console.log(products)
      res.send(products);
    })
    .catch(next);
});

//producto por categoria
router.get("/bycat/:family", async (req, res) => {
  let { family } = req.params;
  if (!Family || Family === "")
    return res.status(400).send("Por favor, ingrese familia del producto");
  await Category.findAll({
    where: { family: family },
    include: { model: Product },
  }).then((s) => {
    if (s.length === 0)
      return res.status(400).json({
        message: "No se encontró producto con categoria: " + category,
      });
    res.json(s);
  });
});

// Obtener product por nombre aproximado
router.get("/search/:search", async (req, res) => {
  const { search } = req.params;
  try {
    const getProdSearch = await Product.findAll({
      include: [
        {
          model: Family,
          required: true,
        },
/*         {
          model: Brand,
          required: true,
        }
 */      ],
      /*       where: Conn.where(
              Conn.fn('unaccent', Conn.col('name')), {
                  [Op.iLike]:`%${search}%`
            }), */
      where: {
        name: {
          [Op.iLike]: "%" + [search] + "%",
        },
        exist: true,
      },
    });
    return res.send(getProdSearch);
  } catch (err) {
    return res.status(400).send({
      message: "No se pudo obtener producto" + err,
    });
  }
});

// Agregar producto
router.post("/add", async (req, res) => {
  const {
    name,
    // description,
    cost,
    exist,
    price,
    price1,
    price2,
    image,
    percent,
    // isOfert,
    families,
    // brands,
    // units,
    // stockunits,
    // capacity,
    // capacityunit,
    minunit,
    stepunit,
    show,
    stock
  } = req.body;
  console.log(req.body.categories);
  if (!name || name === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de producto" });
  }
  if (!cost || cost < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese costo de producto" });
  }
  if (!percent || percent < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese precio de producto" });
  }

  if (!price || price < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese precio de producto" });
  }

  if (!price1 || price1 < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese precio1 de producto" });
  }
  if (!price2 || price2 < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese precio2 de producto" });
  }

  if (!families || families.length === 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese familia/s del producto" });
  }
/*   if (!units || units === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de cantidad del producto" });
  }
  if (!minunit || minunit === 0) {
    return res.status(400).send({
      message: "Por favor, ingrese cantidad minima, a vender, del producto",
    });
  }
  if (!stepunit || stepunit === 0) {
    return res.status(400).send({
      message:
        "Por favor, ingrese de a cuanto incrementar la cantidad a vender, del producto",
    });
  }
  const existencia = exist === "false" || exist === true ? true : false;
  const esoferta = isOfert === "false" || isOfert === true ? true : false;
 */
  const existProd = await Product.findOne({
    where: {
      name: name,
    },
  });

  if (!existProd) {
    try {
/*       const result = await cloudinary.uploader.upload(image, {
        folder: "products",
        // width: 300,
        // crop: "scale"
    }) 
   console.log(result)  */ 
    const objProdAdd = {
      name,
      // description,
      cost,
      exist,
      price,
      price1,
      price2,
      image,
      percent,
      // isOfert,
      families,
      // brands,
      // units,
      // stockunits,
      // capacity,
      // capacityunit,
      minunit,
      stepunit,
      show,
      stock
      // imageurl: result.secure_url,
      // imagepid: result.public_id
    };

      let newProduct = await Product.create(objProdAdd); // envio los datos al modelo sequelize para que los guarde en la database

      await newProduct.setFamilies(families); // seteo el/los categorias para sincronizarlos en la tabla relacionada
//      await newProduct.setBrands(brands); // seteo la marca para sincronizarla en la tabla relacionada
      return res.send(newProduct);
    } catch (err) {
      // en caso de error lo devuelvo al frontend
      return res.send({
        message: "No se pudo guardar el producto - " + err,
      });
    }
  } else {
    return res.status(400).send({ message: "Producto existente" });
  }
});

//modificar producto
router.put("/update", async (req, res) => {
  const {
    id,
    name,
    // description,
    cost,
    exist,
    price,
    price1,
    price2,
    image,
    percent,
    // isOfert,
    families,
    // brands,
    // units,
    // stockunits,
    // capacity,
    // capacityunit,
    minunit,
    stepunit,
    show,
    stock
  } = req.body;
  console.log(req.body);
  /*   const { id } = req.params;
   */ if (!name || name === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de producto" });
  }
  if (!price || price < 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese precio de producto" });
  }
  if (!families || families.length === 0) {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese categoria/s del producto" });
  }
/*   if (!units || units === "") {
    return res
      .status(400)
      .send({ message: "Por favor, ingrese nombre de cantidad del producto" });
  }
 */
  // const existencia = exist === "false" || exist === true ? true : false;
  // const esoferta = isOfert === "false" || isOfert === true ? true : false;
  try {

        // tomar producto previo a modificar, por si modifico la imagen   
        const currentProduct = await Product.findByPk(id);
        /* let objimage = {
          public_id: imageurl,
          url: imagepid
        }
        console.log("image",image) */
        console.log("Producto encontrado",currentProduct)
        //modify image conditionnally
/*         if (image !== '') {
          const ImgId = currentProduct.imagepid;
          if (ImgId) {
              await cloudinary.uploader.destroy(ImgId);
          }

          const newImage = await cloudinary.uploader.upload(image, {
              folder: "products",
              width: 1000,
              crop: "scale"
          });

          objimage = {
              public_id: newImage.public_id,
              url: newImage.secure_url
          }
      }
 
      console.log("objImage",objimage) */

      let objProdUpd = {
        name,
        // description,
        cost,
        exist,
        price,
        price1,
        price2,
        image,
        percent,
        // isOfert,
        families,
        // brands,
        // units,
        // stockunits,
        // capacity,
        // capacityunit,
        minunit,
        stepunit,
        show,
        stock
      };
    

    // envio los datos al modelo sequelize para que los guarde en la database
    let updProd = await Product.update(objProdUpd, {
      where: {
        id,
      },
    });

    families.map(async (cates) => {
      await Prod_Cat.destroy({
        where: {
          productId: id,
        },
      });
    });

    families.map(async (cates) => {
      const relacion = {
        productId: id,
        familyId: cates
      }
      await Prod_Cat.create(relacion);
    });
    objProdUpd = { ...objProdUpd, id: id }


    // seteo la relacion
    // await Product.setCategories(categories)
    // si todo sale bien devuelvo el objeto agregado
    console.log("Producto modificado");
    console.log("Devuelto", objProdUpd)
    res.status(200).json(objProdUpd);
  } catch (err) {
    // en caso de error lo devuelvo al frontend
    console.log(err);
    res.status(400).json({ error: err });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  if (!id) return res.status(400).send({ message: "Debe ingresar producto" });

  let orderLineSocias = await Product.findAll({
    where: { id: id },
    include: { model: OrderLine },
  }).then((s) => {
    if (s[0] && s[0].orderlines.length > 0) {
      return s[0].orderlines.length;
    } else return 0;
  });
  const existProd = await Product.findOne({
    where: {
      id,
    },
  });

  if (orderLineSocias > 0) {
    return res
      .status(400)
      .json({ message: "No se puede eliminar, porque tiene pedidos asociados" });
  } else {
    if (existProd) {
      try {

        // cst existProd = await Product.findById(req.params.id);
        //retrieve current image ID
        const imgId = existProd.imagepid;
        if (imgId) {
            await cloudinary.uploader.destroy(imgId);
        }

        let delProduct = await Product.destroy({
          where: {
            id,
          },
        });
        console.log(delProduct);
        return res
          .status(200)
          .json({ message: "Producto eliminado correctamente" });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "No se pudo eliminar el producto" + err });
      }
    } else {
      return res.status(400).json({ message: "Producto inexistente" });
    }
  }
});

router.post("/stock", (req, res) => {
  const { id } = req.body;
  console.log("BODY " + req.body);
  Product.findByPk(id)
    .then((product) => {
      (product.exist = !product.exist),
        product
          .save()
          .then((_) => {
            return res
              .status(200)
              .json({ message: "Stock cambiado exitosamente", product });
          })
          .catch((err) => {
            console.error("error al salvar", err);
            return res.status(400).json({ message: "No se pudo grabar" });
          });
    })
    .catch((err) => {
      console.error("error al buscar", err, req.body);
      return res.status(400).json({ message: "No se encontró producto" });
    });
});

//producto por id
router.get("/:id", (req, res) => {
  let { id } = req.params;
  console.log(id);
  if (!id || !Number(id))
    return res.status(400).send("Este producto no existe");
  Product.findByPk(id, {
    include: [
      {
        model: Category,
        required: true,
      },
      {
        model: Brand,
        required: true,
      }
    ]
  }).then((product) => {
    if (!product)
      return res
        .status(400)
        .json({ message: "No se encontró producto con id: " + id });
    return res.status(200).json(product);
  });
});

module.exports = router;
