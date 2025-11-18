import React, { useState, useEffect } from 'react';
import { geoAPI } from '../services/api';
import DynamicMap from '../components/Services/DynamicMap'; 

interface Stats {
  totalCountries: number;
  totalCities: number;
  apiStatus: string;
  dataPointsSynced: number;
  totalContinents: number;
}

interface RecentCity {
  id: number;
  name: string;
  population: string;
  country: {
    name: string;
  };
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recentCities, setRecentCities] = useState<RecentCity[]>([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        // Busca as estatísticas e as cidades em paralelo
        const statsPromise = geoAPI.getDashboardStats();
        const citiesPromise = geoAPI.getCities({}); 

        const [statsResponse, citiesResponse] = await Promise.all([
          statsPromise,
          citiesPromise,
        ]);

        setStats(statsResponse.data);
        
        // Pega as 5 primeiras cidades da lista para a tabela
        setRecentCities(citiesResponse.data.slice(0, 5));

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  return (
    <div className="page-container">
      <div className="stats-cards">
        <div className="card">
          <h3>Total de Continentes</h3>
          <p>{loading ? '...' : stats?.totalContinents.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total de Países</h3>
          <p>{loading ? '...' : stats?.totalCountries.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total de Cidades</h3>
          <p>{loading ? '...' : stats?.totalCities.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Status da API</h3>
          <p className="status-operational">
            <span className="status-dot"></span>
            {loading ? '...' : stats?.apiStatus}
          </p>
        </div>
      </div>

      <div className="map-container">
        <DynamicMap center={[20, 0]} zoom={2} style={{ height: '400px' }} />
      </div>

      <div className="table-container">
        <h2>Cidades Adicionadas Recentemente</h2>
        <table>
          <thead>
            <tr>
              <th>Cidade</th>
              <th>País</th>
              <th>População</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>Carregando...</td></tr>
            )}
            {!loading && recentCities.length === 0 && (
              <tr><td colSpan={4} style={{ textAlign: 'center' }}>Nenhuma cidade cadastrada.</td></tr>
            )}
            
            {recentCities.map((city) => (
              <tr key={city.id}>
                <td><strong>{city.name}</strong></td>
                <td>{city.country?.name || 'N/A'}</td>
                <td>{Number(city.population).toLocaleString()}</td>
                <td><span className="status status-synced">Synced</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;