import React, { useState, useEffect } from 'react';
import { getProducts } from  '../Services/api';
import { getFromLocalStorage } from '../utils/storage';

const ReportPage = () => {
  const [totalProducts, setTotalProducts] = useState(0);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    const fetchTotalProducts = async () => {
      const response = await getProducts();
      setTotalProducts(response.data.total);
    };

    const fetchNewProducts = () => {
      const savedProducts = getFromLocalStorage('newProduct');
      setNewProducts(savedProducts ? [savedProducts] : []);
    };

    fetchTotalProducts();
    fetchNewProducts();
  }, []);

  return (
    <div className="px-32 py-24">
    <h2 className="text-3xl font-semibold mb-8 text-center">Report Page</h2>
    <div className="flex justify-around">
      <div className="bg-white shadow-lg p-8 rounded-lg text-center">
        <h3 className="text-xl font-medium text-gray-700">Latest Products Count</h3>
        <p className="text-4xl font-bold text-green-500 mt-4">{newProducts.length}</p>
      </div>
      <div className="bg-white shadow-lg p-8 rounded-lg text-center">
        <h3 className="text-xl font-medium text-gray-700">Existing Products Count</h3>
        <p className="text-4xl font-bold text-blue-500 mt-4">{totalProducts}</p>
      </div>
    </div>
  </div>
  
  );
};

export default ReportPage;
