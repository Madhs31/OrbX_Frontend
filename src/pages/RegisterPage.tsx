import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar conta.');
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="bg-glow-effect">
      </div>

      <div className="auth-form-container">
        <form className="auth-form" onSubmit={handleRegister}>

          <p className="auth-subtitle">Crie sua conta gratuita</p>
          
          {error && <div className="auth-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" id="name" className="auth-input" 
              onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" id="email" className="auth-input" 
              onChange={handleChange} required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" id="password" className="auth-input" 
              onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input 
              type="password" id="confirmPassword" className="auth-input" 
              onChange={handleChange} required 
            />
          </div>
          
          <button type="submit" className="btn-glow-primary auth-submit">
            Cadastrar
          </button>
          
          <div className="auth-links">
            <span>Já tem uma conta?</span>
            <Link to="/login">Faça login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;