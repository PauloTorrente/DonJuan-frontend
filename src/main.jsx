import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import AppRouter from './AppRouter.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import styled from 'styled-components';
import Header from '../src/components/Header/Header.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { UserProvider } from './contexts/UserContext';

const Pages = styled.main`
  margin-top: 10vh;
  margin-bottom: 5vh;
  height: 85vh;
  overflow-y: auto;
  background-color: white;
  color: black;
`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <UserProvider>
      <CartProvider>
        <Header />
        <Pages>
          <AppRouter />
        </Pages>
      </CartProvider>
    </UserProvider>
  </BrowserRouter>
);
