import { useEffect } from 'react';
import useApi from '../../hooks/useApi';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import Card from '../../components/Card'; // Asegúrate de que la ruta sea correcta

const Container = styled.div`
  padding: 2rem;
`;

const Title = styled.h1`
  text-align: center;
  color: #0A3E27;
`;

const ProductsGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const ProductsPage = () => {
  const { data, getData, isLoading, error } = useApi();
  const [searchParams] = useSearchParams();
  const piece = searchParams.get('piece');

  useEffect(() => {
    getData({ route: 'api/clothes', query: { piece } });
  }, [piece]);

  return (
    <Container>
      <Title>Productos</Title>
      {isLoading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      <ProductsGrid>
        {data && data.map(product => (
          <Card key={product._id} product={product} />
        ))}
      </ProductsGrid>
    </Container>
  );
};

export default ProductsPage;
