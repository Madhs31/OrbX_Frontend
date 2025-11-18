import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import ContinentsListPage from './pages/ContinentsListPage';
import CountriesListPage from './pages/CountriesListPage';
import CitiesListPage from './pages/CitiesListPage';
import ContinentPage from './pages/ContinentPage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import AdminPanel from './pages/AdminPage'; 
import './styles/global.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            
            {/* CONTINENTES */}
            <Route path="/continents" element={<ContinentsListPage />} />
            <Route path="/continents/:id" element={<ContinentPage />} />
            
            {/* PAÍSES */}
            <Route path="/countries" element={<CountriesListPage />} />
            <Route path="/countries/:id" element={<CountryPage />} />

            {/* CIDADES */}
            <Route path="/cities" element={<CitiesListPage />} />
            <Route path="/cities/:id" element={<CityPage />} />
            
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/admin" element={<AdminPanel />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;