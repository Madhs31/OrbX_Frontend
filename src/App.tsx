import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import ContinentPage from './pages/ContinentPage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
// Importe a nova página de Admin aqui:
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
            <Route path="/continents" element={<ContinentPage />} />
            <Route path="/countries" element={<CountryPage />} />
            <Route path="/cities" element={<CityPage />} />
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} /> 
            <Route path="/dashboard" element={<DashboardPage />} />
            
            {/* NOVA ROTA ADICIONADA: */}
            <Route path="/admin" element={<AdminPanel />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;