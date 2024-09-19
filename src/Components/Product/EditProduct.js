import React, { useState, useEffect } from 'react';
import { updateProduct, getCategories } from '../Services/api';

const ProductModal = ({ product, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    title: product.title || '',
    category: product.category || '',
    price: product.price || '',
    images: product.images ? product.images[0] : '',
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set the form data when the product prop changes
    setFormData({
      title: product.title || '',
      category: product.category || '',
      price: product.price || '',
      images: product.images ? product.images[0] : '',
    });

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoading(false);
      }
    };

    fetchCategories();
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const savedProductId = localStorage.getItem('savedProductId');

    if (!savedProductId) {
      alert('No product ID found in local storage.');
      return;
    }

    try {
      await updateProduct(savedProductId, {
        title: formData.title,
        category: formData.category,
        price: formData.price,
        images: [formData.images],
      });
      alert('Product updated successfully');

      // Save updated product details to local storage
      localStorage.setItem('updatedProduct', JSON.stringify({
        id: savedProductId,
        ...formData
      }));

      onUpdate(); // Notify parent to refresh product list
      onClose(); // Close modal after successful update
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  if (loading) return <p>Loading categories...</p>;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="category">Category</label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            >
              <option value="" disabled>Select category</option>
              {categories.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="price">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="images">Image URL</label>
            <input
              type="text"
              id="images"
              name="images"
              value={formData.images}
              onChange={handleChange}
              className="border border-gray-300 rounded-lg w-full p-2"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductModal;
