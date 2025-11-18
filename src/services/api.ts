import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const geoAPI = {
  // --- Continents ---
  getContinents: () => api.get('/api/continents'),
  getContinent: (id: number | string) => api.get(`/api/continents/${id}`),
  createContinent: (data: any) => api.post('/api/continents', data),
  deleteContinent: (id: number) => api.delete(`/api/continents/${id}`),

  // --- Countries ---
  getCountries: (continentId?: number) => { 
    const params = continentId ? { continent: continentId } : {};
    return api.get('/api/countries', { params });
  },
  getCountry: (id: number | string) => api.get(`/api/countries/${id}`),
  createCountry: (data: any) => api.post('/api/countries', data),
  deleteCountry: (id: number) => api.delete(`/api/countries/${id}`),

  // --- Cities ---
  getCities: (filter: { countryId?: number, continentId?: number }) => { 
    let params = {};
    if (filter.countryId) {
      params = { country: filter.countryId };
    } else if (filter.continentId) {
      params = { continent: filter.continentId };
    }
    return api.get('/api/cities', { params });
  },
  getCity: (id: number | string) => api.get(`/api/cities/${id}`),
  createCity: (data: any) => api.post('/api/cities', data),

  // --- Stats ---
  getDashboardStats: () => api.get('/api/stats/dashboard'),

  // --- External ---
  getWeather: (lat: number, lon: number) => { 
    return api.get(`/api/external/weather?lat=${lat}&lon=${lon}`);
  },
   
  // Para buscar dados extras (como coordenadas) do RestCountries
  getExternalCountryInfo: (name: string) => {
    return api.get(`/api/external/country/${encodeURIComponent(name)}`);
  },

  // Para buscar imagens do Pexels
  getImageForQuery: (query: string) => {
    return api.get(`/api/external/image?q=${encodeURIComponent(query)}`);
  }
};

// Exporta a instância padrão para usar no Login/Register
export default api;