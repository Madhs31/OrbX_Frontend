import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  
  // Estados para guardar o que o usuário digita
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Limpa erros anteriores

    try {
      // 1. Envia dados para o backend
      const response = await api.post('/auth/login', { email, password });
      
      // 2. Se deu certo, o back retorna { token, user }
      const { token, user } = response.data;

      // 3. Salva no navegador
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // 4. Redireciona para o Dashboard
      navigate('/dashboard'); 
    } catch (err: any) {
      // Pega a mensagem de erro do backend ou define uma padrão
      const msg = err.response?.data?.error || 'Falha ao entrar. Verifique seus dados.';
      setError(msg);
    }
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="nav-brand login-brand">OrbX</div>
          <h2>Acesse sua conta</h2>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado
              required 
            />
          </div>
          
          <button type="submit" className="btn-login">
            Entrar
          </button>
          
          <div className="login-links">
            <Link to="/">Esqueci a senha</Link> 
            <Link to="/register"> Cadastrar</Link> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;