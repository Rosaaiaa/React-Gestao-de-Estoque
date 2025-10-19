import "./FormUser.css";

function FormUserLogin(props) {

  async function login(userData){

    let requisicao = await fetch("http://127.0.0.1:5000/user", {
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userData)
    })

    let resposta = await requisicao.json()
    console.log(resposta)
  }
  
  return (
    <div>
      <h2> Olá, {props.nome} de {props.curso}</h2>
      <form action="/enviar" method="post">

        <div>
          <label htmlFor="cnpj">CNPJ:</label>
          <input type="text" id="cnpj" name="cnpj" required />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" required />
        </div>

        <input type='button' value='enviar' onClick={() =>login()}/>
      </form>
    </div>
  );
}
export default FormUserLogin;

//Render - BackEnd
//Vercel - FrontEnd
//Supabase - Banco de dados