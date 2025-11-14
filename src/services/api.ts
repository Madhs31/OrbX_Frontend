import axios from 'axios';

// 1. Configura a URL base para a porta do seu Backend (3001)
const api = axios.create({
  baseURL: 'http://localhost:3001', 
});

// 2. INTERCEPTOR: Antes de cada requisição, verifica se tem token e anexa no cabeçalho
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const geoAPI = {
  // Continentes
  getContinents: () => api.get('/api/continents'),
  createContinent: (data: any) => api.post('/api/continents', data),
  deleteContinent: (id: number) => api.delete(`/api/continents/${id}`),

  // Países
  getCountries: (continentId?: number) => { 
    // Se tiver ID, filtra, senão traz todos
    return continentId 
      ? api.get(`/api/countries?continent=${continentId}`) 
      : api.get('/api/countries');
  },
  createCountry: (data: any) => api.post('/api/countries', data),
  deleteCountry: (id: number) => api.delete(`/api/countries/${id}`), // Rota que precisamos garantir no back

  // Cidades
  getCities: (filterId?: number, filterType?: 'country' | 'continent') => { 
    if (filterType === 'country' && filterId) {
      return api.get(`/api/cities?country=${filterId}`);
    }
    return api.get('/api/cities');
  },
  createCity: (data: any) => api.post('/api/cities', data),
};

// Exporta a instância padrão para usar no Login/Register
export default api;