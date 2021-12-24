import './css/main.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import store from './redux/store'
import { useEffect } from 'react';
import { loadUser } from './redux/actions/userActions';
import Header from './components/layouts/Header';
import Login from './components/user/Login';
import Home from './components/Home';
import Register from './components/user/Register';
import Dashboard from './components/admin/Dashboard';
import ProductsList from './components/admin/products/ProductsList';
import CategoriesList from './components/admin/categories/CategoriesList';
import OrdersList from './components/admin/orders/OrdersList';
import UsersList from './components/admin/users/UsersList';



function App() {

  useEffect(() => {
    store.dispatch(loadUser())
  }, []);


  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />

          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/admin/products' element={<ProductsList/>} />
          <Route path='/admin/categories' element={<CategoriesList/>} />
          <Route path='/admin/orders' element={<OrdersList/>} />
          <Route path='/admin/users' element={<UsersList/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
