import { Link } from "react-router-dom";
import "./EntrarUser.css";
import { useState } from 'react';

function EntrarUser() {
  const API_URL = "http://localhost:5000";

  const [formData, setFormData] = useState({
    cnpj: '',
    password: ''
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
      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if(response.ok){
        alert("Acho que deu certo")
      }

      const result = await response.json();
      alert(result.mensagem || result.erro);

    } catch (error) {
      console.error("Falha ao enviar o formulário:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h2>Entrar</h2>
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
          type="password" 
          name="password" 
          placeholder="Senha" 
          value={formData.password}
          onChange={handleChange}
          required 
        />
        <button type="submit" className="btn-primary">Entrar</button>

        <Link to="/cadastrar" className="link-redireciona">Cadastrar</Link>

      </form>
    </div>
  );
}

export default EntrarUser;