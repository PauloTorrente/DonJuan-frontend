import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'; 
import usePostApi from '../hooks/usePostApi';
import ImageUploader from './ImageUploader';

const Container = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  border: 1px solid #0A3E27;
  border-radius: 8px;
  background-color: #E2D1BF;
`;

const Title = styled.h2`
  text-align: center;
  color: #0A3E27;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #0A3E27;
  border-radius: 4px;
`;

const Select = styled.select`
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #0A3E27;
  border-radius: 4px;
`;

const Button = styled.button`
  padding: 0.75rem;
  background-color: #CC88FF;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #AA66CC;
  }
`;

const UploadProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState(true);
  const [color, setColor] = useState('');
  const [piece, setPiece] = useState('');
  const [brand, setBrand] = useState('');
  const [sizes, setSizes] = useState('');
  const [imageUrl, setImageUrl] = useState(null);
  const { postData, isLoading, error } = usePostApi();
  const navigate = useNavigate(); 

  // Check if user is admin
  const userRole = localStorage.getItem('role');
  useEffect(() => {
    if (userRole !== 'admin') {
      navigate('/'); // Redirect if not admin
    }
  }, [userRole, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      name,
      price: Number(price),
      stock,
      color,
      piece,
      brand,
      sizes: sizes.split(',').map(size => size.trim()),
      imageUrl, 
    };

    try {
      await postData({
        route: 'api/clothes',
        payload: productData,
      });
      alert('Product added successfully');
    } catch (err) {
      console.error('Error adding product:', err);
    }
  };

  const handleEditRedirect = () => {
    const defaultProductId = 'some-default-id'; // Replace with actual product ID logic
    navigate(`/edit-products/${defaultProductId}`); 
  };

  return (
    <Container>
      <Title>Upload Product</Title>
      <Form onSubmit={handleSubmit}>
        <Input type="text" placeholder="Name" onChange={(e) => setName(e.target.value)} required />
        <Input type="number" placeholder="Price" onChange={(e) => setPrice(e.target.value)} required />
        <Input type="text" placeholder="Color" onChange={(e) => setColor(e.target.value)} required />
        
        <Select value={piece} onChange={(e) => setPiece(e.target.value)} required>
          <option value="">Select an option</option>
          <option value="Pecho">Pecho</option>
          <option value="Piernas">Piernas</option>
          <option value="Pies">Pies</option>
        </Select>
        
        <Input type="text" placeholder="Brand" onChange={(e) => setBrand(e.target.value)} required />
        <Input type="text" placeholder="Sizes (comma-separated)" onChange={(e) => setSizes(e.target.value)} required />
        
        <ImageUploader onImageUrlChange={setImageUrl} />
        
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Add Product'}
        </Button>
      </Form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <Button type="button" onClick={handleEditRedirect} style={{ marginTop: '1rem' }}>
        Edit Products
      </Button>
    </Container>
  );
};

export default UploadProductForm;
