import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import heartIcon from '../assets/heart.png';
import usePostApi from '../hooks/usePostApi';
import { useUser } from '../contexts/UserContext'; 
import './Card.css';

const Card = ({ product, userWishlist }) => {
  const { user } = useUser(); // Get user from context
  const userId = user ? user.userId : null; // Extract userId from user context
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState(null); // Novo estado para o preço com desconto

  const { postData, error: postDataError, isLoading: postDataLoading } = usePostApi();

  useEffect(() => {
    console.log('User wishlist in Card:', userWishlist); // Log wishlist for debugging
    if (userWishlist) {
      setInWishlist(userWishlist.includes(product._id));
    }

    // Calculando o preço com desconto, se disponível
    if (product.discount > 0) {
      const discountAmount = (product.price * product.discount) / 100;
      const newPrice = product.price - discountAmount;
      setDiscountedPrice(newPrice);
    } else {
      setDiscountedPrice(null);
    }
  }, [product._id, userWishlist, product.price, product.discount]);

  const handleWishlistClick = async () => {
    setLoading(true);
    setErrorMessage('');

    const endpoint = inWishlist ? 'api/wishlist/remove' : 'api/wishlist/add';
    const method = inWishlist ? 'DELETE' : 'PATCH';
    const payload = { userId, itemId: product._id };

    if (!userId) {
      setErrorMessage('User ID is not available. Please log in.');
      setLoading(false);
      return;
    }

    try {
      const result = await postData({ route: endpoint, payload, method });
      if (!postDataError) {
        setInWishlist(!inWishlist); 
      } else {
        setErrorMessage('Error updating wishlist. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Error updating wishlist. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="card-container">
      <div className="image-container">
        <img src={product.imageUrl} alt={product.name} className="product-image" />
        {userId && ( // Check if userId is present
          <button 
            className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`} 
            onClick={handleWishlistClick} 
            disabled={loading || postDataLoading}
          >
            {loading || postDataLoading ? (
              <span className="loading-spinner">Loading...</span>
            ) : (
              <img src={heartIcon} alt={inWishlist ? "Remove from wishlist" : "Add to wishlist"} />
            )}
          </button>
        )}
      </div>
      <div className="card-content">
        <h3 className="product-name">{product.name}</h3>

        {/* Exibindo preço original e preço com desconto */}
        <div className="price-container">
          {discountedPrice ? (
            <>
              <p className="product-price original-price">BS {product.price}</p>
              <p className="product-price discounted-price">BS {discountedPrice.toFixed(2)}</p>
              <span className="discount-badge">-{product.discount}%</span>
            </>
          ) : (
            <p className="product-price">BS {product.price}</p>
          )}
        </div>

        <p className="product-brand">Marca: {product.brand}</p>
        <p className="product-sizes">Tallas: {product.sizes.join(', ')}</p>
        <p className={`stock-status ${product.stock ? 'in-stock' : 'out-of-stock'}`}>
          {product.stock ? 'En stock' : 'Sin stock'}
        </p>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default Card;
