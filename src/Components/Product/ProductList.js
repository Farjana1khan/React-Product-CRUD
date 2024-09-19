import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getCategories } from '../Services/api'; // Import your API functions
import ProductModal from './EditProduct'; // Import your modal component

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchProductsAndCategories = async () => {
    try {
      const [productsResponse, categoriesResponse] = await Promise.all([
        getProducts(),
        getCategories(), // Fetch categories
      ]);
      setProducts(productsResponse.data.products);
      setCategories(categoriesResponse.data.categories);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []); // Fetch data on initial load

  useEffect(() => {
    if (!isModalOpen) {
      fetchProductsAndCategories(); // Refresh product list when modal is closed
    }
  }, [isModalOpen]); // Trigger when modal opens or closes

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    localStorage.setItem('savedProductId', product.id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };
 

  return (
    <div className="px-32 py-16 bg-gray-50">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Product List</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => {
          const imageUrl = product.images && product.images.length > 0 ? product.images[0] : '';

          return (
            <div key={product.id} className="border border-gray-300 bg-white rounded-lg p-4 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="col-span-1 mb-4">
                {imageUrl ? (
                  <img src={imageUrl} alt={product.title} width={1000} height={200} className="w-full h-[200px] object-cover" />
                ) : (
                  <p>No image available</p>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">{product.title}</h3>
              <p className="text-gray-600">Category: {product.category}</p>
              <p className="text-gray-600">Price: ${product.price}</p>
             <div className='flex justify-between'>
             <Link to={`/product-view/${product.id}`} className="bg-gray-400 mt-4 px-2 py-2 rounded-md text-white inline-block">
                View
              </Link>
              <button onClick={() => handleEditClick(product)} className="text-white bg-blue-500 mt-4 px-2 py-2 rounded-md ml-4 inline-block">
                Edit
              </button>
             </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && 
        <ProductModal 
          product={selectedProduct} 
          categories={categories} // Pass categories to the modal
          onClose={handleCloseModal} 
          onUpdate={fetchProductsAndCategories} // Pass update function to the modal
        />
      }
    </div>
  );
};

export default ProductList;
