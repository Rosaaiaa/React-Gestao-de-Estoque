import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./CadastrarUser.css";
import { useState } from 'react';

function CadastrarUser() {
  const API_URL = "http://localhost:5000";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    cnpj: '',
    email: '',
    celular: '',
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
      const response = await fetch(`${API_URL}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      alert(result.mensagem || result.erro);

      if(response.ok){
        navigate('/ativar')
      }

    } catch (error) {
      console.error("Falha ao enviar o formulário:", error);
      alert("Ocorreu um erro ao conectar com o servidor.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Loja</h2>
      <form id="form-cliente" onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Nome" 
          value={formData.name}
          onChange={handleChange}
          required 
        />
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
          name="email" 
          placeholder="Email" 
          value={formData.email}
          onChange={handleChange}
          required 
        />
        <input 
          type="text" 
          name="celular" 
          placeholder="Celular" 
          value={formData.celular}
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
        
        <button type="submit" className="btn-primary">Cadastrar</button>

        <Link to="/entrar" className="link-redireciona">Entrar</Link>

      </form>
    </div>
  );
}

export default CadastrarUser;