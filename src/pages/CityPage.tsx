import React from 'react';

const CityPage: React.FC = () => {
  // Dados simulados de Paris
  const cityData = {
    name: "Paris",
    country: "France",
    population: "2.14M",
    populationSub: "City Proper (2020)",
    area: "105.4 km²",
    areaSub: "40.7 sq mi",
    weather: "19°C",
    weatherSub: "Partly Cloudy",
    timezone: "CET",
    timezoneSub: "UTC+1",
    language: "French",
    imageUrl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop" // Imagem de Paris
  };

  return (
    <div className="page-container">
       <div className="breadcrumbs">
        Home <span>/</span> Countries <span>/</span> {cityData.country} <span>/</span> <span className="current">{cityData.name}</span>
      </div>

      <div 
        className="city-hero" 
        style={{ backgroundImage: `url(${cityData.imageUrl})` }}
      >
        <div className="city-hero-content">
          <h1>{cityData.name}</h1>
          <span>{cityData.country}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        <span style={{ color: 'var(--primary-accent)', fontWeight: '600', borderBottom: '2px solid var(--primary-accent)', paddingBottom: '1rem', marginBottom: '-1.1rem' }}>Overview</span>
        <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Demographics</span>
        <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Points of Interest</span>
        <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Weather</span>
        <span style={{ color: 'var(--text-muted)', cursor: 'pointer' }}>Economy</span>
      </div>

      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Overview</h2>

      <div className="city-stats-grid">
        <div className="stat-box">
          <div className="stat-box-header">👥 Population</div>
          <div className="stat-box-value">{cityData.population}</div>
          <div className="stat-box-sub">{cityData.populationSub}</div>
        </div>

        <div className="stat-box">
          <div className="stat-box-header">📐 Area</div>
          <div className="stat-box-value">{cityData.area}</div>
          <div className="stat-box-sub">{cityData.areaSub}</div>
        </div>

        <div className="stat-box">
          <div className="stat-box-header">⛅ Current Weather</div>
          <div className="stat-box-value">{cityData.weather}</div>
          <div className="stat-box-sub">{cityData.weatherSub} <br/> Feels like 18°C</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-box-header">🕒 Timezone</div>
          <div className="stat-box-value">{cityData.timezone}</div>
          <div className="stat-box-sub">{cityData.timezoneSub}</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-box-header">🗣️ Language</div>
          <div className="stat-box-value">{cityData.language}</div>
          <div className="stat-box-sub">Official Language</div>
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Location</h2>
      <div className="map-container" style={{ height: '300px', minHeight: '300px', marginTop: '0' }}>
        <div className="map-placeholder" style={{ 
            backgroundImage: "url('https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Paris_map_transport_networks_points_of_interest.jpg/1200px-Paris_map_transport_networks_points_of_interest.jpg')", // Mapa estático de Paris
            opacity: 0.8 
        }}>
        </div>
      </div>
    </div>
  );
};

export default CityPage;