import { useNavigate } from "react-router-dom";
import "./AtivarUser.css";
import { useState } from 'react';

function AtivarUser() {
  const API_URL = "http://localhost:5000";
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cnpj: '',
    codigo: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    console.log(formData); 

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

  return (
    <div>
      <h2>Insira o Código recebido no WhatsApp!</h2>
      <form id="form-cliente" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="cnpj"
          placeholder="CNPJ" 
          value={formData.cnpj}
          onChange={handleChange}
          required 
        />
        <input 
          type="text" 
          name="codigo" 
          placeholder="Código" 
          value={formData.codigo}
          onChange={handleChange}
          required 
        />
        <button type="submit" className="btn-primary">Ativar</button>

      </form>
    </div>
  );
}

export default AtivarUser;