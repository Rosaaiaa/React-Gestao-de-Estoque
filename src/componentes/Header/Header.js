import "./Header.css";
import { Link } from "react-router-dom";
import logo from '../../assets/Getstock.png';

function Header() {

    return(
      <header className="site-header">
      
        <div className="header-container">
          
          <div className="logo-container">
            <img src={logo} alt="Logo da empresa" className="logo" />
          </div>
          
          <nav className="button-nav">
            <Link to="/entrar" className="auth-button login">Entrar</Link>
            <Link to="/cadastrar" className="auth-button signup">Cadastrar</Link>
          </nav>

        </div>
    </header>
    )
}

export default Header;