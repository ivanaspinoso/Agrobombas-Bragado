import { useState } from "react";
import { useLocation } from "react-router-dom";

const EditMessage = () => {
    const location = useLocation();
    const [id] = useState(location.state.id);
    const [text, setText] = useState(location.state.text);

    return (
        <div className="container mx-auto px-4 py-5 flex flex-col flex-grow">
            <h2 className="text-center text-xl uppercase m-5 font-semibold">
                Editar Mensaje programado
            </h2>
        </div>
    )
}

export default EditMessage;