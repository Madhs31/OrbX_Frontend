import React, { useEffect, useState } from 'react';
import { geoAPI } from '../services/api';

interface Continent {
  id: number;
  name: string;
  area?: string;
  population?: string;
  imageUrl?: string; 
}

interface Country {
  id: number;
  name: string;
  isoCode: string;
  population: string;
  continent?: { name: string }; 
  capital: string;
  flagUrl: string;
  continentId: number;
  description: string;
  language: string;
  currency: string;
  area: string;
  callingCode: string;
  imageUrl?: string; 
}

interface City {
  id: number;
  name: string;
  population: string;
  country?: { name: string };
  latitude: string;
  longitude: string;
  countryId: number;
  area: string;
  timezone: string;
  language: string;
  imageUrl: string;
}

interface ContinentFormData {
  name: string;
  area: string;
  population: string;
  imageUrl: string; 
}

interface CountryFormData {
  name: string;
  capital: string;
  isoCode: string;
  population: string;
  flagUrl: string;
  continentId: string;
  description: string;
  language: string;
  currency: string;
  area: string;
  callingCode: string;
  imageUrl: string; 
}

interface CityFormData {
  name: string;
  latitude: string;
  longitude: string;
  population: string;
  countryId: string;
  area: string;
  timezone: string;
  language: string;
  imageUrl: string;
}

type AdminView = 'continents' | 'countries' | 'cities';

/* ================== COMPONENTE ================== */
const AdminPanel: React.FC = () => {
  // --- Estados de Controle ---
  const [currentView, setCurrentView] = useState<AdminView>('countries');
  const [loading, setLoading] = useState(true);
  const [formError, setFormError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false); // NOVO: Modo de edição

  // --- Estados de Dados ---
  const [data, setData] = useState<(Continent | Country | City)[]>([]); 
  const [continentsList, setContinentsList] = useState<Continent[]>([]); 
  const [countriesList, setCountriesList] = useState<Country[]>([]); 
  const [currentItemId, setCurrentItemId] = useState<number | null>(null); // NOVO: ID do item editado

  // --- Estados de Modal ---
  const [isContinentModalOpen, setIsContinentModalOpen] = useState(false);
  const [isCountryModalOpen, setIsCountryModalOpen] = useState(false);
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);

  // --- Estados de Formulário ---
  const initialContinentFormData: ContinentFormData = {
    name: '', area: '', population: '', imageUrl: ''
  };
  const initialCountryFormData: CountryFormData = {
    name: '', capital: '', isoCode: '', population: '', flagUrl: '', continentId: '',
    description: '', language: '', currency: '', area: '', callingCode: '', imageUrl: ''
  };
  const initialCityFormData: CityFormData = {
    name: '', latitude: '', longitude: '', population: '', countryId: '',
    area: '', timezone: '', language: '', imageUrl: ''
  };

  const [continentFormData, setContinentFormData] = useState<ContinentFormData>(initialContinentFormData);
  const [countryFormData, setCountryFormData] = useState<CountryFormData>(initialCountryFormData);
  const [cityFormData, setCityFormData] = useState<CityFormData>(initialCityFormData);

  /* ================== CARREGAMENTO DE DADOS ================== */
  
  useEffect(() => {
    loadData();
  }, [currentView]);

  useEffect(() => {
    loadDropdownData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      let response;
      if (currentView === 'continents') {
        response = await geoAPI.getContinents();
      } else if (currentView === 'countries') {
        response = await geoAPI.getCountries();
      } else {
        response = await geoAPI.getCities({}); 
      }
      const sanitizedData = response.data.map((item: any) => ({
        ...item,
        population: String(item.population || 0),
        area: String(item.area || 0)
      }));
      setData(sanitizedData);
    } catch (error) {
      console.error(`Erro ao buscar ${currentView}`, error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  const loadDropdownData = async () => {
    try {
      const continentsRes = await geoAPI.getContinents();
      setContinentsList(continentsRes.data.map((c: any) => ({ ...c, population: String(c.population) })));
      const countriesRes = await geoAPI.getCountries();
      setCountriesList(countriesRes.data.map((c: any) => ({ ...c, population: String(c.population) })));
    } catch (error) {
      console.error("Erro ao buscar dados para formulários", error);
    }
  };

  /* ================== HANDLERS DE MODAL/EDIÇÃO ================== */

  const handleOpenModal = (item: Continent | Country | City | null = null) => {
    setFormError(null);
    setCurrentItemId(item ? item.id : null);
    setIsEditing(!!item);

    if (currentView === 'continents') {
        const continentData = item ? { 
            ...(item as Continent), 
            population: String((item as Continent).population || ''),
            area: String((item as Continent).area || '')
        } : initialContinentFormData;
        setContinentFormData(continentData as ContinentFormData);
        setIsContinentModalOpen(true);
    } else if (currentView === 'countries') {

        const countryItem = item as Country;
        const countryData = item ? { 
            ...countryItem, 
            continentId: String(countryItem.continentId),
            population: String(countryItem.population),
            area: String(countryItem.area || '')
        } : initialCountryFormData;
        setCountryFormData(countryData as CountryFormData);
        setIsCountryModalOpen(true);
    } else if (currentView === 'cities') {

        const cityItem = item as City;
        const cityData = item ? { 
            ...cityItem, 
            countryId: String(cityItem.countryId),
            population: String(cityItem.population),
            area: String(cityItem.area || ''),
            latitude: String(cityItem.latitude || ''),
            longitude: String(cityItem.longitude || ''),
        } : initialCityFormData;
        setCityFormData(cityData as CityFormData);
        setIsCityModalOpen(true);
    }
  };


  const handleCloseModals = () => {
    setIsContinentModalOpen(false);
    setIsCountryModalOpen(false);
    setIsCityModalOpen(false);
    setIsEditing(false);
    setCurrentItemId(null);
    setContinentFormData(initialContinentFormData);
    setCountryFormData(initialCountryFormData);
    setCityFormData(initialCityFormData);
  };

  /* ================== HANDLERS DE SUBMISSÃO ================== */
  
  // --- Handlers Continente ---
  const handleContinentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setContinentFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleContinentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!continentFormData.name) {
      setFormError('Nome é obrigatório.'); return;
    }
    try {
      if (isEditing && currentItemId) {
        await geoAPI.updateContinent(currentItemId, continentFormData);
      } else {
        await geoAPI.createContinent(continentFormData);
      }
      handleCloseModals();
      loadData(); 
      loadDropdownData(); 
    } catch (error: any) {
      setFormError(error.response?.data?.error || `Erro ao ${isEditing ? 'atualizar' : 'salvar'}.`);
    }
  };

  // --- Handlers País ---
  const handleCountryInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCountryFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCountrySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!countryFormData.name || !countryFormData.continentId || !countryFormData.isoCode) {
      setFormError('Nome, Código ISO e Continente são obrigatórios.'); return;
    }
    try {
      if (isEditing && currentItemId) {
        await geoAPI.updateCountry(currentItemId, countryFormData);
      } else {
        await geoAPI.createCountry(countryFormData);
      }
      handleCloseModals();
      loadData(); 
      loadDropdownData();
    } catch (error: any) {
      setFormError(error.response?.data?.error || `Erro ao ${isEditing ? 'atualizar' : 'salvar'}.`);
    }
  };

  // --- Handlers Cidade ---
  const handleCityInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCityFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!cityFormData.name || !cityFormData.countryId || !cityFormData.population) {
      setFormError('Nome, País e População são obrigatórios.'); return;
    }
    try {
      if (isEditing && currentItemId) {
        await geoAPI.updateCity(currentItemId, cityFormData);
      } else {
        await geoAPI.createCity(cityFormData);
      }
      handleCloseModals();
      loadData(); 
    } catch (error: any) {
      setFormError(error.response?.data?.error || `Erro ao ${isEditing ? 'atualizar' : 'salvar'}.`);
    }
  };

  /* ================== HANDLERS DE EXCLUSÃO ================== */

  const handleDelete = async (id: number) => {
    if (!window.confirm(`Tem certeza que deseja excluir este ${currentView.slice(0, -1)} (ID: ${id})?`)) {
      return;
    }
    try {
      if (currentView === 'continents') {
        await geoAPI.deleteContinent(id);
      } else if (currentView === 'countries') {
        await geoAPI.deleteCountry(id);
      } else if (currentView === 'cities') {
        await geoAPI.deleteCity(id);
      }
      
      setFormError(null); 
      loadData(); 
      loadDropdownData();
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || 'Erro ao excluir. Verifique se há itens associados.';
      console.error(`Erro ao excluir ${currentView.slice(0, -1)}:`, errorMessage, error);
      alert(errorMessage);
    }
  };


  /* ================== RENDERIZAÇÃO DA TABELA ================== */
  const renderTableHeader = () => {
    switch (currentView) {
      case 'continents':
        return (
          <tr>
            <th>Nome</th>
            <th>População</th>
            <th>Área (M km²)</th>
            <th>Actions</th>
          </tr>
        );
      case 'countries':
        return (
          <tr>
            <th>Nome</th>
            <th>ISO</th>
            <th>Continente</th>
            <th>População</th>
            <th>Actions</th>
          </tr>
        );
      case 'cities':
        return (
          <tr>
            <th>Nome</th>
            <th>País</th>
            <th>População</th>
            <th>Actions</th>
          </tr>
        );
    }
  };

  const renderTableBody = () => {
    return data.map((item: any) => {
      const formattedPopulation = Number(item.population).toLocaleString();
      
      if (currentView === 'continents') {
        const continentItem = item as Continent;
        return (
          <tr key={`cont-${continentItem.id}`}>
            <td><strong>{continentItem.name}</strong></td>
            <td>{formattedPopulation || '-'}</td>
            <td>{Number(continentItem.area).toLocaleString() || '-'}</td>
            <td>
              <div className="action-buttons">
                <button 
                    className="btn-icon edit" 
                    title="Edit"
                    onClick={() => handleOpenModal(continentItem)} 
                >✏️</button>
                <button 
                    className="btn-icon delete" 
                    title="Delete"
                    onClick={() => handleDelete(continentItem.id)} 
                >🗑️</button>
              </div>
            </td>
          </tr>
        );
      }
      if (currentView === 'countries') {
        const countryItem = item as Country;
        return (
          <tr key={`country-${countryItem.id}`}>
            <td><strong>{countryItem.name}</strong></td>
            <td>{countryItem.isoCode || '-'}</td>
            <td>{countryItem.continent?.name || '-'}</td>
            <td>{formattedPopulation}</td>
            <td>
              <div className="action-buttons">
                <button 
                    className="btn-icon edit" 
                    title="Edit"
                    onClick={() => handleOpenModal(countryItem)} 
                >✏️</button>
                <button 
                    className="btn-icon delete" 
                    title="Delete"
                    onClick={() => handleDelete(countryItem.id)} 
                >🗑️</button>
              </div>
            </td>
          </tr>
        );
      }
      if (currentView === 'cities') {
        const cityItem = item as City;
        return (
          <tr key={`city-${cityItem.id}`}>
            <td><strong>{cityItem.name}</strong></td>
            <td>{cityItem.country?.name || '-'}</td>
            <td>{formattedPopulation}</td>
            <td>
              <div className="action-buttons">
                <button 
                    className="btn-icon edit" 
                    title="Edit"
                    onClick={() => handleOpenModal(cityItem)} 
                >✏️</button>
                <button 
                    className="btn-icon delete" 
                    title="Delete"
                    onClick={() => handleDelete(cityItem.id)} 
                >🗑️</button>
              </div>
            </td>
          </tr>
        );
      }
      return null;
    });
  };

  /* ================== RENDER PRINCIPAL ================== */
  return (
    <>
      <div className="dashboard-content page-container">
        <div className="admin-header">
          <div className="header-title">
            <h1>OrbX Admin Panel ({currentView})</h1>
          </div>
          <div className="header-actions">
            <button className="btn-primary-action" onClick={() => handleOpenModal(null)}>
              <span className="plus-icon">+</span> {isEditing ? 'Editar' : 'Adicionar Novo'} {currentView.slice(0, -1)}
            </button>
          </div>
        </div>

        <div className="admin-tabs">
          <button className={`tab-btn ${currentView === 'continents' ? 'active' : ''}`} onClick={() => setCurrentView('continents')}>Continentes</button>
          <button className={`tab-btn ${currentView === 'countries' ? 'active' : ''}`} onClick={() => setCurrentView('countries')}>Países</button>
          <button className={`tab-btn ${currentView === 'cities' ? 'active' : ''}`} onClick={() => setCurrentView('cities')}>Cidades</button>
        </div>

        <div className="table-container admin-table-wrapper">
          {loading ? (
            <p style={{ padding: '20px' }}>Carregando dados...</p>
          ) : (
            <table>
              <thead>{renderTableHeader()}</thead>
              <tbody>{renderTableBody()}</tbody>
            </table>
          )}
          {!loading && data.length === 0 && (
            <p style={{ padding: '20px' }}>Nenhum dado encontrado.</p>
          )}
        </div>
      </div> 

      {isContinentModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <form onSubmit={handleContinentSubmit}>
              <div className="modal-header">
                <h2>{isEditing ? `Editar Continente ID: ${currentItemId}` : 'Adicionar Novo Continente'}</h2>
                <button type="button" className="modal-close-btn" onClick={handleCloseModals}>&times;</button>
              </div>
              {formError && <div className="form-error-banner">{formError}</div>}
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nome*</label>
                  <input type="text" id="name" name="name" value={continentFormData.name} onChange={handleContinentInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="population">População</label>
                  <input type="number" id="population" name="population" value={continentFormData.population} onChange={handleContinentInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="area">Área (em Milhões de km²)</label>
                  <input type="number" id="area" name="area" value={continentFormData.area} onChange={handleContinentInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="imageUrl">URL da Imagem</label>
                  <input type="text" id="imageUrl" name="imageUrl" value={continentFormData.imageUrl} onChange={handleContinentInputChange} />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModals}>Cancelar</button>
                <button type="submit" className="btn-primary-action">{isEditing ? 'Salvar Alterações' : 'Salvar Continente'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCountryModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content large"> 
            <form onSubmit={handleCountrySubmit}>
              <div className="modal-header">
                <h2>{isEditing ? `Editar País ID: ${currentItemId}` : 'Adicionar Novo País'}</h2>
                <button type="button" className="modal-close-btn" onClick={handleCloseModals}>&times;</button>
              </div>
              {formError && <div className="form-error-banner">{formError}</div>}
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nome do País*</label>
                  <input type="text" id="name" name="name" value={countryFormData.name} onChange={handleCountryInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="continentId">Continente*</label>
                  <select id="continentId" name="continentId" value={countryFormData.continentId} onChange={handleCountryInputChange}>
                    <option value="" disabled>Selecione um continente</option>
                    {continentsList.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                 <div className="form-group">
                  <label htmlFor="isoCode">Código ISO (ex: BR)*</label>
                  <input type="text" id="isoCode" name="isoCode" maxLength={3} value={countryFormData.isoCode} onChange={handleCountryInputChange} />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="capital">Capital</label>
                  <input type="text" id="capital" name="capital" value={countryFormData.capital} onChange={handleCountryInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="population">População</label>
                  <input type="number" id="population" name="population" value={countryFormData.population} onChange={handleCountryInputChange} />
                </div>
                 <div className="form-group">
                  <label htmlFor="area">Área (km²)</label>
                  <input type="number" id="area" name="area" value={countryFormData.area} onChange={handleCountryInputChange} />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="language">Idioma Principal</label>
                  <input type="text" id="language" name="language" value={countryFormData.language} onChange={handleCountryInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="currency">Moeda (ex: BRL)</label>
                  <input type="text" id="currency" name="currency" value={countryFormData.currency} onChange={handleCountryInputChange} />
                </div>
                 <div className="form-group">
                  <label htmlFor="callingCode">Cód. Telefônico (ex: +55)</label>
                  <input type="text" id="callingCode" name="callingCode" value={countryFormData.callingCode} onChange={handleCountryInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrição Curta</label>
                <input type="text" id="description" name="description" value={countryFormData.description} onChange={handleCountryInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="flagUrl">URL da Bandeira (opcional)</label>
                <input type="text" id="flagUrl" name="flagUrl" placeholder="https://flagcdn.com/w640/br.png" value={countryFormData.flagUrl} onChange={handleCountryInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="imageUrl">URL de Imagem (do país, opcional)</label>
                <input type="text" id="imageUrl" name="imageUrl" value={countryFormData.imageUrl} onChange={handleCountryInputChange} />
              </div>


              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModals}>Cancelar</button>
                <button type="submit" className="btn-primary-action">{isEditing ? 'Salvar Alterações' : 'Salvar País'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isCityModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-content large">
            <form onSubmit={handleCitySubmit}>
              <div className="modal-header">
                <h2>{isEditing ? `Editar Cidade ID: ${currentItemId}` : 'Adicionar Nova Cidade'}</h2>
                <button type="button" className="modal-close-btn" onClick={handleCloseModals}>&times;</button>
              </div>
              {formError && <div className="form-error-banner">{formError}</div>}
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="name">Nome da Cidade*</label>
                  <input type="text" id="name" name="name" value={cityFormData.name} onChange={handleCityInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="countryId">País*</label>
                  <select id="countryId" name="countryId" value={cityFormData.countryId} onChange={handleCityInputChange}>
                    <option value="" disabled>Selecione um país</option>
                    {countriesList.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="population">População*</label>
                  <input type="number" id="population" name="population" value={cityFormData.population} onChange={handleCityInputChange} />
                </div>
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="latitude">Latitude (opcional)</label>
                  <input type="text" id="latitude" name="latitude" value={cityFormData.latitude} onChange={handleCityInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="longitude">Longitude (opcional)</label>
                  <input type="text" id="longitude" name="longitude" value={cityFormData.longitude} onChange={handleCityInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="area">Área (km²)</label>
                  <input type="number" id="area" name="area" value={cityFormData.area} onChange={handleCityInputChange} />
                </div>
              </div>
              
              <div className="form-grid">
                <div className="form-group">
                  <label htmlFor="language">Idioma (se diferente do país)</label>
                  <input type="text" id="language" name="language" value={cityFormData.language} onChange={handleCityInputChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="timezone">Fuso Horário (ex: UTC-3)</label>
                  <input type="text" id="timezone" name="timezone" value={cityFormData.timezone} onChange={handleCityInputChange} />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="imageUrl">URL da Imagem (para a página da cidade)</label>
                <input type="text" id="imageUrl" name="imageUrl" value={cityFormData.imageUrl} onChange={handleCityInputChange} />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn-secondary" onClick={handleCloseModals}>Cancelar</button>
                <button type="submit" className="btn-primary-action">{isEditing ? 'Salvar Alterações' : 'Salvar Cidade'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminPanel;