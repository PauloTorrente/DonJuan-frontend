import React, { useEffect, useState } from 'react';
import useApi from '../hooks/useApi'; 
import EditCard from '../components/EditCard'; 
import SearchBar from '../components/SearchBar';
import { useUser } from '../contexts/UserContext';
import './EditProductPage.css';

const EditProductPage = () => {
  const { data, getData, isLoading, error } = useApi();
  const { user } = useUser(); // Get user context
  const [searchTerm, setSearchTerm] = useState('');
  const [editedProducts, setEditedProducts] = useState([]);

  useEffect(() => {
    getData({ route: 'api/clothes' });
  }, []);

  const filteredProducts = data?.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStockChange = async (id) => {
    // Find the product to be updated
    const productToUpdate = filteredProducts.find(product => product._id === id);
    
    if (productToUpdate) {
      // Prepare the updated product data
      const updatedProduct = { ...productToUpdate, stock: !productToUpdate.stock };

      try {
        // Send the update request to the API
        await fetch(`https://donjuan-rzly.onrender.com/api/clothes/${id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedProduct),
        });

        // Update local state immediately
        setEditedProducts(prev => 
          prev.map(product => 
            product._id === id ? updatedProduct : product
          )
        );

        // Re-fetch data to keep it in sync (optional)
        getData({ route: 'api/clothes' });
      } catch (error) {
        console.error('Error updating stock:', error);
      }
    }
  };

  if (!user || user.role !== 'admin') {
    return <p>Acceso denegado. Solo los administradores pueden editar productos.</p>;
  }

  return (
    <div className="edit-products-page">
      <h1>Editar Productos</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {isLoading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      <div className="edit-products-container">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} className="edit-card">
              <EditCard
                product={product}
                onStockChange={() => handleStockChange(product._id)}
              />
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}
      </div>
    </div>
  );
};

export default EditProductPage;
