import React, { useState, useEffect } from 'react';
import type { Continent } from '../types';
import { geoAPI } from '../services/api';
import ContinentForm from '../components/forms/ContinentForm'; // ✅ Importação adicionada
import ContinentList from '../components/lists/ContinentList';

const ContinentPage: React.FC = () => {
  const [continents, setContinents] = useState<Continent[]>([]);
  const [editingContinent, setEditingContinent] = useState<Continent | null>(null);

  useEffect(() => {
    loadContinents();
  }, []);

  const loadContinents = async () => {
    try {
      const response = await geoAPI.getContinents();
      setContinents(response.data);
    } catch (error) {
      console.error('Erro ao carregar continentes:', error);
    }
  };

  const handleSave = async (continent: Omit<Continent, 'id'>) => {
    try {
      if (editingContinent) {
        await geoAPI.updateContinent(editingContinent.id, continent);
      } else {
        await geoAPI.createContinent(continent);
      }
      loadContinents();
      setEditingContinent(null);
    } catch (error) {
      console.error('Erro ao salvar continente:', error);
    }
  };

  const handleEdit = (continent: Continent) => {
    setEditingContinent(continent);
  };

  const handleDelete = async (id: number) => {
    try {
      await geoAPI.deleteContinent(id);
      loadContinents();
    } catch (error) {
      console.error('Erro ao deletar continente:', error);
    }
  };

  return (
    <div className="page">
      <h1>Gerenciar Continentes</h1>
      
      <div className="content-grid">
        <div className="form-section">
          <ContinentForm 
            continent={editingContinent}
            onSave={handleSave}
            onCancel={() => setEditingContinent(null)}
          />
        </div>
        
        <div className="list-section">
          <ContinentList 
            continents={continents}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default ContinentPage;