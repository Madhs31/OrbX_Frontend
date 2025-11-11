import React, { useState, useEffect } from 'react';
import type { Country, Continent } from '../types';
import { geoAPI } from '../services/api';
import CountryForm from '../components/forms/CountryForm';
import CountryList from '../components/lists/CountryList';

const CountryPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [continents, setContinents] = useState<Continent[]>([]);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [filterContinent, setFilterContinent] = useState<number | ''>('');

  useEffect(() => {
    loadCountries();
    loadContinents();
  }, []);

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

  const handleSave = async (country: Omit<Country, 'id'>) => {
    try {
      if (editingCountry) {
        await geoAPI.updateCountry(editingCountry.id, country);
      } else {
        await geoAPI.createCountry(country);
      }
      loadCountries();
      setEditingCountry(null);
    } catch (error) {
      console.error('Erro ao salvar país:', error);
    }
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
  };

  const handleDelete = async (id: number) => {
    try {
      await geoAPI.deleteCountry(id);
      loadCountries();
    } catch (error) {
      console.error('Erro ao deletar país:', error);
    }
  };

  const filteredCountries = filterContinent 
    ? countries.filter(country => country.continent_id === Number(filterContinent))
    : countries;

  return (
    <div className="page">
      <h1>Gerenciar Países</h1>
      
      <div className="filters">
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
          <CountryForm 
            country={editingCountry}
            continents={continents}
            onSave={handleSave}
            onCancel={() => setEditingCountry(null)}
          />
        </div>
        
        <div className="list-section">
          <CountryList 
            countries={filteredCountries}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default CountryPage;