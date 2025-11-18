import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { geoAPI } from '../services/api'; 

interface ContinentSummary {
  id: number;
  name: string;
}

const ContinentsListPage: React.FC = () => {
  const [continents, setContinents] = useState<ContinentSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await geoAPI.getContinents(); 
        setContinents(response.data);
      } catch (error) {
        console.error("Erro ao buscar a lista de continentes", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []); 

  if (loading) {
    return <div className="page-container" style={{padding: '2rem'}}>Carregando continentes...</div>;
  }

  return (
    <div className="page-container">
      <div className="breadcrumbs">
        <span>Home</span> / <span className="current">Mundo</span>
      </div>

      <div className="continent-header">
        <h1>Explorar Continentes</h1>
        <p className="continent-desc">
          Selecione um continente abaixo para ver mais detalhes, estatísticas e os países que o compõem.
        </p>
      </div>

      <div className="continent-list-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem', marginTop: '2rem' }}>
        
        {continents.map((continent) => (
          <Link 
            to={`/continents/${continent.id}`} 
            key={continent.id} 
            className="continent-card" 
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ border: '1px solid var(--border-light)', borderRadius: '8px', overflow: 'hidden', background: 'var(--bg-secondary)' }}>
              <div style={{ padding: '1rem' }}>
                <h3 style={{ margin: '0', color: 'var(--text-main)' }}>{continent.name}</h3>
                <span style={{ color: 'var(--primary-accent)', fontSize: '0.9rem', fontWeight: '500' }}>Ver detalhes ›</span>
              </div>
            </div>
          </Link>
        ))}

        {!loading && continents.length === 0 && (
          <p>Nenhum continente foi cadastrado ainda. Vá para a página de Admin para adicionar.</p>
        )}

      </div>
    </div>
  );
};

export default ContinentsListPage;