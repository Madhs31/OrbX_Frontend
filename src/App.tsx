import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import ContinentPage from './pages/ContinentPage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/continents" element={<ContinentPage />} />
            <Route path="/countries" element={<CountryPage />} />
            <Route path="/cities" element={<CityPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;