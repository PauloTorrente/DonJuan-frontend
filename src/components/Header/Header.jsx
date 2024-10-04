import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DonJuanLogo from '../../assets/DonJuanLogo.png';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 10vh;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 50px;
  z-index: 1000;
`;

const Logo = styled.img`
  height: 80px;
  cursor: pointer; /* Cambia el cursor a pointer para indicar que es clicable */
`;

const IconColumn = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 100%;
  gap: 15px;
`;

const Icon = styled.i`
  font-size: 180%;
  cursor: pointer;
  color: white;
  &:hover {
    color: #ccc;
  }
`;

const AdminButton = styled.button`
  color: white;
  background: none;
  border: none;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const role = localStorage.getItem('role');
    console.log('Rol del usuario:', role);
    if (role) {
      setUserRole(role);
    }

    // Escuchar cambios en localStorage
    const handleStorageChange = () => {
      const updatedRole = localStorage.getItem('role');
      setUserRole(updatedRole);
    };

    window.addEventListener('storage', handleStorageChange);

    // Limpieza del efecto
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <HeaderContainer>
      {/* Logo clicable para redirigir a la página de inicio */}
      <Logo src={DonJuanLogo} alt="Don Juan Logo" onClick={() => navigate('/')} />

      {/* Botón visible solo si el rol es 'admin' */}
      {userRole === 'admin' && (
        <AdminButton onClick={() => navigate('/upload')}>Subir Producto</AdminButton>
      )}

      {/* Ícono de usuario para login */}
      <IconColumn>
        <Icon className="bi bi-person" onClick={() => navigate('/login')} />
      </IconColumn>
    </HeaderContainer>
  );
};

export default Header;
