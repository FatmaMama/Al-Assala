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
import ProductsList from './components/admin/ProductsList';



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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
