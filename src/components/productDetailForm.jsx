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
  max-width: 900px; 
  margin: auto;
  background-color: #ffffff; 
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
  flex-direction: column; 
  align-items: center; 
  margin-bottom: 20px; 

  @media (min-width: 768px) {
    flex-direction: row; 
    align-items: flex-start; 
  }
`;

const ProductImage = styled.img`
  max-width: 100%; 
  border-radius: 10px; 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15); 
`;

const ProductInfo = styled.div`
  margin: 20px; 
  flex: 1; 
  text-align: center; 

  @media (min-width: 768px) {
    text-align: left; 
    margin-left: 20px; 
  }

  h1 {
    font-size: 2em; 
    margin-bottom: 10px;
  }

  .price {
    font-size: 1.5em; 
    color: #e63946; 
    font-weight: bold;
    margin-bottom: 10px; 
  }

  p {
    margin: 5px 0; 
    font-size: 1em; 
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
  justify-content: center; 
  gap: 15px;

  @media (min-width: 768px) {
    justify-content: flex-start; 
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
        margin-right: 8px; 
      }

      &.in-wishlist {
        background-color: #e63946; 
      }
    }

    &:hover {
      background-color: #1f3b3d; 
    }
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center; 
`;

const LoadingMessage = styled.p`
  font-style: italic;
  text-align: center; 
`;

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data, getData, isLoading, error } = useApi();
  const { user } = useUser(); 
  const userId = user ? user.userId : null; 
  const { postData, error: postDataError, isLoading: postDataLoading } = usePostApi();
  const [product, setProduct] = useState(null);
  const [inWishlist, setInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showWhatsAppButton, setShowWhatsAppButton] = useState(false); 

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWhatsAppButton(true); 
    }, 1000);

    return () => clearTimeout(timer); 
  }, []);

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
    const currentUrl = window.location.href; // Get the current URL
    const message = encodeURIComponent(`Estoy interesado en el producto: ${product?.name}. Puedes verlo aquí: ${currentUrl}`);
    window.open(`https://wa.me/+59178079495?text=${message}`, '_blank');
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
            {userId && ( 
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
      {showWhatsAppButton && (
        <WhatsAppButton src={WhatsappIcon} alt="WhatsApp" onClick={handleWhatsAppClick} />
      )}
    </PageContainer>
  );
};

export default ProductDetailPage;