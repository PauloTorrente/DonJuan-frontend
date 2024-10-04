import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import iconShirts from '../../assets/icon-shirts.png'; // Ruta a la imagen de camisas
import iconShorts from '../../assets/icon-shorts.png'; // Ruta a la imagen de shorts
import iconShoes from '../../assets/icon-shoes.png'; // Ruta a la imagen de zapatos

const Container = styled.div`
  display: flex;
  flex-direction: column; /* Disposición vertical */
  align-items: center; /* Centrado horizontalmente */
  justify-content: center; /* Centrado verticalmente */
  height: 100vh; /* Ocupa toda la altura de la pantalla */
  padding: 20px; /* Espaciado interno */
  box-sizing: border-box; /* Para incluir padding en el tamaño total */
`;

const Button = styled.button`
  background-color: #f0f0f0;
  padding: 10px; /* Ajusta el padding para un tamaño de botón adecuado */
  margin: 10px; /* Espaciado entre botones */
  border: none;
  cursor: pointer;
  font-size: 1rem; /* Tamaño de fuente */
  display: flex;
  flex-direction: column; /* Para apilar la imagen y el texto */
  align-items: center; /* Centra horizontalmente */
  width: 80%; /* Ocupa el 80% del contenedor */
  max-width: 150px; /* Ancho máximo para los botones */

  img {
    max-width: 100%; /* Asegura que la imagen no se desborde */
    height: auto; /* Mantiene la proporción de la imagen */
  }
`;

const Home = () => {
  const navigate = useNavigate();

  const categories = {
    camisas: 'Pecho',
    shorts: 'Piernas',
    zapatos: 'Pies',
  };

  const handleCategoryClick = (category) => {
    const piece = categories[category];
    navigate(`/products?piece=${piece}`);
  };

  return (
    <Container>
      <Button onClick={() => handleCategoryClick('camisas')}>
        <img src={iconShirts} alt="Camisas" />
        <span>Camisas</span>
      </Button>
      <Button onClick={() => handleCategoryClick('shorts')}>
        <img src={iconShorts} alt="Shorts" />
        <span>Shorts</span>
      </Button>
      <Button onClick={() => handleCategoryClick('zapatos')}>
        <img src={iconShoes} alt="Zapatos" />
        <span>Zapatos</span>
      </Button>
    </Container>
  );
};

export default Home;
