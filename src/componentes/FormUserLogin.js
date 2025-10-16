import "./FormUser.css";

function FormUserLogin(props) {

  async function login(nome){
    //let api = await fetch("URL")
    //let resposta = await api.json()
    //console.log(nome)
    alert(nome)
  }
  
  return (
    <div>
      <h2> Olá, {props.nome} de {props.curso}</h2>
      <form action="/enviar" method="post">
        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" required />
        </div>

        <input type='button' value='enviar' onClick={() =>login("Renoir é legal")}/>
      </form>
    </div>
  );
}
export default FormUserLogin;

//Render - BackEnd
//Vercel - FrontEnd
//Supabase - Banco de dados