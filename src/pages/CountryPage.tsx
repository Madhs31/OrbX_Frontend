import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { geoAPI } from '../services/api'; 
import DynamicMap from '../components/Services/DynamicMap'; 

interface City {
  id: number;
  name: string;
  population: string;
}

interface CountryData {
  id: number;
  name: string;
  description?: string;
  capital: string | null;      
  population: string;
  continent: { name: string };
  language?: string; 
  currency?: string;
  area?: string;     
  callingCode?: string;
  flagUrl: string | null;      
  isoCode: string | null;      
  cities: City[];
  imageUrl?: string; 
}

const CountryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [data, setData] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [externalData, setExternalData] = useState<any>(null); 
  const defaultImageUrl = "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop"; 
  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          setLoading(true);
          const response = await geoAPI.getCountry(id); 
          setData(response.data);
          
          if (response.data.name) {
              try {
                  const extRes = await geoAPI.getExternalCountryInfo(response.data.name);
                  setExternalData(extRes.data);
              } catch (extErr) {
                  console.warn("Não foi possível carregar dados externos do RestCountries", extErr);
              }
          }
        } catch (error) {
          console.error("Erro ao buscar dados do país", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading) {
    return <div className="page-container" style={{padding: '2rem'}}>Carregando...</div>;
  }

  if (!data) {
    return <div className="page-container" style={{padding: '2rem'}}>País não encontrado.</div>;
  }

  const formatPopulation = (pop: string) => Number(pop).toLocaleString();
  const placeholderFlag = "https://flagcdn.com/w320/un.png"; 

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        Home <span>/</span> Countries <span>/</span> <span className="current">{data.name}</span>
      </div>

      <div 
        className="city-hero" 
        style={{ backgroundImage: `url(${data.imageUrl || defaultImageUrl})` }}
      >
        <div className="city-hero-content">
          <img src={data.flagUrl || placeholderFlag} alt={`Flag of ${data.name}`} style={{width: '80px', height: 'auto', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #fff3'}} />
          <h1>{data.name}</h1>
          <p>{data.description || `Uma nação ${data.name} com capital em ${data.capital || 'desconhecida'}.`}</p>
        </div>
      </div>

      <div className="country-content-grid" style={{marginTop: '2rem'}}> 
        <aside className="details-sidebar">
          <h3>Country Details</h3>
          <div className="detail-item">
            <span className="detail-label">Capital City</span>
            <span className="detail-value">{data.capital || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Population</span>
            <span className="detail-value">{formatPopulation(data.population)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Continent/Region</span>
            <span className="detail-value">{data.continent.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Official Language(s)</span>
            <span className="detail-value">{data.language || 'N/A'}</span>
          </div>
           <div className="detail-item">
            <span className="detail-label">Currency</span>
            <span className="detail-value">{data.currency || 'N/A'}</span>
          </div>
           <div className="detail-item">
            <span className="detail-label">Area</span>
            <span className="detail-value">{data.area ? `${Number(data.area).toLocaleString()} km²` : 'N/A'}</span>
          </div>
           <div className="detail-item">
            <span className="detail-label">Calling Code</span>
            <span className="detail-value">{data.callingCode || 'N/A'}</span>
          </div>
          
          {externalData?.subregion && (
              <div className="detail-item">
                  <span className="detail-label">Sub-região</span>
                  <span className="detail-value">{externalData.subregion}</span>
              </div>
          )}
          {externalData?.borders?.length > 0 && (
              <div className="detail-item">
                  <span className="detail-label">Fronteiras</span>
                  <span className="detail-value">{externalData.borders.join(', ')}</span>
              </div>
          )}
        </aside>

        <main className="cities-list-container">
          <div className="list-header-row">
            <h3>Cities in {data.name}</h3>
            <div className="dash-search" style={{ width: '250px' }}>
               <span className="search-icon">🔍</span>
               <input type="text" placeholder="Search for a city..." />
            </div>
          </div>

          <div className="cities-list">
            {data.cities.map((city) => (
              <Link to={`/cities/${city.id}`} key={city.id} className="city-list-item" style={{ textDecoration: 'none' }}>
                <div>
                  <div style={{ fontWeight: '600', color: 'var(--text-main)' }}>{city.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Population: {formatPopulation(city.population)}
                  </div>
                </div>
                <div style={{ color: 'var(--text-muted)' }}>›</div>
              </Link>
            ))}
             {data.cities.length === 0 && (
                <div className="city-list-item">Nenhuma cidade cadastrada.</div>
             )}
          </div>
        </main>
      </div> 

      {externalData?.latlng && (
          <div style={{ marginTop: '2rem' }}>
              <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Localização no Mapa</h2>
              <DynamicMap 
                  center={[externalData.latlng[0], externalData.latlng[1]]}
                  zoom={5} 
                  markerText={data?.capital || data?.name}
              />
          </div>
      )}
      
    </div>
  );
};

export default CountryPage;