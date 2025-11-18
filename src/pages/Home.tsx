import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="landing-wrapper">
      
      <div className="bg-glow-effect"></div>

      <section className="hero-section">
        <div className="page-container">
          
          <span className="badge-new">O Mundo ao seu Alcance</span>
          
          <h1 className="hero-title">
            Inteligência Global <br />
            em Tempo Real
          </h1>
          
          <p className="hero-subtitle">
            Monitore dados de países e cidades com a plataforma 
            mais rápida do mercado. Decisões baseadas em dados, não em palpites.
          </p>
          
          <div className="hero-btns">
            <Link to="/login" className="btn-glow-primary">Acessar Painel</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;