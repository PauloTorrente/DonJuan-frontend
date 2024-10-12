import { useRoutes } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Checkout from './pages/Cart/Checkout.jsx';
import ProductDetail from './pages/ProductDetail/ProductDetail.jsx';
import LoginPage from './pages/Home/LoginPage.jsx';
import RegisterPage from './pages/Home/RegisterPage.jsx';
import Success from './pages/Cart/Success.jsx';
import ProductsPage from './pages/Products/ProductsPage';
import UploadProductPage from './pages/UploadProductPage';
import EditProductPage from './components/EditProductPage';
import WishlistPage from './pages/Home/WishlistPage';

function AppRouter() {
  return useRoutes(
    [
      {
        element: <Home />,
        path: '/',
      },
      {
        element: <Cart />,
        path: '/cart',
      },
      {
        element: <Checkout />,
        path: '/checkout',
      },
      {
        element: <ProductDetail />,
        path: '/productDetail/:id',
      },
      { element: <LoginPage />, path: '/login' },
      { element: <RegisterPage />, path: '/register' },
      {
        element: <Success />,
        path: '/success',
      },
      { element: <ProductsPage />, path: '/products' },
      { element: <UploadProductPage />, path: '/upload' },
      { element: <EditProductPage />, path: '/edit-products/:id' }, // Route for editing products
      { element: <WishlistPage />, path: '/wishlist' },
    ],
  );
}

export default AppRouter;
