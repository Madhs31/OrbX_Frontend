import React from 'react';

const Register: React.FC = () => {
  return (
    // Reutilizamos .login-container para centralizar na tela
    <div className="login-container">
      
      {/* Mudamos aqui para .register-form-wrapper */}
      <div className="register-form-wrapper">
        
        {/* Mudamos aqui para .register-form (ou mantenha login-form se não adicionou a classe acima) */}
        <form className="register-form">
          <div className="nav-brand login-brand">OrbX</div>
          <h2>Crie sua conta</h2>
          
          <div className="form-group">
            <label htmlFor="name">Nome Completo</label>
            <input 
              type="text" 
              id="name" 
              className="form-input" 
              placeholder="Seu nome completo" 
              required 
            />
          </div>

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

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirmar Senha</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="form-input" 
              placeholder="••••••••" 
              required 
            />
          </div>
          
          <button type="submit" className="btn-login">
            Cadastrar
          </button>
          
          {/* Footer estilizado especificamente para o cadastro */}
          <div className="register-footer">
            Já tem uma conta?
            <a href="/login">Faça login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;