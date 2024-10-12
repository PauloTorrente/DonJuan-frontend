import React, { useState } from 'react';
import useApi from '../hooks/useApi'; // Import your custom hook
import './EditCard.css';

const EditCard = ({ product, onStockChange }) => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { getData } = useApi(); // Use your custom hook

  const handleStockChange = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Call your API endpoint to update the stock
      await getData({
        route: `api/clothes/${product._id}`,
        method: 'PATCH',
        body: { stock: !product.stock }, // Toggle stock status
      });
      
      // Notify parent component about the stock change
      onStockChange(product._id); 
    } catch (error) {
      setErrorMessage('Error updating stock. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-card-container">
      <h3 className="product-name">{product.name}</h3>
      <p className="product-price">BS {product.price}</p>
      <p className="product-brand">Marca: {product.brand}</p>
      <p className={`stock-status ${product.stock ? 'in-stock' : 'out-of-stock'}`}>
        {product.stock ? 'En stock' : 'Fora de estoque'}
      </p>
      <button onClick={handleStockChange} disabled={loading}>
        {loading ? 'Cargando...' : product.stock ? 'Marcar como fora de estoque' : 'Marcar como em estoque'}
      </button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default EditCard;
