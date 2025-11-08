import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CadastrarUser.css";
import { useState } from 'react';
import Header from '../Header/Header';

function CadastrarUser() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [email, setEmail] = useState('');
  const [celular, setCelular] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function enviar_cadastro() {
    const formData = {
      "name": name,
      "cnpj": cnpj,
      "email": email,
      "celular": celular,
      "password": password
    };

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.mensagem || result.erro);

      if (response.ok) {
        navigate('/ativar');
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
    enviar_cadastro();
  }

  return (
    <div>
      <Header />
      <div className="entrar-page">
        <form id="form-cliente-cadastrar" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Cadastro de Loja</h2>
          </div>

          <input 
            type="text" 
            name="name" 
            placeholder="Nome" 
            onChange={(e)=> setName(e.target.value)}
            required 
          />
          <input 
            type="text" 
            name="cnpj"
            placeholder="CNPJ" 
            onChange={(e)=> setCnpj(e.target.value)}
            required 
          />
          <input 
            type="text" 
            name="email" 
            placeholder="Email" 
            onChange={(e)=> setEmail(e.target.value)}
            required 
          />
          <input 
            type="text" 
            name="celular" 
            placeholder="Celular" 
            onChange={(e)=> setCelular(e.target.value)}
            required 
          />
          <input 
            type="password" 
            name="password" 
            placeholder="Senha" 
            onChange={(e)=> setPassword(e.target.value)}
            required 
          />
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Cadastrar"}
          </button>

          <Link to="/entrar" className="link-redireciona">Entrar</Link>
        </form>
      </div>
    </div>
  );
}

export default CadastrarUser;
