import './css/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store'
import { useEffect } from 'react';
import { loadUser } from './redux/actions/userActions';
import Header from './components/layouts/Header';
import Login from './components/user/Login';
import Home from './components/homePage/Home';
import Register from './components/user/Register';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/products/ProductsList';
import CategoriesList from './components/admin/categories/CategoriesList';
import OrdersList from './components/admin/orders/OrdersList';
import UsersList from './components/admin/users/UsersList';
import UpdateUser from './components/admin/users/UpdateUser';
import AddCategory from './components/admin/categories/AddCategory';
import UpdateCategory from './components/admin/categories/UpdateCategory';
import AddProduct from './components/admin/products/AddProduct';
import UpdateProduct from './components/admin/products/UpdateProduct';
import UpdateOrder from './components/admin/orders/UpdateOrder';
import OrdersRecap from './components/admin/orders/OrdersRecap';
import OrdersByStatus from './components/admin/orders/OrdersByStatus';
import Statistics from './components/admin/stats/Statistics';
import Settings from './components/admin/orders/Settings';
import AllProducts from './components/homePage/AllProducts';


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
          <Route path='/products' element={<AllProducts/>} />
          <Route path="/search/products" element={<AllProducts/>} />

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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
