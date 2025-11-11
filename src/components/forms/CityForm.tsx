import React, { useState, useEffect } from 'react';
import type { City, Country } from '../../types';

interface Props {
  city?: City | null;
  countries: Country[];
  onSave: (city: Omit<City, 'id'>) => void;
  onCancel: () => void;
}

const CityForm: React.FC<Props> = ({ city, countries, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [population, setPopulation] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [countryId, setCountryId] = useState('');

  useEffect(() => {
    if (city) {
      setName(city.name);
      setPopulation(city.population.toString());
      setLatitude(city.latitude.toString());
      setLongitude(city.longitude.toString());
      setCountryId(city.country_id.toString());
    } else {
      setName('');
      setPopulation('');
      setLatitude('');
      setLongitude('');
      setCountryId('');
    }
  }, [city]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      population: parseInt(population),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      country_id: parseInt(countryId)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{city ? 'Editar' : 'Nova'} Cidade</h2>
      
      <div className="form-group">
        <label>Nome:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>População:</label>
        <input
          type="number"
          value={population}
          onChange={(e) => setPopulation(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Latitude:</label>
        <input
          type="number"
          step="any"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Longitude:</label>
        <input
          type="number"
          step="any"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>País:</label>
        <select
          value={countryId}
          onChange={(e) => setCountryId(e.target.value)}
          required
        >
          <option value="">Selecione um país</option>
          {countries.map(country => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">
          {city ? 'Atualizar' : 'Criar'}
        </button>
        {city && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default CityForm;