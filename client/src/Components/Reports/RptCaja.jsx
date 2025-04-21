import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { yearCashflowEndpoint } from '../../app/consts/consts';


const RptCaja = () => {
    const [data, setData] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Generar array de años (desde 2020 hasta el año actual + 1)
    const currentYear = new Date().getFullYear();
    const years = Array.from(
        { length: (currentYear + 1) - 2020 },
        (_, i) => 2020 + i
    );

    const fetchData = async (year) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(yearCashflowEndpoint + '/' + year);
                setData(response.data);
                console.log('Datos obtenidos:', response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            setError('No se encontraron datos para el año seleccionado');
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(selectedYear);
    }, [selectedYear]);
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
        <div className="container mx-auto px-4 py-8">
            <div className="mb-8 bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Reporte de Caja Anual</h2>
                
                <div className="flex items-center gap-4 mb-6">
                    <label className="font-medium text-gray-700">Seleccionar Año:</label>
                    <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(Number(e.target.value))}
                        className="form-select rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    >
                        {years.map(year => (
                            <option key={year} value={year}>{year}</option>
                        ))}
                    </select>
                </div>

                {loading && (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e6fa5]"></div>
                    </div>
                )}

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && !error && data.length > 0 && (
                    <div className="bg-white p-6 rounded-lg shadow">
                        {/* Tabla de valores mensuales */}
                        <div className="mb-8 overflow-x-auto">
                            <table className="min-w-full bg-white border border-gray-200 rounded-lg overflow-hidden">
                                <thead className="bg-[#0e6fa5]">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-sm font-semibold text-white border-b">
                                            Mes
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-white border-b">
                                            Ingresos
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-white border-b">
                                            Egresos
                                        </th>
                                        <th className="px-6 py-4 text-right text-sm font-semibold text-white border-b">
                                            Balance
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index} className="transition-colors hover:bg-gray-50 border-b border-gray-100">
                                            <td className="px-6 py-3 text-sm font-medium text-gray-900">
                                                {item.mes}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-right font-medium text-green-600">
                                                <span className="font-normal">$</span>{' '}
                                                {parseFloat(item.ingresos).toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </td>
                                            <td className="px-6 py-3 text-sm text-right font-medium text-red-600">
                                                <span className="font-normal">$</span>{' '}
                                                {parseFloat(item.egresos).toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </td>
                                            <td className={`px-6 py-3 text-sm text-right font-medium ${
                                                item.ingresos - item.egresos >= 0 
                                                    ? 'text-green-600' 
                                                    : 'text-red-600'
                                            }`}>
                                                <span className="font-normal">$</span>{' '}
                                                {(item.ingresos - item.egresos).toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Fila de totales */}
                                    <tr className="bg-gray-50 border-t-2 border-gray-200">
                                        <td className="px-6 py-4 text-sm font-bold text-gray-900">
                                            TOTAL ANUAL
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-bold text-green-600">
                                            <span className="font-normal">$</span>{' '}
                                            {data.reduce((sum, item) => sum + parseFloat(item.ingresos), 0)
                                                .toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-right font-bold text-red-600">
                                            <span className="font-normal">$</span>{' '}
                                            {data.reduce((sum, item) => sum + parseFloat(item.egresos), 0)
                                                .toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                        </td>
                                        <td className={`px-6 py-4 text-sm text-right font-bold ${
                                            data.reduce((sum, item) => sum + (item.ingresos - item.egresos), 0) >= 0 
                                                ? 'text-green-600' 
                                                : 'text-red-600'
                                        }`}>
                                            <span className="font-normal">$</span>{' '}
                                            {data.reduce((sum, item) => sum + (item.ingresos - item.egresos), 0)
                                                .toLocaleString('es-AR', {
                                                    minimumFractionDigits: 2,
                                                    maximumFractionDigits: 2
                                                })}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Gráfico existente */}
            <ResponsiveContainer width="100%" height={400}>
                            <BarChart 
                                data={data} 
                                margin={{ 
                                    top: 20, 
                                    right: 30, 
                                    left: 10,
                                    bottom: 5 
                                }}
                            >
                    <CartesianGrid strokeDasharray="3 3" />
                                <XAxis 
                                    dataKey="mes" 
                                    tick={{ fill: '#4B5563' }}
                                />
                                <YAxis 
                                    tickFormatter={(value) => 
                                        `$${value.toLocaleString('es-AR', {
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        })}`
                                    }
                                    width={120}
                                    domain={[0, 'auto']}
                                    orientation="left"
                                />
                                <Tooltip 
                                    formatter={(value) => 
                                        new Intl.NumberFormat('es-AR', {
                                            style: 'currency',
                                            currency: 'ARS',
                                            minimumFractionDigits: 2,
                                            maximumFractionDigits: 2
                                        }).format(value)
                                    }
                                />
                    <Legend />
                                <Bar 
                                    dataKey="ingresos" 
                                    fill="#34D399" 
                                    name="Ingresos"
                                />
                                <Bar 
                                    dataKey="egresos" 
                                    fill="#F87171" 
                                    name="Egresos"
                                />
                </BarChart>
            </ResponsiveContainer>
                    </div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No hay datos disponibles para el año seleccionado</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RptCaja;
