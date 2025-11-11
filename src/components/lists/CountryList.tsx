import React from 'react';
import type { Country } from '../../types';

interface Props {
  countries: Country[];
  onEdit: (country: Country) => void;
  onDelete: (id: number) => void;
}

const CountryList: React.FC<Props> = ({ countries, onEdit, onDelete }) => {
  return (
    <div className="list-container">
      <h2>Países Cadastrados ({countries.length})</h2>
      
      {countries.length === 0 ? (
        <p>Nenhum país cadastrado.</p>
      ) : (
        <div className="list">
          {countries.map(country => (
            <div key={country.id} className="list-item">
              <div className="item-info">
                <h3>{country.name}</h3>
                <p><strong>População:</strong> {country.population.toLocaleString()}</p>
                <p><strong>Idioma:</strong> {country.official_language}</p>
                <p><strong>Moeda:</strong> {country.currency}</p>
                <p><strong>Continente ID:</strong> {country.continent_id}</p>
              </div>
              
              <div className="item-actions">
                <button 
                  onClick={() => onEdit(country)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(country.id)}
                  className="btn-delete"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CountryList;