import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';

const Register: React.FC = () => {
  const navigate = useNavigate();
  
  // Estado único para o formulário
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');

  // Função genérica para atualizar os inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validação simples de senha
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    try {
      // Envia para o backend (não enviamos o confirmPassword)
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      alert('Conta criada com sucesso! Faça login.');
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar conta.');
    }
  };

  return (
    <div className="login-container">
      <div className="register-form-wrapper">
        <form className="register-form" onSubmit={handleRegister}>
          <div className="nav-brand login-brand">OrbX</div>
          <h2>Crie sua conta</h2>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center' }}>{error}</div>}

          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" id="name" className="form-input" 
              onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" id="email" className="form-input" 
              onChange={handleChange} required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" id="password" className="form-input" 
              onChange={handleChange} required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input 
              type="password" id="confirmPassword" className="form-input" 
              onChange={handleChange} required 
            />
          </div>
          
          <button type="submit" className="btn-login">Cadastrar</button>
          
          <div className="register-footer">
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;