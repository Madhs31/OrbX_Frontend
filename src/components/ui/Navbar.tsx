import React from 'react';
import { Link } from 'react-router-dom'; // 1. Importar Link

const Navbar: React.FC = () => {
return (
 <nav className="navbar">
<div className="nav-brand">OrbX</div>

<div className="nav-search">

<span>🔍</span>
<input type="text" placeholder="Search for a country or city..." />
</div>

<div className="nav-icons">
<Link to="/login" className="icon profile-icon">👤</Link> 
</div>
</nav>
);
};

export default Navbar;