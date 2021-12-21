import './css/main.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layouts/Header';
import Loader from './components/layouts/Loader';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Loader/>
      </div>
    </Router>
  );
}

export default App;
