import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="page-container landing-page">
      
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Bem-vindo ao <span className="highlight">OrbX</span></h1>
          <p className="hero-subtitle">
            A solução completa para visualização de dados globais e monitoramento em tempo real. 
            Conecte-se a insights de 195 países e milhares de cidades instantaneamente.
          </p>
          
          <div className="hero-actions">
            <Link to="/login" className="btn-hero primary">
              Acessar Painel
            </Link>
            <Link to="/register" className="btn-hero secondary">
              Criar Conta Grátis
            </Link>
          </div>
        </div>
      </section>

      <div className="features-grid">
        <div className="card feature-card">
          <div className="feature-icon">🌍</div>
          <h3>Alcance Global</h3>
          <p>Acesse dados detalhados e métricas precisas de qualquer lugar do mundo com nossa infraestrutura distribuída.</p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">⚡</div>
          <h3>Tempo Real</h3>
          <p>Sincronização instantânea de dados. Tome decisões baseadas no que está acontecendo agora.</p>
        </div>

        <div className="card feature-card">
          <div className="feature-icon">🛡️</div>
          <h3>Segurança Total</h3>
          <p>Seus dados são protegidos com criptografia de ponta a ponta e autenticação robusta.</p>
        </div>
      </div>

      <section className="about-section">
        <div className="card">
          <h2>Sobre o Projeto</h2>
          <p>
            O OrbX foi desenvolvido para simplificar a complexidade de dados geográficos. 
            Nossa missão é transformar números brutos em mapas interativos e relatórios 
            que fazem sentido para o seu negócio.
          </p>
        </div>
      </section>

    </div>
  );
};

export default Home;