import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useApi from '../../hooks/useApi';
import Card from '../../components/Card';
import SearchBar from '../../components/SearchBar';
import './ProductsPage.css';

const ProductsPage = () => {
  const { data, getData, isLoading, error } = useApi();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState([0, 100]);

  const navigate = useNavigate();
  const location = useLocation();

  // Get user role and id
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const userWishlist = JSON.parse(localStorage.getItem('wishList')) || [];

  // Extract piece query parameter from URL
  const queryParams = new URLSearchParams(location.search);
  const piece = queryParams.get('piece');

  useEffect(() => {
    getData({ route: 'api/clothes' });
  }, []);

  const filteredProducts = data?.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize ? product.sizes.includes(selectedSize) : true;
    const matchesBrand = selectedBrand ? product.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesPiece = piece ? product.piece.toLowerCase() === piece.toLowerCase() : true; // Add this line

    return matchesSearchTerm && matchesSize && matchesBrand && matchesPrice && matchesPiece; // Include matchesPiece
  });

  const uniqueSizes = [...new Set(data?.flatMap(product => product.sizes))];
  const uniqueBrands = [...new Set(data?.map(product => product.brand))];

  const handleCardClick = (productId) => {
    navigate(`/productDetail/${productId}`);
  };

  return (
    <div className="products-page">
      <h1>Productos</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="filter-container">
        <select onChange={(e) => setSelectedSize(e.target.value)} defaultValue="">
          <option value="">Seleccione una talla</option>
          {uniqueSizes.map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>

        <select onChange={(e) => setSelectedBrand(e.target.value)} defaultValue="">
          <option value="">Seleccione una marca</option>
          {uniqueBrands.map(brand => (
            <option key={brand} value={brand}>{brand}</option>
          ))}
        </select>

        <div className="price-filter">
          <label>Rango de precio:</label>
          <input
            type="number"
            min="0"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([parseInt(e.target.value, 10), priceRange[1]])}
          />
          <span> - </span>
          <input
            type="number"
            min="0"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value, 10)])}
          />
        </div>
      </div>
      {isLoading && <p>Cargando productos...</p>}
      {error && <p>Error al cargar productos: {error}</p>}
      <div className="products-container">
        {filteredProducts && filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <div key={product._id} onClick={() => handleCardClick(product._id)}>
              <Card
                product={product}
                userRole={userRole}
                userId={userId}
                userWishlist={userWishlist}
              />
            </div>
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
