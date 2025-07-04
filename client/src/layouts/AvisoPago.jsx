import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { REACT_APP_AVISO_URL } from '../app/consts/consts'; // Importa la URL del aviso desde las constantes

const AvisoPago = () => {
  const [mostrarAviso, setMostrarAviso] = useState(false);
  const [fechaUltimoPago, setFechaUltimoPago] = useState(null);

  useEffect(() => {
    const verificarPago = async () => {
      // Verifica si la ruta actual incluye 'gestion' corregirlo
      const rutaIncluyeGestion = window.location.href.includes('gestion');

      if (!rutaIncluyeGestion) return;

      try {
        const response = await axios.get(REACT_APP_AVISO_URL + "/agrobombas.txt")
        const textoFecha = response.data.trim(); // ej. "01/06/2025"
        setFechaUltimoPago(textoFecha);

        const [dia, mes, anio] = textoFecha.split('/');
        const fechaPago = new Date(`${anio}-${mes}-${dia}`);
        const hoy = new Date();

        const diferenciaEnMs = hoy - fechaPago;
        const diasDiferencia = diferenciaEnMs / (1000 * 60 * 60 * 24);

        if (diasDiferencia > 30) {
          setMostrarAviso(true);
        }
      } catch (error) {
        console.error('Error al cargar la fecha:', error);
      }
    };

    verificarPago();
  }, []);

  return (
    <div>
      {mostrarAviso && (
        <div style={{ background: '#ffdddd', color: '#a00', padding: '1rem', borderRadius: '10px', marginTop: '1rem' }}>
          <strong>Aviso:</strong> Han pasado más de 30 días desde el último pago (Riesgo de suspensión).
        </div>
      )}
    </div>
  );
};

export default AvisoPago;