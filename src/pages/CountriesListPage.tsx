import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { geoAPI } from '../services/api'; 

interface CountrySummary {
  id: number;
  name: string;
  capital: string | null;
  isoCode: string | null;
  continent: {
    name: string;
  };
}

const placeholderFlag = "https://flagcdn.com/w80/un.png";

const CountriesListPage: React.FC = () => {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await geoAPI.getCountries(); 
        setCountries(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de países", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); 

  if (loading) {
    return <div className="page-container" style={{padding: '2rem'}}>Carregando países...</div>;
  }

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        <span>Home</span> / <span className="current">Países</span>
      </div>

      <div className="continent-header">
        <h1>Explorar Países</h1>
        <p className="continent-desc">
          Selecione um país abaixo para ver mais detalhes.
        </p>
      </div>

      <div className="countries-list" style={{ maxWidth: '900px', margin: '2rem auto' }}>
        
        {countries.map((country) => (
          <Link to={`/countries/${country.id}`} key={country.id} className="country-item-card">
            <div className="country-info-wrapper">
              <img
                src={country.isoCode ? `https://flagcdn.com/w80/${country.isoCode.toLowerCase()}.png` : placeholderFlag}
                alt={country.name}
                className="country-flag-thumb"
              />
              <div className="country-text">
                <span className="c-name">{country.name}</span>
                <span className="c-capital">{country.capital || 'N/A'}</span>
              </div>
            </div>
             <div className="chevron-icon" style={{color: 'var(--text-muted)'}}>›</div>
          </Link>
        ))}

        {!loading && countries.length === 0 && (
          <p>Nenhum país foi cadastrado ainda.</p>
        )}

      </div>
    </div>
  );
};

export default CountriesListPage;