import axios from 'axios';

const API_URL = 'https://dummyjson.com';



// Login API
export const login = (credentials) => axios.post(`${API_URL}/auth/login`, credentials, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Add Product API
  export const addProduct = (product) => axios.post(`${API_URL}/products/add`, product, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Get All Products  API
  export const getProducts = () => axios.get(`${API_URL}/products`);
  
  // Get Single Product  API
  export const getProduct = (id) => axios.get(`${API_URL}/products/${id}`);
  
  // Update Product  API
  export const updateProduct = (id, product) => axios.put(`${API_URL}/products/${id}`, product, {
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Get Categories API
  export const getCategories = () => axios.get(`${API_URL}/products/categories`);


// Create an axios instance 
const apiClient = axios.create({
  baseURL: API_URL,
});

// Add a request interceptor to include the token in every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});



export const getUserInfo = () => {
  return apiClient.get('/users/me');
};



//Save New Products To Local Storage
export const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving to local storage', error);
    }
  };
export default apiClient;
