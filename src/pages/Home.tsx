import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      {/* Cards de Estatísticas */}
      <div className="stats-cards">
        <div className="card">
          <h3>Total Countries</h3>
          <p>195</p>
        </div>
        <div className="card">
          <h3>Total Cities</h3>
          <p>4,416</p>
        </div>
        <div className="card">
          <h3>API Status</h3>
          <p className="status-operational">
            <span className="status-dot"></span>
            Operational
          </p>
        </div>
        <div className="card">
          <h3>Data Points Synced</h3>
          <p>1.2M</p>
        </div>
      </div>

      {/* Container do Mapa */}
      <div className="map-container">
        {/* Este é um placeholder para o mapa. 
            Mapas interativos reais exigiriam uma biblioteca como Leaflet ou Mapbox. */}
        <div className="map-placeholder">
                  </div>
      </div>

      {/* Tabela de Acessos Recentes */}
      <div className="table-container">
        <h2>Recently Accessed Locations</h2>
        <table>
          <thead>
            <tr>
              <th>Location</th>
              <th>Type</th>
              <th>Last Accessed</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tokyo, Japan</td>
              <td>City</td>
              <td>2 hours ago</td>
              <td><span className="status status-syncing">Syncing</span></td>
            </tr>
            <tr>
              <td>Germany</td>
              <td>Country</td>
              <td>1 day ago</td>
              <td><span className="status status-syncing">Syncing</span></td>
            </tr>
            <tr>
              <td>São Paulo, Brazil</td>
              <td>City</td>
              <td>3 days ago</td>
              <td><span className="status status-failed">Sync Failed</span></td>
            </tr>
            <tr>
              <td>Australia</td>
              <td>Country</td>
              <td>5 days ago</td>
              <td><span className="status status-syncing">Syncing</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;