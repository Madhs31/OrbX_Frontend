import React, { useState, useEffect } from 'react';
import type { Continent } from '../../types'; // Adicione 'type' antes da importação

interface Props {
  continent?: Continent | null;
  onSave: (continent: Omit<Continent, 'id'>) => void;
  onCancel: () => void;
}

const ContinentForm: React.FC<Props> = ({ continent, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (continent) {
      setName(continent.name);
      setDescription(continent.description);
    } else {
      setName('');
      setDescription('');
    }
  }, [continent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h2>{continent ? 'Editar' : 'Novo'} Continente</h2>
      
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
        <label>Descrição:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="form-actions">
        <button type="submit">
          {continent ? 'Atualizar' : 'Criar'}
        </button>
        {continent && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default ContinentForm;