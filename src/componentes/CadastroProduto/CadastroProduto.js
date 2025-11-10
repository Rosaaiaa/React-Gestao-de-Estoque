import { useNavigate } from "react-router-dom";
import "./CadastroProduto.css";
import { useState, useRef } from "react";
import HeaderInside from "../HeaderInside/HeaderInside";

function CadastroProduto() {
  const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageInputRef = useRef(null);
  const formRef = useRef(null);

  async function enviar_cadastro() {
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("Você precisa estar logado para cadastrar um produto.");
      navigate("/entrar");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const result = await response.json();
      alert(result.mensagem || result.erro || "Erro ao cadastrar produto.");

      if (response.ok) {
        navigate("/admin");
      }
    } catch (error) {
      console.error("Erro ao enviar o formulário:", error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setIsLoading(false);
    }
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
      if (imageInputRef.current) {
        imageInputRef.current.setCustomValidity("");
      }
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image && imageInputRef.current) {
      imageInputRef.current.setCustomValidity("Selecione uma imagem.");
    }

    if (formRef.current && !formRef.current.checkValidity()) {
      formRef.current.reportValidity();
      if (imageInputRef.current) {
        imageInputRef.current.setCustomValidity("");
      }
      return;
    }

    if (imageInputRef.current) {
      imageInputRef.current.setCustomValidity("");
    }

    enviar_cadastro();
  };

  return (
    <div>
      <HeaderInside />
      <div className="entrar-page">
        <form
          id="form-produto"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          ref={formRef}
        >
          <div className="form-header">
            <h2>Cadastrar Produto</h2>
          </div>

          <input
            type="text"
            name="name"
            placeholder="Nome do produto"
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Preço (R$)"
            step="0.01"
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantidade em estoque"
            min="0"
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <label htmlFor="image-upload" className="file-label">
            Escolher imagem
            <input
              id="image-upload"
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              required
              ref={imageInputRef}
            />
          </label>

          {preview && (
            <div className="image-preview">
              <p>Imagem selecionada:</p>
              <img src={preview} alt="Prévia" className="preview-img" />
            </div>
          )}

          <button
            type="submit"
            className="btn-primary"
            disabled={isLoading}
          >
            {isLoading ? <span className="loader"></span> : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroProduto;
