import React from 'react';
import { Link } from 'react-router-dom';

const CountryPage: React.FC = () => {
  // Simulação de dados (Para ficar igual à imagem)
  // No futuro, você buscaria isso via ID: api.getCountry(id)
  const countryData = {
    name: "Japan",
    description: "Japan is an island country in East Asia. It is situated in the northwest Pacific Ocean and is bordered on the west by the Sea of Japan, while extending from the Sea of Okhotsk in the north toward the East China Sea and Taiwan in the south.",
    capital: "Tokyo",
    population: "125.7 million",
    region: "Asia",
    language: "Japanese",
    currency: "Japanese Yen (JPY)",
    area: "377,975 km²",
    code: "+81",
    flagUrl: "https://flagcdn.com/w640/jp.png"
  };

  const cities = [
    { name: "Tokyo", pop: "13.9M" },
    { name: "Osaka", pop: "2.7M" },
    { name: "Kyoto", pop: "1.5M" },
    { name: "Yokohama", pop: "3.7M" },
    { name: "Nagoya", pop: "2.3M" }
  ];

  return (
    <div className="page-container">
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        Home <span>/</span> Countries <span>/</span> <span className="current">{countryData.name}</span>
      </div>

      {/* Header: Bandeira e Descrição */}
      <div className="country-header">
        <img src={countryData.flagUrl} alt={`Flag of ${countryData.name}`} className="country-flag-large" />
        <div className="country-header-info">
          <h1>{countryData.name}</h1>
          <p>{countryData.description}</p>
        </div>
      </div>

      <div className="country-content-grid">
        {/* Coluna da Esquerda: Detalhes */}
        <aside className="details-sidebar">
          <h3>Country Details</h3>
          
          <div className="detail-item">
            <span className="detail-label">Capital City</span>
            <span className="detail-value">{countryData.capital}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Population</span>
            <span className="detail-value">{countryData.population}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Continent/Region</span>
            <span className="detail-value">{countryData.region}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Official Language(s)</span>
            <span className="detail-value">{countryData.language}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Currency</span>
            <span className="detail-value">{countryData.currency}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Area</span>
            <span className="detail-value">{countryData.area}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Calling Code</span>
            <span className="detail-value">{countryData.code}</span>
          </div>
        </aside>

        {/* Coluna da Direita: Lista de Cidades */}
        <main className="cities-list-container">
          <div className="list-header-row">
            <h3>Cities in {countryData.name}</h3>
            {/* Simulação de busca/filtro */}
            <div className="dash-search" style={{ width: '250px' }}>
               <span className="search-icon">🔍</span>
               <input type="text" placeholder="Search for a city..." />
            </div>
          </div>

          <div className="cities-list">
            {cities.map((city, index) => (
              <Link to="/cities" key={index} className="city-list-item" style={{ textDecoration: 'none' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{city.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Population: {city.pop}</div>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>›</div>
              </Link>
            ))}
          </div>
          
          {/* Paginação Fake */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginTop: '2rem', color: 'var(--text-muted)' }}>
            <span>‹</span> <span style={{ color: 'var(--primary-accent)' }}>1</span> <span>2</span> <span>3</span> ... <span>10</span> <span>›</span>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CountryPage;