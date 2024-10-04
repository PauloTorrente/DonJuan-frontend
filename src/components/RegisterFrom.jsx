import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useApi from '../hooks/useApi';
import PasswordStrengthBar from './PasswordStrengthBar';
import { evaluatePasswordStrength } from '../utils/passwordStrength';

// Styled components
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
  height: 100vh; /* This ensures the content is vertically centered */
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #0A3E27;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
`;

const Label = styled.label`
  margin-bottom: 0.5rem;
  color: #0A3E27;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #0A3E27;
  border-radius: 4px;
`;

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
`;

const SuccessMessage = styled.p`
  color: green;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  background-color: #CC88FF;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #AA66CC;
  }
`;

const RegisterForm = () => {
  const [name, setName] = useState(''); // State for name
  const [email, setEmail] = useState(''); // State for email
  const [password, setPassword] = useState(''); // State for password
  const [cash, setCash] = useState(''); // State for cash
  const [error, setError] = useState(''); // State for error message
  const [success, setSuccess] = useState(''); // State for success message
  const [passwordStrength, setPasswordStrength] = useState(''); // State for password strength
  const { getData, isLoading, data } = useApi();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordStrength === 'weak') {
      setError('La contraseña es demasiado débil.');
      return;
    }

    try {
      getData({
        route: 'api/auth/register',
        method: 'POST',
        body: { name, email, password, role: 'client', cash },
      });

      // Show success message after registration
      setSuccess('Registro exitoso. Se ha enviado una confirmación a tu correo.');
    } catch (err) {
      console.error('Error during registration:', err);
      setError('Error al registrar el usuario.');
    }
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  };

  return (
    <CenteredWrapper>
      <Container>
        <Title>Registrate</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">Nombre:</Label>
            <Input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Correo electrónico:</Label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña:</Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <PasswordStrengthBar strength={passwordStrength} />
          </FormGroup>

          {/* Show error message */}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          {/* Show success message */}
          {success && <SuccessMessage>{success}</SuccessMessage>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Cargando...' : 'Registrarse'}
          </Button>
        </Form>
      </Container>
    </CenteredWrapper>
  );
};

export default RegisterForm;
