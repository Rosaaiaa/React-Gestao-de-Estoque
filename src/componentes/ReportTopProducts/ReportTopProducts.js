import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend,} from 'chart.js';


function ReportTopProducts () {

    const API_URL = "https://gestao-de-estoque-fu7n.onrender.com";
    
    ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
  
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem('authToken');
        const fetchData = async () => {
        try {
            if (!token) {
            console.error("Token não encontrado.");
            setLoading(false);
            return;
            }

            const response = await fetch(`${API_URL}/reports/top-products`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            });

            if (!response.ok) {
            throw new Error('Falha ao buscar dados');
            }

            const data = await response.json();

            const labels = data.map(item => item.product_name);
            const totals = data.map(item => item.total_revenue);

            setChartData({
            labels: labels,
            datasets: [
                {
                label: 'Total Faturado',
                data: totals,
                backgroundColor: '#b8001f',
                },
            ],
            });

        } catch (error) {
            console.error("Erro ao buscar relatório:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchData();
    }, []);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Produtos com maior Faturamento',
        },
        },
    };

    if (loading) {
        return <div>Carregando relatório...</div>;
    }

    return (
        <div className="chart-container">
            <Bar options={options} data={chartData} />
        </div>
    );

};

export default ReportTopProducts;