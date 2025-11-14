import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Dados Mockados (Europa)
const countriesData = [
  { name: 'France', capital: 'Paris', code: 'fr' },
  { name: 'Germany', capital: 'Berlin', code: 'de' },
  { name: 'Italy', capital: 'Rome', code: 'it' },
  { name: 'Spain', capital: 'Madrid', code: 'es' },
  { name: 'United Kingdom', capital: 'London', code: 'gb' },
];

const ContinentPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        <span>Home</span> / <span>Continents</span> / <span className="current">Europe</span>
      </div>

      <div className="continent-header">
        <h1>Europe</h1>
        <p className="continent-desc">
          A continent located entirely in the Northern Hemisphere and mostly in the Eastern Hemisphere, known for its rich history and cultural diversity.
        </p>
      </div>

      <div className="continent-content-grid">
        
        <div className="left-column">
          
          <div className="stats-grid-2x2">
            <div className="stat-card-dark">
              <h3>Total Countries</h3>
              <p>44</p>
            </div>
            <div className="stat-card-dark">
              <h3>Total Population</h3>
              <p>746.4 M</p>
            </div>
            <div className="stat-card-dark">
              <h3>Total Area (km²)</h3>
              <p>10.18 M</p>
            </div>
            <div className="stat-card-dark">
              <h3>Largest Country</h3>
              <p>Russia</p>
            </div>
          </div>

          <div className="continent-map-container">
            <div className="map-placeholder-blue"></div>
          </div>
        </div>

        <div className="right-column">
          <h2>Countries in Europe</h2>

          <div className="list-controls">
            <input 
              type="text" 
              placeholder="Search country..." 
              className="search-input-dark"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select className="sort-select-dark">
              <option>Sort by Name</option>
              <option>Sort by Population</option>
            </select>
          </div>

          <div className="countries-list">
            {countriesData.map((country, index) => (
              <Link to={`/countries`} key={index} className="country-item-card">
                <div className="country-info-wrapper">
                  <img 
                    src={`https://flagcdn.com/w80/${country.code}.png`} 
                    alt={country.name} 
                    className="country-flag-thumb"
                  />
                  <div className="country-text">
                    <span className="c-name">{country.name}</span>
                    <span className="c-capital">{country.capital}</span>
                  </div>
                </div>
                <div className="chevron-icon">›</div>
              </Link>
            ))}
          </div>

          <div className="pagination-simple">
            <button className="nav-btn">← Previous</button>
            <span>Page 1 of 9</span>
            <button className="nav-btn">Next →</button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ContinentPage;