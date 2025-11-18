import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { geoAPI } from '../services/api'; 

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

  const getSpecificQuery = (continentName: string): string[] => {
    switch (continentName.toLowerCase()) {
      case 'américa do sul':
      case 'south america':
        return ['Andes mountains', 'Amazon rainforest', 'South America landscape'];
      case 'américa do norte':
      case 'north america':
        return ['Grand Canyon', 'North America nature', 'North America cities'];
      case 'ásia':
      case 'asia':
        return ['Great Wall of China', 'Himalayas', 'Asian temples', 'Asia landscape'];
      case 'europa':
      case 'europe':
        return ['European capital city', 'Alps mountains', 'Europe landscape'];
      case 'áfrica':
      case 'africa':
        return ['Serengeti safari', 'Sahara desert', 'African savannah'];
      case 'oceania':
      case 'australia':
        return ['Great Barrier Reef', 'Sydney Opera House', 'Oceania landscape'];
      default:
        return [`${continentName} landscape`];
    }
  };

  useEffect(() => {
    if (id) {
      const loadData = async () => {
        try {
          setLoading(true);
          const response = await geoAPI.getContinent(id); 
          const data: ContinentData = response.data;
          
          const sanitizedCountries = data.countries.map(c => ({
            ...c,
          }));

          setData({ ...data, countries: sanitizedCountries });

          let foundImageUrl: string | null = null;
          const queries = getSpecificQuery(data.name);

          for (const query of queries) {
            try {
              const pexelsResponse = await geoAPI.getImageForQuery(query);
              if (pexelsResponse.data?.src?.landscape) {
                foundImageUrl = pexelsResponse.data.src.landscape;
                break; 
              }
            } catch (imgError) {
              console.warn(`Pexels API falhou para a query "${query}"`);
            }
          }
          
          // Define a URL final
          setHeroImageUrl(foundImageUrl || data.imageUrl || defaultContinentUrl); 

          if (!foundImageUrl) {
             console.warn("Nenhuma imagem relevante encontrada no Pexels. Usando imagem do banco ou fallback.");
          }


        } catch (error) {
          console.error("Erro ao buscar dados do continente", error);
          setHeroImageUrl(data?.imageUrl || defaultContinentUrl);
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
              <h3>Total de Paises</h3>
              <p>{data.countries?.length || 0}</p>
            </div>
            <div className="stat-card-dark">
              <h3>População Total</h3>
              <p>{formatPopulation(data.population)}</p>
            </div>
            <div className="stat-card-dark">
              <h3>Área Total (M km²)</h3>
              <p>{Number(data.area).toLocaleString() || 0} M</p>
            </div>
            <div className="stat-card-dark">
              <h3>Maior País (Exemplo)</h3> 
              <p>{data.countries?.[0]?.name || 'N/A'}</p> 
            </div>
          </div>
        </div>

        <div className="right-column">
          <h2>Países na {data.name}</h2>
           
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