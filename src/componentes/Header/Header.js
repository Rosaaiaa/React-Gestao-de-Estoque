import "./Header.css";
import logo from '../../assets/Getstock.png'

function Header() {
    return(
      <header className="site-header">
      
        <div className="header-container">
          
          <div className="logo-container">
            <img src={logo} alt="Logo da empresa" className="logo" />
          </div>
          
          <nav className="button-nav">
            <button className="auth-button login">Entrar</button>
            <button className="auth-button signup">Cadastrar</button>
          </nav>

        </div>
    </header>
    )
}

export default Header;