import React from 'react';
import type { Continent } from '../../types'; // Adicione 'type' antes da importação

interface Props {
  continents: Continent[];
  onEdit: (continent: Continent) => void;
  onDelete: (id: number) => void;
}

const ContinentList: React.FC<Props> = ({ continents, onEdit, onDelete }) => {
  return (
    <div className="list-container">
      <h2>Continentes Cadastrados</h2>
      
      {continents.length === 0 ? (
        <p>Nenhum continente cadastrado.</p>
      ) : (
        <div className="list">
          {continents.map(continent => (
            <div key={continent.id} className="list-item">
              <div className="item-info">
                <h3>{continent.name}</h3>
                <p>{continent.description}</p>
              </div>
              
              <div className="item-actions">
                <button 
                  onClick={() => onEdit(continent)}
                  className="btn-edit"
                >
                  Editar
                </button>
                <button 
                  onClick={() => onDelete(continent.id)}
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

export default ContinentList;