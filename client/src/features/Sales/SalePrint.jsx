import { jsPDF } from "jspdf";

const SalePrint = () => {


    const generatePDF = () => {
        // Default export is a4 paper, portrait, using millimeters for units
        const doc = new jsPDF();

        doc.text("Hello world!", 10, 10);
        doc.save("a4.pdf");

    }

    return (<>Hola world<button onClick={()=>generatePDF()}>Imprimir</button></>)


}

export default SalePrint