import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DonJuanLogo from '../../assets/DonJuanLogo.png';
import { useUser } from '../../contexts/UserContext';

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
  cursor: pointer;
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
  const { user, logout } = useUser();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleWishlistClick = () => {
    navigate('/wishlist');
  };

  return (
    <HeaderContainer>
      <Logo src={DonJuanLogo} alt="Don Juan Logo" onClick={() => navigate('/')} />
      {user?.role === 'admin' && (
        <AdminButton onClick={() => navigate('/upload')}>Subir/Editar Producto</AdminButton>
      )}
      <IconColumn>
        {/* Show wishlist icon for both admin and client roles */}
        {(user?.role === 'admin' || user?.role === 'client') && (
          <Icon className="bi bi-heart" onClick={handleWishlistClick} />
        )}
        {user ? (
          <Icon className="bi bi-box-arrow-right" onClick={handleLogout} />
        ) : (
          <Icon className="bi bi-person" onClick={() => navigate('/login')} />
        )}
      </IconColumn>
    </HeaderContainer>
  );
};

export default Header;
