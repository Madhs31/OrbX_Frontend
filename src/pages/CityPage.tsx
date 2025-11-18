import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { geoAPI } from '../services/api'; 
import DynamicMap from '../components/Services/DynamicMap'; 

interface CityData {
  id: number;
  name: string;
  population: string;
  latitude: number;
  longitude: number;
  country: {
    id: number;
    name: string;
    continent: { 
        id: number;
        name: string; 
    };
  };
  area?: string;
  timezone?: string;
  language?: string;
  imageUrl?: string; 
}

interface WeatherData {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    description: string;
    main: string;
  }[];
}

const CityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const defaultImageUrl = "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop";

  const [heroImageUrl, setHeroImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const loadCityData = async () => {
        try {
          setLoading(true);
          const cityResponse = await geoAPI.getCity(id);
          const data: CityData = cityResponse.data;
          setCityData(data);

          try {
            const query = `${data.name} ${data.country.name} landscape`;
            const pexelsResponse = await geoAPI.getImageForQuery(query);
            
            if (pexelsResponse.data?.src?.landscape) {
              setHeroImageUrl(pexelsResponse.data.src.landscape); 
            } else {
              setHeroImageUrl(data.imageUrl || defaultImageUrl); 
            }
          } catch (imgError) {
            console.warn("Pexels API falhou, usando imagem do banco ou fallback.", imgError);
            setHeroImageUrl(data.imageUrl || defaultImageUrl); 
          }

          if (data.latitude && data.longitude) {
            const weatherResponse = await geoAPI.getWeather(data.latitude, data.longitude);
            setWeatherData(weatherResponse.data);
          }
        } catch (error) {
          console.error("Erro ao buscar dados da cidade", error);
        } finally {
          setLoading(false);
        }
      };
      loadCityData();
    } else {
      setLoading(false);
    }
  }, [id]);

  if (loading || !cityData) {
    return <div className="page-container" style={{padding: '2rem'}}>Carregando...</div>;
  }
  
  const weatherTemp = weatherData ? `${Math.round(weatherData.main.temp)}°C` : '...';
  const weatherDesc = weatherData ? weatherData.weather[0].description : '...';
  const weatherFeels = weatherData ? Math.round(weatherData.main.feels_like) : '...';

  return (
    <div className="page-container">
       <div className="breadcrumbs">
        Home <span>/</span> {cityData.country.continent.name} <span>/</span> {cityData.country.name} <span>/</span> <span className="current">{cityData.name}</span>
      </div>

      <div 
        className="city-hero" 
        style={{ 
          backgroundImage: `url(${heroImageUrl || ''})`,
          backgroundColor: '#333' 
        }}
      >
        <div className="city-hero-content">
          <h1>{cityData.name}</h1>
          <span>{cityData.country.name}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '2rem', marginBottom: '2rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
        <span style={{ color: 'var(--primary-accent)', fontWeight: '600', borderBottom: '2px solid var(--primary-accent)', paddingBottom: '1rem', marginBottom: '-1.1rem' }}>Overview</span>
      </div>
      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Overview</h2>
      <div className="city-stats-grid">
        <div className="stat-box">
          <div className="stat-box-header">👥 Population</div>
          <div className="stat-box-value">{Number(cityData.population).toLocaleString()}</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-header">📐 Area</div>
          <div className="stat-box-value">{cityData.area ? Number(cityData.area).toLocaleString() : 'N/A'}</div>
          {cityData.area && <div className="stat-box-sub">km²</div>}
        </div>
        <div className="stat-box">
          <div className="stat-box-header">⛅ Current Weather</div>
          <div className="stat-box-value">{weatherTemp}</div>
          <div className="stat-box-sub" style={{ textTransform: 'capitalize' }}>
             {weatherDesc} <br/> Feels like {weatherFeels}°C
          </div>
        </div>
        <div className="stat-box">
          <div className="stat-box-header">🕒 Timezone</div>
          <div className="stat-box-value">{cityData.timezone || 'N/A'}</div>
        </div>
        <div className="stat-box">
          <div className="stat-box-header">🗣️ Language</div>
          <div className="stat-box-value">{cityData.language || 'N/A'}</div>
        </div>
      </div>

      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Location</h2>
      <div className="map-container" style={{ height: 'auto', minHeight: 'auto', marginTop: '0' }}>

        <DynamicMap 
            center={[cityData.latitude, cityData.longitude]}
            zoom={13}
            markerText={cityData.name}
        />
      </div>
    </div>
  );
};

export default CityPage;