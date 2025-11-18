import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api'; 

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); 

    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/dashboard'); 
    } catch (err: any) {
      const msg = err.response?.data?.error || 'Falha ao entrar. Verifique seus dados.';
      setError(msg);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="bg-glow-effect">
      </div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleLogin}>

          <p className="auth-subtitle">Acesse sua plataforma</p>
          
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="auth-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              className="auth-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          
          <button type="submit" className="btn-glow-primary auth-submit">
            Entrar
          </button>
          
          <div className="auth-links">

            <Link to="/register">Criar conta</Link> 
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;