import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="page">
      <div className="home-container">
        <h1>OrbX: O mundo ao seu alcance</h1>
        <p>Gerencie continentes, países e cidades de forma eficiente</p>
        
        <div className="dashboard-cards">
           <h3>Descrição do Produto: OrbX</h3>
            <p>
              O OrbX é uma aplicação web completa e interativa, desenvolvida
              para o gerenciamento centralizado de dados geográficos.
              O sistema mantém uma arquitetura de dados relacional robusta,
              garantindo que cada cidade esteja vinculada a um país.
              O diferencial do OrbX é sua capacidade de integração dinâmica
              com duas APIs externas. A aplicação consome APIs para.
              Com uma interface gráfica amigável e responsiva, o OrbX
              exibe dinamicamente todos esses dados, oferecendo uma solução.
            </p>
        </div>

      </div>
    </div>
  );
};

export default Home;