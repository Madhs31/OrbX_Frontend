import React from 'react';

// Dados Mockados para a Tabela (Baseado na imagem)
const mockData = [
  { id: 1, name: 'United States', type: 'Country', iso: 'USA', parent: '-', pop: '331,900,000' },
  { id: 2, name: 'New York City', type: 'City', iso: '-', parent: 'United States', pop: '8,468,000' },
  { id: 3, name: 'Canada', type: 'Country', iso: 'CAN', parent: '-', pop: '38,250,000' },
  { id: 4, name: 'Toronto', type: 'City', iso: '-', parent: 'Canada', pop: '2,930,000' },
  { id: 5, name: 'United Kingdom', type: 'Country', iso: 'GBR', parent: '-', pop: '67,330,000' },
];

const AdminPanel: React.FC = () => {
  return (
    <div className="dashboard-content page-container">
      {/* Header da Página */}
      <div className="admin-header">
        <div className="header-title">
          <div className="brand-icon-small"></div>
          <h1>OrbX Admin Panel</h1>
        </div>
        
        <div className="header-actions">
          <button className="btn-primary-action">
            <span className="plus-icon">+</span> Add New
          </button>
        </div>
      </div>

      {/* Cards de API Status */}
      <div className="stats-cards api-cards-grid">
        {/* Card 1 */}
        <div className="card api-card">
          <h3>GeoNames API</h3>
          <div className="status-indicator online">
            <span className="dot"></span> Online
          </div>
        </div>

        {/* Card 2 */}
        <div className="card api-card">
          <h3>Weather API</h3>
          <div className="status-indicator online">
            <span className="dot"></span> Online
          </div>
        </div>

        {/* Card 3 */}
        <div className="card api-card">
          <h3>Cities API</h3>
          <div className="status-indicator offline">
            <span className="dot"></span> Offline
          </div>
        </div>
      </div>

      {/* Barra de Filtros */}
      <div className="filters-bar">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search by country, city, code..." 
            className="filter-search-input"
          />
        </div>

        <div className="filter-selects">
          <select className="filter-select">
            <option>Type: All</option>
            <option>Country</option>
            <option>City</option>
          </select>

          <select className="filter-select">
            <option>Continent: All</option>
            <option>North America</option>
            <option>Europe</option>
          </select>

          <select className="filter-select">
            <option>Status: All</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

          <button className="btn-clear-filters">Clear Filters</button>
        </div>
      </div>

      {/* Tabela Principal */}
      <div className="table-container admin-table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>ISO Code</th>
              <th>Parent Country</th>
              <th>Population</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.name}</strong></td>
                <td>
                  <span className={`type-badge ${row.type.toLowerCase()}`}>{row.type}</span>
                </td>
                <td>{row.iso}</td>
                <td>{row.parent}</td>
                <td>{row.pop}</td>
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

        {/* Footer / Paginação */}
        <div className="table-footer">
          <span className="showing-text">Showing 1 to 5 of 42 entries</span>
          
          <div className="pagination">
            <button className="page-btn prev">‹</button>
            <button className="page-btn active">1</button>
            <button className="page-btn">2</button>
            <button className="page-btn">3</button>
            <span className="page-dots">...</span>
            <button className="page-btn">9</button>
            <button className="page-btn next">›</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;