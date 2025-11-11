import React from 'react';

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form-wrapper">
        <form className="login-form">
          <div className="nav-brand login-brand">OrbX</div>
          <h2>Acesse sua conta</h2>
          
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              placeholder="voce@exemplo.com" 
              required 
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Senha</label>
            <input 
              type="password" 
              id="password" 
              className="form-input" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <button type="submit" className="btn-login">
            Entrar
          </button>
          
          <div className="login-links">
            <a href="#">Esqueceu sua senha?</a>
            <a href="#">Criar uma conta</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;