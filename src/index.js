import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';

import Home from './componentes/Home/Home'
import CadastrarUser from './componentes/CadastrarUser/CadastrarUser';
import EntrarUser from './componentes/EntrarUser/EntrarUser';
import AtivarUser from './componentes/AtivarUser/AtivarUser';
import PageAdmin from './componentes/PageAdmin/PageAdmin';
import CadastroProduto from './componentes/CadastroProduto/CadastroProduto';
import VerProdutos from './componentes/VerProdutos/VerProdutos';
import VerVendas from './componentes/VerVendas/VerVendas';
import RealizarVenda from './componentes/RealizarVenda/RealizarVenda';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/cadastrar' element={<CadastrarUser/>}/>
          <Route path='/entrar' element={<EntrarUser/>}/>
          <Route path='/ativar' element={<AtivarUser/>}/>
          <Route path='/admin' element={<PageAdmin/>}/>
          <Route path="/cadastro-produto" element={<CadastroProduto />} />
          <Route path='/produtos' element={<VerProdutos />} />
          <Route path='/vendas' element={<VerVendas/>}/>
          <Route path='/realizar-venda' element={<RealizarVenda/>}/>
        </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
