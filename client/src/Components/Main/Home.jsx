import logoagb from "../../assets/images/newlogo.png";
import { FaInstagram } from "react-icons/fa";
import Helmet from "react-helmet"
import ProductsWeb  from "./ProductsWeb";


const Home = () => {
    return (<>
        <Helmet>
            <title>AgroBombas Bragado</title>
            <meta name="description" content="Sitio Web Oficial de empresa comercializadora de bombas." />
            <meta name="keywords" content="bragado, acoples, bombas, accesorios, piletas, pileta, osmosis, accesorios, kit, distribucion" />
            <meta property="og:url" content="agrobombas.com.ar" />
            <meta property="og:site_name" content="AgroBombas Bragado" />
            <meta property="og:locale" content="es_ES" />
            <meta property="og:type" content="website" />
            <meta property="og:image" content="https://agrobombasbragado.com.ar/" /> {/* aqui hay que indicar una imagen de logo  */}
            <meta property="og:description" content="Sitio Web Oficial de empresa comercializadora de bombas." />
            <link rel="canonical" href="://agrobombasbragado.com.ar" />

        </Helmet>
        <div className="container mx-auto px-4 md:px-12 my-12 text-center" >
            <img
                className="w-[300px] md:w-[400px] mx-auto mb-6"
                src={logoagb}
                alt="Agrobombas Bragado"
                loading="lazy"
            />
            <ProductsWeb />
            <div className="my-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Rivadavia 2902,{" "}
                    <span className="text-blue-500">2342 403462</span>,(6640) Bragado, Bs As, Argentina 
                </h1>
            </div>
            <div className="flex justify-center items-center gap-2 mt-6">
                <FaInstagram className="text-pink-500 text-3xl" />
                <a
                    href="https://www.instagram.com/agrobombasbragado/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl font-medium text-blue-600 hover:text-blue-800"
                >
                    @agrobombasbragado
                </a>
            </div>
        </div>
    </>
    );
};

export default Home;
