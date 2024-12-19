import logoagb from "../../assets/images/newlogo.png"
import { FaInstagram } from "react-icons/fa";

const Home = () => {
    return (
        <div className="container mx-auto px-4 md:px-12 my-12">
            <img className="img-fluid mx-auto" src={logoagb} alt="Agrobombas Bragado" />
            <br/><br/>
            <h1 className="text-center">Rivadavia 2902, 2342 403462, Bragado 6640</h1>
            <br/><br/>
            <FaInstagram /><a href="https://www.instagram.com/agrobombasbragado/" target="_blank">agrobombasbragado</a>
        </div>
    )
}

export default Home