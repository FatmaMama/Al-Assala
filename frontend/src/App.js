import './css/main.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/layouts/Header';


function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
      </div>
    </Router>
  );
}

export default App;
