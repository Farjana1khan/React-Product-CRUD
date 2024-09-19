import React, { useEffect, useState } from 'react';
import { addProduct, getCategories } from '../Services/api';
import { saveToLocalStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';

function AddProduct() {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    discountPercentage: '',
    rating: '',
    stock: '',
    brand: '',
    weight: '',
    warrantyInformation: '',
    shippingInformation: '',
    availabilityStatus: '',
    reviews: '',
    returnPolicy: '',
    minimumOrderQuantity: ''
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});


  const navigate = useNavigate()
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        if (Array.isArray(response.data)) {
          setCategories(response.data);
        } else {
          console.error('Invalid categories data format');
        }
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value
    }));

    // Remove validation error for the field if user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prevErrors) => ({
        ...prevErrors,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    Object.keys(product).forEach((key) => {
      if (!product[key] && key !== 'reviews') { // Skip reviews field for validation
        errors[key] = 'This field is required';
      }
    });
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await addProduct(product);
      setSuccessMessage('Product added successfully!');
      saveToLocalStorage('newProduct', response.data);
      navigate("/product-list")

      // Reset the form and clear errors
      setProduct({
        title: '',
        description: '',
        category: '',
        price: '',
        discountPercentage: '',
        rating: '',
        stock: '',
        brand: '',
        weight: '',
        warrantyInformation: '',
        shippingInformation: '',
        availabilityStatus: '',
        reviews: '',
        returnPolicy: '',
        minimumOrderQuantity: ''
      });
      setValidationErrors({});
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Error adding product');
      console.error('Error adding product', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 text-center">Add Product</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        value={product.title}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.title && <p className="text-red-500">{validationErrors.title}</p>}

      <input
        type="text"
        name="description"
        placeholder="Description"
        value={product.description}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.description && <p className="text-red-500">{validationErrors.description}</p>}

      <select
        name="category"
        value={product.category}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.slug} value={cat.name}>
            {cat.name}
          </option>
        ))}
      </select>
      {validationErrors.category && <p className="text-red-500">{validationErrors.category}</p>}

      <input
        type="number"
        name="price"
        placeholder="Price"
        value={product.price}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.price && <p className="text-red-500">{validationErrors.price}</p>}

      <input
        type="number"
        name="discountPercentage"
        placeholder="Discount Percentage"
        value={product.discountPercentage}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.discountPercentage && <p className="text-red-500">{validationErrors.discountPercentage}</p>}

      <input
        type="number"
        name="rating"
        placeholder="Rating"
        value={product.rating}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.rating && <p className="text-red-500">{validationErrors.rating}</p>}

      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={product.stock}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.stock && <p className="text-red-500">{validationErrors.stock}</p>}

      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={product.brand}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.brand && <p className="text-red-500">{validationErrors.brand}</p>}

      <input
        type="number"
        name="weight"
        placeholder="Weight"
        value={product.weight}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.weight && <p className="text-red-500">{validationErrors.weight}</p>}

      <input
        type="text"
        name="warrantyInformation"
        placeholder="Warranty Information"
        value={product.warrantyInformation}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.warrantyInformation && <p className="text-red-500">{validationErrors.warrantyInformation}</p>}

      <input
        type="text"
        name="shippingInformation"
        placeholder="Shipping Information"
        value={product.shippingInformation}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.shippingInformation && <p className="text-red-500">{validationErrors.shippingInformation}</p>}

      <input
        type="text"
        name="availabilityStatus"
        placeholder="Availability Status"
        value={product.availabilityStatus}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.availabilityStatus && <p className="text-red-500">{validationErrors.availabilityStatus}</p>}

      <textarea
        name="reviews"
        placeholder="Reviews (JSON Format)"
        value={product.reviews}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    
      <input
        type="text"
        name="returnPolicy"
        placeholder="Return Policy"
        value={product.returnPolicy}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.returnPolicy && <p className="text-red-500">{validationErrors.returnPolicy}</p>}

      <input
        type="number"
        name="minimumOrderQuantity"
        placeholder="Minimum Order Quantity"
        value={product.minimumOrderQuantity}
        onChange={handleChange}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {validationErrors.minimumOrderQuantity && <p className="text-red-500">{validationErrors.minimumOrderQuantity}</p>}

      <button
        type="submit"
        className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Add Product
      </button>

      {successMessage && (
        <p className="text-green-500 text-center mt-4">{successMessage}</p>
      )}

      {errorMessage && (
        <p className="text-red-500 text-center mt-4">{errorMessage}</p>
      )}
    </form>
  );
}

export default AddProduct;
