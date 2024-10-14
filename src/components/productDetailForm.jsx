import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import useApi from '../hooks/useApi';
import WhatsappIcon from '../assets/whatsapp.png';
import heartIcon from '../assets/heart.png'; 
import usePostApi from '../hooks/usePostApi'; 
import { useUser } from '../contexts/UserContext';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const PageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-in-out;
  padding: 20px;
  max-width: 900px; /* Adjust max width for larger screens */
  margin: auto;
  background-color: #ffffff; /* White background for a clean look */
  border-radius: 10px; 
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1); 
`;

const WhatsAppButton = styled.img`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  cursor: pointer;
  animation: ${fadeIn} 1s ease-in-out;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.1);
  }
`;

const ProductDetailContainer = styled.div`
  display: flex;
  flex-direction: column; /* Align items vertically for mobile */
  align-items: center; /* Center items */
  margin-bottom: 20px; /* Space below the product detail */

  @media (min-width: 768px) {
    flex-direction: row; /* Align items horizontally for larger screens */
    align-items: flex-start; /* Align items to the start */
  }
`;

const ProductImage = styled.img`
  max-width: 100%; /* Adjust image width */
  border-radius: 10px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
`;

const ProductInfo = styled.div`
  margin: 20px; /* Space around product info */
  flex: 1; /* Allow product info to grow */
  text-align: center; /* Center align text */

  @media (min-width: 768px) {
    text-align: left; /* Left align text for larger screens */
    margin-left: 20px; /* Space between image and info */
  }

  h1 {
    font-size: 2em; /* Larger font size */
    margin-bottom: 10px;
  }

  .price {
    font-size: 1.5em; 
    color: #e63946; 
    font-weight: bold;
    margin-bottom: 10px; /* Spacing below the price */
  }

  p {
    margin: 5px 0; 
    font-size: 1em; /* Standard font size for description */
  }

  .in-stock {
    color: green; 
    font-weight: bold;
  }

  .out-of-stock {
    color: red; 
    font-weight: bold;
  }
`;

const ActionButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: center; /* Center buttons for mobile */
  gap: 15px;

  @media (min-width: 768px) {
    justify-content: flex-start; /* Left align buttons for larger screens */
  }

  button {
    padding: 12px 24px; 
    border: none; 
    border-radius: 5px; 
    cursor: pointer;
    font-size: 1em; 
    transition: background-color 0.3s;

    &.wishlist-button {
      background-color: #264653; 
      color: white; 
      position: relative;
      display: flex;
      align-items: center;

      img {
        margin-right: 8px; /* Space between icon and text */
      }

      &.in-wishlist {
        background-color: #e63946; /* Color when in wishlist */
      }
    }

    &:hover {
      background-color: #1f3b3d; 
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center; /* Center the error message */
`;

const LoadingMessage = styled.p`
  font-style: italic;
  text-align: center; /* Center the loading message */
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, getData, isLoading, error } = useApi();
  const { user } = useUser(); // Get user from context
  const userId = user ? user.userId : null; // Extract userId from user context
  const { postData, error: postDataError, isLoading: postDataLoading } = usePostApi(); // For wishlist API
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getData({ route: `api/clothes/${id}` });
  }, [id]);

  useEffect(() => {
    if (data) {
      setProduct(data);
    }
  }, [data]);

  useEffect(() => {
    if (user?.wishlist) {
      setInWishlist(user.wishlist.includes(product?._id));
    }
  }, [user, product]);

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
      await postData({ route: endpoint, payload, method });
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

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(`Estoy interesado en el producto: ${product?.name}`);
    window.open(`https://wa.link/ysot8m?text=${message}`, '_blank');
  };

  if (isLoading) return <LoadingMessage>Cargando detalles del producto...</LoadingMessage>;
  if (error) return <ErrorMessage>Error al cargar el producto: {error}</ErrorMessage>;
  if (!product) return <ErrorMessage>Producto no encontrado.</ErrorMessage>;

  return (
    <PageContainer>
      <ProductDetailContainer>
        <ProductImage src={product.imageUrl} alt={product.name} />
        <ProductInfo>
          <h1>{product.name}</h1>
          <p className="price">BS {product.price}</p>
          <p>Descripción: {product.description}</p>
          <p>Marca: {product.brand}</p>
          <p>Color: {product.color}</p>
          <p>Tallas disponibles: {product.sizes.join(', ')}</p>
          <p className={product.stock ? 'in-stock' : 'out-of-stock'}>
            {product.stock ? 'En stock' : 'Sin stock'}
          </p>
          <ActionButtons>
            {userId && ( // Check if userId is present
              <button 
                className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`} 
                onClick={handleWishlistClick} 
                disabled={loading || postDataLoading}
              >
                {loading || postDataLoading ? (
                  <span className="loading-spinner">Cargando...</span>
                ) : (
                  <>
                    <img src={heartIcon} alt={inWishlist ? "Eliminar de la lista de deseos" : "Añadir a la lista de deseos"} />
                    {inWishlist ? 'Eliminar de la lista de deseos' : 'Añadir a la lista de deseos'}
                  </>
                )}
              </button>
            )}
          </ActionButtons>
        </ProductInfo>
      </ProductDetailContainer>
      <WhatsAppButton src={WhatsappIcon} alt="WhatsApp" onClick={handleWhatsAppClick} />
    </PageContainer>
  );
};

export default ProductDetailPage;
