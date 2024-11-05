const bcrypt = require("bcrypt");

const initialCompany = [
    {
        name: "Agro Bombas Bragado",
        address: "Rivadavia 336",
        city: "Bragado",
        postal_code: 6640,
        phone: "2342 513085",
        cuit: "20-27952878-7",
        email: "sib2000@gmail.com",
        web: "https://sib-2000.com.ar",
    },
];

const initialUsers = [
    {
        name: "Fede OyB",
        username: "fede",
        password: bcrypt.hashSync("admin", 8),
        isAdmin: true,
        cellphone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        province: "",
        country: "",
        active: true,
        blocked: false,
        dev: true
    },
    {
        name: "Ivana",
        username: "ivana",
        password: bcrypt.hashSync("20iva24", 8),
        isAdmin: true,
        cellphone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        province: "",
        country: "",
        active: true,
        blocked: false,
        dev: true
    },
    {
        name: "Amade M",
        username: "amadeo",
        password: bcrypt.hashSync("agrobombas", 8),
        isAdmin: true,
        cellphone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        province: "",
        country: "",
        active: true,
        blocked: false,
        dev: false
    }, {
        name: "Mostrador",
        username: "mostrador",
        password: bcrypt.hashSync("agrobombas", 8),
        isAdmin: false,
        cellphone: "",
        email: "",
        address: "",
        city: "",
        zip: "",
        province: "",
        country: "",
        active: true,
        blocked: false,
        dev: false

    }
];

const initialCustomers = [
    {
        name: "Fede OyB",
        phone: "",
        email: "",
        address: "",
        city: "",
        postal_code: "6640",
        cuit: "25952878",
        web:""
    },
    {
        name: "Ivana",
        phone: "",
        email: "",
        address: "",
        city: "",
        postal_code: "6640",
        cuit: "20589632587",
        web:""    
    },
];

const initialSuppliers = [
    {
        name: "Fede OyB",
        code: 1,
    },]

const initialFamilies = [
    {
        name: "Bombas",
        description: "bombas de auto",
    },
    {
        name: "Ventiladores",
        description: "coolers de auto",
    },
];

const initialCashflows = [
    {
        date: "2024-11-04",
        description: "compra de yerba negocio",
        income: 0,
        outflow: 2600,
        user_asoc: 1
    },
    {
        date: "2024-11-01",
        description: "Entrega de dinero en efectivo",
        income: 3000,
        outflow: 0,
        user_asoc: 1
    },
    {
        date: "2024-11-04",
        description: "compra de yerba negocio",
        income: 0,
        outflow: 1600,
        user_asoc: 2
    },
    {
        date: "2024-11-01",
        description: "Entrega de dinero en efectivo",
        income: 5000,
        outflow: 0,
        user_asoc: 2
    },
    {
        date: "2024-11-02",
        description: "compra de yerba negocio",
        income: 0,
        outflow: 1800,
        user_asoc: 2
    },
    {
        date: "2024-11-03",
        description: "Entrega de dinero en efectivo",
        income: 50000,
        outflow: 0,
        user_asoc: 2
    },
];

const initialProducts = [
    {
        name: "Cooler C4",
        description: "Cooler Citroen y Pugeot",
        price: 3900,
        exist: true,
        imageurl:
            "https://http2.mlstatic.com/D_NQ_NP_781587-MLA72382942241_102023-F.jpg",
        units: "unidad",
        minunit: 1,
        stepunit: 1,
        weigth: 0,
        prov_code: 1
    },
    {
        name: "Bomba de agua",
        description: "Bmba para autos",
        price: 3900,
        exist: true,
        imageurl:
            "https://http2.mlstatic.com/D_NQ_NP_781587-MLA72382942241_102023-F.jpg",
        units: "unidad",
        minunit: 1,
        stepunit: 1,
        weigth: 0,
        prov_code: 1
    },

];

const familyyProducts = [
    { familyId: 2, productId: 1 },
    { familyId: 1, productId: 2 },
];


module.exports = {
    initialFamilies,
    initialProducts,
    familyyProducts,
    /*    initialOrders,
        initialOrderlines,
        initialConfigs,
        initialBrands, */
    initialSuppliers,
    initialUsers,
    initialCompany,
    initialCustomers,
    initialCashflows
};