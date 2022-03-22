import './css/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store'
import { useEffect } from 'react';
import { loadUser } from './redux/actions/userActions';

import Header from './components/layouts/Header';
import Home from './components/homePage/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';

import MyOrders from './components/user/MyOrders';
import UserOrderDetails from './components/user/UserOrderDetails';
import Profile from './components/user/Profile';
import UpdateProfile from './components/user/UpdateProfile';

import UpdatePassword from './components/user/UpdatePassword';
import ForgotPassword from './components/user/ForgotPassword';
import NewPassword from './components/user/NewPassword';

import ProductsByCategory from './components/products/ProductsByCategory';
import ProductDetails from './components/products/ProductDetails';
import SearchProducts from './components/products/SearchProducts';

import Cart from './components/cart/Cart';
import Shipping from './components/cart/Shipping';
import ConfirmOrder from './components/cart/ConfirmOrder';
import OrderSuccess from './components/cart/OrderSuccess';

import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/products/ProductsList';
import AddProduct from './components/admin/products/AddProduct';
import UpdateProduct from './components/admin/products/UpdateProduct';

import OrdersList from './components/admin/orders/OrdersList';
import UpdateOrder from './components/admin/orders/UpdateOrder';
import OrdersRecap from './components/admin/orders/OrdersRecap';
import OrdersByStatus from './components/admin/orders/OrdersByStatus';
import Settings from './components/admin/orders/Settings';
import Statistics from './components/admin/stats/Statistics';

import UsersList from './components/admin/users/UsersList';
import UpdateUser from './components/admin/users/UpdateUser';

import CategoriesList from './components/admin/categories/CategoriesList';
import AddCategory from './components/admin/categories/AddCategory';
import UpdateCategory from './components/admin/categories/UpdateCategory';

import ProtectedRoute from './components/utils/ProtectedRoute';
import NotFound from './components/utils/NotFound';
import Unauthorized from './components/utils/Unauthorized';
import Footer from './components/layouts/footer/Footer';
import OnSale from './components/homePage/OnSale';

function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);

  
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/'  element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route element={<ProtectedRoute allowedRoles={['user', 'admin']}/>}>
            <Route path='/user/orders' element={<MyOrders/>} />
            <Route path='/user/orders/:id' element={<UserOrderDetails/>} />
            <Route path='/user/profile' element={<Profile/>} />
            <Route path='/user/update' element={<UpdateProfile/>} />

            <Route path='/password/update' element={<UpdatePassword/>} />
            <Route path='/password/forgot' element={<ForgotPassword/>} />
            <Route path='/password/reset/:token' element={<NewPassword/>} />
          </Route>

          <Route path='/products' element={<ProductsByCategory/>} />
          <Route path='/products/:id' element={<ProductDetails/>} />
          <Route path="/search/products" element={<SearchProducts/>} />
          <Route path="/onsale" element={<OnSale/>} />

          <Route path="/cart" element={<Cart/>} />
          <Route path="/shipping" element={<Shipping/>} />
          <Route path="/order/confirm" element={<ConfirmOrder/>} />
          <Route path="/success/order" element={<OrderSuccess/>} />

          <Route element={<ProtectedRoute allowedRoles={['admin']}/>}>
            <Route path='/dashboard' element={<Dashboard/>} />
            <Route path='/admin/products' element={<ProductsList/>} />
            <Route path='/admin/products/new' element={<AddProduct/>}/>
            <Route path='/admin/products/:id' element={<UpdateProduct/>}/>

            <Route path='/admin/orders' element={<OrdersList/>} />
            <Route path='/admin/orders/:id' element={<UpdateOrder/>} />
            <Route path='/admin/orders/recap' element={<OrdersRecap/>} />
            <Route path='/admin/orders/status/:status' element={<OrdersByStatus/>} />
            <Route path='/admin/orders/settings' element={<Settings/>} />
            <Route path='/admin/orders/stats' element={<Statistics/>} />

            <Route path='/admin/users' element={<UsersList/>} />
            <Route path='/admin/users/:id' element={<UpdateUser/>} />

            <Route path='/admin/categories' element={<CategoriesList/>} />
            <Route path='/admin/categories/new' element={<AddCategory/>} />
            <Route path='/admin/categories/:id' element={<UpdateCategory/>} />
          </Route>
          <Route path='/unauthorized' element={<Unauthorized/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
