import React, { useEffect, useState } from 'react';
import { geoAPI } from '../services/api';

// Interface definindo o formato que vem do Prisma/Backend
interface Country {
  id: number;
  name: string;
  isoCode: string;
  population: string;
  continent?: { name: string }; 
}

const AdminPanel: React.FC = () => {
  // Estados para gerenciar dados e carregamento
  const [data, setData] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);

  // Efeito que roda ao abrir a página: Busca dados
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await geoAPI.getCountries();
      setData(response.data); // Salva os dados do banco no estado
    } catch (error) {
      console.error("Erro ao buscar dados", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-content page-container">
      <div className="admin-header">
        <div className="header-title">
          <div className="brand-icon-small"></div>
          <h1>OrbX Admin Panel (Countries)</h1>
        </div>
        <div className="header-actions">
          <button className="btn-primary-action"><span className="plus-icon">+</span> Add New</button>
        </div>
      </div>

      <div className="stats-cards api-cards-grid">
         <div className="card api-card">
          <h3>Database Status</h3>
          <div className="status-indicator online"><span className="dot"></span> Connected</div>
        </div>
      </div>

      <div className="filters-bar">
      </div>

      <div className="table-container admin-table-wrapper">
        {loading ? (
          <p style={{ padding: '20px' }}>Carregando dados do servidor...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>ISO Code</th>
                <th>Continent</th>
                <th>Population</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.length === 0 && (
                <tr><td colSpan={6} style={{textAlign: 'center', padding: '20px'}}>Nenhum país encontrado no banco de dados.</td></tr>
              )}

              {data.map((row) => (
                <tr key={row.id}>
                  <td><strong>{row.name}</strong></td>
                  <td>
                    <span className="type-badge country">Country</span>
                  </td>
                  <td>{row.isoCode || '-'}</td>
                  <td>{row.continent?.name || '-'}</td>
                  <td>{Number(row.population).toLocaleString()}</td>
                  <td>
                    <div className="action-buttons">
                      <button className="btn-icon edit" title="Edit">✏️</button>
                      <button className="btn-icon delete" title="Delete">🗑️</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;