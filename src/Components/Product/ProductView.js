import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProduct } from '../Services/api';

const ProductView = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduct(id);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="px-8 py-16 bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-lg w-full">
        <div className="mb-4">
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h2>
        <p className="text-gray-600 mb-2">
          <span className="font-semibold">Category:</span> {product.category}
        </p>
        <p className="text-gray-600 mb-6">
          <span className="font-semibold">Price:</span> ${product.price}
        </p>
      </div>
    </div>
  );
};

export default ProductView;
