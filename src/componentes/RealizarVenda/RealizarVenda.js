import { useNavigate } from "react-router-dom";
import "./RealizarVenda.css";
import { useState, useEffect } from "react";
import Header from "../Header/Header";

function RealizarVenda() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

    // Copiado / parecido do arquivo CadastroProduto, seguindo a mesma lógica
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [submittingProductId, setSubmittingProductId] = useState(null);

  // Algo adicional, lógica de moeda/Real
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

 
  async function fetchProducts() {
    const token = localStorage.getItem("authToken");
    // Verificação de login removida 
    // if (!token) {
    //   alert("Você precisa estar logado para ver os produtos.");
    //   navigate("/entrar");
    //   return;
    // } // Removi essa parte, me razão de ficar algo muito excessivo

    setIsLoadingProducts(true);
    try {
      const response = await fetch(`${API_URL}/products`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setProducts(data.products || data);
      } else {
        const errorData = await response.json();
        alert(errorData.erro || "Erro ao buscar produtos.");
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIsLoadingProducts(false);
    }
  }


  useEffect(() => {
    fetchProducts();
  }, []);



  async function handleSellProduct(productToSell) {
    const token = localStorage.getItem("authToken");


    if (productToSell.quantity <= 0) {
      alert("Produto sem estoque!");
      return;
    }


    setSubmittingProductId(productToSell.id);


    const saleItems = [
      {
        productId: productToSell.id,
        quantity: 1, // a lógia de uma unidade sendo vendida
      },
    ];

    try {
      const response = await fetch(`${API_URL}/sales`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ items: saleItems }),
      });

      const result = await response.json();
      
      if (response.ok) {
        alert("Venda realizada com sucesso!");
        // Atualizar o estoque
        fetchProducts(); 
      } else {
        alert(result.mensagem || result.erro || "Erro ao processar venda.");
      }
    } catch (error) {
      console.error("Erro ao finalizar a venda:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      // Limpa o ID, removendo o loader
      setSubmittingProductId(null);
    }
  }

  // Parte de Filtros
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div className="vendas-page">
        <div className="vendas-container-wrapper">
          {/* O container agora só tem a lista de produtos */}
          <div className="vendas-container">
            <div className="vendas-produtos-lista">
              <h2 className="h2-title">Produtos Disponíveis</h2>
              <input
                type="text"
                placeholder="Buscar produto pelo nome..."
                className="busca-input"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="grade-produtos">
                {isLoadingProducts ? (
                  <div className="loader-container">
                    <span className="loader-global"></span> {/* Loader global para a busca */}
                  </div>
                ) : filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div className="card-produto" key={product.id}>
                      <img
                        src={product.image_url || 'https://placehold.co/100x100/eee/aaa?text=Produto'}
                        alt={product.name}
                        className="produto-imagem"
                        onError={(e) => { e.target.src = 'https://placehold.co/100x100/eee/aaa?text=Erro'; }}
                      />
                      <div className="produto-info">
                        <h4>{product.name}</h4>
                        <p className="preco-stock">
                          {formatCurrency(product.price)} | Estoque: {product.quantity}
                        </p>
                      </div>
                      <button
                        className="btn-vender" 
                        onClick={() => handleSellProduct(product)}
          
                        disabled={product.quantity <= 0 || submittingProductId === product.id}
                      >
                        {submittingProductId === product.id ? (
                          <span className="loader"></span> 
                        ) : (
                          "Vender 1 Unidade"
                        )}
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="no-products">Nenhum produto encontrado.</p>
                )}
              </div>
            </div>
            {/* A coluna do carrinho foi removida, quer dizer fim */} 
          </div>
        </div>
      </div>
    </div>
  );
}

export default RealizarVenda;