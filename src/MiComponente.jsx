import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import clienteAxios from './config/clienteAxios';

const MiComponente = () => {
  const { token } = useParams();
  const [result, setResult] = useState(null);
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (!token) {
        console.error("No token found in URL");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await clienteAxios("/client/", config);
        setResult(data);
        setNombre(data.nombre_cliente || '');
        setApellido(data.apellido_cliente || '');
        setDatos(data.message || []); 
      } catch (error) {
        console.error("Error al obtener los datos", error);
      }
    };

    obtenerDatos();
  }, [token]);

  if (!result) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

 
  const parseMonto = (monto) => {
    return parseFloat(monto.replace(/[$,]/g, '').replace(/\./g, '').replace(/,/g, '.'));
  };


  const total = datos.reduce((acc, item) => acc + parseMonto(item.monto), 0);

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">{`Buenas tardes, ${nombre} ${apellido}`}</h2>
      {datos.length > 0 ? (
        <div className="space-y-4">
          {datos.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-sm">
              <p className="text-xl font-semibold text-gray-900">{item.monto}</p>
              <p className="text-sm text-gray-600">
                {new Date(item.fecha_monto).toLocaleDateString()} {new Date(item.fecha_monto).toLocaleTimeString()}
              </p>
            </div>
          ))}
          <div className="mt-6 p-4 bg-gray-200 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-gray-800">Total:</h3>
            <p className="text-2xl font-semibold text-gray-900">{`$${total.toLocaleString('es-CO')}`}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No hay datos</p>
      )}
    </div>
  );
};

export default MiComponente;
