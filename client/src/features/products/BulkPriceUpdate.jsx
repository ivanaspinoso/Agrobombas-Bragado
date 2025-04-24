import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { getAllCategories } from '../../app/actions/categories';
import { getAllProducts } from '../../app/actions/products';
import { updateCostsEndpoint } from '../../app/consts/consts';
import { updateProductsCosts } from '../../app/actions/products';

const BulkPriceUpdate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedProvider, setSelectedProvider] = useState('');
  const [percentage, setPercentage] = useState('');
  
  const providers = useSelector((state) => state.groupsReducer.groups);
  const products = useSelector((state) => state.productsReducer.products);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllProducts());
  }, [dispatch]);

  if (!providers.length || !products.length) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0e6fa5] mx-auto"></div>
        <p className="mt-4 text-gray-600">Cargando datos...</p>
      </div>
    );
  }

  const affectedProducts = products.filter(product => {
    return product.prov_code === parseInt(selectedProvider) || 
           product.prov_code === selectedProvider;
  });

  const handleSubmit = async () => {
    if (!selectedProvider || !percentage) {
      Swal.fire('Error', 'Por favor complete todos los campos', 'error');
      return;
    }

    const result = await Swal.fire({
      title: '¿Está seguro?',
      html: `
        <div class="text-left">
          <p>Se modificará el costo de ${affectedProducts.length} productos del proveedor seleccionado.</p>
          <p>Porcentaje de modificación: ${percentage}%</p>
          <p class="text-red-600 font-bold">Esta acción no se puede deshacer.</p>
        </div>
      `,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, modificar precios',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    });

    if (result.isConfirmed) {
      try {
        Swal.fire({
          title: 'Actualizando precios...',
          didOpen: () => {
            Swal.showLoading();
          },
          allowOutsideClick: false,
          allowEscapeKey: false,
          allowEnterKey: false
        });

        const success = await dispatch(updateProductsCosts({
          percent: parseFloat(percentage),
          prov_code: selectedProvider
        }));

        if (success) {
          await dispatch(getAllProducts());
          
          Swal.fire(
            'Éxito',
            'Los precios han sido actualizados correctamente',
            'success'
          ).then(() => {
            navigate('/show-messages');
          });
        } else {
          throw new Error('Error al actualizar precios');
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire(
          'Error',
          'Hubo un problema al actualizar los precios',
          'error'
        );
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-6">Actualización Masiva de Precios</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Proveedor
            </label>
            <select
              value={selectedProvider}
              onChange={(e) => setSelectedProvider(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2"
            >
              <option value="">Seleccione un proveedor</option>
              {providers.map((provider) => (
                <option key={provider.code} value={provider.code}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Porcentaje de Modificación
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ej: 10 para aumentar, -10 para disminuir"
              />
              <span className="ml-2">%</span>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={() => navigate('/show-messages')}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-[#0e6fa5] text-white rounded-md hover:bg-blue-700"
              disabled={!selectedProvider || !percentage}
            >
              Actualizar Precios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BulkPriceUpdate; 