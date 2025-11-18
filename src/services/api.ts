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
  updateContinent: (id: number, data: any) => api.put(`/api/continents/${id}`, data), 
  deleteContinent: (id: number) => api.delete(`/api/continents/${id}`),

  // --- Countries ---
  getCountries: (continentId?: number) => { 
    const params = continentId ? { continent: continentId } : {};
    return api.get('/api/countries', { params });
  },
  getCountry: (id: number | string) => api.get(`/api/countries/${id}`),
  createCountry: (data: any) => api.post('/api/countries', data),
  updateCountry: (id: number, data: any) => api.put(`/api/countries/${id}`, data), 
  deleteCountry: (id: number) => api.delete(`/api/countries/${id}`),

  // --- Cities ---
  getCities: (filter: { countryId?: number, continentId?: number }) => { 
    let params = {};
    if (filter.countryId) {
      params = { country: filter.countryId };
    } else if (filter.continentId) {
      params = { country: { continentId: filter.continentId } }; 
    }
    return api.get('/api/cities', { params });
  },
  getCity: (id: number | string) => api.get(`/api/cities/${id}`),
  createCity: (data: any) => api.post('/api/cities', data),
  updateCity: (id: number, data: any) => api.put(`/api/cities/${id}`, data), 
  deleteCity: (id: number) => api.delete(`/api/cities/${id}`), 

  getDashboardStats: () => api.get('/api/stats/dashboard'),

  getWeather: (lat: number, lon: number) => { 
    return api.get(`/api/external/weather?lat=${lat}&lon=${lon}`);
  },
   
  getExternalCountryInfo: (name: string) => {
    return api.get(`/api/external/country/${encodeURIComponent(name)}`);
  },

  getImageForQuery: (query: string) => {
    return api.get(`/api/external/image?q=${encodeURIComponent(query)}`);
  }
};

export default api;