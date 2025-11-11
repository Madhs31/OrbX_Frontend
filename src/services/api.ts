import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
});

export const geoAPI = {
  // Continentes
  getContinents: () => api.get('/continents'),
  createContinent: (data: any) => api.post('/continents', data),
  updateContinent: (id: number, data: any) => api.put(`/continents/${id}`, data),
  deleteContinent: (id: number) => api.delete(`/continents/${id}`),

  // Países
  getCountries: () => api.get('/countries'),
  getCountriesByContinent: (continentId: number) => api.get(`/countries?continent=${continentId}`),
  createCountry: (data: any) => api.post('/countries', data),
  updateCountry: (id: number, data: any) => api.put(`/countries/${id}`, data),
  deleteCountry: (id: number) => api.delete(`/countries/${id}`),

  // Cidades
  getCities: () => api.get('/cities'),
  getCitiesByCountry: (countryId: number) => api.get(`/cities?country=${countryId}`),
  createCity: (data: any) => api.post('/cities', data),
  updateCity: (id: number, data: any) => api.put(`/cities/${id}`, data),
  deleteCity: (id: number) => api.delete(`/cities/${id}`),
};

// APIs Externas
export const externalAPI = {
  getCountryInfo: (countryName: string) => 
    axios.get(`https://restcountries.com/v3.1/name/${countryName}`),
  
  getWeather: (lat: number, lon: number) =>
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=SUA_CHAVE&units=metric`),
};