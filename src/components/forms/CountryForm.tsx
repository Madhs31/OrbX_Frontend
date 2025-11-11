import React, { useState, useEffect } from 'react';
import type { Country, Continent } from '../../types';

interface Props {
  country?: Country | null;
  continents: Continent[];
  onSave: (country: Omit<Country, 'id'>) => void;
  onCancel: () => void;
}

const CountryForm: React.FC<Props> = ({ country, continents, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [population, setPopulation] = useState('');
  const [officialLanguage, setOfficialLanguage] = useState('');
  const [currency, setCurrency] = useState('');
  const [continentId, setContinentId] = useState('');

  useEffect(() => {
    if (country) {
      setName(country.name);
      setPopulation(country.population.toString());
      setOfficialLanguage(country.official_language);
      setCurrency(country.currency);
      setContinentId(country.continent_id.toString());
    } else {
      setName('');
      setPopulation('');
      setOfficialLanguage('');
      setCurrency('');
      setContinentId('');
    }
  }, [country]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      population: parseInt(population),
      official_language: officialLanguage,
      currency,
      continent_id: parseInt(continentId)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{country ? 'Editar' : 'Novo'} País</h2>
      
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
        <label>Idioma Oficial:</label>
        <input
          type="text"
          value={officialLanguage}
          onChange={(e) => setOfficialLanguage(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Moeda:</label>
        <input
          type="text"
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          required
        />
      </div>

      <div className="form-group">
        <label>Continente:</label>
        <select
          value={continentId}
          onChange={(e) => setContinentId(e.target.value)}
          required
        >
          <option value="">Selecione um continente</option>
          {continents.map(continent => (
            <option key={continent.id} value={continent.id}>
              {continent.name}
            </option>
          ))}
        </select>
      </div>

      <div className="form-actions">
        <button type="submit">
          {country ? 'Atualizar' : 'Criar'}
        </button>
        {country && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default CountryForm;