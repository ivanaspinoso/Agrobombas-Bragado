const bcrypt = require("bcrypt");

// datos iniciales de empresa propietaria
const initialCompany = [
    {
        name: "Agro Bombas Bragado",
        address: "Rivadavia 2902",
        city: "Bragado",
        postal_code: 6640,
        phone: "2342 403462",
        cuit: "20-27952878-7",
        email: "sib2000@gmail.com",
        web: "https://agrobombasbragado.com.ar",
    },
];


// datos iniciales de usuarios de la webapp
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

// datos iniciales para prueba de clientes, con 1 bastará
const initialCustomers = [
    {
        name: "Cliente ejemplo 1",
        phone: "",
        email: "",
        address: "",
        city: "",
        postal_code: "6640",
        cuit: "25952878",
        web: ""
    }
];

// datos iniciales para prueba de proveedores, con 1 bastará
const initialSuppliers = [
    {
        name: "Proveedor ejemplo 1",
        code: 1,
        address: "Saavedra 336",
        city: "Bragado",
        postal_code: "6640",
        cuit: "20279528787",
        province: "Bs As"
    }
]

// datos iniciales para prueba de rubros, con 2 bastará
const initialFamilies = [
    {
        name: "Rubro ejemplo 1",
        description: "bombas de auto",
    },
    {
        name: "Rubro ejemplo 3",
        description: "coolers de auto",
    },
];

// datos iniciales para prueba de productos, con 2 bastará
const initialProducts = [
    {
        name: "Producto ejemplo 1",
        description: "Cooler Citroen y Pugeot",
        article: "10258",
        cost: 500,
        price: 3900,
        price2: 0,
        iva21: 21,
        stock: 10,
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
        name: "Producto ejemplo 2",
        description: "Bomba para autos",
        article: "10223",
        cost: 1000,
        price: 5900,
        price2: 0,
        iva21: 21,
        stock: 30,
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

// Probar ventas iniciales, 2
const initialSales = [
    {
        fecha: "2024-12-15",
        client: "Federico",
        address: "Saavedra 336",
        cellphone: "2342513085",
        subtotal: 1500,
        total: 1500,
        paga: 500,
        resta: 1000,
        userId: 3,
        user_asoc: 3,
        client_asoc: 1,
        // customerId: 1
    },
    {
        fecha: "2025-01-05",
        client: "Federico",
        address: "Saavedra 336",
        cellphone: "2342513085",
        subtotal: 100,
        total: 1000,
        paga: 1000,
        userId: 4,
        user_asoc: 4,
        client_asoc: 2,
        // customerId: 2
    },
]

// datos iniciales para prueba de movimientos de caja, con 2 bastará
const initialCashflows = [
    {
        date: "2024-11-04",
        description: "Movimiento ejemplo 1, venta 1 de prueba",
        income: 500,
        outflow: 0,
        user_asoc: 3,
        venta_asoc: 1
    },
    {
        date: "2024-11-01",
        description: "Movimiento ejemplo 2, venta 2 de prueba",
        income: 1000,
        outflow: 0,
        user_asoc: 4,
        venta_asoc: 2
    }
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
    initialCashflows,
    initialSales
};