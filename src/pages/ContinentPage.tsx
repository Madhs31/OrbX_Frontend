import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { geoAPI } from '../services/api'; 
import DynamicMap from '../components/Services/DynamicMap'; 

interface Country {
  id: number;
  name: string;
  capital: string | null; 
  isoCode: string | null; 
}

interface ContinentData {
  id: number;
  name: string;
  description?: string; 
  area: number; 
  population: string; 
  countries: Country[];
  imageUrl?: string;    
  latitude?: number;    
  longitude?: number;   
}

const ContinentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [data, setData] = useState<ContinentData | null>(null);
  const [loading, setLoading] = useState(true);
  const defaultContinentUrl = "https://images.unsplash.com/photo-1543162312-44e05a77038a?q=80&w=2070&auto.format&fit=crop";

  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          setLoading(true);
          const response = await geoAPI.getContinent(id); 
          const data: ContinentData = response.data;
          setData(data);

          try {
            const query = `${data.name} continent landscape`; // Query de busca
            const pexelsResponse = await geoAPI.getImageForQuery(query);
            
            if (pexelsResponse.data?.src?.landscape) {
              setHeroImageUrl(pexelsResponse.data.src.landscape); 
            } else {
              setHeroImageUrl(data.imageUrl || defaultContinentUrl); 
            }
          } catch (imgError) {
            console.warn("Pexels API falhou, usando imagem do banco ou fallback.", imgError);
            setHeroImageUrl(data.imageUrl || defaultContinentUrl); 
          }

        } catch (error) {
          console.error("Erro ao buscar dados do continente", error);
        } finally {
          setLoading(false);
        }
      };
      loadData();
    } else {
      setLoading(false);
    }
  }, [id]); 

  if (loading || !data) {
    return <div className="page-container" style={{padding: '2rem'}}>Carregando...</div>;
  }

  const formatPopulation = (pop: string) => {
    const num = Number(pop);
    if (!num) return '0'; 
    if (num > 1_000_000_000) return `${(num / 1_000_000_000).toFixed(1)} B`;
    if (num > 1_000_000) return `${(num / 1_000_000).toFixed(1)} M`;
    return num.toLocaleString();
  };

  const placeholderFlag = "https://flagcdn.com/w80/un.png";

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        <span>Home</span> / <span>Continents</span> / <span className="current">{data.name}</span>
      </div>

      <div 
        className="city-hero" 
        style={{ 
          backgroundImage: `url(${heroImageUrl || ''})`,
          backgroundColor: '#333' 
        }}
      >
        <div className="city-hero-content">
          <h1>{data.name}</h1>
          <p className="continent-desc" style={{color: 'white', opacity: 0.9, mixBlendMode: 'difference'}}>
            {data.description || `Um continente com uma história rica e diversidade cultural.`}
          </p>
        </div>
      </div>

      <div className="continent-content-grid" style={{marginTop: '2rem'}}>
        <div className="left-column">
          <div className="stats-grid-2x2">
            <div className="stat-card-dark">
              <h3>Total Countries</h3>
              <p>{data.countries?.length || 0}</p>
            </div>
            <div className="stat-card-dark">
              <h3>Total Population</h3>
              <p>{formatPopulation(data.population)}</p>
            </div>
            <div className="stat-card-dark">
              <h3>Total Area (M km²)</h3>
              <p>{Number(data.area).toLocaleString() || 0} M</p>
            </div>
            <div className="stat-card-dark">
              <h3>Maior País (Exemplo)</h3> 
              <p>{data.countries?.[0]?.name || 'N/A'}</p> 
            </div>
          </div>

          <div className="continent-map-container" style={{marginTop: '1.5rem'}}>
            <h2 style={{marginBottom: '1rem', fontSize: '1.2rem'}}>Localização Central</h2>
            
            {(data.latitude && data.longitude) ? (
              <DynamicMap 
                center={[data.latitude, data.longitude]}
                zoom={3} 
                markerText={data.name}
              />
            ) : (
              <div className="map-placeholder-blue">
                (Mapa não disponível. Adicione lat/lon no Admin.)
              </div>
            )}
            
          </div>
        </div>

        <div className="right-column">
          <h2>Countries in {data.name}</h2>
           
          <div className="countries-list">
            {data.countries && data.countries.map((country) => (
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
                <div className="chevron-icon">›</div>
              </Link>
            ))}
            
            {data.countries.length === 0 && (
              <p style={{padding: '1rem', color: 'var(--text-muted)'}}>Nenhum país cadastrado para este continente.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContinentPage;