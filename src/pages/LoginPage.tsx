import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Importe o useNavigate

const Login: React.FC = () => {
  const navigate = useNavigate(); // 2. Inicialize o hook

  // 3. Função que lida com o envio do formulário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); // Previne que a página recarregue
    
    navigate('/dashboard'); 
  };

  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        {/* 4. Adicione o onSubmit aqui na tag form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="nav-brand login-brand">OrbX</div>
          <h2>Acesse sua conta</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="voce@exemplo.com" 
              required // O navegador ainda vai exigir que pareça um email
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="••••••••" 
              required // Exige que não esteja vazio
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