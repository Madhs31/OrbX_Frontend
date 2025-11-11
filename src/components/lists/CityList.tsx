import React from 'react';
import type { City, Country } from '../../types';

interface Props {
  cities: City[];
  countries: Country[];
  onEdit: (city: City) => void;
  onDelete: (id: number) => void;
}

const CityList: React.FC<Props> = ({ cities, countries, onEdit, onDelete }) => {
  const getCountryName = (countryId: number) => {
    const country = countries.find(c => c.id === countryId);
    return country ? country.name : 'N/A';
  };

  return (
    <div className="list-container">
      <h2>Cidades Cadastradas ({cities.length})</h2>
      
      {cities.length === 0 ? (
        <p>Nenhuma cidade cadastrada.</p>
      ) : (
        <div className="list">
          {cities.map(city => (
            <div key={city.id} className="list-item">
              <div className="item-info">
                <h3>{city.name}</h3>
                <p><strong>População:</strong> {city.population.toLocaleString()}</p>
                <p><strong>Coordenadas:</strong> {city.latitude}, {city.longitude}</p>
                <p><strong>País:</strong> {getCountryName(city.country_id)}</p>
              </div>
              
              <div className="item-actions">
                <button 
                  onClick={() => onEdit(city)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(city.id)}
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

export default CityList;