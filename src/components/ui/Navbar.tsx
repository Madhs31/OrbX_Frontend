import React from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <div className="nav-brand">Sistema Geográfico</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/continents">Continentes</Link>
        <Link to="/countries">Países</Link>
        <Link to="/cities">Cidades</Link>
      </div>
    </nav>
  );
};

export default Navbar;