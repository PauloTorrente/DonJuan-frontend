import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: none;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem;
  width: 240px;
  background-color: #1E1E1E;
  color: white;
  text-align: left;
  position: relative;
  transition: background-color 0.3s ease, transform 0.2s ease;
  &:hover {
    background-color: #EDEDED; /* Color gris claro */
    transform: translateY(-5px); /* Sutil movimiento hacia arriba */
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 320px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
`;

const ProductName = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ProductPrice = styled.p`
  font-size: 1.1rem;
  font-weight: bold;
  margin: 0.3rem 0;
`;

const BrandName = styled.p`
  font-size: 0.9rem;
  color: #AAA; /* Color gris para la marca */
  margin-bottom: 0.5rem;
`;

const StockMessage = styled.p`
  color: red;
  font-weight: bold;
`;

const Card = ({ product }) => {
  return (
    <CardContainer>
      <ImageContainer>
        <ProductImage src={product.imageUrl} alt={product.name} />
      </ImageContainer>
      <ProductName>{product.name}</ProductName>
      <BrandName>{product.brand}</BrandName> {/* Muestra la marca del producto */}
      <ProductPrice>€{product.price}</ProductPrice>
      {product.stock ? (
        <p>En stock</p>
      ) : (
        <StockMessage>¡Sin stock!</StockMessage>
      )}
    </CardContainer>
  );
};

export default Card;
