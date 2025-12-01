import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Ban } from "lucide-react";
import "./VerVendas.css";
import HeaderInside from "../HeaderInside/HeaderInside";

function VerVendas() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

  const [vendas, setVendas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function inativarVenda(id) {
    const confirmar = window.confirm("Deseja realmente inativar esta venda?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/sales/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Venda inativada com sucesso!");
      } else {
        alert(data.erro || "Erro ao inativar venda.");
      }
    } catch (error) {
      console.error("Erro ao inativar venda:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Você precisa estar logado para visualizar suas vendas.");
      navigate("/entrar");
      return;
    }

    async function fetchVendas() {
      try {
        const token = localStorage.getItem("authToken");

        const response = await fetch(`${API_URL}/sales`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setVendas(data.vendas || []);
        } else {
          alert(data.erro || "Erro ao buscar vendas.");
        }
      } catch (error) {
        console.error("Erro ao buscar vendas:", error);
        alert("Erro ao conectar com o servidor.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchVendas();
  }, [navigate]);

  const formatarData = (dataISO) => {
    const original = new Date(dataISO);
    const ajustada = new Date(original.getTime() - 3 * 60 * 60 * 1000);
    return ajustada.toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      <HeaderInside />
      <div className="ver-vendas-page">
        <div className="ver-vendas-container">
          <h2>Histórico de Vendas</h2>

          {isLoading ? (
            <div className="loader"></div>
          ) : vendas.length === 0 ? (
            <p className="sem-vendas">Nenhuma venda registrada.</p>
          ) : (
            <div className="vendas-list">
              {vendas.map((venda) => (
                <div key={venda.id} className="venda-card">
                  <p>
                    <strong>Produto:</strong> {venda.product_name}
                  </p>
                  <p>
                    <strong>Data:</strong> {formatarData(venda.created_at)}
                  </p>
                  <p>
                    <strong>Preço unitário:</strong> R${" "}
                    {Number(venda.price_at_sale).toFixed(2)}
                  </p>
                  <p>
                    <strong>Qtd:</strong> {venda.quantity}
                  </p>
                  <p>
                    <strong>Preço Total</strong> R${" "}
                    {(Number(venda.price_at_sale)* Number(venda.quantity)).toFixed(2)}
                  </p>
                  <button className="btn-icone btn-inativar" onClick={() => inativarVenda(venda.id)} title="Inativar venda">
                    <Ban size={18} />
                    <span>Inativar</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerVendas;