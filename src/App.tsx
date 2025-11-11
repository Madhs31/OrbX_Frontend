import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Home from './pages/Home';
import ContinentPage from './pages/ContinentPage';
import CountryPage from './pages/CountryPage';
import CityPage from './pages/CityPage';
import LoginPage from './pages/LoginPage'; // Você já está importando o componente aqui
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
      {/* Esta rota agora usa o LoginPage importado do arquivo './pages/LoginPage' */}
<Route path="/login" element={<LoginPage />} /> 
</Routes>
</div>
</div>
</Router>
);
}

export default App;