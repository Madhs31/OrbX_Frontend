import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Verifica se NÃO é uma página pública (Home/Login/Register).
  const showFullNavbar = location.pathname !== '/' && 
                         location.pathname !== '/login' && 
                         location.pathname !== '/register';

  // Função auxiliar para destacar o link ativo
  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path) ? 'dash-link active' : 'dash-link';
  };

  // === VERSÃO COMPLETA (Dashboard, Países, Cidades, Admin...) ===
  if (showFullNavbar) {
    return (
      <nav className="dash-navbar">
        <div className="dash-nav-left">
          {/* Logo OrbX */}
          <Link to="/dashboard" className="dash-brand" style={{ textDecoration: 'none' }}>
            <div className="brand-icon"></div>
            <span>OrbX</span>
          </Link>
          
          {/* Menu de Navegação */}
          <div className="dash-menu">
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'dash-link active' : 'dash-link'}>Dashboard</Link> 
            <Link to="/continents" className={getLinkClass('/continents')}>Continentes</Link> 
            <Link to="/countries" className={getLinkClass('/countries')}>Países</Link> 
            <Link to="/cities" className={getLinkClass('/cities')}>Cidades</Link> 
            
            {/* NOVO LINK ADICIONADO: */}
            <Link to="/admin" className={getLinkClass('/admin')}>Admin Panel</Link>
          </div>
        </div>

        {/* Ícones da Direita */}
        <div className="dash-nav-right">
          <button className="nav-icon-btn">🔔</button>
          <button className="nav-icon-btn">⚙️</button>
          
          <div className="nav-profile-avatar">
          </div>
        </div>
      </nav>
    );
  }

  // === VERSÃO PADRÃO (Home/Login) ===
  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand" style={{ textDecoration: 'none' }}>
        OrbX
      </Link>
      {location.pathname === '/' && (
         <div style={{ marginLeft: 'auto' }}>
            <Link to="/login" style={{ color: 'var(--text-muted)', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
         </div>
      )}
    </nav>
  );
};

export default Navbar;