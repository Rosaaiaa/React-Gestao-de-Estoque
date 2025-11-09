import "./PageAdmin.css"
import LateralBar from "../LateralBar/LateralBar";
import ReportSaleByProduct from "../ReportSaleByProduct/ReportSaleByProduct";

function PageAdmin() {

    return(
        <div className="dashboard-layout">

            <LateralBar></LateralBar>
      
            <div className="conteudo">
                <h1>Dashboard</h1>

                <div className="reports-container">
                <div className="report-card">
                    <h2>Relatório de Vendas por Produto</h2>
                    <ReportSaleByProduct /> 
                </div>

                <div className="report-card">
                    <h2>Relatório 2 (Em breve)</h2>
                    <p>Conteúdo do segundo relatório.</p>
                </div>
                </div>
            </div>
        </div>
    );

};

export default PageAdmin;