import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { yearCashflowEndpoint } from '../../app/consts/consts';


const RptCaja = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(yearCashflowEndpoint + '/2025'); // Cambia la URL según tu API
                setData(response.data);
                console.log('Datos obtenidos:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);
/* 
    // Datos de ejemplo (puedes eliminar esto si obtienes datos de una API)
    const datanot = [
        { mes: 'Enero', ingresos: 5000, egresos: 3000 },
        { mes: 'Febrero', ingresos: 7000, egresos: 4000 },
        { mes: 'Marzo', ingresos: 8000, egresos: 5000 },
        { mes: 'Abril', ingresos: 6000, egresos: 3500 },
        { mes: 'Mayo', ingresos: 9000, egresos: 4500 },
        { mes: 'Junio', ingresos: 10000, egresos: 6000 },
        { mes: 'Julio', ingresos: 11000, egresos: 7000 },
        { mes: 'Agosto', ingresos: 9500, egresos: 6500 },
        { mes: 'Septiembre', ingresos: 8700, egresos: 6000 },
        { mes: 'Octubre', ingresos: 12000, egresos: 8000 },
        { mes: 'Noviembre', ingresos: 13000, egresos: 9000 },
        { mes: 'Diciembre', ingresos: 14000, egresos: 10000 },
    ]; */

    return (
        <div>
            <h2>Reporte de Caja</h2>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="ingresos" fill="rgba(75, 192, 192, 0.6)" />
                    <Bar dataKey="egresos" fill="rgba(255, 99, 132, 0.6)" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RptCaja;
