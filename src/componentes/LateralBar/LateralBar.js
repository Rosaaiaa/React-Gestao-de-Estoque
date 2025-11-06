import "./LateralBar.css"
import logo from "../../assets/Getstock.png"
function LateralBar(){

    return(
        <nav className="lateralbar">
            <ul>
                <div className="lateralbar-logo">
                    <img src={logo} alt="Logo da empresa" className="logo" />
                </div>
                <li className="container-categoria">
                    <h3>Produto</h3>
                    <ul className="submenu">
                        <li><a href="/produtos">Ver Produtos</a></li>
                        <li><a href="/cadastroproduto">Cadastrar Produto</a></li>
                    </ul>
                </li>

                <li className="container-categoria">
                    <h3>Vendas</h3>
                    <ul className="submenu">
                        <li><a href="/vendas">Ver Vendas</a></li>
                        <li><a href="/cadastroproduto">Realizar Venda</a></li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default LateralBar;