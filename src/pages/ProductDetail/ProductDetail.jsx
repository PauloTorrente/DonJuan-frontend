import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import styled from 'styled-components';

const ProductDetail = () => {
  const { id } = useParams();
  const { data, getData, error, isLoading } = useApi();
  const [size, setSize] = useState('');

  useEffect(() => {
    getData({ route: `api/clothes/${id}` });
  }, []);

  const handleSizeChange = (e) => {
    setSize(e.target.value);
  };

  return (
    <div>
      {isLoading && <p>Cargando...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <>
          <h1>{data.name}</h1>
          <p>Precio: ${data.price}</p>
          <select value={size} onChange={handleSizeChange}>
            <option value="">Selecciona una talla</option>
            {data.sizes.map((sizeOption) => (
              <option key={sizeOption} value={sizeOption}>{sizeOption}</option>
            ))}
          </select>
          {/* <button onClick={() => addToCart(data)}>Añadir al carrito</button> */}
        </>
      )}
    </div>
  );
};

export default ProductDetail;
