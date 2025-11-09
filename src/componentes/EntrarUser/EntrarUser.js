import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EntrarUser.css";
import { useState } from 'react';
import Header from '../Header/Header';

function EntrarUser() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); 

  async function enviar_dados() {
    const formData = { cnpj, password };

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (response.ok) {
        alert("Login realizado com sucesso!");
        if (result.access_token) {
          localStorage.setItem('authToken', result.access_token);
        }
        navigate('/admin');
      } else {
        alert(result.mensagem || result.erro || "Falha no login.");
      }

    } catch (error) {
      console.error("Falha ao enviar o formulário:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    enviar_dados();
  }

  return (
    <div>
      <Header />
      <div className="entrar-page">
        <form id="form-cliente-entrar" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Realize seu login</h2>
          </div>

          <input 
            type="text" 
            name="cnpj"
            placeholder="CNPJ" 
            onChange={(e)=> setCnpj(e.target.value)}
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Senha" 
            onChange={(e)=> setPassword(e.target.value)}
            required 
          />
          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? <span className="loader"></span> : "Entrar"}
          </button>

          <Link to="/cadastrar" className="link-redireciona">Cadastrar</Link>
        </form>
      </div>
    </div>
  );
};

export default EntrarUser;
