import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { jwtDecode } from 'jwt-decode';
import useApi from '../hooks/useApi';
import { useUser } from '../contexts/UserContext';

const Container = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 2rem;
  border: 1px solid #0A3E27;
  border-radius: 8px;
  background-color: #E2D1BF;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CenteredWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Title = styled.h2`
  color: #0A3E27;
  margin-bottom: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
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

const RegisterLink = styled.p`
  margin-top: 1rem;
  text-align: center;

  a {
    color: #007BFF;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { getData, error, isLoading, data } = useApi();
  const { login } = useUser(); // Use the login function from UserContext

  const handleSubmit = (e) => {
    e.preventDefault();
    getData({
      route: 'api/auth/login',
      method: 'POST',
      body: { email, password },
    });
  };

  useEffect(() => {
    if (data?.token) {
      const decodedToken = jwtDecode(data.token);
      const userRole = decodedToken.role;
      const userId = decodedToken.userId; // Use the correct key for userId

      console.log('Decoded Token:', decodedToken); // Check the token

      // Use the login function to set user context
      login(userId, userRole, data.token); // Pass the token to the login function

      console.log('User ID set in context:', userId); // Log the userId for debugging

      navigate('/'); // Redirect after login
    }
  }, [data, login, navigate]);

  return (
    <CenteredWrapper>
      <Container>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </Button>
        </Form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <RegisterLink>
          ¿No tienes cuenta? <a onClick={() => navigate('/register')}>Regístrate</a>
        </RegisterLink>
      </Container>
    </CenteredWrapper>
  );
};

export default LoginForm;
