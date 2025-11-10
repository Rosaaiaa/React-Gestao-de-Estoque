import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Pencil, Ban } from "lucide-react";
import "./VerProdutos.css";
import Header from "../Header/Header";

function VerProdutos() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

  const [produtos, setProdutos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [produtoEditando, setProdutoEditando] = useState(null);

  useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
        alert("Você precisa estar logado para visualizar seus produtos.");
        navigate("/entrar");
        return;
      }

    async function fetchProdutos() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`${API_URL}/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setProdutos(data.produtos || []);
        } else {
          alert(data.erro || "Erro ao buscar produtos.");
        }
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        alert("Erro ao conectar com o servidor.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchProdutos();
  }, [navigate]);

  async function excluirProduto(id) {
    const confirmar = window.confirm("Deseja realmente inativar este produto?");
    if (!confirmar) return;

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Produto inativado com sucesso!");
        setProdutos(produtos.filter((p) => p.id !== id));
      } else {
        alert(data.erro || "Erro ao inativar produto.");
      }
    } catch (error) {
      console.error("Erro ao inativar produto:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  function abrirModal(produto) {
    setProdutoEditando({ ...produto });
  }

  function fecharModal() {
    setProdutoEditando(null);
  }

  async function salvarAlteracoes() {
    if (!produtoEditando.name || !produtoEditando.price || !produtoEditando.quantity) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      const token = localStorage.getItem("authToken");

      const formData = new FormData();
      formData.append("name", produtoEditando.name);
      formData.append("price", produtoEditando.price);
      formData.append("quantity", produtoEditando.quantity);

      if (produtoEditando.image instanceof File) {
        formData.append("image", produtoEditando.image);
      }

      const response = await fetch(`${API_URL}/products/${produtoEditando.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        alert("Produto atualizado com sucesso!");

        const produtoAtualizado = data.produto;

        setProdutos(
          produtos.map((p) =>
            p.id === produtoAtualizado.id ? produtoAtualizado : p
          )
        );

        fecharModal();
      } else {
        alert(data.erro || "Erro ao atualizar produto.");
      }
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      alert("Erro ao conectar com o servidor.");
    }
  }

  return (
    <div>
      <Header />
      <div className="ver-produtos-page">
        <div className="ver-produtos-container">
          <h2>Meus Produtos</h2>

          {isLoading ? (
            <div className="loader"></div>
          ) : produtos.length === 0 ? (
            <p className="sem-produtos">Nenhum produto cadastrado.</p>
          ) : (
            <div className="produtos-grid">
              {produtos.map((produto) => (
                <div key={produto.id} className="produto-card">
                  {produto.image ? (
                    <img src={produto.image} alt={produto.name} className="produto-imagem"/>
                  ) : (
                    <div className="sem-imagem">Sem imagem</div>
                  )}
                  <h3>{produto.name}</h3>
                  <p> <strong>Preço:</strong> R${" "} {Number(produto.price).toFixed(2)}</p>
                  <p> <strong>Quantidade:</strong> {produto.quantity} </p>

                  <div className="botoes-produto">
                    <button className="btn-icone btn-editar" onClick={() => abrirModal(produto)} title="Editar produto">
                      <Pencil size={18} />
                      <span>Editar</span>
                    </button>

                    <button className="btn-icone btn-inativar" onClick={() => excluirProduto(produto.id)} title="Inativar produto">
                      <Ban size={18} />
                      <span>Inativar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {produtoEditando && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h3>Editar Produto</h3>

            <label>Nome:</label>
            <input
              type="text"
              value={produtoEditando.name}
              onChange={(e) =>
                setProdutoEditando({
                  ...produtoEditando,
                  name: e.target.value,
                })
              }
            />

            <label>Preço:</label>
            <input
              type="number"
              value={produtoEditando.price}
              onChange={(e) =>
                setProdutoEditando({
                  ...produtoEditando,
                  price: e.target.value,
                })
              }
            />

            <label>Quantidade:</label>
            <input
              type="number"
              value={produtoEditando.quantity}
              onChange={(e) =>
                setProdutoEditando({
                  ...produtoEditando,
                  quantity: e.target.value,
                })
              }
            />

            <label htmlFor="image-upload" className="file-label">
              Escolher nova imagem (opcional)
              <input
                id="image-upload"
                type="file"
                name="image"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    setProdutoEditando({
                      ...produtoEditando,
                      image: file,
                      preview: URL.createObjectURL(file),
                    });
                  }
                }}
              />
            </label>

            {produtoEditando.preview && (
              <div className="image-preview">
                <p>Imagem selecionada:</p>
                <img
                  src={produtoEditando.preview}
                  alt="Prévia"
                  className="preview-img"
                />
              </div>
            )}

            <div className="modal-buttons">
              <button className="btn-salvar" onClick={salvarAlteracoes}>
                Salvar
              </button>
              <button className="btn-cancelar" onClick={fecharModal}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VerProdutos;
