import { useNavigate } from "react-router-dom";
import "./AtivarUser.css";
import { useState } from 'react';

function AtivarUser() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

  const [cnpj, setCnpj] = useState('');
  const [codigo, setCodigo] = useState('');

  async function enviar_ativacao(){

    const formData = {
        "cnpj": cnpj,
        "codigo": codigo
    }

    try {
      const response = await fetch(`${API_URL}/user/ativacao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.mensagem || result.erro);

      if(response.ok){
        navigate('/')
      }

    } catch (error) {
      console.error("Falha ao ativar usuário:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    enviar_ativacao();
  }

  return (
    <div>
      <h2>Insira o Código recebido no WhatsApp!</h2>
      <form id="form-cliente" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn-primary">Ativar</button>

      </form>
    </div>
  );
};

export default AtivarUser;