import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { LogOut} from 'lucide-react';

const Navbar: React.FC = () => {
  const location = useLocation();
  
  const isDashboard = location.pathname !== '/' && 
                      location.pathname !== '/login' && 
                      location.pathname !== '/register';

  const getLinkClass = (path: string) => {
    return location.pathname.startsWith(path) ? 'nav-pill active' : 'nav-pill';
  };

  if (isDashboard) {
    return (
      <div className="floating-nav-wrapper">
        <nav className="floating-navbar">
            <span className="brand-text">OrbX</span>


          <div className="nav-divider"></div>
          
          <div className="nav-links-group">
            <Link to="/dashboard" className={location.pathname === '/dashboard' ? 'nav-pill active' : 'nav-pill'}>
              <span>📊</span> <span className="nav-label">Dash</span>
            </Link> 
            
            <Link to="/continents" className={getLinkClass('/continents')}>
              <span>🌍</span> <span className="nav-label">Mundo</span>
            </Link> 
            
            <Link to="/countries" className={getLinkClass('/countries')}>
              <span>🏳️</span> <span className="nav-label">Países</span>
            </Link> 

            <Link to="/cities" className={getLinkClass('/cities')}>
              <span>🏙️</span> <span className="nav-label">Cidades</span>
            </Link>
            
            <Link to="/admin" className={getLinkClass('/admin')}>
              <span>🛡️</span> <span className="nav-label">Admin</span>
            </Link>
          </div>

          <div className="nav-divider"></div>

          <Link to="/" className="icon-btn" title="Sair">
                <LogOut size={20} />
          </Link>
        </nav>
      </div>
    );
  }

  return (
    <nav className="public-navbar">
      <div className="page-container public-nav-content">
        <Link to="/" style={{ textDecoration: 'none', fontSize: '1.5rem', fontWeight: '800', color: '#fff' }}>
          OrbX<span style={{ color: '#3B82F6' }}>.</span>
        </Link>
        
        {location.pathname === '/' && (
           <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <Link to="/login" style={{ color: '#9CA3AF', textDecoration: 'none', fontWeight: 500 }}>Login</Link>
              <Link to="/register" className="nav-cta">Começar Agora</Link>
           </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;