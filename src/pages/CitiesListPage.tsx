import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { geoAPI } from '../services/api'; 

interface CitySummary {
  id: number;
  name: string;
  population: string;
  country: {
    name: string;
  };
}

const CitiesListPage: React.FC = () => {
  const [cities, setCities] = useState<CitySummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await geoAPI.getCities({}); 
        setCities(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de cidades", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); 

  if (loading) {
    return <div className="page-container" style={{padding: '2rem'}}>Carregando cidades...</div>;
  }
  
  const formatPopulation = (pop: string) => Number(pop).toLocaleString();

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        <span>Home</span> / <span className="current">Cidades</span>
      </div>

      <div className="continent-header">
        <h1>Explorar Cidades</h1>
        <p className="continent-desc">
          Selecione uma cidade abaixo para ver mais detalhes.
        </p>
      </div>

      <main className="cities-list-container" style={{ maxWidth: '900px', margin: '2rem auto' }}>
          <div className="cities-list">
            {cities.map((city) => (
              <Link to={`/cities/${city.id}`} key={city.id} className="city-list-item" style={{ textDecoration: 'none' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{city.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    País: {city.country.name}
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)', textAlign: 'right' }}>
                   <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                      Pop: {formatPopulation(city.population)}
                   </div>
                </div>
              </Link>
            ))}
             {cities.length === 0 && (
                <div className="city-list-item">Nenhuma cidade cadastrada.</div>
             )}
          </div>
        </main>
    </div>
  );
};

export default CitiesListPage;