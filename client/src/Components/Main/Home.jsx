import logoagb from "../../assets/images/newlogo.png";
import { FaInstagram } from "react-icons/fa";

const Home = () => {
    return (
        <div className="container mx-auto px-4 md:px-12 my-12 text-center" >
            <img
                className="w-[300px] md:w-[400px] mx-auto"
                src={logoagb}
                alt="Agrobombas Bragado"
            />
            <br />
            <div className="my-6">
                <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
                    Rivadavia 2902,{" "}
                    <span className="text-blue-500">2342 403462</span>, Bragado 6640
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
    );
};

export default Home;
