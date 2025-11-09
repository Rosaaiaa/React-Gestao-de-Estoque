import "./PageAdmin.css"
import LateralBar from "../LateralBar/LateralBar";
import ReportSaleByProduct from "../ReportSaleByProduct/ReportSaleByProduct";
import ReportTopProducts from "../ReportTopProducts/ReportTopProducts";

function PageAdmin() {

    return(
        <div className="dashboard-layout">

            <LateralBar></LateralBar>
      
            <div className="conteudo">
                <h1>Dashboard</h1>

                <div className="reports-container">
                <div className="report-card">
                    <h2>Quantidade de Vendas por Produto</h2>
                    <ReportSaleByProduct /> 
                </div>

                <div className="report-card">
                    <h2>Top 3 Produtos com maior Faturamento</h2>
                    <ReportTopProducts></ReportTopProducts>
                </div>
                </div>
            </div>
        </div>
    );

};

export default PageAdmin;