import React, { useState, useEffect } from 'react';
import type { City, Country, Continent } from '../types';
import { geoAPI } from '../services/api';
import CityForm from '../components/forms/CityForm';
import CityList from '../components/lists/CityList';

const CityPage: React.FC = () => {
  const [cities, setCities] = useState<City[]>([]);
  const [countries, setCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [filterCountry, setFilterCountry] = useState<number | ''>('');
  const [filterContinent, setFilterContinent] = useState<number | ''>('');

  useEffect(() => {
    loadCities();
    loadCountries();
    loadContinents();
  }, []);

  const loadCities = async () => {
    try {
      const response = await geoAPI.getCities();
      setCities(response.data);
    } catch (error) {
      console.error('Erro ao carregar cidades:', error);
    }
  };

  const loadCountries = async () => {
    try {
      const response = await geoAPI.getCountries();
      setCountries(response.data);
    } catch (error) {
      console.error('Erro ao carregar países:', error);
    }
  };

  const loadContinents = async () => {
    try {
      const response = await geoAPI.getContinents();
      setContinents(response.data);
    } catch (error) {
      console.error('Erro ao carregar continentes:', error);
    }
  };

  const handleSave = async (city: Omit<City, 'id'>) => {
    try {
      if (editingCity) {
        await geoAPI.updateCity(editingCity.id, city);
      } else {
        await geoAPI.createCity(city);
      }
      loadCities();
      setEditingCity(null);
    } catch (error) {
      console.error('Erro ao salvar cidade:', error);
    }
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
  };

  const handleDelete = async (id: number) => {
    try {
      await geoAPI.deleteCity(id);
      loadCities();
    } catch (error) {
      console.error('Erro ao deletar cidade:', error);
    }
  };

  const filteredCities = cities.filter(city => {
    const countryMatch = filterCountry ? city.country_id === Number(filterCountry) : true;
    const continentMatch = filterContinent 
      ? countries.find(country => country.id === city.country_id)?.continent_id === Number(filterContinent)
      : true;
    return countryMatch && continentMatch;
  });

  return (
    <div className="page">
      <h1>Gerenciar Cidades</h1>
      
      <div className="filters">
        <div className="form-group">
          <label>Filtrar por País:</label>
          <select 
            value={filterCountry} 
            onChange={(e) => setFilterCountry(e.target.value as number | '')}
          >
            <option value="">Todos os países</option>
            {countries.map(country => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Filtrar por Continente:</label>
          <select 
            value={filterContinent} 
            onChange={(e) => setFilterContinent(e.target.value as number | '')}
          >
            <option value="">Todos os continentes</option>
            {continents.map(continent => (
              <option key={continent.id} value={continent.id}>
                {continent.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="content-grid">
        <div className="form-section">
          <CityForm 
            city={editingCity}
            countries={countries}
            onSave={handleSave}
            onCancel={() => setEditingCity(null)}
          />
        </div>
        
        <div className="list-section">
          <CityList 
            cities={filteredCities}
            countries={countries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CityPage;