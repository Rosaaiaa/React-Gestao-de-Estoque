import { useNavigate } from "react-router-dom";
import "./AtivarUser.css";
import { useState } from 'react';
import Header from '../Header/Header';

function AtivarUser() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

  const [cnpj, setCnpj] = useState('');
  const [codigo, setCodigo] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function enviar_ativacao() {
    const formData = { cnpj, codigo };

    try {
      setIsLoading(true);
      const response = await fetch(`${API_URL}/user/ativacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.mensagem || result.erro);

      if (response.ok) {
        navigate('/');
      }

    } catch (error) {
      console.error("Falha ao ativar usuário:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    enviar_ativacao();
  }

  return (
    <div>
      <Header />
      <div className="entrar-page">
        <form id="form-cliente-ativar" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Insira o código recebido no WhatsApp</h2>
          </div>

          <input 
            type="text" 
            name="cnpj"
            placeholder="CNPJ" 
            onChange={(e)=> setCnpj(e.target.value)}
            required 
          />

          <input 
            type="text" 
            name="codigo" 
            placeholder="Código" 
            onChange={(e)=> setCodigo(e.target.value)}
            required 
          />

          <button type="submit" className="btn-primary" disabled={isLoading}>
            {isLoading ? <span className="loader"></span> : "Ativar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AtivarUser;
