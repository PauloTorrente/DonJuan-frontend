// src/pages/ProductDetail/ProductDetail.jsx
import ProductDetailForm from '../../components/productDetailForm'; // Rename the import to avoid conflict

const ProductDetail = () => {
  return (
    <div>
      <ProductDetailForm /> {/* Use the renamed import here */}
    </div>
  );
};

export default ProductDetail;
