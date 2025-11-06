import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./EntrarUser.css";
import { useState } from 'react';
import Header from '../Header/Header';
import loginimage from '../../assets/LoginImage.png';

function EntrarUser() {
  const API_URL = "http://localhost:5000";

  const [cnpj, setCnpj] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  async function enviar_dados(){

    const formData = {
      "cnpj": cnpj,
      "password": password
    }
    

      try {
        const response = await fetch(`${API_URL}/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if(response.ok){
          alert("Login realizaddo com sucesso!!!")
          navigate('/')
        }

        const result = await response.json();
        alert(result.mensagem || result.erro);
        console.log(result);

      } catch (error) {
        console.error("Falha ao enviar o formulário:", error);
        alert("Ocorreu um erro ao conectar com o servidor.");
      }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    enviar_dados();
  }
  

  return (
    <div>
       <Header />
      <h2>Entrar</h2>
      <form id="form-cliente" onSubmit={handleSubmit}>
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
        <button type="submit" className="btn-primary">Entrar</button>

        <Link to="/cadastrar" className="link-redireciona">Cadastrar</Link>

      </form>
    </div>
  );
};

export default EntrarUser;