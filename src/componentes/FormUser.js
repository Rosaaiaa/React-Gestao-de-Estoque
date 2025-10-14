import "./FormUser.css";

function FormUser() {
  return (
    <div>
      <form action="/enviar" method="post">
        
        <div>
          <label htmlFor="nome">Nome:</label>
          <input type="text" id="nome" name="nome" required />
        </div>

        <div>
          <label htmlFor="email">E-mail:</label>
          <input type="email" id="email" name="email" required />
        </div>

        <div>
          <label htmlFor="senha">Senha:</label>
          <input type="password" id="senha" name="senha" required />
        </div>

        <div>
          <label htmlFor="idade">Idade:</label>
          <input type="number" id="idade" name="idade" />
        </div>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}

export default FormUser;
