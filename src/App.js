
import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Components/homePage';
import Dashboard from './Components/Dashboard/Dashboard';
import Login from './Components/Login/Login';
import AddProduct from './Components/Product/AddProduct';
import EditProduct from './Components/Product/EditProduct';
import ProductView from './Components/Product/ProductView';
import ProductList from './Components/Product/ProductList';
import ReportPage from './Components/Product/ReportPage';


function App() {
  const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };
  return (
   <>
    <Routes>
      <Route  exact path='/' element={<HomePage/>} />
      <Route  exact path='login/' element={<Login/>} />
      <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route  exact path='/products/add' element={<AddProduct/>} />
      <Route  exact path='/product-edit/:id' element={<EditProduct/>} />
      <Route  exact path='/product-view/:id' element={<ProductView/>} />
      <Route  exact path='/product-list' element={<ProductList/>} />
      <Route  exact path='/report' element={<ReportPage/>} />
    </Routes>
   </>
  );
}

export default App;
