Product CRUD with Login authentication

A versatile Product Application built with React, designed for managing products effectively. This application allows users to authenticate, create, update, and manage product listings seamlessly through a RESTful API.

Features

User Authentication: Secure login functionality for users to manage their products.

Product : Full CRUD operations (Create, Read, Update, Delete) for managing products efficiently.

Category Retrieval: Fetch product categories to help users organize their products better.

Local Storage Integration: Store user and product data locally to maintain user sessions.

Responsive Design: A fully responsive layout for an optimal user experience across all devices.

Technologies Used

Frontend: React, Axios for API calls

API: DummyJSON (for mock product data)

State Management: Context API or your preferred state management library

API Endpoints

Login: POST /auth/login - Authenticates user credentials.

Add Product: POST /products/add - Adds a new product to the inventory.

Get All Products: GET /products - Retrieves a list of all products.

Get Single Product: GET /products/:id - Fetches details of a specific product by ID.

Update Product: PUT /products/:id - Updates the details of a specified product.

Get Categories: GET /products/categories - Retrieves a list of product categories.

