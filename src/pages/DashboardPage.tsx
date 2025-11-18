import React, { useState, useEffect } from 'react';
import { geoAPI } from '../services/api';
import DynamicMap from '../components/Services/DynamicMap'; 
import { Globe, Flag, Landmark} from 'lucide-react'; 
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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
  latitude: number;
  longitude: number;
  country: {
    name: string;
  };
}

interface ChartData {
    name: string;
    cities: number;
}

interface StatCardProps {
    title: string;
    value: string | number | undefined;
    loading: boolean;
    Icon: React.ElementType; 
}

const StatCard: React.FC<StatCardProps> = ({ title, value, loading, Icon }) => {
    
    let iconColor = 'var(--color-blue)';
    if (title.includes('Continentes')) iconColor = 'var(--color-orange)';
    if (title.includes('Países')) iconColor = 'var(--color-blue)';
    if (title.includes('Cidades')) iconColor = 'var(--color-green)';

    return (
        <div className="card stat-card-enhanced">
            <div className="card-header-flex">
                <h3 className="card-title-muted">{title}</h3>
                <div className="card-icon-wrapper" style={{color: iconColor, backgroundColor: iconColor.replace(')', ', 0.1)').replace('rgb', 'rgba')}}>
                    <Icon size={20} />
                </div>
            </div>
            <p className="card-value-large">
                {loading ? '...' : value}
            </p>
        </div>
    );
};

const CitiesByCountryChart: React.FC<{ data: ChartData[] }> = ({ data }) => {
    return (
        <div className="chart-box">
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data} layout="vertical" margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
                    <XAxis type="number" stroke="var(--text-muted)" />
                    <YAxis type="category" dataKey="name" stroke="var(--text-muted)" />
                    <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-element)', border: '1px solid var(--border-light)' }} 
                        formatter={(value: number) => [`${value.toLocaleString()} Cidades`, 'Total']}
                        labelStyle={{ color: 'var(--text-main)' }}
                    />
                    <Bar dataKey="cities" fill="var(--primary-accent)" radius={[10, 10, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [allCities, setAllCities] = useState<RecentCity[]>([]); 
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const loadDashboardData = async () => {
      setLoading(true);
      try {
        const statsPromise = geoAPI.getDashboardStats();
        const citiesPromise = geoAPI.getCities({}); 

        const [statsResponse, citiesResponse] = await Promise.all([
          statsPromise,
          citiesPromise,
        ]);

        setStats(statsResponse.data);
        setAllCities(citiesResponse.data);

      } catch (error) {
        console.error("Erro ao buscar dados do dashboard", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const getCitiesByCountryData = (): ChartData[] => {
    if (!allCities.length) return [];

    const countryCounts: { [key: string]: number } = {};
    allCities.forEach(city => {
        const countryName = city.country.name;
        countryCounts[countryName] = (countryCounts[countryName] || 0) + 1;
    });

    const dataArray = Object.keys(countryCounts).map(name => ({
        name,
        cities: countryCounts[name]
    }));

    return dataArray.sort((a, b) => b.cities - a.cities).slice(0, 5);
  };

  const chartData = getCitiesByCountryData();
  
  const filteredCities = allCities
    .filter(city => 
      city.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      city.country.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, 5); 

  return (
    <div className="page-container">
      
      <div className="stats-cards">
        <StatCard title="Total de Continentes" value={stats?.totalContinents.toLocaleString()} loading={loading} Icon={Globe} />
        <StatCard title="Total de Países" value={stats?.totalCountries.toLocaleString()} loading={loading} Icon={Flag} />
        <StatCard title="Total de Cidades" value={stats?.totalCities.toLocaleString()} loading={loading} Icon={Landmark} />
        
        <div className="card api-status-card">
          <h3 className="card-title-muted">Status da API</h3>
          <p className="status-operational">
            {loading ? (
              <span className="status-loading">...</span>
            ) : (
              <span className={`status-indicator ${stats?.apiStatus === 'Operational' ? 'online' : 'offline'}`}>
                <span className="status-dot"></span>
                <span>{stats?.apiStatus}</span>
              </span>
            )}
          </p>
          <p className="status-subtext">Pontos sincronizados: {stats?.dataPointsSynced.toLocaleString() || 'N/A'}</p>
        </div>
      </div>

      <div className="dashboard-grid-layout">
        
        <div className="map-panel-wrapper">
          <h2 className="panel-title">Visão Global das Cidades Cadastradas</h2>
          <DynamicMap 
            center={[20, 0]} 
            zoom={2} 
            style={{ height: '400px', borderRadius: '8px' }}
            markers={allCities}
          />
        </div>

        <div className="side-panel-wrapper">
            
            <div className="panel-content-box">
                <h3 className="panel-title-small">Top 5 Países por Cidades</h3>
                {loading ? (
                    <p className="panel-text-muted">Carregando dados do gráfico...</p>
                ) : (
                    <CitiesByCountryChart data={chartData} />
                )}
            </div>

            <div className="panel-content-box">
                <h3 className="panel-title-small">Ações Rápidas</h3>
                <button className="btn-primary-action full-width-btn">
                    + Adicionar Nova Cidade
                </button>
            </div>
        </div>
      </div>

      <div className="table-container">
        <h2>Cidades Adicionadas Recentemente</h2>
        
        <div className="search-box-wrapper">
          <input
            type="text"
            placeholder="Buscar por cidade ou país..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-dark"
          />
        </div>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cidade</th>
              <th>País</th>
              <th style={{textAlign: 'right'}}>População</th>
              <th style={{textAlign: 'center'}}>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Carregando...</td></tr>
            )}
            {!loading && filteredCities.length === 0 && (
              <tr><td colSpan={5} style={{ textAlign: 'center' }}>Nenhuma cidade encontrada.</td></tr>
            )}
            
            {filteredCities.map((city) => (
              <tr key={city.id}>
                <td className="text-muted-small">{city.id}</td>
                <td><strong>{city.name}</strong></td>
                <td>{city.country?.name || 'N/A'}</td>
                <td style={{textAlign: 'right'}}>{Number(city.population).toLocaleString()}</td>
                <td style={{textAlign: 'center'}}><span className="status status-synced">Synced</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;