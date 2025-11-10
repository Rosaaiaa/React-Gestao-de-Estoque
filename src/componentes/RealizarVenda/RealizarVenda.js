import React, { useState, useEffect } from 'react';
import HeaderInside from '../HeaderInside/HeaderInside';
import './RealizarVenda.css'

function RealizarVenda() {

    const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";

    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState('');
    const [quantity, setQuantity] = useState('');

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            const token = localStorage.getItem('authToken');

            if (!token) {
                alert('Erro: Você não está logado.');
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch(`${API_URL}/products`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setProducts(data);
                } else {
                    const errorData = await response.json();
                    alert(`Erro ao buscar produtos: ${errorData.erro || 'Tente novamente'}`);
                }
            } catch (error) {
                alert('Erro de conexão ao buscar produtos.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        alert('');

        const token = localStorage.getItem('authToken');
        if (!token) {
            alert('Erro: Você não está logado.');
            return;
        }

        const saleData = {
            product_id: parseInt(selectedProductId),
            quantity: parseInt(quantity)
        };

        try {
            const response = await fetch(`${API_URL}/sales`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(saleData)
            });

            const data = await response.json();

            if (response.ok) {
                alert(`Venda #${data.id} realizada com sucesso!`);
                setSelectedProductId('');
                setQuantity('');

            } else {
                alert(`Erro: ${data.erro || 'Ocorreu um problema'}`);
            }
        } catch (error) {
            alert('Erro de conexão. Tente novamente.');
        }
    };

    if (isLoading) {
        return <p>Carregando produtos...</p>;
    }

    return (
        <>
            <HeaderInside></HeaderInside>
            <div className="entrar-page">
                <form id="form-venda" onSubmit={handleSubmit}>

                    <div className="form-header">
                        <h2>Realizar Venda</h2>
                    </div>

                    <div className="form-group">
                        <label htmlFor="produto-select">Produto:</label>
                        <select
                            id="produto-select"
                            value={selectedProductId}
                            onChange={(e) => setSelectedProductId(e.target.value)}
                            required
                        >
                            <option value="" disabled>Selecione um produto</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name} (Estoque: {product.quantity})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="quantidade-input">Quantidade:</label>
                        <input
                            id="quantidade-input"
                            type="number"
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            required
                            min="1"
                            placeholder="0"
                        />
                    </div>

                    <button type="submit" className="btn-primary" disabled={isLoading}>
                        {isLoading ? <span className="loader"></span> : 'Vender'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default RealizarVenda;