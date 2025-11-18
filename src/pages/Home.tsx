import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="landing-wrapper">
      
      <div className="bg-glow-effect"></div>

      <section className="hero-section">
        <div className="page-container">
          
          <span className="badge-new">✨ Novo: Dashboard v2.0 Live</span>
          
          <h1 className="hero-title">
            Inteligência Global <br />
            em Tempo Real
          </h1>
          
          <p className="hero-subtitle">
            Monitore dados de 195 países e milhares de cidades com a plataforma 
            mais rápida do mercado. Decisões baseadas em dados, não em palpites.
          </p>
          
          <div className="hero-btns">
            <Link to="/login" className="btn-glow-primary">Acessar Painel</Link>
            <Link to="/about" className="btn-outline">Saiba Mais</Link>
          </div>

          <div className="stats-strip">
            <div className="stat-box">
              <span className="stat-num">195+</span>
              <span className="stat-lbl">Países Cobertos</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">2M+</span>
              <span className="stat-lbl">Data Points/Dia</span>
            </div>
            <div className="stat-box">
              <span className="stat-num">0.02s</span>
              <span className="stat-lbl">Latência Média</span>
            </div>
          </div>

        </div>
      </section>

      <section className="features-section">
        <div className="page-container">
          <div className="features-grid">
            
            <div className="feature-card">
              <span className="f-icon">🌍</span>
              <h3>Alcance Ilimitado</h3>
              <p style={{ color: '#9CA3AF' }}>Nossa rede CDN distribuída garante que você acesse dados locais de qualquer ponto do globo instantaneamente.</p>
            </div>

            <div className="feature-card">
              <span className="f-icon">⚡</span>
              <h3>Websockets Rápidos</h3>
              <p style={{ color: '#9CA3AF' }}>Diga adeus ao "refresh". Os dados são empurrados para sua tela no milissegundo em que são atualizados.</p>
            </div>

            <div className="feature-card">
              <span className="f-icon">🔒</span>
              <h3>Segurança Militar</h3>
              <p style={{ color: '#9CA3AF' }}>Criptografia de ponta a ponta e conformidade com GDPR/LGPD nativa da plataforma.</p>
            </div>

          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid var(--border-light)', padding: '2rem 0', marginTop: 'auto' }}>
        <div className="page-container" style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          <p>&copy; 2025 OrbX Inc. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
};

export default Home;