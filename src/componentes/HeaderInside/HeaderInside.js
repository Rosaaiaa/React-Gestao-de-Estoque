import "./HeaderInside.css";
import { Link } from "react-router-dom";
import logo from '../../assets/Getstock.png';

function HeaderInside() {
  return (
    <header className="site-header">
      <div className="header-container">

        <div className="logo-container">
          <Link to="/">
            <img src={logo} alt="Logo da empresa" className="logo" />
          </Link>
        </div>

        <nav className="button-nav">
          <Link to="/admin" className="button-back">Voltar</Link>
        </nav>

      </div>
    </header>
  );
}

export default HeaderInside;
