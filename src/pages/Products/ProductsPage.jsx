import React, { useEffect, useState } from 'react';
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

  // Get user role and id
  const userRole = localStorage.getItem('role');
  const userId = localStorage.getItem('userId');
  const userWishlist = JSON.parse(localStorage.getItem('wishList')) || [];

  useEffect(() => {
    getData({ route: 'api/clothes' });
  }, []);

  const filteredProducts = data?.filter(product => {
    const matchesSearchTerm = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSize = selectedSize ? product.sizes.includes(selectedSize) : true;
    const matchesBrand = selectedBrand ? product.brand.toLowerCase() === selectedBrand.toLowerCase() : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearchTerm && matchesSize && matchesBrand && matchesPrice;
  });

  const uniqueSizes = [...new Set(data?.flatMap(product => product.sizes))];
  const uniqueBrands = [...new Set(data?.map(product => product.brand))];

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
            <Card
              key={product._id}
              product={product}
              userRole={userRole}
              userId={userId}
              userWishlist={userWishlist}
            />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
