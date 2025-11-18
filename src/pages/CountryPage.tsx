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
          let countryData = response.data; 
          
          if (countryData.name) {
              try {
                  const extRes = await geoAPI.getExternalCountryInfo(countryData.name);
                  setExternalData(extRes.data);
              } catch (extErr) {
                  console.warn("Não foi possível carregar dados externos do RestCountries", extErr);
              }
              
              if (!countryData.imageUrl) {
                   try {
                      const imageRes = await geoAPI.getImageForQuery(countryData.name);
                      
                      const newImageUrl = imageRes.data?.src?.landscape || imageRes.data?.src?.large;
                      
                      if (newImageUrl) {
                          countryData = { ...countryData, imageUrl: newImageUrl };
                      }
                  } catch (imageErr) {
                      console.warn("Não foi possível carregar imagem do Pexels", imageErr);
                  }
              }
          }
          
          setData(countryData);
          
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

  const flagSource = data.isoCode 
      ? `https://flagcdn.com/w320/${data.isoCode.toLowerCase()}.png` 
      : placeholderFlag;


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
          <img src={flagSource} alt={`Flag of ${data.name}`} style={{width: '80px', height: 'auto', borderRadius: '4px', marginBottom: '1rem', border: '1px solid #fff3'}} />
          <h1>{data.name}</h1>
          <p>{data.description || `Uma nação ${data.name} com capital em ${data.capital || 'desconhecida'}.`}</p>
        </div>
      </div>

      <div className="country-content-grid" style={{marginTop: '2rem'}}> 
        <aside className="details-sidebar">
          <h3>Country Details</h3>
          <div className="detail-item">
            <span className="detail-label">Cidade Capital</span>
            <span className="detail-value">{data.capital || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">População</span>
            <span className="detail-value">{formatPopulation(data.population)}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Continente/Região</span>
            <span className="detail-value">{data.continent.name}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Linguagem Oficial</span>
            <span className="detail-value">{data.language || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Moeda</span>
            <span className="detail-value">{data.currency || 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Área</span>
            <span className="detail-value">{data.area ? `${Number(data.area).toLocaleString()} km²` : 'N/A'}</span>
          </div>
          <div className="detail-item">
            <span className="detail-label">Código Postal</span>
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
            <h3>Cidades: {data.name}</h3>
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
              />
          </div>
      )}
      
    </div>
  );
};

export default CountryPage;